import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  SITE_URL,
  ORG_ID,
  organizationSchema,
  localBusinessSchema,
  homepageSchema,
  buildPersonSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildOfferCatalogSchema,
  buildBlogPostingSchema,
  buildGlossarySchema,
} from '../src/lib/seoSchema.js';
import { teamMembers } from '../src/lib/teamData.js';
import { getIndexablePosts } from '../src/lib/blogData.js';
import { getAuthor } from '../src/lib/authors.js';
import { glossaryTerms } from '../src/lib/glossaryData.js';
import { faqs as allFaqs, getFaqsByCategory, getFaqsByCategories } from '../src/lib/faqData.js';
import { serviceCatalog } from '../src/lib/servicesData.js';
import { getCaseStudy } from '../src/lib/caseStudyData.js';

const siteUrl = SITE_URL;
const defaultImage = `${siteUrl}/logo.jpg`;
const buildDate = new Date().toISOString().split('T')[0];
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

const abs = (p) => (p && p.startsWith('http') ? p : `${siteUrl}${p || '/logo.jpg'}`);

// Compose a graph that always leads with the Organization for entity consistency.
const graph = (...nodes) => ({
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, ...nodes.flat().filter(Boolean)],
});

const crumbs = (items) => buildBreadcrumbSchema(items);

// --- Core pages -----------------------------------------------------------

const servicesFaqs = getFaqsByCategories([
  'SEO', 'AI Automation', 'Website Development', 'Paid Ads', 'Pricing & Timelines',
]);
const cs = getCaseStudy('maatritva');

const corePages = [
  {
    path: '/',
    title: 'Tag Easy | Revenue Driven Digital Engineering',
    description: 'Tag Easy scales revenue with AI automation, high-performance websites, Ads Hub systems, SEO, and data-driven digital engineering.',
    priority: '1.0', changefreq: 'daily', schema: homepageSchema,
    content: [
      'Tag Easy is a digital engineering company for brands that need growth, automation, and scalable digital systems.',
      'Services include AI automation, Ads Hub, website development, SEO, lead generation, performance marketing, and business intelligence.',
    ],
  },
  {
    path: '/ai-automation',
    title: 'AI Automation Services | Tag Easy',
    description: 'Tag Easy builds AI automation systems for ads, lead generation, SEO, CRM workflows, reporting, content pipelines, and custom AI agents.',
    priority: '0.9', changefreq: 'weekly',
    schema: graph(
      buildServiceSchema({ name: 'AI Automation Services', description: 'AI automation systems for ads, lead generation, SEO, CRM workflows, reporting, and custom AI agents.', path: '/ai-automation' })['@graph'],
      buildFaqSchema(getFaqsByCategory('AI Automation')),
      crumbs([{ name: 'Home', path: '/' }, { name: 'AI Automation', path: '/ai-automation' }]),
    ),
    content: [
      'AI Automation is a core Tag Easy service for automating ads, lead generation, SEO, CRM, reporting, content, and business workflows.',
      'We design connected systems that capture leads, qualify intent, update CRM records, notify sales teams, and refresh dashboards.',
    ],
  },
  {
    path: '/services',
    title: 'Our Services | Tag Easy',
    description: 'Tag Easy services: technical SEO, AI automation, high-performance website development, and Ads Hub management — with clear deliverables, process, and timelines.',
    priority: '0.9', changefreq: 'weekly',
    schema: graph(
      buildOfferCatalogSchema(serviceCatalog),
      buildFaqSchema(servicesFaqs),
      crumbs([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
    ),
    content: [
      'Tag Easy services cover technical SEO, AI automation, website development, and Ads Hub management.',
      'Each service lists who it is for, the problems it solves, concrete deliverables, the process, and a typical timeline.',
    ],
  },
  {
    path: '/industries',
    title: 'Industries | Tag Easy',
    description: 'Tag Easy builds specialized digital systems for healthcare, e-commerce, SaaS, fintech, real estate, education, travel, and analytics companies.',
    priority: '0.7', changefreq: 'weekly',
    schema: graph(crumbs([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }])),
    content: [
      'Tag Easy serves healthcare, e-commerce, fintech, SaaS, data analytics, real estate, education, travel, and hospitality brands.',
      'Each industry strategy is tailored around search visibility, technical infrastructure, lead generation, and conversion performance.',
    ],
  },
  {
    path: '/case-studies',
    title: 'Case Studies | Tag Easy',
    description: 'See Tag Easy case studies showing digital growth, SEO, Ads Hub performance, and engineering results for client brands.',
    priority: '0.8', changefreq: 'weekly',
    schema: graph(crumbs([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }])),
    content: [
      'Tag Easy case studies document digital growth systems, technical SEO wins, Ads Hub results, and engineering improvements.',
      'Featured work includes Maatritva IVF, a healthcare growth case study focused on regional dominance and high-intent inquiries.',
    ],
  },
  {
    path: '/case-studies/maatritva',
    title: 'Maatritva Fertility IVF Case Study | Tag Easy',
    description: 'Discover how Tag Easy scaled Maatritva Fertility IVF with multi-domain SEO, technical performance, and high-intent patient lead systems.',
    priority: '0.8', changefreq: 'monthly', image: abs(cs.image),
    schema: graph(
      {
        '@type': 'Article',
        '@id': `${siteUrl}${cs.path}/#article`,
        headline: `${cs.title} Case Study`,
        description: 'How Tag Easy scaled Maatritva Fertility IVF with multi-domain SEO, technical performance, and high-intent patient lead systems.',
        image: abs(cs.image),
        about: cs.clientType,
        author: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}${cs.path}/` },
      },
      crumbs([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }, { name: cs.title, path: cs.path }]),
    ),
    content: [
      cs.problem,
      cs.solution,
      `Result: ${cs.results.map((r) => `${r.metric} — ${r.after}`).join('; ')}. ${cs.caveats}`,
    ],
  },
  {
    path: '/about',
    title: 'About Us | Tag Easy',
    description: 'Learn about Tag Easy, the digital engineering team building AI automation, SEO, web systems, and growth infrastructure.',
    priority: '0.7', changefreq: 'monthly',
    schema: graph(crumbs([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])),
    content: [
      'Tag Easy is a digital engineering team focused on AI automation, SEO, Ads Hub, websites, and scalable growth systems.',
      'The team builds resilient digital infrastructure for businesses that want long-term market visibility and operational efficiency.',
    ],
  },
  {
    path: '/contact',
    title: 'Contact Tag Easy',
    description: 'Contact Tag Easy to discuss AI automation, SEO, Ads Hub, website development, and growth systems for your business.',
    priority: '0.6', changefreq: 'monthly',
    schema: graph(
      localBusinessSchema,
      { '@type': 'ContactPage', '@id': `${siteUrl}/contact/#webpage`, url: `${siteUrl}/contact/`, name: 'Contact Tag Easy', about: { '@id': ORG_ID } },
      buildFaqSchema(getFaqsByCategory('Working With Tag Easy')),
      crumbs([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
    ),
    content: [
      'Contact Tag Easy for AI automation, SEO, Ads Hub, web development, and digital growth projects.',
      'Email lokesh.choudhury@tageasy.org or call +91 7980761008. Based in Kolkata, West Bengal, India, serving remote markets worldwide.',
    ],
  },
  {
    path: '/free-audit',
    title: 'Free Technical Audit | Tag Easy',
    description: 'Book a free Tag Easy audit to identify revenue leaks, SEO gaps, automation opportunities, and digital performance issues.',
    priority: '0.9', changefreq: 'weekly',
    schema: graph(
      buildServiceSchema({ name: 'Free Technical Audit', description: 'A free Tag Easy audit identifying revenue leaks, SEO gaps, automation opportunities, and performance issues.', path: '/free-audit' })['@graph'],
      buildFaqSchema(getFaqsByCategories(['Pricing & Timelines', 'Working With Tag Easy'])),
      crumbs([{ name: 'Home', path: '/' }, { name: 'Free Audit', path: '/free-audit' }]),
    ),
    content: [
      'The Tag Easy free audit identifies revenue leaks, technical SEO issues, automation opportunities, and performance problems.',
      'Use the audit to understand what can be improved across your website, ads, lead generation, and digital systems.',
    ],
  },
  {
    path: '/blog',
    title: 'Engineering Journal | Tag Easy',
    description: 'Read Tag Easy insights on technical SEO, AI automation, Core Web Vitals, local SEO, GEO, and schema markup.',
    priority: '0.8', changefreq: 'weekly',
    schema: graph(crumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])),
    content: [
      'The Tag Easy journal covers technical SEO, AI automation, Core Web Vitals, local SEO, GEO, and schema markup.',
      'Articles explain how modern brands build faster, more crawlable websites and smarter automation systems.',
    ],
  },
  {
    path: '/glossary',
    title: 'Digital Marketing & SEO Glossary | Tag Easy',
    description: 'Clear definitions of SEO, AI automation, local SEO, schema markup, Core Web Vitals, IndexNow, GEO, and other digital engineering terms.',
    priority: '0.6', changefreq: 'monthly',
    schema: graph(buildGlossarySchema(glossaryTerms), crumbs([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }])),
    content: [
      'A glossary of SEO, AI automation, and digital engineering terms used by Tag Easy.',
      glossaryTerms.slice(0, 6).map((t) => `${t.term}: ${t.short}`).join(' '),
    ],
  },
  {
    path: '/faqs',
    title: 'Frequently Asked Questions | Tag Easy',
    description: 'Answers about Tag Easy SEO, AI automation, website development, Google Business Profile, paid ads, analytics, pricing, timelines, and how we work.',
    priority: '0.6', changefreq: 'monthly',
    schema: graph(buildFaqSchema(allFaqs), crumbs([{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faqs' }])),
    content: [
      'Frequently asked questions about Tag Easy SEO, AI automation, websites, ads, analytics, pricing, and how we work.',
      allFaqs.slice(0, 4).map((f) => `${f.question} ${f.answer}`).join(' '),
    ],
  },
];

// --- Team member pages ----------------------------------------------------

const teamPages = teamMembers.map((member) => ({
  path: `/team/${member.slug}`,
  title: `${member.name} | ${member.role} at Tag Easy`,
  description: member.bio,
  priority: '0.5', changefreq: 'monthly',
  image: abs(member.image),
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(member),
      crumbs([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }, { name: member.name, path: `/team/${member.slug}` }]),
    ],
  },
  content: [member.bio, `${member.name} is part of the Tag Easy team, contributing as ${member.role}.`],
}));

// --- Blog post pages (only approved + indexable; single source of truth) ---

const blogPages = getIndexablePosts().map((post) => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} | Tag Easy Journal`,
  description: post.excerpt,
  priority: '0.7', changefreq: 'monthly',
  lastmod: post.dateModified || post.date,
  image: abs(post.image),
  schema: buildBlogPostingSchema(post, getAuthor(post.authorId)),
  content: [
    post.excerpt,
    ...post.content.filter((b) => b.type === 'paragraph').slice(0, 3).map((b) => b.text),
  ],
}));

const pages = [...corePages, ...teamPages, ...blogPages];

// --- HTML rendering -------------------------------------------------------

const navLinks = [
  ['Home', '/'], ['AI Automation', '/ai-automation'], ['Services', '/services'],
  ['Industries', '/industries'], ['Case Studies', '/case-studies'], ['About', '/about'],
  ['Blog', '/blog'], ['Glossary', '/glossary'], ['FAQs', '/faqs'],
  ['Contact', '/contact'], ['Free Audit', '/free-audit'],
];

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

// --- Sitemap (Task 7) — only indexable canonical URLs --------------------

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

// Task 5 — real 404 page served with HTTP 404 via _redirects (`/* /404.html 404`).
const notFoundPage = {
  path: '/404',
  title: 'Page Not Found | Tag Easy',
  description: 'The page you are looking for could not be found.',
  noindex: true,
  content: ['The page you are looking for could not be found. Return to the Tag Easy homepage.'],
};
await writeFile(path.join(distDir, '404.html'), renderPage(template, notFoundPage));

await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap());

console.log(`Prerendered SEO HTML for ${pages.length} routes (+ 404.html).`);
