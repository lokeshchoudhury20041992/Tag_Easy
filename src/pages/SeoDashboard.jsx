// Task 19 — Private SEO/GEO QA dashboard.
// Only mounted when VITE_ENABLE_SEO_DASHBOARD === 'true'. Always noindex. Shows
// a table of page-level SEO readiness so missing items are obvious at a glance.

import React from 'react';
import { Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { seoQaStatus, requiredSchemaByUrl } from '../lib/seoQaStatus';

const enabled = import.meta.env.VITE_ENABLE_SEO_DASHBOARD === 'true';

const Cell = ({ ok }) => (
  <span className={ok ? 'text-green-400' : 'text-red-500'}>{ok ? '✓' : '✗'}</span>
);

const SeoDashboard = () => {
  if (!enabled) return <Navigate to="/404" replace />;

  return (
    <main className="bg-black min-h-screen pt-32 pb-24 px-4 md:px-6 text-white">
      <SEO title="SEO QA Dashboard" description="Internal SEO readiness dashboard." path="/seo-dashboard" noindex />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-instrument tracking-tight mb-2">SEO / GEO QA Dashboard</h1>
        <p className="text-white/40 text-sm mb-10">Internal only · not indexed</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-white/40 text-[10px] uppercase tracking-widest border-b border-white/10">
                <th className="py-3 pr-4">URL</th>
                <th className="py-3 px-3">Title</th>
                <th className="py-3 px-3">Desc</th>
                <th className="py-3 px-3">Canonical</th>
                <th className="py-3 px-3">Index</th>
                <th className="py-3 px-3">Sitemap</th>
                <th className="py-3 px-3">OG</th>
                <th className="py-3 px-3">FAQs</th>
                <th className="py-3 px-3">Schema</th>
                <th className="py-3 px-3">Missing required</th>
              </tr>
            </thead>
            <tbody>
              {seoQaStatus.map((row) => {
                const required = requiredSchemaByUrl[row.url] || [];
                const missing = required.filter((r) => !row.schema.includes(r));
                return (
                  <tr key={row.url} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-xs text-white/70">{row.url}</td>
                    <td className="py-3 px-3"><Cell ok={row.title} /></td>
                    <td className="py-3 px-3"><Cell ok={row.description} /></td>
                    <td className="py-3 px-3"><Cell ok={row.canonical} /></td>
                    <td className="py-3 px-3"><Cell ok={row.indexable} /></td>
                    <td className="py-3 px-3"><Cell ok={row.inSitemap} /></td>
                    <td className="py-3 px-3"><Cell ok={row.ogImage} /></td>
                    <td className="py-3 px-3 text-white/60">{row.faqCount}</td>
                    <td className="py-3 px-3 text-white/50 text-xs">{row.schema.join(', ') || '—'}</td>
                    <td className="py-3 px-3 text-xs">{missing.length ? <span className="text-red-500">{missing.join(', ')}</span> : <span className="text-green-400">none</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default SeoDashboard;
