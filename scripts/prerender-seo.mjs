import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://tageasy.org';
const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

const baseBlogPosts = [
  {
    title: 'Architecting High-Performance Digital Ecosystems',
    excerpt: 'Discover the engineering principles behind creating digital platforms that load in milliseconds and command user attention from the first interaction.',
    category: 'Engineering',
  },
  {
    title: 'Ads Hub Dominance: A Data-Driven Approach',
    excerpt: 'How to leverage predictive analytics and modular AI integrations to achieve unprecedented ROI in your advertising campaigns.',
    category: 'Marketing',
  },
  {
    title: 'The Psychology of Dark Mode Interfaces',
    excerpt: 'Why premium brands are shifting to dark aesthetics, and how it scientifically reduces cognitive load while increasing conversion rates.',
    category: 'Design',
  },
  {
    title: 'Modular AI: The Future of Business Intelligence',
    excerpt: 'Implementing intelligent automation systems that scale seamlessly with your organizational growth and operational demands.',
    category: 'AI & Automation',
  },
  {
    title: 'Scalable Infrastructure for Viral Growth',
    excerpt: 'Engineering backend systems capable of handling massive traffic spikes without compromising performance or user experience.',
    category: 'Infrastructure',
  },
];

const blogPosts = Array.from({ length: 50 }, (_, index) => {
  const base = baseBlogPosts[index % baseBlogPosts.length];
  return {
    path: `/blog/${(base.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${index + 1}`).replace(/(^-|-$)/g, '')}`,
    title: index < 5 ? base.title : `${base.title} - Part ${Math.floor(index / 5) + 1}`,
    description: base.excerpt,
    category: base.category,
  };
});

const pages = [
  {
    path: '/',
    title: 'Tag Easy | Revenue Driven Digital Engineering',
    description: 'Tag Easy scales revenue with AI automation, high-performance websites, Ads Hub systems, SEO, and data-driven digital engineering.',
    priority: '1.0',
    changefreq: 'daily',
    content: [
      'Tag Easy is a creative engineering lab for brands that need growth, automation, and scalable digital systems.',
      'Services include AI automation, Ads Hub, website development, SEO, lead generation, performance marketing, and business intelligence.',
    ],
  },
  {
    path: '/ai-automation',
    title: 'AI Automation Services | Tag Easy',
    description: 'Tag Easy builds AI automation systems for ads, lead generation, SEO, CRM workflows, reporting, content pipelines, and custom AI agents.',
    priority: '0.9',
    changefreq: 'weekly',
    content: [
      'AI Automation is a core Tag Easy service for automating ads, lead generation, SEO, CRM, reporting, content, and business workflows.',
      'We design connected systems that capture leads, qualify intent, update CRM records, notify sales teams, and refresh dashboards.',
    ],
  },
  {
    path: '/services',
    title: 'Our Services | Tag Easy',
    description: 'Explore Tag Easy services including AI automation, SEO, Ads Hub, web development, mobile app development, and performance engineering.',
    priority: '0.8',
    changefreq: 'weekly',
    content: [
      'Tag Easy services cover AI automation, Ads Hub, website development, SEO, mobile app development, and digital engineering.',
      'Our services are built for businesses that want scalable lead generation, technical SEO, conversion-focused websites, and automation systems.',
    ],
  },
  {
    path: '/industries',
    title: 'Industries | Tag Easy',
    description: 'Tag Easy builds specialized digital systems for healthcare, e-commerce, SaaS, fintech, real estate, education, travel, and analytics companies.',
    priority: '0.7',
    changefreq: 'weekly',
    content: [
      'Tag Easy serves healthcare, e-commerce, fintech, SaaS, data analytics, real estate, education, travel, and hospitality brands.',
      'Each industry strategy is tailored around search visibility, technical infrastructure, lead generation, and conversion performance.',
    ],
  },
  {
    path: '/case-studies',
    title: 'Case Studies | Tag Easy',
    description: 'See Tag Easy case studies showing digital growth, SEO, Ads Hub performance, and engineering results for client brands.',
    priority: '0.8',
    changefreq: 'weekly',
    content: [
      'Tag Easy case studies document digital growth systems, technical SEO wins, Ads Hub results, and engineering improvements.',
      'Featured work includes Maatritva IVF, a healthcare growth case study focused on regional dominance and high-intent inquiries.',
    ],
  },
  {
    path: '/case-studies/maatritva',
    title: 'Maatritva Fertility IVF Case Study | Tag Easy',
    description: 'Discover how Tag Easy scaled Maatritva Fertility IVF with multi-domain SEO, technical performance, and high-intent patient lead systems.',
    priority: '0.8',
    changefreq: 'monthly',
    content: [
      'Maatritva Fertility IVF is a Tag Easy healthcare case study focused on regional search visibility and patient inquiry growth.',
      'The project combined technical SEO, dedicated doctor workflows, conversion architecture, and performance-focused website engineering.',
    ],
  },
  {
    path: '/about',
    title: 'About Us | Tag Easy',
    description: 'Learn about Tag Easy, the digital engineering team building AI automation, SEO, web systems, and growth infrastructure.',
    priority: '0.7',
    changefreq: 'monthly',
    content: [
      'Tag Easy is a digital engineering team focused on AI automation, SEO, Ads Hub, websites, and scalable growth systems.',
      'The team builds resilient digital infrastructure for businesses that want long-term market visibility and operational efficiency.',
    ],
  },
  {
    path: '/contact',
    title: 'Contact Tag Easy',
    description: 'Contact Tag Easy to discuss AI automation, SEO, Ads Hub, website development, and growth systems for your business.',
    priority: '0.6',
    changefreq: 'monthly',
    content: [
      'Contact Tag Easy for AI automation, SEO, Ads Hub, web development, and digital growth projects.',
      'Share your business details and the team will respond about your project or audit request.',
    ],
  },
  {
    path: '/free-audit',
    title: 'Free Technical Audit | Tag Easy',
    description: 'Book a free Tag Easy audit to identify revenue leaks, SEO gaps, automation opportunities, and digital performance issues.',
    priority: '0.9',
    changefreq: 'weekly',
    content: [
      'The Tag Easy free audit identifies revenue leaks, technical SEO issues, automation opportunities, and performance problems.',
      'Use the audit to understand what can be improved across your website, ads, lead generation, and digital systems.',
    ],
  },
  {
    path: '/blog',
    title: 'Engineering Journal | Tag Easy',
    description: 'Read Tag Easy insights on digital ecosystems, performance engineering, SEO, Ads Hub strategy, and AI automation.',
    priority: '0.8',
    changefreq: 'daily',
    content: [
      'The Tag Easy journal covers AI automation, SEO, Ads Hub strategy, performance engineering, digital ecosystems, and scalable infrastructure.',
      'Articles explain how modern brands can build faster websites, stronger funnels, and smarter automation systems.',
    ],
  },
  ...blogPosts.map((post) => ({
    path: post.path,
    title: `${post.title} | Tag Easy Journal`,
    description: post.description,
    priority: '0.5',
    changefreq: 'monthly',
    content: [
      `${post.title} is a Tag Easy journal article in ${post.category}.`,
      post.description,
    ],
  })),
];

const navLinks = [
  ['Home', '/'],
  ['AI Automation', '/ai-automation'],
  ['Services', '/services'],
  ['Industries', '/industries'],
  ['Case Studies', '/case-studies'],
  ['About', '/about'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
  ['Free Audit', '/free-audit'],
];

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const canonicalFor = (routePath) => `${siteUrl}${routePath === '/' ? '/' : routePath}`;

const buildHead = (page) => {
  const canonical = canonicalFor(page.path);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Tag Easy',
      url: siteUrl,
    },
  };

  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${canonical}" />`,
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
  ].join('\n    ');
};

const buildNoscript = (page) => `
    <noscript>
      <main>
        <h1>${escapeHtml(page.title)}</h1>
        ${page.content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n        ')}
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

const buildSitemap = () => {
  const urls = pages
    .map((page) => `  <url>
    <loc>${canonicalFor(page.path)}</loc>
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

const template = await readFile(indexPath, 'utf8');

await Promise.all(pages.map((page) => writeRoute(page, renderPage(template, page))));
await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap());

console.log(`Prerendered SEO HTML for ${pages.length} routes.`);
