// Phase 2 · Task 5 — Review collection landing page (/review-us).
// Sent to clients after a project. Thanks them, points to Google reviews, gives
// short guidance, and offers an optional private feedback form. No private
// project details are exposed; the page emits no fake review schema.

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { getGoogleReviewUrl } from '../lib/utils';
import { organizationSchema, buildBreadcrumbSchema } from '../lib/seoSchema';
import { trackReviewClick } from '../lib/analytics';

const reviewSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Review Us', path: '/review-us' },
    ]),
  ],
};

const guidance = [
  'What you hired us for (SEO, website, automation, ads, branding).',
  'What changed for your business — be as specific as you can.',
  'What it was like to work with the team.',
];

const ReviewUs = () => (
  <main className="bg-black relative min-h-screen pt-28 md:pt-36">
    <SEO
      title="Leave a Review for Tag Easy"
      description="Worked with Tag Easy? Share your experience. Your review helps other businesses understand what it is like to work with our team."
      path="/review-us"
      image="https://tageasy.org/og/review-us.svg"
      schemaData={reviewSchema}
    />

    <section className="px-6 max-w-4xl mx-auto text-center pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="flex justify-center gap-1 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-6 h-6 text-red-500 fill-red-500" />
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">
          Thank you for working <br /> with <span className="text-white/20">Tag Easy</span>
        </h1>
        <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
          If our team helped with your website, SEO, automation, or marketing work, your review helps other
          businesses understand what it is like to work with us. It only takes a minute.
        </p>

        <a
          href={getGoogleReviewUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackReviewClick('review_us_google')}
          className="inline-flex items-center gap-3 bg-white text-black rounded-full px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:scale-[1.03] transition-all"
        >
          Leave a Google Review <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </section>

    <section className="px-6 max-w-3xl mx-auto pb-12">
      <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
        <h2 className="text-2xl text-white font-instrument tracking-tighter mb-6">Not sure what to write?</h2>
        <p className="text-white/40 text-sm font-light mb-5">A helpful review usually mentions:</p>
        <ul className="space-y-3">
          {guidance.map((g) => (
            <li key={g} className="flex items-start gap-3 text-white/60 text-sm font-light">
              <span className="text-red-500 mt-1">•</span>
              {g}
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="px-6 max-w-3xl mx-auto pb-24">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl text-white font-instrument tracking-tighter mb-3">Prefer to share privately?</h2>
        <p className="text-white/40 text-sm font-light">Send us direct feedback instead — it goes straight to the team.</p>
      </div>
      <LeadForm
        fields={['name', 'email', 'message']}
        required={['message']}
        source="review_us_feedback"
        submitLabel="Send Private Feedback"
        successMessage="Thank you for the feedback — we read every message."
      />
    </section>
  </main>
);

export default ReviewUs;
