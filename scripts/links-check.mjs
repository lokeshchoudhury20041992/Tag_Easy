// Phase 2 · Task 19 — Internal link & anchor checker.
// Validates every internal link the site can produce — navigation, footer,
// service/location/case-study/blog links, glossary anchors, related-link data,
// and sitemap URLs — against the set of real, prerendered routes. CI-friendly:
// exits non-zero when a link points nowhere. Run with: npm run links:check
//   (sitemap validation only runs if dist/ has been built).

import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { pages } from './pages.mjs';
import { serviceDetailPages } from '../src/lib/servicesData.js';
import { locations } from '../src/lib/locationsData.js';
import { caseStudies, getPublishedCaseStudies } from '../src/lib/caseStudyData.js';
import { getIndexablePosts, getRedirectMap } from '../src/lib/blogData.js';
import { glossaryTerms } from '../src/lib/glossaryData.js';
import { faqCategories } from '../src/lib/faqData.js';
import { getRelatedLinks } from '../src/lib/internalLinks.js';

const SITE_URL = 'https://tageasy.org';
const srcDir = path.resolve('src');
const distDir = path.resolve('dist');

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// --- Build the universe of valid targets ---------------------------------

const validRoutes = new Set(pages.map((p) => p.path));
validRoutes.add('/');
validRoutes.add('/seo-dashboard'); // SPA-only shell route
validRoutes.add('/404'); // real 404.html (served via _redirects), used by invalid-slug redirects
const staticFiles = new Set(['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt', '/humans.txt']);
const glossarySlugs = new Set(glossaryTerms.map((t) => t.slug));
const serviceSlugs = new Set(serviceDetailPages.map((s) => s.slug));
const publishedCsSlugs = new Set(getPublishedCaseStudies().map((c) => c.slug));
const validFaqCategories = new Set(faqCategories);
const redirectMap = getRedirectMap();

const norm = (route) => (route === '/' ? '/' : route.replace(/\/+$/, ''));

const isValidTarget = (raw) => {
  const [basePart, anchor] = raw.split('#');
  const base = norm(basePart || '/');
  // Glossary anchors must point at a real term.
  if (anchor && base === '/glossary' && !glossarySlugs.has(anchor)) {
    return { ok: false, reason: `glossary anchor #${anchor} does not exist` };
  }
  if (!basePart) return { ok: true }; // pure in-page anchor
  if (validRoutes.has(base)) return { ok: true };
  if (staticFiles.has(basePart) || staticFiles.has(base)) return { ok: true };
  return { ok: false, reason: 'no matching route' };
};

// --- 1) Data integrity: related references resolve to real targets --------

const checkDataIntegrity = () => {
  for (const svc of serviceDetailPages) {
    for (const rel of svc.relatedServices || []) {
      if (!serviceSlugs.has(rel)) err(`servicesData: ${svc.slug}.relatedServices → unknown service "${rel}"`);
    }
    for (const g of svc.glossarySlugs || []) {
      if (!glossarySlugs.has(g)) err(`servicesData: ${svc.slug}.glossarySlugs → unknown glossary term "${g}"`);
    }
    for (const cs of svc.relatedCaseStudies || []) {
      if (!publishedCsSlugs.has(cs)) warn(`servicesData: ${svc.slug}.relatedCaseStudies → "${cs}" is not a published case study`);
    }
    for (const cat of svc.faqCategories || []) {
      if (!validFaqCategories.has(cat)) err(`servicesData: ${svc.slug}.faqCategories → unknown FAQ category "${cat}"`);
    }
  }

  for (const loc of locations) {
    for (const s of loc.services || []) {
      if (!serviceSlugs.has(s)) err(`locationsData: ${loc.slug}.services → unknown service "${s}"`);
    }
    for (const cs of loc.relatedCaseStudies || []) {
      if (!publishedCsSlugs.has(cs)) warn(`locationsData: ${loc.slug}.relatedCaseStudies → "${cs}" is not a published case study`);
    }
    for (const cat of loc.faqCategories || []) {
      if (!validFaqCategories.has(cat)) err(`locationsData: ${loc.slug}.faqCategories → unknown FAQ category "${cat}"`);
    }
  }

  for (const cs of caseStudies) {
    for (const rel of cs.relatedServices || []) {
      if (!serviceSlugs.has(rel)) err(`caseStudyData: ${cs.slug}.relatedServices → unknown service "${rel}"`);
    }
  }

  // Every getRelatedLinks() href a service page can render must resolve.
  for (const svc of serviceDetailPages) {
    const links = getRelatedLinks({ currentPageType: 'service', serviceSlug: svc.slug });
    const all = [...links.services, ...links.glossary, ...links.faqs, ...links.blog, ...links.caseStudies];
    for (const item of all) {
      const res = isValidTarget(item.href);
      if (!res.ok) err(`internalLinks(${svc.slug}) → broken link ${item.href} (${res.reason})`);
    }
  }
};

// --- 2) Source scan: literal links in JSX ---------------------------------

const checkSourceLinks = async () => {
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { await walk(full); continue; }
      if (!/\.jsx?$/.test(e.name)) continue;
      const code = await readFile(full, 'utf8');
      const rel = path.relative(srcDir, full);
      // Capture to="/..." and href="/..." with NO template interpolation.
      const re = /(?:to|href)="(\/[^"`${}]*)"/g;
      let m;
      while ((m = re.exec(code))) {
        const target = m[1];
        if (target.startsWith('//')) continue; // protocol-relative external
        const res = isValidTarget(target);
        if (!res.ok) err(`${rel}: link to "${target}" — ${res.reason}`);
        // Redirected blog slugs → flag (use canonical instead).
        const base = norm(target.split('#')[0]);
        const blogSlug = base.startsWith('/blog/') ? base.slice('/blog/'.length) : null;
        if (blogSlug && redirectMap[blogSlug]) {
          warn(`${rel}: link to redirected blog URL ${target} → use /blog/${redirectMap[blogSlug]}`);
        }
      }
    }
  };
  await walk(srcDir);
};

// --- 3) Sitemap URLs resolve (only if dist built) -------------------------

const checkSitemap = async () => {
  let xml;
  try {
    await access(path.join(distDir, 'sitemap.xml'));
    xml = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
  } catch {
    warn('dist/sitemap.xml not found — run `npm run build` first to validate sitemap URLs');
    return;
  }
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const route = norm(loc.replace(SITE_URL, ''));
    if (!validRoutes.has(route || '/')) err(`sitemap.xml: <loc> ${loc} has no matching route`);
    // Sitemap should never list a noindex route.
    const page = pages.find((p) => p.path === (route || '/'));
    if (page && page.noindex) err(`sitemap.xml: lists noindex route ${route}`);
  }
};

// --- Run ------------------------------------------------------------------

const run = async () => {
  checkDataIntegrity();
  await checkSourceLinks();
  await checkSitemap();

  console.log(`\nLink check: ${errors.length} broken, ${warnings.length} warnings.`);
  if (warnings.length) console.log('\nWarnings:\n' + warnings.map((w) => '  ⚠️  ' + w).join('\n'));
  if (errors.length) {
    console.error('\nBroken links:\n' + errors.map((e) => '  ❌  ' + e).join('\n'));
    process.exit(1);
  }
  console.log('All internal links resolve. ✅');
};

run();
