// Task 16 — Structured case-study data with proof blocks and caveats.
// Drives case-study pages, the case-studies index, schema, and internal links.
// Claims include context/caveats so they stay credible and AI-citable.

import { seoImages } from './seoImages.js';

export const caseStudies = [
  {
    slug: 'maatritva',
    path: '/case-studies/maatritva',
    title: 'Maatritva Fertility IVF',
    clientType: 'Healthcare clinic (IVF / fertility)',
    problem:
      'A highly respected fertility clinic whose digital presence did not reflect its clinical authority, with limited regional search visibility.',
    baseline: 'Low organic visibility for high-intent fertility searches in the Kolkata region.',
    solution:
      'A multi-domain SEO and technical strategy with dedicated doctor pages, aggressive local SEO, conversion-focused architecture, and performance engineering.',
    toolsUsed: ['Technical SEO', 'Local SEO', 'Web development', 'Google Business Profile'],
    timeline: '8+ weeks (ongoing)',
    results: [
      { metric: 'Regional ranking', before: 'Not dominant', after: '#1 IVF center positioning in Kolkata & beyond' },
      { metric: 'Doctor-dedicated workflows', before: 'None', after: '100% clinical tracking coverage' },
      { metric: 'High-intent inquiries', before: 'Limited', after: 'Systematic capture of high-intent patient inquiries' },
    ],
    caveats:
      'Ranking position reflects targeted regional fertility queries and varies by keyword and time; results are not guaranteed for every clinic.',
    relatedServices: ['technical-seo', 'website-development'],
    image: seoImages.maatritva,
    live: ['https://maatritvaivffertility.com/', 'https://www.maatritvaivf.com/'],
    indexable: true,
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
