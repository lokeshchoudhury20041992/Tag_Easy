// Tasks 12 & 13 — Structured, extractable service data.
// Drives the rewritten Services page sections (audience, problems, deliverables,
// process, timeline, tools, pricing factors, FAQs, related case studies) and the
// OfferCatalog / Service schema. Built for both human readers and AI extraction.

export const services = [
  {
    slug: 'technical-seo',
    title: 'Technical SEO for React & Modern Websites',
    short: 'Crawlable, indexable, fast websites that rank.',
    audience:
      'Businesses with a React/SPA or modern website whose pages are not indexing, not ranking, or losing traffic.',
    problems: [
      'Pages not indexed because the SPA serves one HTML shell per route',
      'Thin or duplicate content suppressing rankings',
      'Slow Core Web Vitals on mobile',
      'Missing or invalid structured data',
    ],
    deliverables: [
      'Per-route prerendering / SSR and clean canonicals',
      'Schema markup (Organization, Service, FAQ, Breadcrumb, Article)',
      'Complete sitemap with lastmod and correct robots directives',
      'Core Web Vitals and image optimisation',
      'Search Console + IndexNow submission',
    ],
    process: ['Crawl & audit', 'Prioritise fixes', 'Implement & deploy', 'Submit & monitor'],
    timeline: '2–4 weeks for priority fixes',
    tools: ['Google Search Console', 'GA4', 'Lighthouse', 'Screaming Frog', 'Schema.org'],
    pricingFactors: ['Number of templates/pages', 'Stack complexity', 'Content volume', 'Reporting cadence'],
    relatedCaseStudies: ['maatritva'],
    faqCategories: ['SEO'],
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation for Marketing & Operations',
    short: 'Systems that capture, qualify, and follow up automatically.',
    audience:
      'Teams losing leads to slow follow-up or drowning in repetitive marketing, sales, and ops tasks.',
    problems: [
      'Leads going cold before anyone responds',
      'Manual data entry across forms, sheets, and CRM',
      'No single view of marketing and sales activity',
      'Reporting that takes hours to assemble',
    ],
    deliverables: [
      'Lead capture, qualification, and CRM routing',
      'WhatsApp + email follow-up sequences',
      'Connected dashboards and notifications',
      'Custom AI agents for support, research, and classification',
    ],
    process: ['Audit', 'Architect', 'Deploy', 'Optimize'],
    timeline: 'First automation live in 2–4 weeks',
    tools: ['Make / n8n', 'OpenAI / Claude APIs', 'CRM platforms', 'WhatsApp Business API', 'Google Workspace'],
    pricingFactors: ['Number of workflows', 'Integrations required', 'AI usage volume', 'Ongoing optimisation'],
    relatedCaseStudies: [],
    faqCategories: ['AI Automation'],
  },
  {
    slug: 'website-development',
    title: 'High-Performance Website Development',
    short: 'Fast, conversion-focused sites built to rank.',
    audience: 'Brands that need a fast, modern, SEO-ready website that converts.',
    problems: [
      'Slow, dated sites that hurt conversions',
      'Sites that are not built for SEO or mobile',
      'Designs that look good but do not perform',
    ],
    deliverables: [
      'React / Next.js builds engineered for Core Web Vitals',
      'SEO-ready prerendering, schema, and clean URLs',
      'Responsive, accessible, conversion-focused UI',
      'Analytics and conversion tracking baked in',
    ],
    process: ['Discovery', 'Design', 'Build', 'Launch & optimise'],
    timeline: '4–8 weeks depending on scope',
    tools: ['React', 'Next.js', 'Vite', 'Tailwind', 'GA4'],
    pricingFactors: ['Page count', 'Custom design vs template', 'Integrations', 'Content needs'],
    relatedCaseStudies: ['commerce', 'metropolitan'],
    faqCategories: ['Website Development'],
  },
  {
    slug: 'ads-hub',
    title: 'Ads Hub — Paid Ads Management',
    short: 'Google & Meta campaigns engineered for ROI.',
    audience: 'Businesses spending on ads without clear, trackable returns.',
    problems: [
      'Ad spend with no clear cost-per-lead',
      'Poor targeting and wasted budget',
      'No retargeting or conversion tracking',
    ],
    deliverables: [
      'Campaign setup across Google and Meta',
      'Audience flows and retargeting sequences',
      'Conversion tracking and cost-per-lead reporting',
      'Ongoing optimisation',
    ],
    process: ['Account audit', 'Strategy', 'Launch', 'Optimise & report'],
    timeline: 'Live in 1–2 weeks; optimisation ongoing',
    tools: ['Google Ads', 'Meta Ads Manager', 'GA4', 'Google Tag Manager'],
    pricingFactors: ['Ad budget', 'Number of platforms', 'Creative needs', 'Reporting cadence'],
    relatedCaseStudies: ['migration'],
    faqCategories: ['Paid Ads'],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

// Task 13 — OfferCatalog source. The provider-linked Service objects for the
// homepage / Services page service catalog schema.
export const serviceCatalog = [
  { name: 'Technical SEO', url: '/services', description: 'Crawlability, indexing, schema, and Core Web Vitals for modern websites.' },
  { name: 'AI Automation', url: '/ai-automation', description: 'Automated lead capture, qualification, follow-up, and reporting systems.' },
  { name: 'Website Development', url: '/services', description: 'High-performance, SEO-ready React and Next.js websites.' },
  { name: 'Ads Management', url: '/services', description: 'Google and Meta paid ads with conversion tracking and ROI reporting.' },
  { name: 'Analytics Setup', url: '/services', description: 'GA4, conversion tracking, and dashboards for lead attribution.' },
  { name: 'Lead Generation Systems', url: '/services', description: 'End-to-end systems that capture and route high-intent leads.' },
  { name: 'Technical Audits', url: '/free-audit', description: 'Deep audits of SEO, performance, automation, and revenue leaks.' },
];
