// Task 4 — Visible breadcrumbs. The matching BreadcrumbList schema is composed
// into each page's SEO graph (buildBreadcrumbSchema) so it is in the prerendered
// HTML. items: [{ name, path }]; the last item is the current page (no link).

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ items = [], className = '' }) => {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className={`max-w-7xl mx-auto px-6 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-white/60">{item.name}</span>
              ) : (
                <Link to={item.path} className="hover:text-red-500 transition-colors">
                  {item.name}
                </Link>
              )}
              {!isLast && <ChevronRight className="w-3 h-3 text-white/20" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
