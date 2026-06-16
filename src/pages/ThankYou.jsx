// Phase 2 · Task 17 — Noindex thank-you / conversion confirmation pages.
// One component serves /thank-you, /contact/thank-you, /free-audit/thank-you,
// and /service-inquiry/thank-you. Each fires a GA4 conversion event on view and
// is excluded from indexing + sitemap (handled in prerender).

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { getWhatsAppUrlForPage } from '../lib/utils';
import { trackConversion, trackWhatsAppClick } from '../lib/analytics';

const CONFIG = {
  '/thank-you': {
    conversion: 'lead',
    title: 'Thank You | Tag Easy',
    heading: 'Thank you — message received',
    body: 'Your enquiry is in. Our team reviews every message and will reply within 24 hours (usually much sooner).',
  },
  '/contact/thank-you': {
    conversion: 'contact_lead',
    title: 'Thank You for Contacting Tag Easy',
    heading: 'Thanks for reaching out',
    body: 'We have received your brief and will respond within 24 hours to discuss the next steps.',
  },
  '/free-audit/thank-you': {
    conversion: 'free_audit_lead',
    title: 'Your Free Audit Is Booked | Tag Easy',
    heading: 'Your free audit request is in',
    body: 'We will review your site and get back to you within 24 hours to schedule your deep-dive audit.',
  },
  '/service-inquiry/thank-you': {
    conversion: 'service_lead',
    title: 'Enquiry Received | Tag Easy',
    heading: 'Enquiry received',
    body: 'Thanks for your interest. We will review your details and reply within 24 hours with the best next step.',
  },
};

const ThankYou = () => {
  const location = useLocation();
  const path = location.pathname.replace(/\/$/, '') || '/thank-you';
  const cfg = CONFIG[path] || CONFIG['/thank-you'];

  useEffect(() => {
    trackConversion(cfg.conversion, path);
  }, [cfg.conversion, path]);

  return (
    <main className="bg-black relative min-h-screen pt-28 md:pt-36 flex items-center justify-center px-6">
      <SEO title={cfg.title} description={cfg.body} path={path} noindex />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl w-full text-center liquid-glass rounded-[3rem] p-10 md:p-16 border border-white/5 my-16"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-3xl md:text-5xl text-white font-instrument tracking-tighter mb-6 leading-tight">{cfg.heading}</h1>
        <p className="text-white/50 text-lg font-light leading-relaxed mb-10">{cfg.body}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="bg-white text-black rounded-full px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:scale-[1.03] transition-all inline-flex items-center justify-center gap-2"
          >
            Explore Services <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={getWhatsAppUrlForPage('thank you', 'thank_you_page')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('thank_you_page')}
            className="bg-[#25D366] hover:bg-[#22c35e] text-white rounded-full px-8 py-4 text-[11px] uppercase tracking-widest font-bold transition-all inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> Message on WhatsApp
          </a>
        </div>

        <Link to="/" className="inline-block mt-8 text-white/30 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-colors">
          ← Back to home
        </Link>
      </motion.div>
    </main>
  );
};

export default ThankYou;
