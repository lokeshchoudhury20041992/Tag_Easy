// Task 19 — SEO/GEO QA status source.
// Page-level readiness records for priority pages. Consumed by the private
// /seo-dashboard route and by scripts/seo-check.mjs for a build-time report.

export const seoQaStatus = [
  {
    url: '/',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'WebSite', 'LocalBusiness', 'OfferCatalog'],
    inSitemap: true, indexable: true, faqCount: 0, ogImage: true,
    lastChecked: '2026-06-06', notes: '',
  },
  {
    url: '/services',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'OfferCatalog', 'FAQPage', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 12, ogImage: true,
    lastChecked: '2026-06-06', notes: 'Structured service detail sections added.',
  },
  {
    url: '/ai-automation',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'Service', 'FAQPage', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 4, ogImage: true,
    lastChecked: '2026-06-06', notes: '',
  },
  {
    url: '/free-audit',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'Service', 'FAQPage', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 4, ogImage: true,
    lastChecked: '2026-06-06', notes: '',
  },
  {
    url: '/contact',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'LocalBusiness', 'ContactPage', 'FAQPage', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 2, ogImage: true,
    lastChecked: '2026-06-06', notes: '',
  },
  {
    url: '/about',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 0, ogImage: true,
    lastChecked: '2026-06-06', notes: 'Stats now sourced from proofClaims.',
  },
  {
    url: '/industries',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 0, ogImage: true,
    lastChecked: '2026-06-06', notes: '',
  },
  {
    url: '/case-studies',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 0, ogImage: true,
    lastChecked: '2026-06-06', notes: '',
  },
  {
    url: '/case-studies/maatritva',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'Article', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 0, ogImage: true,
    lastChecked: '2026-06-06', notes: 'Case study now structured with proof/caveats.',
  },
  {
    url: '/blog',
    title: true, description: true, canonical: true, robots: 'index',
    schema: [],
    inSitemap: true, indexable: true, faqCount: 0, ogImage: true,
    lastChecked: '2026-06-06', notes: 'Only approved posts listed.',
  },
  {
    url: '/glossary',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'DefinedTermSet', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 0, ogImage: true,
    lastChecked: '2026-06-06', notes: 'New page.',
  },
  {
    url: '/faqs',
    title: true, description: true, canonical: true, robots: 'index',
    schema: ['Organization', 'FAQPage', 'BreadcrumbList'],
    inSitemap: true, indexable: true, faqCount: 18, ogImage: true,
    lastChecked: '2026-06-06', notes: 'New FAQ hub.',
  },
];

// Required schema by page for QA checks.
export const requiredSchemaByUrl = {
  '/': ['Organization'],
  '/services': ['FAQPage', 'BreadcrumbList'],
  '/ai-automation': ['Service', 'FAQPage', 'BreadcrumbList'],
  '/free-audit': ['Service', 'FAQPage', 'BreadcrumbList'],
  '/contact': ['ContactPage', 'BreadcrumbList'],
  '/faqs': ['FAQPage', 'BreadcrumbList'],
  '/glossary': ['DefinedTermSet', 'BreadcrumbList'],
  '/case-studies/maatritva': ['Article', 'BreadcrumbList'],
};
