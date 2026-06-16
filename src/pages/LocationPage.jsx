// Phase 2 · Task 2 — Location landing page (/locations/<slug>).
// Genuine local context, NAP block matching schema, services offered, internal
// links to service + contact pages, LocalBusiness + FAQ schema.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import Breadcrumbs from '../components/Breadcrumbs';
import LeadForm from '../components/LeadForm';
import RelatedLinks from '../components/RelatedLinks';
import NotFound from './NotFound';
import { getLocation, NAP } from '../lib/locationsData';
import { getServiceDetail } from '../lib/servicesData';
import { getFaqsByCategories } from '../lib/faqData';
import { getRelatedLinks } from '../lib/internalLinks';
import { organizationSchema, buildLocationSchema } from '../lib/seoSchema';

const SectionContainer = ({ children, className }) => (
  <section className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-12 md:py-20', className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const LocationPage = () => {
  const { slug } = useParams();
  const loc = getLocation(slug);

  if (!loc) return <NotFound />;

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: loc.name, path: `/locations/${loc.slug}` },
  ];
  const faqs = getFaqsByCategories(loc.faqCategories || []);
  const services = (loc.services || []).map(getServiceDetail).filter(Boolean);
  const relatedLinks = getRelatedLinks({
    currentPageType: 'location',
    serviceSlugs: loc.services,
    faqCategories: loc.faqCategories,
    caseStudySlugs: loc.relatedCaseStudies,
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, ...buildLocationSchema(loc, faqs)['@graph']],
  };

  // A simple, key-less Google Maps place embed scoped to the area.
  const mapQuery = encodeURIComponent(`${loc.name}, ${loc.region || loc.country}`);

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={loc.title}
        description={loc.metaDescription}
        path={`/locations/${loc.slug}`}
        image={`https://tageasy.org/og/locations-${loc.slug}.svg`}
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      {/* Hero */}
      <SectionContainer className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> {loc.name}, {loc.region || loc.country}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">
              {loc.heading}
            </h1>
            <p className="text-white/50 text-xl font-light leading-relaxed mb-8">{loc.intro}</p>
            <div className="space-y-4 text-white/40 text-base font-light leading-relaxed">
              {loc.context.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <LeadForm
              heading={`Talk to Tag Easy in ${loc.name}`}
              subheading="Tell us about your business and we will reply within 24 hours."
              fields={['name', 'email', 'phone', 'website', 'message']}
              required={['name', 'email']}
              source={`location_${loc.slug}`}
              submitLabel="Request a Local Audit"
              thankYouPath="/thank-you"
            />
          </motion.div>
        </div>
      </SectionContainer>

      {/* Services available here */}
      {services.length > 0 && (
        <SectionContainer>
          <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-none mb-10">
            Services available in {loc.name}
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
        </SectionContainer>
      )}

      {/* NAP + map + contact CTA */}
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
            <h2 className="text-2xl md:text-3xl text-white font-instrument tracking-tighter mb-6">Contact Tag Easy</h2>
            <address className="not-italic space-y-4 text-white/60 text-sm font-light">
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <span>{NAP.name} ({NAP.legalName})<br />{NAP.addressLocality}, {NAP.addressRegion}, {NAP.country}</span></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-red-500 shrink-0" /> <a href={NAP.phoneHref} className="hover:text-white transition-colors">{NAP.phone}</a></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-red-500 shrink-0" /> <a href={`mailto:${NAP.email}`} className="hover:text-white transition-colors break-all">{NAP.email}</a></div>
              <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-red-500 shrink-0" /> <span>{NAP.hours}</span></div>
            </address>
            <div className="mt-6 pt-6 border-t border-white/5">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-3">Serving</span>
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

      <FAQ faqs={faqs} title={`Working with Tag Easy in ${loc.name}`} subtitle="Local SEO, profiles, and how we work." />

      <RelatedLinks links={relatedLinks} />
    </main>
  );
};

export default LocationPage;
