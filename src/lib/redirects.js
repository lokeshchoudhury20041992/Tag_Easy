// Task 25 — Central redirect management.
//
// One source of truth for site-wide path redirects (renamed/merged/legacy URLs)
// so old URLs keep their authority and never 404. Used to:
//   • generate host redirect rules appended to dist/_redirects at build time
//   • let links:check warn if an internal link points at a redirected `from`
//
// Blog-slug redirects are handled separately in blogData.js (canonicalSlug);
// this file is for non-blog path redirects.
//
// Entry shape:
//   { from: '/old-path', to: '/new-path', status: 301, reason: 'why it exists' }
//   - from:   exact root-relative path that should redirect (no query/hash)
//   - to:     destination path (root-relative) or absolute URL
//   - status: 301 (permanent, default) or 302 (temporary)
//   - reason: short human note for auditing

export const redirects = [
  // No live redirects yet. Add entries here as URLs change, e.g.:
  // { from: '/old-blog-url', to: '/blog/new-url', status: 301, reason: 'Merged duplicate blog' },
  // { from: '/seo', to: '/services/seo', status: 301, reason: 'Legacy short URL' },
];

// Map of from -> entry, for O(1) lookups (e.g. by links:check).
export const redirectByFrom = redirects.reduce((acc, r) => {
  acc[r.from] = r;
  return acc;
}, {});

export const getRedirect = (fromPath) => redirectByFrom[fromPath] || null;

// Netlify/static-host redirect rules ("/from  /to  status"), one per line.
export const toRedirectRules = () =>
  redirects.map((r) => `${r.from}    ${r.to}    ${r.status || 301}`).join('\n');
