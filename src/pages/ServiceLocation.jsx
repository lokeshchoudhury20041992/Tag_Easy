// Task — Service + location combination page (/services/<service>/<location>).
// High-intent local landing page rendered from serviceLocationData: localised
// Service + LocalBusiness/FAQ/Breadcrumb schema, a GEO short answer, local proof,
// service explanation, a problem→solution table, NAP block, map, FAQs, and CTA.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import Breadcrumbs from '../components/Breadcrumbs';
import LeadForm from '../components/LeadForm';
import RelatedLinks from '../components/RelatedLinks';
import ShortAnswer from '../components/ShortAnswer';
import ExtractableTable from '../components/ExtractableTable';
import NotFound from './NotFound';
import { getServiceLocation } from '../lib/serviceLocationData';
import { getServiceDetail } from '../lib/servicesData';
import { getLocation, NAP } from '../lib/locationsData';
import { getCaseStudy } from '../lib/caseStudyData';
import { getFaqsByCategories } from '../lib/faqData';
import { getRelatedLinks } from '../lib/internalLinks';
import { organizationSchema, buildServiceLocationSchema } from '../lib/seoSchema';

const SectionContainer = ({ children, className }) => (
  <section className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-12 md:py-20', className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const ServiceLocation = () => {
  const { slug, location } = useParams();
  const sl = getServiceLocation(slug, location);
  const svc = getServiceDetail(slug);
  const loc = getLocation(location);

  if (!sl || !svc || !loc) return <NotFound />;

  const path = `/services/${slug}/${location}`;
  const serviceShortName = svc.h1.replace(/ —.*$/, '');
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: serviceShortName, path: `/services/${slug}` },
    { name: loc.name, path },
  ];
  const faqs = getFaqsByCategories(sl.faqCategories || []);
  const relatedCs = (sl.relatedCaseStudies || []).map(getCaseStudy).filter(Boolean);
  const relatedLinks = getRelatedLinks({
    currentPageType: 'location',
    serviceSlug: slug,
    glossarySlugs: sl.glossarySlugs,
    faqCategories: sl.faqCategories,
    caseStudySlugs: sl.relatedCaseStudies,
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      ...buildServiceLocationSchema({
        name: `${serviceShortName} in ${loc.name}`,
        description: sl.metaDescription,
        path,
        areaServed: loc.areaServed,
        faqs,
        breadcrumb: breadcrumbItems,
      })['@graph'],
    ],
  };

  const mapQuery = encodeURIComponent(`${loc.name}, ${loc.region || loc.country}`);

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={sl.metaTitle}
        description={sl.metaDescription}
        path={path}
        image={`https://tageasy.org/og/services-${slug}-${location}.svg`}
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      {/* Hero + lead form */}
      <SectionContainer className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> {serviceShortName} · {loc.name}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">
              {sl.h1}
            </h1>
            <p className="text-white/50 text-xl font-light leading-relaxed mb-6">{sl.tagline}</p>
            <p className="text-white/40 text-base font-light leading-relaxed mb-4 max-w-xl">{sl.intro}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <LeadForm
              heading={sl.formHeading}
              subheading="Tell us about your business and we will reply within 24 hours."
              fields={['name', 'email', 'phone', 'website', 'message']}
              required={['name', 'email']}
              serviceInterest={slug}
              source={`service_${slug}_${location}`}
              submitLabel={sl.formCta}
              thankYouPath="/service-inquiry/thank-you"
            />
          </motion.div>
        </div>
      </SectionContainer>

      <ShortAnswer text={sl.shortAnswer} />

      {/* Local proof + service explanation */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5"><CheckCircle2 className="w-3.5 h-3.5" /> Local proof</div>
            <p className="text-white/50 text-sm font-light leading-relaxed">{sl.localProof}</p>
            {relatedCs.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center">
                <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Case study:</span>
                {relatedCs.map((cs) => (
                  <Link key={cs.slug} to={cs.path} className="text-red-500 text-xs uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all flex items-center gap-1">
                    {cs.title} <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5">What we do</div>
            <div className="space-y-4 text-white/50 text-sm font-light leading-relaxed">
              {sl.serviceExplanation.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <Link
              to={`/services/${slug}`}
              className="inline-flex items-center gap-2 mt-6 text-red-500 text-[11px] uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all"
            >
              Full {serviceShortName} details <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Problem → solution table */}
        <div className="mt-8">
          <ExtractableTable
            caption={`How Tag Easy delivers ${serviceShortName} in ${loc.name}`}
            columns={['Problem', 'How we solve it']}
            rows={sl.problemSolution.map((r) => [r.problem, r.solution])}
          />
        </div>
      </SectionContainer>

      {/* NAP + service area + map */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <h2 className="text-2xl md:text-3xl text-white font-instrument tracking-tighter mb-6">Tag Easy in {loc.name}</h2>
            <address className="not-italic space-y-4 text-white/60 text-sm font-light">
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <span>{NAP.name} ({NAP.legalName})<br />{NAP.addressLocality}, {NAP.addressRegion}, {NAP.country}</span></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-red-500 shrink-0" /> <a href={NAP.phoneHref} className="hover:text-white transition-colors">{NAP.phone}</a></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-red-500 shrink-0" /> <a href={`mailto:${NAP.email}`} className="hover:text-white transition-colors break-all">{NAP.email}</a></div>
              <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-red-500 shrink-0" /> <span>{NAP.hours}</span></div>
            </address>
            <div className="mt-6 pt-6 border-t border-white/5">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-3">Service area</span>
              <div className="flex flex-wrap gap-2">
                {loc.areaServed.map((a) => (
                  <span key={a} className="text-white/50 text-[11px] border border-white/10 rounded-full px-3 py-1">{a}</span>
                ))}
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 text-red-500 text-[11px] uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all"
            >
              Go to contact page <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="rounded-[2rem] overflow-hidden border border-white/5 min-h-[320px]">
            <iframe
              title={`Map of ${loc.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="w-full h-full min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </SectionContainer>

      <FAQ faqs={faqs} title={`${serviceShortName} in ${loc.name} — FAQs`} subtitle="What local businesses ask before they start." />

      <RelatedLinks links={relatedLinks} />
    </main>
  );
};

export default ServiceLocation;
