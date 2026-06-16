// Phase 2 · Task 12 — Renders contextual internal links from getRelatedLinks().
// Groups: related services, glossary terms, FAQs, blog posts, case studies.
// Uses react-router <Link> for clean client navigation; hrefs are canonical
// route paths. Renders nothing if there is nothing to link to.

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Group = ({ title, items, render }) => {
  if (!items || !items.length) return null;
  return (
    <div>
      <h3 className="text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-5">{title}</h3>
      <ul className="space-y-3">{items.map(render)}</ul>
    </div>
  );
};

const linkItem = (item, i) => (
  <li key={`${item.href}-${i}`}>
    <Link
      to={item.href}
      className="text-white/60 hover:text-white text-sm font-light flex items-center gap-1 group transition-colors"
    >
      {item.label || item.title || item.question}
      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  </li>
);

const RelatedLinks = ({ links, title = 'Keep exploring', className = '' }) => {
  if (!links) return null;
  const { services = [], glossary = [], faqs = [], blog = [], caseStudies = [] } = links;
  const total = services.length + glossary.length + faqs.length + blog.length + caseStudies.length;
  if (total === 0) return null;

  return (
    <section className={`bg-black px-4 md:px-6 py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-none mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <Group title="Services" items={services} render={linkItem} />
          <Group title="Case Studies" items={caseStudies} render={linkItem} />
          <Group title="Guides" items={blog} render={linkItem} />
          <Group title="Glossary" items={glossary} render={linkItem} />
          <Group
            title="FAQs"
            items={faqs}
            render={(item, i) => (
              <li key={`faq-${i}`}>
                <Link
                  to={item.href}
                  className="text-white/60 hover:text-white text-sm font-light flex items-start gap-1 group transition-colors"
                >
                  <span>{item.question}</span>
                  <ArrowUpRight className="w-3 h-3 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
