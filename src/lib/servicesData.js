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

// =====================================================================
// Phase 2 · Task 1 — Dedicated, indexable service detail pages.
// Each entry drives a unique /services/<slug> page (SEO title, meta,
// Service + FAQ + Breadcrumb schema, CTA, related case studies, related
// FAQs, related glossary terms) and is prerendered + added to the sitemap.
// Content is unique per service so no two pages share meta or body.
// =====================================================================

export const serviceDetailPages = [
  {
    slug: 'seo',
    metaTitle: 'SEO Services in Kolkata & India — Rank, Get Found, Convert | Tag Easy',
    metaDescription:
      'Full-funnel SEO from Tag Easy — technical, on-page, local, and content — to get your site indexed, ranked for high-intent searches, and converting into leads.',
    h1: 'SEO Services That Turn Search Into Revenue',
    tagline: 'Technical, local, and content SEO engineered for measurable growth.',
    intro:
      'SEO is not a single task — it is the combination of a crawlable technical foundation, content that answers real queries, and local signals that win your market. We build all three and tie them to lead tracking so you can see search turn into revenue.',
    audience:
      'Businesses whose website is not ranking, not indexing, or not generating enquiries from organic search.',
    problems: [
      'Pages that do not rank for the searches that actually drive revenue',
      'A site that is slow, hard to crawl, or missing structured data',
      'No clear link between rankings and real leads or sales',
      'Local competitors outranking you for "near me" searches',
    ],
    deliverables: [
      'Technical SEO: crawlability, indexing, canonicals, and Core Web Vitals',
      'On-page SEO: titles, meta, headings, internal linking, and content structure',
      'Local SEO: Google Business Profile, NAP consistency, and LocalBusiness schema',
      'Schema markup and a complete, maintained sitemap',
      'Search Console + IndexNow submission and monthly reporting',
    ],
    process: ['Audit & baseline', 'Prioritise by impact', 'Implement & deploy', 'Measure & report'],
    timeline: 'Priority fixes in 2–4 weeks; rankings compound over 2–3 months',
    tools: ['Google Search Console', 'GA4', 'Lighthouse', 'Screaming Frog', 'Schema.org', 'IndexNow'],
    pricingFactors: ['Site size and stack', 'Competitiveness of keywords', 'Content needs', 'Reporting cadence'],
    image: '/case-studies/metropolitan.webp',
    relatedCaseStudies: ['maatritva'],
    relatedServices: ['technical-seo', 'local-seo', 'analytics-tracking'],
    faqCategories: ['SEO', 'Pricing & Timelines'],
    glossarySlugs: ['technical-seo', 'local-seo', 'schema-markup', 'core-web-vitals'],
    formHeading: 'Request an SEO Audit',
    formCta: 'Get My SEO Audit',
    cta: {
      heading: 'See exactly what is holding your rankings back',
      text: 'Book a free SEO audit and we will show you the highest-impact fixes for your site.',
    },
  },
  {
    slug: 'technical-seo',
    metaTitle: 'Technical SEO for React & Modern Websites | Tag Easy',
    metaDescription:
      'Fix indexing, crawlability, Core Web Vitals, and structured data on React, Vue, and modern sites. Tag Easy makes every route render real, indexable HTML.',
    h1: 'Technical SEO for React & Modern Websites',
    tagline: 'Crawlable, indexable, fast websites that rank.',
    intro:
      'Modern JavaScript sites often ship one empty HTML shell per route, so search engines index only the homepage. We fix the foundation — prerendering, canonicals, schema, and Core Web Vitals — so every page is crawlable, indexable, and fast.',
    audience:
      'Teams with a React/SPA or modern website whose pages are not indexing, not ranking, or losing traffic.',
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
    image: '/case-studies/metropolitan.webp',
    relatedCaseStudies: ['maatritva'],
    relatedServices: ['seo', 'website-development', 'local-seo'],
    faqCategories: ['SEO'],
    glossarySlugs: ['technical-seo', 'react-seo', 'crawl-budget', 'core-web-vitals', 'schema-markup', 'indexnow'],
    formHeading: 'Request a Technical SEO Audit',
    formCta: 'Audit My Site',
    cta: {
      heading: 'Stop losing pages to the SPA indexing problem',
      text: 'We will crawl your site and show you which pages are invisible to Google — and why.',
    },
  },
  {
    slug: 'local-seo',
    metaTitle: 'Local SEO Services — Win "Near Me" Searches | Tag Easy',
    metaDescription:
      'Tag Easy helps local businesses rank in Google Maps and the local pack with Google Business Profile optimisation, NAP consistency, schema, and local content.',
    h1: 'Local SEO That Wins Your Neighbourhood',
    tagline: 'Show up in Maps and the local pack for high-intent "near me" searches.',
    intro:
      'When someone nearby searches for what you do, you should be the obvious choice. We optimise your Google Business Profile, build consistent local signals, and add the right schema so you rank in Maps and the local pack — then capture those calls and walk-ins.',
    audience:
      'Clinics, stores, and service businesses that depend on customers in a specific city or area.',
    problems: [
      'Competitors outranking you in Google Maps and the local pack',
      'Inconsistent name, address, and phone (NAP) details across the web',
      'Few or poorly managed reviews',
      'No location-relevant content or LocalBusiness schema',
    ],
    deliverables: [
      'Google Business Profile optimisation (categories, services, posts, Q&A, photos)',
      'NAP consistency across citations and your website',
      'LocalBusiness schema and location pages',
      'Review strategy and response workflow',
      'Local rank tracking and reporting',
    ],
    process: ['Local audit', 'Fix NAP & profile', 'Build local signals', 'Track & report'],
    timeline: 'Profile and signal fixes in 2–3 weeks; local pack movement over 1–3 months',
    tools: ['Google Business Profile', 'Google Search Console', 'Maps', 'Schema.org', 'Local citation tools'],
    pricingFactors: ['Number of locations', 'Citation cleanup needed', 'Review volume', 'Content needs'],
    image: '/Maatritva.webp',
    relatedCaseStudies: ['maatritva'],
    relatedServices: ['google-business-profile-optimization', 'seo', 'technical-seo'],
    faqCategories: ['SEO', 'Google Business Profile'],
    glossarySlugs: ['local-seo', 'google-business-profile', 'schema-markup'],
    formHeading: 'Request a Local SEO Audit',
    formCta: 'Boost My Local Ranking',
    cta: {
      heading: 'Own the local pack in your area',
      text: 'Book a free local audit and we will benchmark you against the businesses outranking you.',
    },
  },
  {
    slug: 'website-development',
    metaTitle: 'High-Performance Website Development | React & Next.js | Tag Easy',
    metaDescription:
      'Tag Easy builds fast, SEO-ready, conversion-focused websites in React and Next.js — engineered for Core Web Vitals with analytics and lead tracking built in.',
    h1: 'High-Performance Website Development',
    tagline: 'Fast, conversion-focused sites built to rank.',
    intro:
      'A website should be fast, crawlable, and built to convert from day one. We engineer React and Next.js sites for Core Web Vitals, bake in SEO and structured data, and wire up analytics and lead tracking so the site earns its keep.',
    audience: 'Brands that need a fast, modern, SEO-ready website that converts visitors into enquiries.',
    problems: [
      'Slow, dated sites that hurt conversions and rankings',
      'Sites not built for SEO, schema, or mobile',
      'Beautiful designs that do not actually perform or convert',
      'No analytics or conversion tracking in place',
    ],
    deliverables: [
      'React / Next.js builds engineered for Core Web Vitals',
      'SEO-ready prerendering, schema, and clean URLs',
      'Responsive, accessible, conversion-focused UI',
      'Analytics and conversion tracking baked in',
      'Lead forms with spam protection and instant follow-up hooks',
    ],
    process: ['Discovery', 'Design', 'Build', 'Launch & optimise'],
    timeline: '4–8 weeks depending on scope',
    tools: ['React', 'Next.js', 'Vite', 'Tailwind', 'GA4'],
    pricingFactors: ['Page count', 'Custom design vs template', 'Integrations', 'Content needs'],
    image: '/case-studies/commerce.webp',
    relatedCaseStudies: ['maatritva'],
    relatedServices: ['technical-seo', 'seo', 'analytics-tracking'],
    faqCategories: ['Website Development'],
    glossarySlugs: ['react-seo', 'core-web-vitals', 'technical-seo'],
    formHeading: 'Start a Website Project',
    formCta: 'Start My Website Project',
    cta: {
      heading: 'Build a website that ranks and converts',
      text: 'Tell us about your project and we will scope a fast, SEO-ready build.',
    },
  },
  {
    slug: 'ai-automation',
    metaTitle: 'AI Automation for Marketing & Operations | Tag Easy',
    metaDescription:
      'Tag Easy builds AI automation for voice calling assistants, lead capture, direct lead calling, lead generation, ad creation, CRM, and follow-up workflows.',
    h1: 'AI Automation for Marketing & Operations',
    tagline: 'Voice, lead, ad, and CRM systems that follow up automatically.',
    intro:
      'Most businesses lose leads to slow follow-up and drown in repetitive work. We design connected systems that capture every lead, qualify intent with AI, call or follow up instantly, route it into your CRM, and support ad creation and lead generation — while keeping you in control with clear approval points.',
    audience: 'Real estate teams, doctor clinics, recruiting agencies, and service businesses losing leads to slow follow-up or repetitive sales and marketing work.',
    problems: [
      'Leads going cold before anyone responds',
      'Missed calls and enquiries not being followed up quickly',
      'No assistant for lead capture, qualification, or direct calling',
      'Manual data entry across forms, sheets, and CRM',
      'No single view of marketing and sales activity',
      'Reporting that takes hours to assemble',
    ],
    deliverables: [
      'ElevenLabs-style AI voice calling assistants for enquiries and follow-up',
      'Lead capture, qualification, and CRM routing',
      'Direct lead calling and appointment booking workflows',
      'Lead generation assistance for prospect research and outreach',
      'AI ad creation assistance for copy, angles, and creative briefs',
      'WhatsApp + email follow-up sequences',
      'Connected dashboards and notifications',
      'Custom AI agents for support, research, and classification',
    ],
    process: ['Audit', 'Architect', 'Deploy', 'Optimize'],
    timeline: 'First automation live in 2–4 weeks',
    tools: ['Make / n8n', 'OpenAI / Claude APIs', 'ElevenLabs', 'CRM platforms', 'WhatsApp Business API', 'Google Workspace'],
    pricingFactors: ['Number of workflows', 'Integrations required', 'AI usage volume', 'Ongoing optimisation'],
    image: '/tim.webp',
    relatedCaseStudies: [],
    relatedServices: ['analytics-tracking', 'paid-ads', 'seo'],
    faqCategories: ['AI Automation'],
    glossarySlugs: ['ai-automation', 'lead-automation', 'geo'],
    formHeading: 'Discuss an Automation Workflow',
    formCta: 'Plan My Automation',
    cta: {
      heading: 'Stop losing leads to slow follow-up',
      text: 'Book a free automation audit and we will map your best voice, lead capture, lead calling, lead generation, or ad creation workflow.',
    },
  },
  {
    slug: 'paid-ads',
    metaTitle: 'Paid Ads Management — Google & Meta with ROI Tracking | Tag Easy',
    metaDescription:
      'Tag Easy runs Google and Meta ad campaigns engineered for ROI — with audience flows, retargeting, conversion tracking, and clear cost-per-lead reporting.',
    h1: 'Ads Hub — Paid Ads Management',
    tagline: 'Google & Meta campaigns engineered for ROI.',
    intro:
      'Ad spend should map to leads, not guesswork. We build campaigns across Google and Meta with proper conversion tracking, audience flows, and retargeting, then optimise against cost-per-lead so every rupee is accountable.',
    audience: 'Businesses spending on ads without clear, trackable returns.',
    problems: [
      'Ad spend with no clear cost-per-lead',
      'Poor targeting and wasted budget',
      'No retargeting or conversion tracking',
      'Reporting that does not tie ads to real enquiries',
    ],
    deliverables: [
      'Campaign setup across Google and Meta',
      'Audience flows and retargeting sequences',
      'Conversion tracking and cost-per-lead reporting',
      'Ongoing optimisation and creative iteration',
    ],
    process: ['Account audit', 'Strategy', 'Launch', 'Optimise & report'],
    timeline: 'Live in 1–2 weeks; optimisation ongoing',
    tools: ['Google Ads', 'Meta Ads Manager', 'GA4', 'Google Tag Manager'],
    pricingFactors: ['Ad budget', 'Number of platforms', 'Creative needs', 'Reporting cadence'],
    image: '/case-studies/migration.webp',
    relatedCaseStudies: [],
    relatedServices: ['analytics-tracking', 'ai-automation', 'website-development'],
    faqCategories: ['Paid Ads'],
    glossarySlugs: ['conversion-tracking', 'lead-automation'],
    formHeading: 'Get an Ads Strategy Call',
    formCta: 'Plan My Ad Campaigns',
    cta: {
      heading: 'Make every rupee of ad spend accountable',
      text: 'Book a free ads audit and we will show you where budget is leaking and how to fix it.',
    },
  },
  {
    slug: 'branding',
    metaTitle: 'Branding & Visual Identity for Digital Brands | Tag Easy',
    metaDescription:
      'Tag Easy builds clear, consistent brand identities — logo, palette, typography, and messaging — that work across your website, ads, and Google Business Profile.',
    h1: 'Branding & Visual Identity',
    tagline: 'A consistent brand that earns trust across every touchpoint.',
    intro:
      'Your brand is how customers recognise and trust you across search, ads, and your website. We build a clear visual identity and messaging system that stays consistent everywhere — so every touchpoint reinforces the same, credible brand.',
    audience: 'Brands that look inconsistent across channels or need a credible identity to support growth.',
    problems: [
      'Inconsistent logo, colours, and messaging across channels',
      'A brand that does not reflect the quality of the business',
      'No clear guidelines, so every asset looks different',
      'Visuals that do not translate to a fast, accessible website',
    ],
    deliverables: [
      'Logo, colour palette, and typography system',
      'Brand messaging and tone of voice',
      'Brand guidelines for consistent use',
      'Social, ad, and Google Business Profile visual assets',
    ],
    process: ['Discovery', 'Identity design', 'Guidelines', 'Rollout'],
    timeline: '2–5 weeks depending on scope',
    tools: ['Figma', 'Brand guidelines', 'Design systems'],
    pricingFactors: ['Scope of identity', 'Number of assets', 'Guideline depth', 'Rollout support'],
    image: '/tim.webp',
    relatedCaseStudies: [],
    relatedServices: ['website-development', 'seo', 'paid-ads'],
    faqCategories: ['Website Development'],
    glossarySlugs: [],
    formHeading: 'Discuss Your Brand',
    formCta: 'Start My Brand Project',
    cta: {
      heading: 'Build a brand that looks as good as your work',
      text: 'Tell us about your brand and we will scope an identity that stays consistent everywhere.',
    },
  },
  {
    slug: 'analytics-tracking',
    metaTitle: 'Analytics & Conversion Tracking Setup (GA4) | Tag Easy',
    metaDescription:
      'Tag Easy sets up GA4, conversion tracking, and lead attribution so you can see exactly which channels drive enquiries — without sending sensitive form content.',
    h1: 'Analytics & Conversion Tracking',
    tagline: 'See which channels actually drive leads.',
    intro:
      'You cannot improve what you cannot measure. We set up GA4 with clean conversion events for forms, calls, and WhatsApp, attribute leads back to their source, and build dashboards — all while keeping personal data out of analytics.',
    audience: 'Businesses that spend on marketing but cannot clearly see what is generating leads.',
    problems: [
      'No reliable conversion tracking for forms, calls, or WhatsApp',
      'No idea which channels actually produce enquiries',
      'Marketing decisions made on guesswork',
      'Concern about sending personal data into analytics tools',
    ],
    deliverables: [
      'GA4 setup with conversion events for forms, calls, WhatsApp, and key CTAs',
      'UTM-based lead attribution from first touch to submission',
      'Dashboards showing channel performance and cost-per-lead',
      'Privacy-safe tracking that never sends form content or PII',
    ],
    process: ['Tracking audit', 'Implement events', 'Validate', 'Dashboard & report'],
    timeline: '1–2 weeks for core tracking',
    tools: ['GA4', 'Google Tag Manager', 'Looker Studio', 'UTM tracking'],
    pricingFactors: ['Number of events', 'Platforms to connect', 'Dashboard complexity', 'Reporting cadence'],
    image: '/case-studies/metropolitan.webp',
    relatedCaseStudies: [],
    relatedServices: ['paid-ads', 'ai-automation', 'seo'],
    faqCategories: ['Analytics & Tracking'],
    glossarySlugs: ['conversion-tracking'],
    formHeading: 'Set Up My Tracking',
    formCta: 'Fix My Analytics',
    cta: {
      heading: 'Finally know what drives your leads',
      text: 'Book a free tracking review and we will show you the gaps in your current setup.',
    },
  },
  {
    slug: 'google-business-profile-optimization',
    metaTitle: 'Google Business Profile Optimisation Services | Tag Easy',
    metaDescription:
      'Tag Easy optimises your Google Business Profile — categories, services, posts, photos, Q&A, and reviews — and keeps NAP consistent to strengthen local ranking.',
    h1: 'Google Business Profile Optimisation',
    tagline: 'Turn your Google listing into a local lead engine.',
    intro:
      'Your Google Business Profile is often the first thing local customers see — and a major local ranking factor. We optimise every part of it and keep your details consistent with your website and schema so you rank higher in Maps and the local pack.',
    audience: 'Local businesses that rely on Google Maps and Search to be found by nearby customers.',
    problems: [
      'An incomplete or poorly categorised Google Business Profile',
      'Inconsistent NAP between Google, your site, and citations',
      'Few reviews and no response process',
      'No posts, photos, or Q&A keeping the profile active',
    ],
    deliverables: [
      'Profile optimisation: categories, services, attributes, and description',
      'Regular posts, photos, and Q&A management',
      'NAP consistency with your website and LocalBusiness schema',
      'Review generation and response workflow',
      'Insights tracking on calls, directions, and clicks',
    ],
    process: ['Profile audit', 'Optimise & align NAP', 'Activate posts & reviews', 'Track insights'],
    timeline: 'Initial optimisation in 1–2 weeks; ongoing management monthly',
    tools: ['Google Business Profile', 'Google Maps', 'Schema.org', 'Review tools'],
    pricingFactors: ['Number of locations', 'Review strategy', 'Posting cadence', 'Citation cleanup'],
    image: '/Maatritva.webp',
    relatedCaseStudies: ['maatritva'],
    relatedServices: ['local-seo', 'seo', 'analytics-tracking'],
    faqCategories: ['Google Business Profile', 'SEO'],
    glossarySlugs: ['google-business-profile', 'local-seo'],
    formHeading: 'Optimise My Google Profile',
    formCta: 'Improve My Listing',
    cta: {
      heading: 'Get found first in Google Maps',
      text: 'Book a free profile review and we will show you exactly what to fix to rank locally.',
    },
  },
];

export const getServiceDetail = (slug) => serviceDetailPages.find((s) => s.slug === slug);

export const getIndexableServiceDetails = () => serviceDetailPages;

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
