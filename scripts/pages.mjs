// Phase 2 — Single source of truth for prerendered pages.
// Used by scripts/prerender-seo.mjs (HTML + sitemap) and
// scripts/generate-og-images.mjs (branded OG images) so routes, schema, and OG
// keys never drift apart. Pure data/JS — no browser or React APIs.

import {
  SITE_URL,
  ORG_ID,
  organizationSchema,
  localBusinessSchema,
  homepageSchema,
  buildPersonSchema,
  buildServiceSchema,
  buildServiceDetailSchema,
  buildLocationSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildOfferCatalogSchema,
  buildBlogPostingSchema,
  buildGlossarySchema,
  buildCaseStudyArticleSchema,
  buildCaseStudiesCollectionSchema,
  buildReviewSchema,
  buildIndustrySchema,
  buildServiceLocationSchema,
  buildComparisonSchema,
  buildLearnHubSchema,
  buildAuthorSchema,
} from '../src/lib/seoSchema.js';
import { teamMembers } from '../src/lib/teamData.js';
import { getIndexablePosts } from '../src/lib/blogData.js';
import { getAuthor, getIndexableAuthors } from '../src/lib/authors.js';
import { glossaryTerms } from '../src/lib/glossaryData.js';
import { faqs as allFaqs, getFaqsByCategory, getFaqsByCategories } from '../src/lib/faqData.js';
import { serviceCatalog, getIndexableServiceDetails, getServiceDetail } from '../src/lib/servicesData.js';
import { getPublishedCaseStudies } from '../src/lib/caseStudyData.js';
import { getIndexableLocations, getLocation } from '../src/lib/locationsData.js';
import { getIndexableIndustries } from '../src/lib/industriesData.js';
import { getIndexableServiceLocations } from '../src/lib/serviceLocationData.js';
import { getComparisons } from '../src/lib/compareData.js';
import { getLearnHubs } from '../src/lib/learnData.js';
import { getVerifiedTestimonials } from '../src/lib/testimonialsData.js';
import { ogImageUrl } from './ogImage.mjs';

export const siteUrl = SITE_URL;

// Compose a graph that always leads with the Organization for entity consistency.
const graph = (...nodes) => ({
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, ...nodes.flat().filter(Boolean)],
});
const crumbs = (items) => buildBreadcrumbSchema(items);

export const navLinks = [
  ['Home', '/'], ['AI Automation', '/ai-automation'], ['Services', '/services'],
  ['Industries', '/industries'], ['Case Studies', '/case-studies'], ['About', '/about'],
  ['Blog', '/blog'], ['Glossary', '/glossary'], ['FAQs', '/faqs'],
  ['Contact', '/contact'], ['Free Audit', '/free-audit'],
];

const servicesFaqs = getFaqsByCategories([
  'SEO', 'AI Automation', 'Website Development', 'Paid Ads', 'Pricing & Timelines',
]);

// Home schema, with verified-review enrichment merged into the Organization
// node only when consented + verified testimonials exist (Task 4).
const verifiedTestimonials = getVerifiedTestimonials();
const reviewNode = buildReviewSchema(verifiedTestimonials);
const homeSchema = reviewNode
  ? {
      '@context': 'https://schema.org',
      '@graph': homepageSchema['@graph'].map((node) =>
        node['@id'] === ORG_ID
          ? { ...node, aggregateRating: reviewNode.aggregateRating, review: reviewNode.review }
          : node
      ),
    }
  : homepageSchema;

// --- Core pages -----------------------------------------------------------

const corePages = [
  {
    path: '/', category: 'Digital Engineering',
    title: 'Tag Easy | Revenue Driven Digital Engineering',
    description: 'Tag Easy scales revenue with AI automation, high-performance websites, Ads Hub systems, SEO, and data-driven digital engineering.',
    priority: '1.0', changefreq: 'daily', schema: homeSchema,
    content: [
      'Tag Easy is a digital engineering company for brands that need growth, automation, and scalable digital systems.',
      'Services include AI automation, Ads Hub, website development, SEO, lead generation, performance marketing, and business intelligence.',
    ],
  },
  {
    path: '/ai-automation', category: 'AI Automation',
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
    path: '/services', category: 'Services',
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
    path: '/industries', category: 'Industries',
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
    path: '/case-studies', category: 'Case Studies',
    title: 'Case Studies | Tag Easy',
    description: 'See Tag Easy case studies showing digital growth, SEO, Ads Hub performance, and engineering results for client brands.',
    priority: '0.8', changefreq: 'weekly',
    schema: graph(buildCaseStudiesCollectionSchema(getPublishedCaseStudies())['@graph']),
    content: [
      'Tag Easy case studies document digital growth systems, technical SEO wins, Ads Hub results, and engineering improvements.',
      'Featured work includes Maatritva IVF, a healthcare growth case study focused on regional dominance and high-intent inquiries.',
    ],
  },
  {
    path: '/about', category: 'About',
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
    path: '/contact', category: 'Contact',
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
    path: '/free-audit', category: 'Free Audit',
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
    path: '/blog', category: 'Journal',
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
    path: '/glossary', category: 'Glossary',
    title: 'Digital Marketing & SEO Glossary | Tag Easy',
    description: 'Clear definitions of SEO, AI automation, local SEO, schema markup, Core Web Vitals, IndexNow, GEO, and other digital engineering terms.',
    priority: '0.6', changefreq: 'monthly',
    schema: graph(buildGlossarySchema(glossaryTerms), crumbs([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }])),
    content: [
      'Short answer: This glossary gives plain-language, extractable definitions of the core SEO, AI automation, local SEO, schema, Core Web Vitals, IndexNow, and GEO terms Tag Easy uses with clients.',
      'A glossary of SEO, AI automation, and digital engineering terms used by Tag Easy.',
      glossaryTerms.slice(0, 6).map((t) => `${t.term}: ${t.short}`).join(' '),
    ],
  },
  {
    path: '/faqs', category: 'FAQ',
    title: 'Frequently Asked Questions | Tag Easy',
    description: 'Answers about Tag Easy SEO, AI automation, website development, Google Business Profile, paid ads, analytics, pricing, timelines, and how we work.',
    priority: '0.6', changefreq: 'monthly',
    schema: graph(buildFaqSchema(allFaqs), crumbs([{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faqs' }])),
    content: [
      'Short answer: Tag Easy answers the most common questions about its SEO, AI automation, website development, Google Business Profile, paid ads, analytics, pricing, and process — concisely and factually.',
      'Frequently asked questions about Tag Easy SEO, AI automation, websites, ads, analytics, pricing, and how we work.',
      allFaqs.slice(0, 4).map((f) => `${f.question} ${f.answer}`).join(' '),
    ],
  },
  // Phase 2 · Task 5 — Review collection landing page.
  {
    path: '/review-us', category: 'Reviews',
    title: 'Leave a Review for Tag Easy',
    description: 'Worked with Tag Easy? Share your experience. Your review helps other businesses understand what it is like to work with our team.',
    priority: '0.4', changefreq: 'yearly',
    schema: graph(crumbs([{ name: 'Home', path: '/' }, { name: 'Review Us', path: '/review-us' }])),
    content: [
      'Thank you for working with Tag Easy. If our team helped with your website, SEO, automation, or marketing work, your review helps other businesses.',
      'Leave a Google review, or send private feedback directly to the team.',
    ],
  },
  // Phase 2 · Task 13 — User-visible HTML sitemap.
  {
    path: '/sitemap', category: 'Sitemap',
    title: 'Sitemap | Tag Easy',
    description: 'Browse every page on the Tag Easy website — services, locations, case studies, blog articles, glossary terms, and FAQs.',
    priority: '0.3', changefreq: 'monthly',
    schema: graph(crumbs([{ name: 'Home', path: '/' }, { name: 'Sitemap', path: '/sitemap' }])),
    content: [
      'A complete, human-readable map of every page on tageasy.org, grouped by section.',
      'Includes services, locations, case studies, blog articles, glossary terms, and FAQs.',
    ],
  },
];

// --- Service detail pages (Task 1) ---------------------------------------

const servicePages = getIndexableServiceDetails().map((svc) => {
  const shortName = svc.h1.replace(/ —.*$/, '');
  const faqs = getFaqsByCategories(svc.faqCategories || []);
  return {
    path: `/services/${svc.slug}`, category: 'Service',
    title: svc.metaTitle,
    description: svc.metaDescription,
    priority: '0.8', changefreq: 'monthly',
    schema: graph(
      buildServiceDetailSchema({
        name: shortName,
        description: svc.metaDescription,
        path: `/services/${svc.slug}`,
        faqs,
        breadcrumb: [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: shortName, path: `/services/${svc.slug}` },
        ],
      })['@graph'],
    ),
    content: [svc.shortAnswer || svc.intro, svc.intro, `What you get: ${svc.deliverables.join('; ')}.`],
  };
});

// --- Location pages (Task 2) ---------------------------------------------

const locationPages = getIndexableLocations().map((loc) => {
  const faqs = getFaqsByCategories(loc.faqCategories || []);
  return {
    path: `/locations/${loc.slug}`, category: 'Local SEO',
    title: loc.title,
    description: loc.metaDescription,
    priority: '0.7', changefreq: 'monthly',
    schema: graph(buildLocationSchema(loc, faqs)['@graph']),
    content: [loc.intro, ...loc.context.slice(0, 2)],
  };
});

// --- Case study detail pages (Task 11) — generated from published data ----

const caseStudyPages = getPublishedCaseStudies().map((cs) => ({
  path: cs.path, category: 'Case Study', ogType: 'article',
  title: `${cs.title} Case Study | Tag Easy`,
  description: cs.summary || cs.overview,
  priority: '0.8', changefreq: 'monthly',
  schema: graph(buildCaseStudyArticleSchema(cs)['@graph']),
  content: [
    cs.overview,
    cs.strategy || cs.solution,
    `Results: ${cs.results.map((r) => `${r.metric} — ${r.after}`).join('; ')}. ${cs.caveats}`,
  ],
}));

// --- Team member pages ----------------------------------------------------

const teamPages = teamMembers.filter((member) => !member.hidden).map((member) => ({
  path: `/team/${member.slug}`, category: 'Team',
  title: `${member.name} | ${member.role} at Tag Easy`,
  description: member.bio,
  priority: '0.5', changefreq: 'monthly',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(member),
      crumbs([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }, { name: member.name, path: `/team/${member.slug}` }]),
    ],
  },
  content: [member.bio, `${member.name} is part of the Tag Easy team, contributing as ${member.role}.`],
}));

// --- Blog post pages (only approved + indexable) --------------------------

const blogPages = getIndexablePosts().map((post) => ({
  path: `/blog/${post.slug}`, category: post.category || 'Journal',
  title: `${post.title} | Tag Easy Journal`,
  description: post.excerpt,
  priority: '0.7', changefreq: 'monthly',
  lastmod: post.dateModified || post.date,
  ogType: 'article',
  schema: buildBlogPostingSchema(post, getAuthor(post.authorId)),
  content: [
    post.shortAnswer || post.excerpt,
    ...(post.shortAnswer ? [post.excerpt] : []),
    ...post.content
      .map((b) =>
        b.type === 'paragraph' ? b.text : b.type === 'list' ? b.items.join(' ') : null
      )
      .filter(Boolean)
      .slice(0, 4),
  ],
}));

// --- Industry landing pages ----------------------------------------------

const industryPages = getIndexableIndustries().map((ind) => {
  const path = `/industries/${ind.slug}`;
  const faqs = getFaqsByCategories(ind.faqCategories || []);
  return {
    path, category: 'Industry',
    title: ind.metaTitle,
    description: ind.metaDescription,
    priority: '0.7', changefreq: 'monthly',
    schema: graph(
      buildIndustrySchema({
        name: ind.h1,
        description: ind.metaDescription,
        path,
        audience: ind.audience,
        faqs,
        breadcrumb: [
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: ind.name, path },
        ],
      })['@graph'],
    ),
    content: [ind.shortAnswer, ind.intro],
  };
});

// --- Service + location combination pages ---------------------------------

const serviceLocationPages = getIndexableServiceLocations().map((sl) => {
  const svc = getServiceDetail(sl.service);
  const loc = getLocation(sl.location);
  const serviceShortName = svc.h1.replace(/ —.*$/, '');
  const path = `/services/${sl.service}/${sl.location}`;
  const faqs = getFaqsByCategories(sl.faqCategories || []);
  return {
    path, category: 'Local Service',
    title: sl.metaTitle,
    description: sl.metaDescription,
    priority: '0.7', changefreq: 'monthly',
    schema: graph(
      buildServiceLocationSchema({
        name: `${serviceShortName} in ${loc.name}`,
        description: sl.metaDescription,
        path,
        areaServed: loc.areaServed,
        faqs,
        breadcrumb: [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: serviceShortName, path: `/services/${sl.service}` },
          { name: loc.name, path },
        ],
      })['@graph'],
    ),
    content: [sl.shortAnswer, sl.intro, sl.localProof],
  };
});

// --- Comparison pages (index + details) -----------------------------------

const comparePages = [
  {
    path: '/compare', category: 'Compare',
    title: 'Compare Digital Growth Approaches | Tag Easy',
    description:
      'Side-by-side comparisons — SEO vs paid ads, AI automation vs manual marketing, custom vs template websites, and more — to help you choose the right approach.',
    priority: '0.6', changefreq: 'monthly',
    schema: graph(
      buildLearnHubSchema({
        name: 'Tag Easy Comparisons',
        description: 'Side-by-side comparisons to help you choose the right digital growth approach.',
        path: '/compare',
        items: getComparisons().map((c) => ({ name: c.h1, url: `/compare/${c.slug}` })),
        breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Compare', path: '/compare' }],
      })['@graph'],
    ),
    content: [
      'Honest, side-by-side comparisons to help you choose the right approach for your business.',
      getComparisons().map((c) => c.h1).join('; '),
    ],
  },
  ...getComparisons().map((cmp) => {
    const path = `/compare/${cmp.slug}`;
    return {
      path, category: 'Compare', ogType: 'article',
      title: cmp.metaTitle,
      description: cmp.metaDescription,
      priority: '0.7', changefreq: 'monthly',
      lastmod: cmp.dateModified || cmp.datePublished,
      schema: graph(
        buildComparisonSchema({
          title: cmp.h1,
          description: cmp.metaDescription,
          path,
          datePublished: cmp.datePublished,
          dateModified: cmp.dateModified,
          faqs: cmp.faqs,
          breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Compare', path: '/compare' }, { name: cmp.h1, path }],
        })['@graph'],
      ),
      content: [cmp.shortAnswer, cmp.recommendation],
    };
  }),
];

// --- Topic-cluster hub pages (index + details) ----------------------------

const learnPages = [
  {
    path: '/learn', category: 'Learn',
    title: 'Learn — SEO, Local SEO, AI Automation & More | Tag Easy',
    description:
      'Topic hubs gathering Tag Easy guides, FAQs, glossary terms, and services on SEO, local SEO, AI automation, website development, Google Business Profile, and analytics.',
    priority: '0.6', changefreq: 'weekly',
    schema: graph(
      buildLearnHubSchema({
        name: 'Tag Easy Learn — Topic Hubs',
        description: 'Topic hubs gathering Tag Easy guides, FAQs, glossary terms, and services by subject.',
        path: '/learn',
        items: getLearnHubs().map((h) => ({ name: h.h1, url: `/learn/${h.slug}` })),
        breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Learn', path: '/learn' }],
      })['@graph'],
    ),
    content: [
      'Everything Tag Easy publishes, organised by topic — guides, FAQs, definitions, and the services that put them into practice.',
      getLearnHubs().map((h) => h.h1).join('; '),
    ],
  },
  ...getLearnHubs().map((hub) => {
    const path = `/learn/${hub.slug}`;
    const services = (hub.serviceSlugs || []).map(getServiceDetail).filter(Boolean);
    const items = services.map((s) => ({ name: s.h1.replace(/ —.*$/, ''), url: `/services/${s.slug}` }));
    return {
      path, category: 'Learn',
      title: hub.metaTitle,
      description: hub.metaDescription,
      priority: '0.6', changefreq: 'monthly',
      schema: graph(
        buildLearnHubSchema({
          name: hub.h1,
          description: hub.metaDescription,
          path,
          items,
          breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Learn', path: '/learn' }, { name: hub.name, path }],
        })['@graph'],
      ),
      content: [hub.shortAnswer, hub.intro],
    };
  }),
];

// --- Author profile pages (indexable authors only) ------------------------

const authorPages = getIndexableAuthors().map((author) => {
  const path = `/authors/${author.id}`;
  return {
    path, category: 'Author', ogType: 'profile',
    title: `${author.name} — ${author.role} | Tag Easy`,
    description: `${author.name} — ${author.role} at Tag Easy, specialising in ${(author.expertise || []).slice(0, 3).join(', ')}.`,
    priority: '0.5', changefreq: 'monthly',
    schema: graph(
      buildAuthorSchema(author, [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: author.name, path },
      ])['@graph'],
    ),
    content: [`${author.name} is the ${author.role} at Tag Easy.`, author.bio],
  };
});

// --- Thank-you pages (Task 17) — noindex, NOT in sitemap ------------------

const thankYouPages = [
  '/thank-you', '/contact/thank-you', '/free-audit/thank-you', '/service-inquiry/thank-you',
].map((p) => ({
  path: p, category: 'Tag Easy', noindex: true,
  title: 'Thank You | Tag Easy',
  description: 'Thank you — your message has been received. The Tag Easy team will reply within 24 hours.',
  content: ['Thank you — your message has been received. We will reply within 24 hours.'],
}));

// --- Assemble + attach unique OG image to every page ----------------------

const allPages = [
  ...corePages,
  ...servicePages,
  ...serviceLocationPages,
  ...locationPages,
  ...industryPages,
  ...comparePages,
  ...learnPages,
  ...authorPages,
  ...caseStudyPages,
  ...teamPages,
  ...blogPages,
  ...thankYouPages,
];

export const pages = allPages.map((page) => ({
  ...page,
  category: page.category || 'Tag Easy',
  image: ogImageUrl(page.path),
}));

// --- Image sitemap source (Task 23) --------------------------------------
// Real, public content images grouped by the indexable page they appear on.
// OG SVGs and placeholder assets are intentionally excluded. Consumed by
// scripts/prerender-seo.mjs to emit dist/image-sitemap.xml.
export const imageSitemapEntries = [
  { loc: '/', images: [{ url: '/logo.jpg', title: 'Tag Easy' }] },
  ...getIndexableServiceDetails().map((s) => ({
    loc: `/services/${s.slug}`,
    images: [{ url: s.image, title: s.h1.replace(/ —.*$/, '') }],
  })),
  ...getPublishedCaseStudies().map((c) => ({
    loc: c.path,
    images: [{ url: c.image, title: `${c.title} case study` }],
  })),
  ...getIndexablePosts().map((post) => ({
    loc: `/blog/${post.slug}`,
    images: [{ url: post.image, title: post.title }],
  })),
  ...teamMembers
    .filter((m) => !m.hidden)
    .map((m) => ({ loc: `/team/${m.slug}`, images: [{ url: m.image, title: `${m.name} — ${m.role}` }] })),
].filter((e) => e.images.every((i) => i.url && !i.url.startsWith('/og/') && !/placeholder/i.test(i.url)));
