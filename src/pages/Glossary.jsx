// Task 14 — Glossary page for AI/GEO visibility.
// Indexable, with clean per-term anchors, internal links to services, and
// DefinedTermSet schema.

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { glossaryTerms } from '../lib/glossaryData';
import { organizationSchema, buildGlossarySchema, buildBreadcrumbSchema } from '../lib/seoSchema';

const glossarySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildGlossarySchema(glossaryTerms),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Glossary', path: '/glossary' },
    ]),
  ],
};

const Glossary = () => (
  <main className="bg-black min-h-screen pt-32 pb-24 px-4 md:px-6">
    <SEO
      title="Digital Marketing & SEO Glossary | Tag Easy"
      description="Clear definitions of SEO, AI automation, local SEO, schema markup, Core Web Vitals, IndexNow, GEO, and other digital engineering terms — by Tag Easy."
      path="/glossary"
      schemaData={glossarySchema}
    />

    <div className="max-w-4xl mx-auto">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary' },
        ]}
        className="!px-0 mb-8"
      />
      <div className="mb-16">
        <span className="text-red-500 text-[10px] uppercase font-bold tracking-[0.4em] block mb-6">Reference</span>
        <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument mb-8 leading-[0.85]">
          Digital <span className="text-white/20 italic">Glossary</span>
        </h1>
        <p className="text-white/40 text-xl font-light max-w-2xl leading-relaxed">
          Plain-language definitions of the SEO, AI automation, and digital engineering terms we use with clients.
        </p>
      </div>

      {/* Quick index */}
      <div className="flex flex-wrap gap-2 mb-16">
        {glossaryTerms.map((t) => (
          <a key={t.slug} href={`#${t.slug}`} className="text-white/40 text-[11px] border border-white/10 rounded-full px-3 py-1 hover:border-red-500/40 hover:text-white transition-colors">
            {t.term}
          </a>
        ))}
      </div>

      <div className="space-y-10">
        {glossaryTerms.map((t, i) => (
          <motion.article
            key={t.slug}
            id={t.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
            className="liquid-glass rounded-3xl border border-white/5 p-8 scroll-mt-28 hover:border-red-500/20 transition-colors"
          >
            <h2 className="text-2xl md:text-3xl text-white font-instrument tracking-tight mb-3">{t.term}</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-4">{t.short}</p>
            <p className="text-white/40 text-sm font-light leading-relaxed mb-6">{t.expanded}</p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link to={t.relatedService} className="text-red-500 text-[10px] uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all flex items-center gap-1">
                Related service <ArrowUpRight className="w-3 h-3" />
              </Link>
              <span className="text-white/20 text-[10px] uppercase tracking-widest">Updated {t.lastUpdated}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </main>
);

export default Glossary;
