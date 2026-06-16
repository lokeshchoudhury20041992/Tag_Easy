// Phase 2 · Tasks 6, 7, 16 — One reusable, tracked, spam-protected lead form.
//
// Used by service pages (service-tagged leads), the free-audit funnel, and any
// CTA that needs to capture a lead. Features:
//   • Configurable field set (`fields` prop)
//   • Validation (required, email, phone, URL)
//   • Honeypot + time-to-submit + keyword spam protection (spamCheck.js)
//   • First-touch UTM attribution attached automatically (utmTracking.js)
//   • Hidden serviceInterest + pagePath on every submission
//   • GA4 events with NO PII (only event name, source, service slug)
//   • Optional redirect to a noindex thank-you page on success
//   • Never breaks if the webhook fails (no-cors) — UX stays intact

import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { submitToWebhook } from '../lib/submitForm';
import { getAttribution } from '../lib/utmTracking';
import { evaluateSubmission, HONEYPOT_FIELD } from '../lib/spamCheck';
import {
  trackLeadSubmit,
  trackGenerateLead,
  trackServiceInquirySubmit,
  trackSpamBlocked,
} from '../lib/analytics';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

const FIELD_DEFS = {
  name: { label: 'Full Name', type: 'text', placeholder: 'Full Name', autoComplete: 'name' },
  company: { label: 'Business Name', type: 'text', placeholder: 'Business Name', autoComplete: 'organization' },
  email: { label: 'Email', type: 'email', placeholder: 'Email Address', autoComplete: 'email' },
  phone: { label: 'Phone', type: 'tel', placeholder: 'Phone Number', autoComplete: 'tel' },
  website: { label: 'Website', type: 'text', placeholder: 'Website URL (https://...)', autoComplete: 'url' },
  message: { label: 'Message', type: 'textarea', placeholder: 'Tell us what you need…' },
};

const LeadForm = ({
  fields = ['name', 'email', 'phone', 'message'],
  required = ['name', 'email'],
  serviceInterest = '',
  serviceOptions = null, // optional array of {value,label} → renders a service select
  source = 'lead_form',
  heading,
  subheading,
  submitLabel = 'Send Enquiry',
  successMessage = 'Thank you — we will be in touch within 24 hours.',
  thankYouPath, // if set, redirect here on success (noindex thank-you page)
  onSuccess,
  className = '',
}) => {
  const navigate = useNavigate();
  const mountedAt = useRef(Date.now());
  const [values, setValues] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState(
    serviceOptions && serviceOptions.length ? serviceOptions[0].value : serviceInterest
  );

  const activeFields = useMemo(() => fields.filter((f) => FIELD_DEFS[f]), [fields]);

  const setField = (key, val) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    for (const f of required) {
      if (!String(values[f] || '').trim()) next[f] = 'Required';
    }
    if (values.email && !EMAIL_RE.test(values.email)) next.email = 'Enter a valid email';
    if (values.phone && !PHONE_RE.test(values.phone)) next.phone = 'Enter a valid phone';
    if (values.website && !URL_RE.test(values.website.trim())) next.website = 'Enter a valid URL';
    // Need at least one way to reach them.
    if (!values.email && !values.phone && (required.includes('email') || required.includes('phone'))) {
      next.email = next.email || 'Email or phone required';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Spam evaluation runs BEFORE validation/tracking so bots never fire events.
    const text = [values.name, values.company, values.message, values.website].filter(Boolean).join(' ');
    const verdict = evaluateSubmission({
      honeypotValue: honeypot,
      elapsedMs: Date.now() - mountedAt.current,
      text,
    });
    if (!verdict.ok) {
      trackSpamBlocked(verdict.reason, source);
      // Pretend success to the bot; do NOT submit or fire lead events.
      setStatus('success');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setStatus(null);

    const resolvedService = serviceOptions ? selectedService : serviceInterest;
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company,
      website: values.website,
      message: values.message,
      serviceInterest: resolvedService || '',
      pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
      source,
      ...getAttribution(),
    };

    try {
      await submitToWebhook(payload);
      // Conversion events — non-PII only.
      trackLeadSubmit(source);
      trackGenerateLead(source);
      if (resolvedService) trackServiceInquirySubmit(resolvedService, source);
      if (typeof onSuccess === 'function') onSuccess(payload);

      setStatus('success');
      setValues({});
      setSelectedService(serviceOptions && serviceOptions.length ? serviceOptions[0].value : serviceInterest);

      if (thankYouPath) {
        // Brief pause so the success state is visible before navigating.
        setTimeout(() => navigate(thankYouPath), 250);
      }
    } catch (err) {
      if (import.meta.env.DEV) console.warn('[LeadForm] submit failed', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (key) =>
    cn(
      'w-full bg-white/[0.02] hover:bg-white/[0.04] border rounded-2xl py-4 px-5 text-white outline-none transition-all duration-500 font-light placeholder:text-white/20 text-sm focus:ring-4 focus:ring-red-500/10 backdrop-blur-md',
      errors[key] ? 'border-red-500/60' : 'border-white/10 focus:border-red-500/50 focus:bg-white/[0.05]'
    );

  return (
    <div className={cn('liquid-glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative', className)}>
      {heading && <h3 className="text-3xl md:text-4xl font-instrument text-white mb-2 tracking-tighter">{heading}</h3>}
      {subheading && <p className="text-white/40 text-sm font-light mb-8">{subheading}</p>}
      {!subheading && heading && <div className="mb-6" />}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot — visually hidden, off-screen, not focusable. Bots fill it. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" tabIndex={-1}>
          <label htmlFor={HONEYPOT_FIELD}>Do not fill this field</label>
          <input
            id={HONEYPOT_FIELD}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {serviceOptions && serviceOptions.length > 0 && (
          <div>
            <label className="text-red-500 text-[9px] uppercase font-bold tracking-[0.3em] block mb-2">Service needed</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className={cn(inputClass('service'), 'appearance-none cursor-pointer')}
            >
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-black text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeFields.map((key) => {
          const def = FIELD_DEFS[key];
          const isReq = required.includes(key);
          return (
            <div key={key}>
              {def.type === 'textarea' ? (
                <textarea
                  value={values[key] || ''}
                  onChange={(e) => setField(key, e.target.value)}
                  disabled={isSubmitting}
                  required={isReq}
                  className={cn(inputClass(key), 'h-28 resize-none')}
                  placeholder={def.placeholder}
                  aria-label={def.label}
                />
              ) : (
                <input
                  type={def.type}
                  value={values[key] || ''}
                  onChange={(e) => setField(key, e.target.value)}
                  disabled={isSubmitting}
                  required={isReq}
                  autoComplete={def.autoComplete}
                  className={inputClass(key)}
                  placeholder={def.placeholder}
                  aria-label={def.label}
                />
              )}
              {errors[key] && (
                <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-2 ml-1">{errors[key]}</p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 rounded-2xl text-[11px] uppercase tracking-[0.3em] font-bold bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/[0.08] text-white transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-50"
        >
          {isSubmitting ? 'SENDING…' : status === 'success' ? 'RECEIVED' : submitLabel}
          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-green-500 text-xs font-light text-center pt-2"
            >
              {successMessage}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center pt-2"
            >
              Connection error — please email lokesh.choudhury@tageasy.org
            </motion.p>
          )}
        </AnimatePresence>

        <p className="text-white/25 text-[10px] text-center tracking-wide pt-1">
          We respond within 24 hours. Your details are never shared.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
