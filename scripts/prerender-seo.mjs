// Per-route SEO prerender. Generates a static index.html for every route with
// route-specific <title>, meta, canonical, OG tags, JSON-LD, and a crawlable
// <noscript> body, then writes sitemap.xml and a branded OG image per page.
// Page definitions live in scripts/pages.mjs (shared with the OG generator).

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pages, navLinks, siteUrl } from './pages.mjs';
import { renderOgSvg, ogKeyForPath } from './ogImage.mjs';

const defaultImage = `${siteUrl}/logo.jpg`;
const buildDate = new Date().toISOString().split('T')[0];
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const ogDir = path.join(distDir, 'og');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const canonicalFor = (routePath) =>
  routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}/`;

const buildHead = (page) => {
  const canonical = canonicalFor(page.path);
  const image = page.image || defaultImage;
  const robots = page.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large';
  const schema = page.schema || {
    '@context': 'https://schema.org', '@type': 'WebPage', name: page.title,
    description: page.description, url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'Tag Easy', url: siteUrl },
  };

  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    '<meta property="og:site_name" content="Tag Easy" />',
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="${page.ogType || 'website'}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
  ].join('\n    ');
};

const buildNoscript = (page) => `
    <noscript>
      <main>
        <h1>${escapeHtml(page.title)}</h1>
        ${(page.content || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n        ')}
        <nav>
          ${navLinks.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join('\n          ')}
        </nav>
      </main>
    </noscript>`;

const stripGeneratedHead = (html) =>
  html
    .replace(/\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[\s\S]*?>/g, '')
    .replace(/\s*<meta name="robots"[\s\S]*?>/g, '')
    .replace(/\s*<link rel="canonical"[\s\S]*?>/g, '')
    .replace(/\s*<meta property="og:[\s\S]*?>/g, '')
    .replace(/\s*<meta name="twitter:[\s\S]*?>/g, '')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace(/\s*<noscript>[\s\S]*?<\/noscript>/g, '');

const renderPage = (template, page) => {
  const cleanTemplate = stripGeneratedHead(template);
  return cleanTemplate
    .replace('</head>', `    ${buildHead(page)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>${buildNoscript(page)}`);
};

const writeRoute = async (page, html) => {
  if (page.path === '/') {
    await writeFile(indexPath, html);
    return;
  }
  const routeDir = path.join(distDir, page.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html);
};

// --- OG images (Task 15) — one branded SVG per page -----------------------

const writeOgImages = async () => {
  await mkdir(ogDir, { recursive: true });
  await Promise.all(
    pages.map((page) => {
      const key = ogKeyForPath(page.path);
      const svg = renderOgSvg({ title: page.title, category: page.category });
      return writeFile(path.join(ogDir, `${key}.svg`), svg);
    })
  );
  return pages.length;
};

// --- Sitemap — only indexable canonical URLs ------------------------------

const buildSitemap = () => {
  const urls = pages
    .filter((page) => !page.noindex)
    .map((page) => `  <url>
    <loc>${canonicalFor(page.path)}</loc>
    <lastmod>${page.lastmod || buildDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

// --- Run ------------------------------------------------------------------

const template = await readFile(indexPath, 'utf8');

await Promise.all(pages.map((page) => writeRoute(page, renderPage(template, page))));

// Real 404 page served with HTTP 404 via _redirects (`/* /404.html 404`).
const notFoundPage = {
  path: '/404',
  title: 'Page Not Found | Tag Easy',
  description: 'The page you are looking for could not be found.',
  noindex: true,
  image: `${siteUrl}/og/home.svg`,
  content: ['The page you are looking for could not be found. Return to the Tag Easy homepage.'],
};
await writeFile(path.join(distDir, '404.html'), renderPage(template, notFoundPage));

const ogCount = await writeOgImages();
await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap());

console.log(`Prerendered SEO HTML for ${pages.length} routes (+ 404.html). Generated ${ogCount} OG images.`);
