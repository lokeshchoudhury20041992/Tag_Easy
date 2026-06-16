// Phase 2 · Task 11 — Data-driven case study detail page (/case-studies/<slug>).
// Renders any PUBLISHED case study from caseStudyData.js with full structure:
// overview, problem, baseline, strategy, implementation, timeline, results,
// caveats, related services, CTA — plus Article + Breadcrumb schema.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Globe, ArrowUpRight } from 'lucide-react';
import { cn, getAuditCalendarUrl } from '../lib/utils';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedLinks from '../components/RelatedLinks';
import NotFound from './NotFound';
import { getCaseStudy } from '../lib/caseStudyData';
import { getServiceDetail } from '../lib/servicesData';
import { getRelatedLinks } from '../lib/internalLinks';
import { organizationSchema, buildCaseStudyArticleSchema } from '../lib/seoSchema';

const GlassCard = ({ children, className }) => (
  <div className={cn('liquid-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 h-full border border-white/5 hover:border-red-500/40 transition-all duration-700', className)}>
    {children}
  </div>
);

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const cs = getCaseStudy(slug);

  if (!cs || !cs.published) return <NotFound />;

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: cs.title, path: cs.path },
  ];
  const relatedServices = (cs.relatedServices || []).map(getServiceDetail).filter(Boolean);
  const relatedLinks = getRelatedLinks({
    currentPageType: 'case-study',
    caseStudySlug: cs.slug,
    serviceSlugs: cs.relatedServices,
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, ...buildCaseStudyArticleSchema(cs)['@graph']],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={`${cs.title} Case Study | Tag Easy`}
        description={cs.summary || cs.overview}
        path={cs.path}
        image={`https://tageasy.org/og/case-studies-${cs.slug}.svg`}
        type="article"
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      {/* Hero */}
      <header className="px-6 max-w-7xl mx-auto pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
              <Award className="w-4 h-4" /> {cs.clientType}
            </span>
            <h1 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">{cs.title}</h1>
            <p className="text-white/50 text-xl font-light leading-relaxed mb-8">{cs.summary || cs.overview}</p>
            {cs.live && cs.live.length > 0 && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                {cs.live.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" className="px-6 py-3.5 text-[10px] tracking-widest gap-2">
                      <Globe className="w-4 h-4 shrink-0" /> {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </Button>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/5 relative group bg-black"
          >
            <img src={cs.image} alt={`${cs.title} case study`} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </header>

      {/* Results metrics */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cs.results.map((r, i) => (
            <motion.div key={r.metric} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <GlassCard className="text-center">
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-4">{r.metric}</div>
                <div className="text-2xl md:text-3xl font-instrument italic text-red-500 mb-3 leading-tight">{r.after}</div>
                <div className="text-white/30 text-xs font-light">from: {r.before}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Narrative sections */}
      <section className="px-6 py-12 max-w-5xl mx-auto space-y-12">
        {[
          { h: 'Overview', body: cs.overview },
          { h: 'The challenge', body: cs.problem },
          { h: 'Baseline', body: cs.baseline },
          { h: 'Strategy', body: cs.strategy || cs.solution },
        ].filter((s) => s.body).map((s) => (
          <div key={s.h}>
            <h2 className="text-2xl md:text-4xl text-white font-instrument tracking-tighter mb-4">{s.h}</h2>
            <p className="text-white/50 text-lg font-light leading-relaxed">{s.body}</p>
          </div>
        ))}

        {cs.implementation && cs.implementation.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-4xl text-white font-instrument tracking-tighter mb-6">Implementation</h2>
            <div className="space-y-4">
              {cs.implementation.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 liquid-glass rounded-3xl border border-white/5"
                >
                  <CheckCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-white/70 font-light">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl text-white font-instrument tracking-tighter mb-3">Timeline</h2>
            <p className="text-white/50 font-light">{cs.timeline}</p>
          </div>
          {cs.caveats && (
            <div>
              <h2 className="text-xl text-white font-instrument tracking-tighter mb-3">Context &amp; caveats</h2>
              <p className="text-white/40 text-sm font-light leading-relaxed">{cs.caveats}</p>
            </div>
          )}
        </div>

        {relatedServices.length > 0 && (
          <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4 items-center">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Services used:</span>
            {relatedServices.map((svc) => (
              <Link key={svc.slug} to={`/services/${svc.slug}`} className="text-red-500 text-xs uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all flex items-center gap-1">
                {svc.h1.replace(/ —.*$/, '')} <ArrowUpRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        )}
      </section>

      <RelatedLinks links={relatedLinks} />

      {/* CTA */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="liquid-glass rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center relative group overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
          <h2 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument mb-12">
            Ready for similar <span className="text-white/20">results?</span>
          </h2>
          <Button variant="primary" className="px-16 py-6 text-xs tracking-[0.2em]" onClick={() => window.open(getAuditCalendarUrl(), '_blank')}>
            START YOUR BUILD
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyDetail;
