// Tasks 18/20 — Pre-deployment SEO validation against the built dist/ output.
// Usage: npm run seo:check (after `npm run build`).
// Exits non-zero on serious errors; prints warnings for non-critical issues and
// writes a human-readable report to dist/seo-report.md.

import { readFile, writeFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { requiredSchemaByUrl } from '../src/lib/seoQaStatus.js';
import { pages } from './pages.mjs';

const distDir = path.resolve('dist');
const srcDir = path.resolve('src');
const SITE_URL = 'https://tageasy.org';

// Routes that intentionally exist only as the SPA shell (no prerendered file).
const SPA_ONLY_ROUTES = new Set(['/seo-dashboard']);
// Static files that are valid internal link targets.
const STATIC_TARGETS = new Set(['/sitemap.xml', '/robots.txt', '/llms.txt']);

const errors = [];
const warnings = [];
const passes = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const pass = (m) => passes.push(m);

const exists = async (p) => {
  try { await access(path.join(distDir, p)); return true; } catch { return false; }
};
const read = async (p) => {
  try { return await readFile(path.join(distDir, p), 'utf8'); } catch { return null; }
};

const fileFor = (route) => (route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`);
const canonicalFor = (route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}/`);

// Required schema by route, with pattern fallbacks for the Phase-2 page types.
const requiredSchemaFor = (route) => {
  if (requiredSchemaByUrl[route]) return requiredSchemaByUrl[route];
  if (route.startsWith('/services/')) return ['Service', 'BreadcrumbList'];
  if (route.startsWith('/locations/')) return ['ProfessionalService', 'BreadcrumbList'];
  if (route.startsWith('/case-studies/') && route !== '/case-studies') return ['Article', 'BreadcrumbList'];
  return [];
};

// Collect all JSON-LD @type values found in an HTML string.
const schemaTypes = (html) => {
  const types = new Set();
  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  for (const block of blocks) {
    const json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    let parsed;
    try { parsed = JSON.parse(json); } catch { err('Invalid JSON-LD found in a page (could not parse).'); continue; }
    const visit = (node) => {
      if (Array.isArray(node)) return node.forEach(visit);
      if (node && typeof node === 'object') {
        if (node['@type']) [].concat(node['@type']).forEach((t) => types.add(t));
        if (node['@graph']) visit(node['@graph']);
        Object.values(node).forEach((v) => { if (v && typeof v === 'object') visit(v); });
      }
    };
    visit(parsed);
  }
  return types;
};

// Extract internal href targets (root-relative) from an HTML string.
const internalLinks = (html) => {
  const out = [];
  const re = /href="(\/[^"]*)"/g;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
};

const canonicals = new Map();
const linkTargets = new Set();
const prerenderedRoutes = new Set();

const checkPage = async (page) => {
  const route = page.path;
  const html = await read(fileFor(route));
  if (!html) { err(`Missing prerendered HTML for ${route}`); return; }
  prerenderedRoutes.add(route);

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) err(`${route}: missing <title>`);
  else {
    pass(`${route}: title present`);
    const len = titleMatch[1].length;
    if (len > 65) warn(`${route}: title is long (${len} chars) — may truncate in SERPs`);
    if (len < 15) warn(`${route}: title is very short (${len} chars)`);
  }

  // Meta description
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
  if (!descMatch) err(`${route}: missing meta description`);
  else {
    pass(`${route}: meta description present`);
    const len = descMatch[1].length;
    if (len > 165) warn(`${route}: meta description is long (${len} chars)`);
    if (len < 50) warn(`${route}: meta description is short (${len} chars)`);
  }

  // Robots matches indexability
  const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/);
  if (robotsMatch) {
    const isNoindex = /noindex/.test(robotsMatch[1]);
    if (page.noindex && !isNoindex) err(`${route}: expected noindex but robots is "${robotsMatch[1]}"`);
    if (!page.noindex && isNoindex) err(`${route}: unexpectedly noindex`);
  } else err(`${route}: missing robots meta`);

  // Canonical
  const canMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canMatch) err(`${route}: missing canonical`);
  else {
    const can = canMatch[1];
    if (can.includes('?') || can.includes('#')) err(`${route}: canonical contains query/fragment (${can})`);
    if (can !== canonicalFor(route)) warn(`${route}: canonical ${can} != expected ${canonicalFor(route)}`);
    canonicals.set(can, (canonicals.get(can) || 0) + 1);
  }

  // Exactly one H1 (in the crawlable <noscript> body)
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count === 0) err(`${route}: no <h1> in prerendered HTML`);
  else if (h1Count > 1) err(`${route}: ${h1Count} <h1> tags (should be exactly 1)`);

  // OG image present AND the referenced local file exists
  const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!ogMatch) err(`${route}: missing og:image`);
  else {
    const ogUrl = ogMatch[1];
    const local = ogUrl.replace(SITE_URL, '');
    if (local.startsWith('/og/') || local.startsWith('/')) {
      if (!(await exists(local.replace(/^\//, '')))) err(`${route}: og:image file missing in dist (${local})`);
    }
  }

  // Required schema
  const types = schemaTypes(html);
  const required = requiredSchemaFor(route);
  const missing = required.filter((t) => !types.has(t));
  if (missing.length) err(`${route}: missing required schema: ${missing.join(', ')}`);
  else if (required.length) pass(`${route}: required schema present (${required.join(', ')})`);

  // Gather internal links for the broken-link pass. Skip static assets
  // (favicon, CSS, JS, images) — those are files, not routes.
  for (const href of internalLinks(html)) {
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const lastSeg = clean.split('/').pop();
    if (lastSeg && lastSeg.includes('.')) continue; // has a file extension
    if (clean.startsWith('/assets/')) continue;
    linkTargets.add(clean);
  }
};

// Source-level alt-text scan (prerendered HTML has no <img>; React renders them).
const checkAltText = async () => {
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    let count = 0;
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) count += await walk(full);
      else if (/\.jsx?$/.test(e.name)) {
        const code = await readFile(full, 'utf8');
        const imgs = code.match(/<img\b[^>]*>/g) || [];
        for (const tag of imgs) {
          if (!/\balt\s*=/.test(tag)) {
            warn(`alt text missing on an <img> in ${path.relative(srcDir, full)}`);
            count += 1;
          }
        }
      }
    }
    return count;
  };
  const missing = await walk(srcDir);
  if (missing === 0) pass('all <img> tags in src have alt attributes');
};

const checkLinks = () => {
  const isValid = (target) => {
    if (target === '/') return true;
    const route = target.replace(/\/$/, '');
    if (SPA_ONLY_ROUTES.has(route)) return true;
    if (STATIC_TARGETS.has(target) || STATIC_TARGETS.has(route)) return true;
    if (prerenderedRoutes.has(route)) return true;
    if (prerenderedRoutes.has(`${route}`)) return true;
    return false;
  };
  let broken = 0;
  for (const target of linkTargets) {
    if (!isValid(target)) { err(`Broken internal link target: ${target}`); broken += 1; }
  }
  if (broken === 0) pass(`all ${linkTargets.size} internal link targets resolve`);
};

const run = async () => {
  for (const page of pages) await checkPage(page);

  // Orphan check: every indexable page must appear in the sitemap.
  const sitemap = await read('sitemap.xml');
  for (const page of pages) {
    if (page.noindex) continue;
    if (sitemap && !sitemap.includes(canonicalFor(page.path))) {
      warn(`Possible orphan: ${page.path} is indexable but not in sitemap.xml`);
    }
  }

  await checkAltText();
  checkLinks();

  // Duplicate canonicals
  for (const [can, count] of canonicals) {
    if (count > 1) err(`Duplicate canonical used by ${count} pages: ${can}`);
  }

  // Sitemap
  if (!sitemap) err('sitemap.xml is missing');
  else {
    if (!sitemap.includes('<urlset')) err('sitemap.xml is not valid XML (no <urlset>)');
    else pass('sitemap.xml present and well-formed');
    if (sitemap.includes(`${SITE_URL}/404`)) err('sitemap includes the 404 page');
    // No noindex page should appear in sitemap
    for (const page of pages) {
      if (page.noindex && sitemap.includes(canonicalFor(page.path))) {
        err(`sitemap includes noindex page ${page.path}`);
      }
    }
  }

  // Required root files
  for (const f of ['robots.txt', 'llms.txt', 'llms-full.txt', 'humans.txt', 'security.txt']) {
    if (await exists(f)) pass(`${f} present`);
    else err(`${f} is missing`);
  }

  // robots.txt references the sitemap
  const robots = await read('robots.txt');
  if (robots && robots.includes(`${SITE_URL}/sitemap.xml`)) pass('robots.txt references sitemap.xml');
  else if (robots) warn('robots.txt does not reference sitemap.xml');

  // 404 handling
  if (await exists('404.html')) pass('404.html present');
  else err('404.html is missing');
  const redirects = await read('_redirects');
  if (redirects && /\/\*\s+\/404\.html\s+404/.test(redirects)) pass('_redirects serves 404 with HTTP 404');
  else warn('_redirects does not appear to map unknown routes to a 404 status');

  // IndexNow key
  if (await exists('8f4e2a9c7b1d4f6e8a3c5b7d9e1f2a4c.txt')) pass('IndexNow key file present');
  else warn('IndexNow key file is missing');

  // OG images directory
  if (await exists('og')) pass('OG images directory present');
  else err('dist/og OG image directory is missing');

  // Report
  const report = `# SEO Validation Report

Generated: ${new Date().toISOString()}

- Pages checked: ${pages.length}
- Passes: ${passes.length}
- Warnings: ${warnings.length}
- Errors: ${errors.length}

## Errors
${errors.length ? errors.map((e) => `- ❌ ${e}`).join('\n') : '- none'}

## Warnings
${warnings.length ? warnings.map((w) => `- ⚠️ ${w}`).join('\n') : '- none'}

## Passes
${passes.map((p) => `- ✅ ${p}`).join('\n')}
`;
  await writeFile(path.join(distDir, 'seo-report.md'), report);

  console.log(`\nSEO check: ${passes.length} passed, ${warnings.length} warnings, ${errors.length} errors.`);
  console.log('Report written to dist/seo-report.md');
  if (warnings.length) console.log('\nWarnings:\n' + warnings.map((w) => '  ⚠️  ' + w).join('\n'));
  if (errors.length) {
    console.error('\nErrors:\n' + errors.map((e) => '  ❌  ' + e).join('\n'));
    process.exit(1);
  }
};

run();
