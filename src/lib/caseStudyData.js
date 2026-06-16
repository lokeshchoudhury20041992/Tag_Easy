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
    location: 'Kolkata, West Bengal',
    summary:
      'How a respected Kolkata IVF clinic reached #1 regional positioning for high-intent fertility searches with multi-domain SEO and conversion-focused engineering.',
    overview:
      'Maatritva is a highly respected fertility clinic whose clinical reputation far exceeded its digital footprint. The goal was to make its online presence map directly to its real-world authority and capture the high-intent fertility demand across Kolkata and surrounding regions.',
    problem:
      'A highly respected fertility clinic whose digital presence did not reflect its clinical authority, with limited regional search visibility.',
    baseline: 'Low organic visibility for high-intent fertility searches in the Kolkata region.',
    solution:
      'A multi-domain SEO and technical strategy with dedicated doctor pages, aggressive local SEO, conversion-focused architecture, and performance engineering.',
    strategy:
      'We engineered a multi-domain strategy to capture broad regional search intent, paired it with dedicated, optimised pages for individual doctors, and layered aggressive local SEO and Google Business Profile work to dominate the local pack.',
    implementation: [
      'Built and scaled multiple premier domains (maatritvaivffertility.com, maatritvaivf.com).',
      'Engineered highly optimised, dedicated web pages for individual doctors.',
      'Implemented aggressive local SEO to systematically capture high-intent inquiries.',
      'Created smooth digital workflows to highlight successful patient case studies.',
    ],
    toolsUsed: ['Technical SEO', 'Local SEO', 'Web development', 'Google Business Profile'],
    timeline: '8+ weeks (ongoing)',
    results: [
      { metric: 'Regional ranking', before: 'Not dominant', after: '#1 IVF center positioning in Kolkata & beyond' },
      { metric: 'Doctor-dedicated workflows', before: 'None', after: '100% clinical tracking coverage' },
      { metric: 'High-intent inquiries', before: 'Limited', after: 'Systematic capture of high-intent patient inquiries' },
    ],
    caveats:
      'Ranking position reflects targeted regional fertility queries and varies by keyword and time; results are not guaranteed for every clinic.',
    relatedServices: ['technical-seo', 'website-development', 'local-seo'],
    image: seoImages.maatritva,
    live: ['https://maatritvaivffertility.com/', 'https://www.maatritvaivf.com/'],
    indexable: true,
    published: true,
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);

// Published = has real, approved content and gets a generated, indexable detail
// page + sitemap entry. Only add a case study here once its data is genuine.
export const getPublishedCaseStudies = () =>
  caseStudies.filter((c) => c.published && c.indexable);
