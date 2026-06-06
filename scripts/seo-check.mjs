// Task 20 — Pre-deployment SEO validation. Runs against the built dist/ output.
// Usage: npm run seo:check (run after `npm run build`).
// Exits non-zero on serious errors; prints warnings for non-critical issues and
// writes a human-readable report to dist/seo-report.md (Task 19 build report).

import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { requiredSchemaByUrl } from '../src/lib/seoQaStatus.js';

const distDir = path.resolve('dist');
const SITE_URL = 'https://tageasy.org';

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

const priorityPages = [
  '/', '/services', '/ai-automation', '/free-audit', '/contact', '/about',
  '/industries', '/case-studies', '/case-studies/maatritva', '/blog', '/glossary', '/faqs',
];

const fileFor = (route) => (route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`);
const canonicalFor = (route) => (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}/`);

// Collect all JSON-LD @type values found in an HTML string.
const schemaTypes = (html) => {
  const types = new Set();
  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  for (const block of blocks) {
    const json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    let parsed;
    try { parsed = JSON.parse(json); } catch { err(`Invalid JSON-LD found in a page (could not parse).`); continue; }
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

const canonicals = new Map();

const checkPage = async (route) => {
  const html = await read(fileFor(route));
  if (!html) { err(`Missing prerendered HTML for ${route}`); return; }

  if (!/<title>[^<]+<\/title>/.test(html)) err(`${route}: missing <title>`);
  else pass(`${route}: title present`);

  if (!/<meta name="description" content="[^"]+"/.test(html)) err(`${route}: missing meta description`);
  else pass(`${route}: meta description present`);

  const canMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canMatch) err(`${route}: missing canonical`);
  else {
    const can = canMatch[1];
    if (can.includes('?') || can.includes('#')) err(`${route}: canonical contains query/fragment (${can})`);
    if (can !== canonicalFor(route)) warn(`${route}: canonical ${can} != expected ${canonicalFor(route)}`);
    canonicals.set(can, (canonicals.get(can) || 0) + 1);
  }

  if (!/<meta property="og:image" content="[^"]+"/.test(html)) err(`${route}: missing og:image`);

  const types = schemaTypes(html);
  const required = requiredSchemaByUrl[route] || [];
  const missing = required.filter((t) => !types.has(t));
  if (missing.length) err(`${route}: missing required schema: ${missing.join(', ')}`);
  else if (required.length) pass(`${route}: required schema present (${required.join(', ')})`);
};

const run = async () => {
  for (const route of priorityPages) await checkPage(route);

  // Duplicate canonicals
  for (const [can, count] of canonicals) {
    if (count > 1) err(`Duplicate canonical used by ${count} pages: ${can}`);
  }

  // Sitemap
  const sitemap = await read('sitemap.xml');
  if (!sitemap) err('sitemap.xml is missing');
  else {
    if (!sitemap.includes('<urlset')) err('sitemap.xml is not valid XML (no <urlset>)');
    else pass('sitemap.xml present and well-formed');
    // No noindex page should appear in sitemap
    if (sitemap.includes(`${SITE_URL}/404`)) err('sitemap includes the 404 page');
    for (const [route] of [['/404']]) void route;
  }

  // Required root files
  for (const f of ['robots.txt', 'llms.txt', 'llms-full.txt', 'humans.txt', 'security.txt']) {
    if (await exists(f)) pass(`${f} present`);
    else err(`${f} is missing`);
  }

  // 404 handling
  if (await exists('404.html')) pass('404.html present');
  else err('404.html is missing');
  const redirects = await read('_redirects');
  if (redirects && /\/\*\s+\/404\.html\s+404/.test(redirects)) pass('_redirects serves 404 with HTTP 404');
  else warn('_redirects does not appear to map unknown routes to a 404 status');

  // IndexNow key
  if (await exists('8f4e2a9c7b1d4f6e8a3c5b7d9e1f2a4c.txt')) pass('IndexNow key file present');
  else warn('IndexNow key file is missing');

  // Report
  const report = `# SEO Validation Report

Generated: ${new Date().toISOString()}

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
