// Phase 2 · Task 20 — Monthly SEO/GEO report generator.
// Pulls real numbers from the code/data + the built dist/ output and writes a
// stakeholder-friendly summary to dist/monthly-seo-geo-report.md (also printed,
// with a short copy/paste block for WhatsApp/email). Run: npm run seo:report
//   (run `npm run build` first so dist/ reflects the latest output).

import { readFile, writeFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pages } from './pages.mjs';
import { faqs } from '../src/lib/faqData.js';
import { glossaryTerms } from '../src/lib/glossaryData.js';
import { getIndexablePosts } from '../src/lib/blogData.js';
import { getPublishedCaseStudies } from '../src/lib/caseStudyData.js';
import { serviceDetailPages } from '../src/lib/servicesData.js';
import { getIndexableLocations } from '../src/lib/locationsData.js';

const distDir = path.resolve('dist');
const publicDir = path.resolve('public');
const srcDir = path.resolve('src');

const existsIn = async (dir, p) => {
  try { await access(path.join(dir, p)); return true; } catch { return false; }
};
const readIn = async (dir, p) => {
  try { return await readFile(path.join(dir, p), 'utf8'); } catch { return null; }
};

const fileFor = (route) => (route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`);

const run = async () => {
  const indexable = pages.filter((p) => !p.noindex);
  const noindex = pages.filter((p) => p.noindex);

  // Sitemap URL count — sum of all URL sitemaps under /sitemaps/ (excl. images).
  let sitemap = null;
  let sitemapUrls = 0;
  try {
    const childXmls = (await readdir(path.join(distDir, 'sitemaps')))
      .filter((f) => f.endsWith('.xml') && f !== 'images.xml');
    for (const f of childXmls) {
      const xml = await readIn(distDir, `sitemaps/${f}`);
      if (xml) { sitemap = xml; sitemapUrls += (xml.match(/<loc>/g) || []).length; }
    }
  } catch { /* dist not built */ }

  // Schema coverage across prerendered indexable pages.
  let withSchema = 0;
  let checkedPages = 0;
  for (const page of indexable) {
    const html = await readIn(distDir, fileFor(page.path));
    if (html == null) continue;
    checkedPages += 1;
    if (/application\/ld\+json/.test(html)) withSchema += 1;
  }
  const schemaCoverage = checkedPages ? Math.round((withSchema / checkedPages) * 100) : 0;

  // OG image count
  let ogCount = 0;
  try { ogCount = (await readdir(path.join(distDir, 'og'))).filter((f) => f.endsWith('.svg')).length; } catch { ogCount = 0; }

  // Conversion tracking — confirm the key GA4 events exist in analytics.js.
  const analytics = await readIn(srcDir, 'lib/analytics.js');
  const expectedEvents = ['generate_lead', 'free_audit_submit', 'whatsapp_click', 'service_inquiry_submit', 'conversion', 'spam_blocked'];
  const presentEvents = analytics ? expectedEvents.filter((e) => analytics.includes(e)) : [];

  // AI/GEO files (prefer dist; fall back to public).
  const geoFiles = ['robots.txt', 'llms.txt', 'llms-full.txt', 'humans.txt', 'security.txt', 'sitemap.xml'];
  const geoStatus = [];
  for (const f of geoFiles) {
    const present = (await existsIn(distDir, f)) || (await existsIn(publicDir, f));
    geoStatus.push({ f, present });
  }

  // SEO check result (parse dist/seo-report.md if present).
  const seoReport = await readIn(distDir, 'seo-report.md');
  let seoLine = 'Not run yet — run `npm run seo:check`.';
  if (seoReport) {
    const e = (seoReport.match(/Errors:\s*(\d+)/) || [])[1];
    const w = (seoReport.match(/Warnings:\s*(\d+)/) || [])[1];
    const p = (seoReport.match(/Passes:\s*(\d+)/) || [])[1];
    seoLine = `${p || '?'} passed, ${w || '?'} warnings, ${e || '0'} errors`;
  }

  const built = sitemap ? 'yes' : 'no (run `npm run build`)';
  const date = new Date().toISOString().split('T')[0];

  const report = `# Tag Easy — Monthly SEO / GEO Report

**Date:** ${date}
**Built (dist/ present):** ${built}

## Site at a glance

| Metric | Value |
| --- | --- |
| Total routes | ${pages.length} |
| Indexable pages | ${indexable.length} |
| Noindex pages | ${noindex.length} |
| URLs in sitemap.xml | ${sitemapUrls} |
| Service pages | ${serviceDetailPages.length} |
| Location pages | ${getIndexableLocations().length} |
| Published case studies | ${getPublishedCaseStudies().length} |
| Blog articles (indexable) | ${getIndexablePosts().length} |
| Glossary terms | ${glossaryTerms.length} |
| FAQs | ${faqs.length} |
| OG images generated | ${ogCount} |
| Schema coverage (indexable) | ${schemaCoverage}% (${withSchema}/${checkedPages}) |

## Quality checks

- **SEO check:** ${seoLine}
- **Broken links:** run \`npm run links:check\` (CI gate)
- **Conversion tracking events present:** ${presentEvents.length}/${expectedEvents.length} — ${presentEvents.join(', ') || 'none found'}

## AI / GEO files

${geoStatus.map((g) => `- ${g.present ? '✅' : '❌'} ${g.f}`).join('\n')}

## Copy/paste summary (WhatsApp / email)

> Tag Easy SEO/GEO snapshot (${date}): ${indexable.length} indexable pages, ${sitemapUrls} in sitemap, ${serviceDetailPages.length} service pages, ${getIndexableLocations().length} location pages, ${getPublishedCaseStudies().length} case study, ${getIndexablePosts().length} blog posts, ${glossaryTerms.length} glossary terms, ${faqs.length} FAQs. Schema on ${schemaCoverage}% of pages. SEO check: ${seoLine}. Conversion events live: ${presentEvents.length}/${expectedEvents.length}.
`;

  await writeFile(path.join(distDir, 'monthly-seo-geo-report.md'), report).catch(async () => {
    // If dist/ doesn't exist yet, write into the project root instead.
    await writeFile(path.resolve('monthly-seo-geo-report.md'), report);
  });

  console.log(report);
  console.log('\nReport written to dist/monthly-seo-geo-report.md');
};

run();
