// Phase 2 · Task 1 + 7 + 12 — Dedicated, indexable service detail page.
// One component renders every /services/<slug> page from serviceDetailPages.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, Target, CheckCircle2, Wrench, Clock, ArrowUpRight, Zap,
} from 'lucide-react';
import { cn, getWhatsAppUrlForPage } from '../lib/utils';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import Breadcrumbs from '../components/Breadcrumbs';
import LeadForm from '../components/LeadForm';
import RelatedLinks from '../components/RelatedLinks';
import TestimonialsSection from '../components/TestimonialsSection';
import NotFound from './NotFound';
import { getServiceDetail } from '../lib/servicesData';
import { getCaseStudy } from '../lib/caseStudyData';
import { getFaqsByCategories } from '../lib/faqData';
import { getRelatedLinks } from '../lib/internalLinks';
import {
  organizationSchema,
  buildServiceDetailSchema,
} from '../lib/seoSchema';
import { trackWhatsAppClick } from '../lib/analytics';

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-12 md:py-20', className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const ServiceDetail = () => {
  const { slug } = useParams();
  const svc = getServiceDetail(slug);

  if (!svc) return <NotFound />;

  const shortName = svc.h1.replace(/ —.*$/, '');
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: shortName, path: `/services/${svc.slug}` },
  ];
  const faqs = getFaqsByCategories(svc.faqCategories || []);
  const relatedCs = (svc.relatedCaseStudies || []).map(getCaseStudy).filter(Boolean);
  const relatedLinks = getRelatedLinks({ currentPageType: 'service', serviceSlug: svc.slug });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      ...buildServiceDetailSchema({
        name: shortName,
        description: svc.metaDescription,
        path: `/services/${svc.slug}`,
        faqs,
        breadcrumb: breadcrumbItems,
      })['@graph'],
    ],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={svc.metaTitle}
        description={svc.metaDescription}
        path={`/services/${svc.slug}`}
        image={`https://tageasy.org/og/services-${svc.slug}.svg`}
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      {/* Hero + lead form */}
      <SectionContainer className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 block">Service</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">
              {svc.h1}
            </h1>
            <p className="text-white/50 text-xl font-light leading-relaxed mb-6">{svc.tagline}</p>
            <p className="text-white/40 text-base font-light leading-relaxed mb-10 max-w-xl">{svc.intro}</p>

            <div className="flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrlForPage(shortName, 'service_page')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`service_${svc.slug}`)}
                className="bg-[#25D366] hover:bg-[#22c35e] text-white rounded-full px-7 py-3.5 text-[11px] uppercase tracking-widest font-bold transition-all active:scale-95"
              >
                WhatsApp Us
              </a>
              <Link
                to="/free-audit"
                className="liquid-glass text-white border border-white/10 hover:border-red-500/50 rounded-full px-7 py-3.5 text-[11px] uppercase tracking-widest font-bold transition-all"
              >
                Free Audit
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <LeadForm
              heading={svc.formHeading}
              subheading="Tell us a little about your goals and we will reply within 24 hours."
              fields={['name', 'email', 'phone', 'website', 'message']}
              required={['name', 'email']}
              serviceInterest={svc.slug}
              source={`service_${svc.slug}`}
              submitLabel={svc.formCta}
              thankYouPath="/service-inquiry/thank-you"
            />
          </motion.div>
        </div>
      </SectionContainer>

      {/* Audience + problems + deliverables */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Users className="w-3.5 h-3.5" /> Who it's for</div>
            <p className="text-white/50 text-sm font-light leading-relaxed mb-8">{svc.audience}</p>

            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Target className="w-3.5 h-3.5" /> Problems we solve</div>
            <ul className="space-y-2">
              {svc.problems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/50 text-sm font-light"><Zap className="w-3.5 h-3.5 text-red-500 mt-1 shrink-0" />{item}</li>
              ))}
            </ul>
          </div>

          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><CheckCircle2 className="w-3.5 h-3.5" /> What you get</div>
            <ul className="space-y-2 mb-8">
              {svc.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/50 text-sm font-light"><CheckCircle2 className="w-3.5 h-3.5 text-red-500 mt-1 shrink-0" />{item}</li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Wrench className="w-3.5 h-3.5" /> Tools</div>
            <div className="flex flex-wrap gap-2">
              {svc.tools.map((t) => (
                <span key={t} className="text-white/40 text-[11px] border border-white/10 rounded-full px-3 py-1">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Process + timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5">Process</div>
            <div className="flex flex-wrap gap-x-3 gap-y-3">
              {svc.process.map((step, idx) => (
                <span key={step} className="text-white/60 text-sm font-light flex items-center gap-2">
                  <span className="text-red-500 font-bold">0{idx + 1}</span>{step}
                  {idx < svc.process.length - 1 && <ArrowUpRight className="w-3 h-3 text-white/20" />}
                </span>
              ))}
            </div>
          </div>
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Clock className="w-3.5 h-3.5" /> Typical timeline</div>
            <p className="text-white/60 text-sm font-light">{svc.timeline}</p>
            <p className="text-white/30 text-[11px] font-light mt-3">Pricing factors: {svc.pricingFactors.join(' · ')}</p>
          </div>
        </div>

        {relatedCs.length > 0 && (
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5 mt-8 flex flex-wrap gap-4 items-center">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Proof:</span>
            {relatedCs.map((cs) => (
              <Link key={cs.slug} to={cs.path} className="text-red-500 text-xs uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all flex items-center gap-1">
                {cs.title} <ArrowUpRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>

      <TestimonialsSection service={svc.slug} title="What clients say" subtitle="Outcomes from this service." />

      <FAQ faqs={faqs} title="Common questions" subtitle={`What businesses ask about ${shortName}.`} />

      <RelatedLinks links={relatedLinks} />

      {/* CTA */}
      <SectionContainer className="pb-24">
        <div className="liquid-glass rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
          <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument mb-6 leading-tight">{svc.cta.heading}</h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto mb-10">{svc.cta.text}</p>
          <Link
            to="/free-audit"
            className="inline-block bg-white text-black rounded-full px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:scale-[1.03] transition-all"
          >
            Get a Free Audit
          </Link>
        </div>
      </SectionContainer>
    </main>
  );
};

export default ServiceDetail;
