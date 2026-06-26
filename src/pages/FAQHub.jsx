// Task 15 — Dedicated FAQ hub at /faqs.
// Renders all central FAQs grouped by category with internal links, FAQPage
// schema, and breadcrumb. Included in the sitemap via the prerender pages list.

import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQ from '../components/FAQ';
import { faqs, faqCategories, getFaqsByCategory } from '../lib/faqData';
import { organizationSchema, buildFaqSchema, buildBreadcrumbSchema } from '../lib/seoSchema';

const faqHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildFaqSchema(faqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQs', path: '/faqs' },
    ]),
  ],
};

const FAQHub = () => (
  <main className="bg-black min-h-screen pt-32 pb-12 px-4 md:px-6">
    <SEO
      title="Frequently Asked Questions | Tag Easy"
      description="Answers about Tag Easy SEO, AI automation, website development, Google Business Profile, paid ads, analytics, pricing, timelines, and how we work."
      path="/faqs"
      schemaData={faqHubSchema}
    />

    <div className="max-w-4xl mx-auto">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'FAQs', path: '/faqs' },
        ]}
        className="!px-0 mb-8"
      />
      <div className="mb-12">
        <span className="text-red-500 text-[10px] uppercase font-bold tracking-[0.4em] block mb-6">Help Center</span>
        <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument mb-8 leading-[0.85]">
          Frequently asked <span className="text-white/20 italic">questions</span>
        </h1>
        <p className="text-white/40 text-xl font-light max-w-2xl leading-relaxed">
          Everything about how Tag Easy delivers SEO, AI automation, websites, ads, and analytics. Still stuck?{' '}
          <Link to="/contact" className="text-red-500 hover:underline">Contact us</Link>.
        </p>
      </div>

      {/* GEO short answer */}
      <section className="short-answer mb-10">
        <div className="liquid-glass rounded-[2rem] border border-white/5 border-l-2 border-l-red-500/60 p-7 md:p-9">
          <h2 className="text-red-500 text-[10px] uppercase font-bold tracking-[0.4em] mb-4">Short answer</h2>
          <p className="text-white/70 text-lg font-light leading-relaxed">
            Tag Easy answers the most common questions about its SEO, AI automation, website development, Google
            Business Profile, paid ads, analytics, pricing, and process — concisely and factually, so the answers are
            easy to scan and easy for AI engines to quote.
          </p>
        </div>
      </section>

      {/* Category jump links */}
      <div className="flex flex-wrap gap-2 mb-4">
        {faqCategories.map((c) => (
          <a key={c} href={`#${c.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`} className="text-white/40 text-[11px] border border-white/10 rounded-full px-3 py-1 hover:border-red-500/40 hover:text-white transition-colors">
            {c}
          </a>
        ))}
      </div>
    </div>

    {faqCategories.map((category) => {
      const items = getFaqsByCategory(category);
      if (!items.length) return null;
      return (
        <div key={category} id={category.replace(/[^a-z0-9]+/gi, '-').toLowerCase()} className="scroll-mt-28">
          <FAQ faqs={items} title={category} />
        </div>
      );
    })}
  </main>
);

export default FAQHub;
