// Phase 2 · Task 13 — User-visible HTML sitemap (/sitemap).
// Distinct from sitemap.xml. Groups every valid, canonical, indexable page so
// both users and crawlers can reach everything. Linked from the footer.

import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { organizationSchema, buildBreadcrumbSchema } from '../lib/seoSchema';
import { serviceDetailPages, getServiceDetail } from '../lib/servicesData';
import { getIndexableLocations, getLocation } from '../lib/locationsData';
import { getPublishedCaseStudies } from '../lib/caseStudyData';
import { getIndexablePosts } from '../lib/blogData';
import { glossaryTerms } from '../lib/glossaryData';
import { faqCategories } from '../lib/faqData';
import { getIndexableIndustries } from '../lib/industriesData';
import { getIndexableServiceLocations } from '../lib/serviceLocationData';
import { getComparisons } from '../lib/compareData';
import { getLearnHubs } from '../lib/learnData';
import { getIndexableAuthors } from '../lib/authors';

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Sitemap', path: '/sitemap' },
];

const sitemapSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, buildBreadcrumbSchema(breadcrumbItems)],
};

const Group = ({ title, links }) => (
  <div>
    <h2 className="text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5">{title}</h2>
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.href}>
          <Link to={l.href} className="text-white/60 hover:text-white text-sm font-light transition-colors">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const HtmlSitemap = () => {
  const mainPages = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'AI Automation', href: '/ai-automation' },
    { label: 'Industries', href: '/industries' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Learn', href: '/learn' },
    { label: 'Compare', href: '/compare' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact', href: '/contact' },
    { label: 'Free Audit', href: '/free-audit' },
    { label: 'Review Us', href: '/review-us' },
  ];

  const serviceLinks = serviceDetailPages.map((s) => ({
    label: s.h1.replace(/ —.*$/, ''),
    href: `/services/${s.slug}`,
  }));

  const serviceLocationLinks = getIndexableServiceLocations().map((sl) => {
    const svc = getServiceDetail(sl.service);
    const loc = getLocation(sl.location);
    return {
      label: `${svc.h1.replace(/ —.*$/, '')} — ${loc.name}`,
      href: `/services/${sl.service}/${sl.location}`,
    };
  });

  const locationLinks = getIndexableLocations().map((l) => ({
    label: `${l.name} (${l.type})`,
    href: `/locations/${l.slug}`,
  }));

  const industryLinks = getIndexableIndustries().map((i) => ({
    label: i.name,
    href: `/industries/${i.slug}`,
  }));

  const compareLinks = getComparisons().map((c) => ({ label: c.h1, href: `/compare/${c.slug}` }));

  const learnLinks = getLearnHubs().map((h) => ({ label: h.name, href: `/learn/${h.slug}` }));

  const authorLinks = getIndexableAuthors().map((a) => ({ label: a.name, href: `/authors/${a.id}` }));

  const caseStudyLinks = getPublishedCaseStudies().map((c) => ({ label: c.title, href: c.path }));

  const blogLinks = getIndexablePosts().map((p) => ({ label: p.title, href: `/blog/${p.slug}` }));

  const glossaryLinks = glossaryTerms.map((t) => ({ label: t.term, href: `/glossary#${t.slug}` }));

  const faqLinks = faqCategories.map((c) => ({ label: c, href: '/faqs' }));

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title="Sitemap | Tag Easy"
        description="Browse every page on the Tag Easy website — services, locations, case studies, blog articles, glossary terms, and FAQs."
        path="/sitemap"
        image="https://tageasy.org/og/sitemap.svg"
        schemaData={sitemapSchema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      <header className="px-6 max-w-7xl mx-auto pt-6 pb-12">
        <h1 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-6">Sitemap</h1>
        <p className="text-white/40 text-lg font-light max-w-2xl">
          Every page on tageasy.org, grouped for quick access. Looking for the machine-readable version?
          See the <a href="/sitemap.xml" className="text-red-500 hover:underline">sitemap index</a> (pages, blog, and images).
        </p>
      </header>

      <section className="px-6 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14">
          <Group title="Main Pages" links={mainPages} />
          <Group title="Services" links={serviceLinks} />
          <Group title="Local Services" links={serviceLocationLinks} />
          <Group title="Industries" links={industryLinks} />
          <Group title="Locations" links={locationLinks} />
          <Group title="Compare" links={compareLinks} />
          <Group title="Learn" links={learnLinks} />
          <Group title="Case Studies" links={caseStudyLinks} />
          <Group title="Blog" links={blogLinks} />
          <Group title="Authors" links={authorLinks} />
          <Group title="Glossary" links={glossaryLinks} />
          <Group title="FAQs" links={faqLinks} />
        </div>
      </section>
    </main>
  );
};

export default HtmlSitemap;
