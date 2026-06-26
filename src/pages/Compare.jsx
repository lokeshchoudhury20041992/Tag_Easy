// Task — Comparison pages for GEO/AI search.
//   /compare           → index (CollectionPage) listing all comparisons
//   /compare/<slug>     → a single A-vs-B comparison (Article + FAQ + Breadcrumb)
// Each detail page leads with a short answer, then a comparison table, pros/cons,
// when-to-choose guidance, a Tag Easy recommendation, FAQs, and related links.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, ArrowUpRight, ArrowRight } from 'lucide-react';
import { cn, getWhatsAppUrlForPage } from '../lib/utils';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import Breadcrumbs from '../components/Breadcrumbs';
import LeadForm from '../components/LeadForm';
import RelatedLinks from '../components/RelatedLinks';
import ShortAnswer from '../components/ShortAnswer';
import ExtractableTable from '../components/ExtractableTable';
import NotFound from './NotFound';
import { getComparison, getComparisons } from '../lib/compareData';
import { getServiceDetail } from '../lib/servicesData';
import { getRelatedLinks } from '../lib/internalLinks';
import {
  organizationSchema,
  buildComparisonSchema,
  buildLearnHubSchema,
} from '../lib/seoSchema';
import { trackWhatsAppClick } from '../lib/analytics';

const SectionContainer = ({ children, className }) => (
  <section className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-12 md:py-20', className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const ProsCons = ({ option }) => (
  <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
    <h3 className="text-white text-2xl font-instrument tracking-tight mb-2">{option.name}</h3>
    <p className="text-white/40 text-sm font-light mb-6">{option.blurb}</p>
    <div className="space-y-2 mb-6">
      {option.pros.map((p) => (
        <div key={p} className="flex items-start gap-2 text-white/55 text-sm font-light"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{p}</div>
      ))}
      {option.cons.map((c) => (
        <div key={c} className="flex items-start gap-2 text-white/40 text-sm font-light"><X className="w-4 h-4 text-red-500/80 mt-0.5 shrink-0" />{c}</div>
      ))}
    </div>
    <div className="pt-5 border-t border-white/5">
      <span className="text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] block mb-2">Choose this when</span>
      <p className="text-white/50 text-sm font-light leading-relaxed">{option.bestWhen}</p>
    </div>
  </div>
);

const CompareIndex = () => {
  const comparisons = getComparisons();
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Compare', path: '/compare' },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      ...buildLearnHubSchema({
        name: 'Tag Easy Comparisons',
        description: 'Side-by-side comparisons to help you choose the right digital growth approach.',
        path: '/compare',
        items: comparisons.map((c) => ({ name: c.h1, url: `/compare/${c.slug}` })),
        breadcrumb: breadcrumbItems,
      })['@graph'],
    ],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title="Compare Digital Growth Approaches | Tag Easy"
        description="Side-by-side comparisons — SEO vs paid ads, AI automation vs manual marketing, custom vs template websites, and more — to help you choose the right approach."
        path="/compare"
        image="https://tageasy.org/og/compare.svg"
        schemaData={schema}
      />
      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />
      <header className="px-6 max-w-7xl mx-auto pt-6 pb-12">
        <h1 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-6">Compare</h1>
        <p className="text-white/40 text-lg font-light max-w-2xl">
          Honest, side-by-side comparisons to help you choose the right approach for your business.
        </p>
      </header>
      <section className="px-6 max-w-7xl mx-auto pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            to={`/compare/${c.slug}`}
            className="liquid-glass rounded-[2rem] p-8 border border-white/5 hover:border-red-500/40 transition-all duration-500 group"
          >
            <h2 className="text-white text-2xl font-instrument tracking-tight mb-3 group-hover:translate-x-1 transition-transform">{c.h1}</h2>
            <p className="text-white/40 text-sm font-light mb-4">{c.tagline}</p>
            <span className="text-red-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
              Read comparison <ArrowUpRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
};

const Compare = () => {
  const { slug } = useParams();
  if (!slug) return <CompareIndex />;

  const cmp = getComparison(slug);
  if (!cmp) return <NotFound />;

  const path = `/compare/${cmp.slug}`;
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Compare', path: '/compare' },
    { name: cmp.h1, path },
  ];
  const relatedServices = (cmp.relatedServices || []).map(getServiceDetail).filter(Boolean);
  const relatedLinks = getRelatedLinks({
    currentPageType: 'page',
    serviceSlugs: cmp.relatedServices,
    glossarySlugs: cmp.glossarySlugs,
    keywords: [cmp.optionA.name, cmp.optionB.name],
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      ...buildComparisonSchema({
        title: cmp.h1,
        description: cmp.metaDescription,
        path,
        datePublished: cmp.datePublished,
        dateModified: cmp.dateModified,
        faqs: cmp.faqs,
        breadcrumb: breadcrumbItems,
      })['@graph'],
    ],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={cmp.metaTitle}
        description={cmp.metaDescription}
        path={path}
        image={`https://tageasy.org/og/compare-${cmp.slug}.svg`}
        type="article"
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      <SectionContainer className="pt-6 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
          <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 block">Comparison</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument leading-[0.95] mb-8">
            {cmp.h1}
          </h1>
          <p className="text-white/50 text-xl font-light leading-relaxed">{cmp.tagline}</p>
        </motion.div>
      </SectionContainer>

      <ShortAnswer text={cmp.shortAnswer} />

      {/* Comparison table */}
      <SectionContainer className="py-10">
        <ExtractableTable
          caption={`${cmp.optionA.name} vs ${cmp.optionB.name}`}
          columns={['', cmp.optionA.name, cmp.optionB.name]}
          rows={cmp.comparisonTable.map((r) => [r.dimension, r.a, r.b])}
        />
      </SectionContainer>

      {/* Pros / cons */}
      <SectionContainer className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProsCons option={cmp.optionA} />
          <ProsCons option={cmp.optionB} />
        </div>
      </SectionContainer>

      {/* Recommendation */}
      <SectionContainer className="py-10">
        <div className="liquid-glass rounded-[2rem] p-8 md:p-12 border border-white/5 border-l-2 border-l-red-500/60 max-w-4xl">
          <h2 className="text-red-500 text-[10px] uppercase font-bold tracking-[0.4em] mb-4">Tag Easy recommendation</h2>
          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-8">{cmp.recommendation}</p>
          {relatedServices.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {relatedServices.map((svc) => (
                <Link
                  key={svc.slug}
                  to={`/services/${svc.slug}`}
                  className="text-red-500 text-[11px] uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all flex items-center gap-1 border border-white/10 rounded-full px-4 py-2"
                >
                  {svc.h1.replace(/ —.*$/, '')} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </SectionContainer>

      {/* CTA form */}
      <SectionContainer className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-none mb-6">{cmp.cta.heading}</h2>
            <p className="text-white/40 text-lg font-light mb-8">{cmp.cta.text}</p>
            <a
              href={getWhatsAppUrlForPage(cmp.h1, 'compare_page')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`compare_${cmp.slug}`)}
              className="inline-block bg-[#25D366] hover:bg-[#22c35e] text-white rounded-full px-7 py-3.5 text-[11px] uppercase tracking-widest font-bold transition-all active:scale-95"
            >
              WhatsApp Us
            </a>
          </div>
          <LeadForm
            heading={cmp.formHeading}
            subheading="Tell us about your goals and we will reply within 24 hours."
            fields={['name', 'email', 'phone', 'message']}
            required={['name', 'email']}
            source={`compare_${cmp.slug}`}
            submitLabel={cmp.formCta}
            thankYouPath="/thank-you"
          />
        </div>
      </SectionContainer>

      <FAQ faqs={cmp.faqs} title="Common questions" subtitle={`What people ask about ${cmp.optionA.name.toLowerCase()} and ${cmp.optionB.name.toLowerCase()}.`} />

      <RelatedLinks links={relatedLinks} />
    </main>
  );
};

export default Compare;
