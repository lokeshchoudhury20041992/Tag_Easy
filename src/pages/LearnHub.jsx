// Task — Topic-cluster hub pages.
//   /learn          → index (CollectionPage) of all topic hubs
//   /learn/<slug>   → a topic hub gathering guides, FAQs, glossary, services,
//                     and case studies for that topic (CollectionPage + ItemList)
// Built for internal linking and topical authority.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import Breadcrumbs from '../components/Breadcrumbs';
import ShortAnswer from '../components/ShortAnswer';
import NotFound from './NotFound';
import { getLearnHub, getLearnHubs } from '../lib/learnData';
import { getServiceDetail } from '../lib/servicesData';
import { getCaseStudy } from '../lib/caseStudyData';
import { glossaryTerms } from '../lib/glossaryData';
import { getFaqsByCategories } from '../lib/faqData';
import { getRelatedLinks } from '../lib/internalLinks';
import { organizationSchema, buildLearnHubSchema } from '../lib/seoSchema';

const SectionContainer = ({ children, className }) => (
  <section className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-12 md:py-16', className)}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const ColumnLinks = ({ title, items, render }) => {
  if (!items || !items.length) return null;
  return (
    <div>
      <h2 className="text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5">{title}</h2>
      <ul className="space-y-3">{items.map(render)}</ul>
    </div>
  );
};

const LearnIndex = () => {
  const hubs = getLearnHubs();
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      ...buildLearnHubSchema({
        name: 'Tag Easy Learn — Topic Hubs',
        description: 'Topic hubs gathering Tag Easy guides, FAQs, glossary terms, and services by subject.',
        path: '/learn',
        items: hubs.map((h) => ({ name: h.h1, url: `/learn/${h.slug}` })),
        breadcrumb: breadcrumbItems,
      })['@graph'],
    ],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title="Learn — SEO, Local SEO, AI Automation & More | Tag Easy"
        description="Topic hubs gathering Tag Easy guides, FAQs, glossary terms, and services on SEO, local SEO, AI automation, website development, Google Business Profile, and analytics."
        path="/learn"
        image="https://tageasy.org/og/learn.svg"
        schemaData={schema}
      />
      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />
      <header className="px-6 max-w-7xl mx-auto pt-6 pb-12">
        <h1 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-6">Learn</h1>
        <p className="text-white/40 text-lg font-light max-w-2xl">
          Everything Tag Easy publishes, organised by topic — guides, FAQs, definitions, and the services that put them into practice.
        </p>
      </header>
      <section className="px-6 max-w-7xl mx-auto pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubs.map((h) => (
          <Link
            key={h.slug}
            to={`/learn/${h.slug}`}
            className="liquid-glass rounded-[2rem] p-8 border border-white/5 hover:border-red-500/40 transition-all duration-500 group"
          >
            <BookOpen className="w-6 h-6 text-red-500 mb-5" />
            <h2 className="text-white text-2xl font-instrument tracking-tight mb-3 group-hover:translate-x-1 transition-transform">{h.h1}</h2>
            <p className="text-white/40 text-sm font-light mb-4">{h.tagline}</p>
            <span className="text-red-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
              Explore <ArrowUpRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
};

const LearnHub = () => {
  const { slug } = useParams();
  if (!slug) return <LearnIndex />;

  const hub = getLearnHub(slug);
  if (!hub) return <NotFound />;

  const path = `/learn/${hub.slug}`;
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
    { name: hub.name, path },
  ];

  const faqs = getFaqsByCategories(hub.faqCategories || []);
  const services = (hub.serviceSlugs || []).map(getServiceDetail).filter(Boolean);
  const glossary = (hub.glossarySlugs || [])
    .map((g) => glossaryTerms.find((t) => t.slug === g))
    .filter(Boolean);
  const caseStudies = (hub.relatedCaseStudies || []).map(getCaseStudy).filter(Boolean);
  const related = getRelatedLinks({
    currentPageType: 'page',
    serviceSlugs: hub.serviceSlugs,
    glossarySlugs: hub.glossarySlugs,
    faqCategories: hub.faqCategories,
    caseStudySlugs: hub.relatedCaseStudies,
    keywords: hub.blogKeywords,
    limit: 6,
  });
  const guides = related.blog;

  // ItemList for schema — the concrete resources this hub gathers.
  const itemListItems = [
    ...guides.map((g) => ({ name: g.title, url: g.href })),
    ...services.map((s) => ({ name: s.h1.replace(/ —.*$/, ''), url: `/services/${s.slug}` })),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      ...buildLearnHubSchema({
        name: hub.h1,
        description: hub.metaDescription,
        path,
        items: itemListItems,
        breadcrumb: breadcrumbItems,
      })['@graph'],
    ],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={hub.metaTitle}
        description={hub.metaDescription}
        path={path}
        image={`https://tageasy.org/og/learn-${hub.slug}.svg`}
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      <SectionContainer className="pt-6 pb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
          <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 block">Topic hub</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument leading-[0.95] mb-8">{hub.h1}</h1>
          <p className="text-white/50 text-xl font-light leading-relaxed mb-4">{hub.tagline}</p>
          <p className="text-white/40 text-base font-light leading-relaxed max-w-2xl">{hub.intro}</p>
        </motion.div>
      </SectionContainer>

      <ShortAnswer text={hub.shortAnswer} />

      {/* Guides + services + glossary + case studies */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <ColumnLinks
            title="Guides"
            items={guides}
            render={(g, i) => (
              <li key={`g-${i}`}>
                <Link to={g.href} className="text-white/60 hover:text-white text-sm font-light flex items-start gap-1 group transition-colors">
                  <span>{g.title}</span>
                  <ArrowUpRight className="w-3 h-3 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )}
          />
          <ColumnLinks
            title="Services"
            items={services}
            render={(s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-white/60 hover:text-white text-sm font-light flex items-center gap-1 group transition-colors">
                  {s.h1.replace(/ —.*$/, '')}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )}
          />
          <ColumnLinks
            title="Glossary"
            items={glossary}
            render={(t) => (
              <li key={t.slug}>
                <Link to={`/glossary#${t.slug}`} className="text-white/60 hover:text-white text-sm font-light flex items-center gap-1 group transition-colors">
                  {t.term}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )}
          />
          <ColumnLinks
            title="Case Studies"
            items={caseStudies}
            render={(c) => (
              <li key={c.slug}>
                <Link to={c.path} className="text-white/60 hover:text-white text-sm font-light flex items-center gap-1 group transition-colors">
                  {c.title}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )}
          />
        </div>
      </SectionContainer>

      <FAQ faqs={faqs} title={`${hub.name} — FAQs`} subtitle={`Answers to common ${hub.name.toLowerCase()} questions.`} />

      {/* CTA */}
      <SectionContainer className="pb-24">
        <div className="liquid-glass rounded-[3rem] p-12 md:p-16 text-center border border-white/5">
          <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument mb-6 leading-tight">Want this handled for you?</h2>
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto mb-10">Book a free audit and we will show you the highest-impact {hub.name.toLowerCase()} wins for your business.</p>
          <Link to="/free-audit" className="inline-block bg-white text-black rounded-full px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:scale-[1.03] transition-all">
            Get a Free Audit
          </Link>
        </div>
      </SectionContainer>
    </main>
  );
};

export default LearnHub;
