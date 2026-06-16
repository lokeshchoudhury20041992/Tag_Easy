// Phase 2 · Task 6 — Free audit funnel.
// Full lead form (name, business, website, phone/email, service, message) with
// validation, spam protection, UTM attribution, webhook submit, GA4 events, and
// redirect to the noindex /free-audit/thank-you page.

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle2 } from 'lucide-react';
import { getAuditCalendarUrl } from '../lib/utils';
import Button from '../components/Button';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import LeadForm from '../components/LeadForm';
import TestimonialsSection from '../components/TestimonialsSection';
import { getFaqsByCategories } from '../lib/faqData';
import { serviceDetailPages } from '../lib/servicesData';
import {
  organizationSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '../lib/seoSchema';
import { trackBookCallClick, trackFreeAuditSubmit } from '../lib/analytics';

const auditFaqs = getFaqsByCategories(['Pricing & Timelines', 'Working With Tag Easy']);

const serviceOptions = [
  { value: '', label: 'Not sure yet / general audit' },
  ...serviceDetailPages.map((s) => ({ value: s.slug, label: s.h1.replace(/ —.*$/, '') })),
];

const freeAuditSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    ...buildServiceSchema({
      name: 'Free Technical Audit',
      description:
        'A free Tag Easy audit identifying revenue leaks, SEO gaps, automation opportunities, and digital performance issues.',
      path: '/free-audit',
    })['@graph'],
    buildFaqSchema(auditFaqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Free Audit', path: '/free-audit' },
    ]),
  ],
};

const benefits = [
  'Where your site is losing rankings and revenue',
  'Technical SEO and Core Web Vitals issues',
  'Automation opportunities to capture more leads',
  'A prioritised, no-obligation action plan',
];

const FreeAudit = () => (
  <main className="bg-black relative min-h-screen pt-24 md:pt-32">
    <SEO
      title="Free Technical Audit | Tag Easy"
      description="Book a free Tag Easy audit to identify revenue leaks, SEO gaps, automation opportunities, and digital performance issues — with a prioritised action plan."
      path="/free-audit"
      image="https://tageasy.org/og/free-audit.svg"
      schemaData={freeAuditSchema}
    />

    <section className="px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 block">
            Free Technical Audit
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument mb-8 leading-[0.9]">
            Identify Your <br /> Revenue Leaks
          </h1>
          <p className="text-white/40 text-xl font-light leading-relaxed mb-10 max-w-xl">
            Share a few details and our engineering team will run a deep-dive analysis of your digital ecosystem,
            then get back to you within 24 hours.
          </p>

          <ul className="space-y-3 mb-10">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white/60 text-sm font-light">
                <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => { trackBookCallClick('free_audit'); window.open(getAuditCalendarUrl(), '_blank'); }}
              className="px-8"
            >
              <Phone className="w-4 h-4" />
              Book Call Directly
            </Button>
            <span className="text-red-500 text-[10px] uppercase font-bold tracking-[0.2em]">
              Limited slots this week
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <LeadForm
            heading="Request Your Free Audit"
            subheading="No cost, no obligation. We respond within 24 hours."
            fields={['name', 'company', 'website', 'email', 'phone', 'message']}
            required={['name', 'email']}
            serviceOptions={serviceOptions}
            source="free_audit_form"
            submitLabel="Request Free Audit"
            thankYouPath="/free-audit/thank-you"
            onSuccess={() => trackFreeAuditSubmit('free_audit_form')}
          />
        </motion.div>
      </div>
    </section>

    <TestimonialsSection title="Client outcomes" subtitle="Verified results from businesses we have worked with." />

    <FAQ
      faqs={auditFaqs}
      title="Before you book"
      subtitle="Pricing, timelines, and what working with Tag Easy looks like."
    />
  </main>
);

export default FreeAudit;
