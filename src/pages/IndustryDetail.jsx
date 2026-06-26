// Task — Programmatic industry landing page (/industries/<slug>).
// One component renders every industry page from industriesData: SEO + Service/
// FAQ/Breadcrumb schema, a GEO short answer, industry problems, relevant Tag Easy
// services, a problem→solution table, case study links, FAQs, and a CTA form.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, ArrowUpRight, Zap } from 'lucide-react';
import { cn, getWhatsAppUrlForPage } from '../lib/utils';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import Breadcrumbs from '../components/Breadcrumbs';
import LeadForm from '../components/LeadForm';
import RelatedLinks from '../components/RelatedLinks';
import ShortAnswer from '../components/ShortAnswer';
import ExtractableTable from '../components/ExtractableTable';
import NotFound from './NotFound';
import { getIndustry } from '../lib/industriesData';
import { getServiceDetail } from '../lib/servicesData';
import { getCaseStudy } from '../lib/caseStudyData';
import { getFaqsByCategories } from '../lib/faqData';
import { getRelatedLinks } from '../lib/internalLinks';
import { organizationSchema, buildIndustrySchema } from '../lib/seoSchema';
import { trackWhatsAppClick } from '../lib/analytics';

const SectionContainer = ({ children, className }) => (
  <section className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-12 md:py-20', className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const IndustryDetail = () => {
  const { slug } = useParams();
  const industry = getIndustry(slug);

  if (!industry) return <NotFound />;

  const path = `/industries/${industry.slug}`;
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: industry.name, path },
  ];
  const faqs = getFaqsByCategories(industry.faqCategories || []);
  const services = (industry.services || []).map(getServiceDetail).filter(Boolean);
  const relatedCs = (industry.relatedCaseStudies || []).map(getCaseStudy).filter(Boolean);
  const relatedLinks = getRelatedLinks({
    currentPageType: 'page',
    serviceSlugs: industry.services,
    glossarySlugs: industry.glossarySlugs,
    faqCategories: industry.faqCategories,
    caseStudySlugs: industry.relatedCaseStudies,
    keywords: [industry.name, ...(industry.glossarySlugs || [])],
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      ...buildIndustrySchema({
        name: industry.h1,
        description: industry.metaDescription,
        path,
        audience: industry.audience,
        faqs,
        breadcrumb: breadcrumbItems,
      })['@graph'],
    ],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={industry.metaTitle}
        description={industry.metaDescription}
        path={path}
        image={`https://tageasy.org/og/industries-${industry.slug}.svg`}
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      {/* Hero + lead form */}
      <SectionContainer className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 block">Industry</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">
              {industry.h1}
            </h1>
            <p className="text-white/50 text-xl font-light leading-relaxed mb-6">{industry.tagline}</p>
            <p className="text-white/40 text-base font-light leading-relaxed mb-10 max-w-xl">{industry.intro}</p>

            <div className="flex flex-wrap gap-4">
              <a
                href={getWhatsAppUrlForPage(`${industry.name} digital marketing`, 'industry_page')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`industry_${industry.slug}`)}
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
              heading={industry.formHeading}
              subheading="Tell us about your business and we will reply within 24 hours."
              fields={['name', 'email', 'phone', 'website', 'message']}
              required={['name', 'email']}
              source={`industry_${industry.slug}`}
              submitLabel={industry.formCta}
              thankYouPath="/thank-you"
            />
          </motion.div>
        </div>
      </SectionContainer>

      <ShortAnswer text={industry.shortAnswer} />

      {/* Problems + services */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5"><Target className="w-3.5 h-3.5" /> Challenges in {industry.name}</div>
            <ul className="space-y-3">
              {industry.problems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/50 text-sm font-light"><Zap className="w-3.5 h-3.5 text-red-500 mt-1 shrink-0" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5"><CheckCircle2 className="w-3.5 h-3.5" /> How we help</div>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              We pair the right Tag Easy services to the way {industry.name.toLowerCase()} customers actually search and decide — and tie everything to lead tracking so you can see results.
            </p>
          </div>
        </div>

        {/* Problem → solution table */}
        <div className="mt-8">
          <ExtractableTable
            caption={`How Tag Easy solves common ${industry.name} problems`}
            columns={['Problem', 'How Tag Easy solves it']}
            rows={industry.problemSolution.map((r) => [r.problem, r.solution])}
          />
        </div>
      </SectionContainer>

      {/* Relevant services */}
      {services.length > 0 && (
        <SectionContainer>
          <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-none mb-10">
            Services for {industry.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                className="liquid-glass rounded-[2rem] p-8 border border-white/5 hover:border-red-500/40 transition-all duration-500 group"
              >
                <h3 className="text-white text-xl font-instrument tracking-tight mb-3 group-hover:translate-x-1 transition-transform">
                  {svc.h1.replace(/ —.*$/, '')}
                </h3>
                <p className="text-white/40 text-sm font-light mb-4">{svc.tagline}</p>
                <span className="text-red-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
                  Learn more <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
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
      )}

      <FAQ faqs={faqs} title={`${industry.name} — common questions`} subtitle={`What ${industry.name.toLowerCase()} businesses ask about digital growth.`} />

      <RelatedLinks links={relatedLinks} />

      {/* CTA */}
      <SectionContainer className="pb-24">
        <div className="liquid-glass rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
          <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument mb-6 leading-tight">{industry.cta.heading}</h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto mb-10">{industry.cta.text}</p>
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

export default IndustryDetail;
