// Topic-cluster hub pages (/learn/<slug>) for internal linking and GEO.
//
// Each hub gathers everything Tag Easy publishes on a topic: a short intro and
// answer, related blog posts (matched by keyword hints), FAQs, glossary terms,
// services, and case studies. This builds topical authority and deep, crawlable
// internal-link paths. Slugs/categories map to real data in the other libs.

export const learnHubs = [
  {
    slug: 'seo',
    name: 'SEO',
    metaTitle: 'Learn SEO — Guides, FAQs & Resources | Tag Easy',
    metaDescription:
      'Tag Easy\'s SEO hub: technical SEO, React/SPA indexing, schema, Core Web Vitals, and content — with guides, FAQs, glossary terms, and the services that deliver them.',
    h1: 'Learn SEO',
    tagline: 'Everything we publish on ranking, indexing, and being found.',
    shortAnswer:
      'SEO is the combination of a crawlable technical foundation, content that answers real queries, and authority/local signals that win your market. This hub gathers Tag Easy\'s SEO guides, FAQs, and definitions — from React indexing and schema to Core Web Vitals — alongside the services that implement them.',
    intro:
      'SEO is not one task — it is a system. This hub brings together our guides, FAQs, glossary terms, and services across technical, on-page, and local SEO so you can go from understanding a problem to fixing it.',
    blogKeywords: ['seo', 'react seo', 'schema', 'technical seo', 'indexing'],
    faqCategories: ['SEO', 'Pricing & Timelines'],
    glossarySlugs: ['technical-seo', 'react-seo', 'schema-markup', 'core-web-vitals', 'crawl-budget', 'indexnow'],
    serviceSlugs: ['seo', 'technical-seo', 'local-seo'],
    relatedCaseStudies: ['maatritva'],
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    metaTitle: 'Learn Local SEO — Map Pack, NAP & GBP Guides | Tag Easy',
    metaDescription:
      'Tag Easy\'s local SEO hub: win the map pack and "near me" searches with Google Business Profile, NAP consistency, schema, reviews, and local content.',
    h1: 'Learn Local SEO',
    tagline: 'How to win the map pack and "near me" searches.',
    shortAnswer:
      'Local SEO helps a business appear in Google Maps and the local pack when nearby customers search. It combines Google Business Profile optimisation, consistent name-address-phone (NAP) signals, LocalBusiness schema, reviews, and location-relevant content. This hub gathers our local SEO guides, FAQs, definitions, and services.',
    intro:
      'For local businesses, the map pack decides who gets the call. This hub collects our local SEO guides, FAQs, glossary terms, and the services that win and hold local rankings.',
    blogKeywords: ['local seo', 'google business profile', 'near me', 'nap', 'map pack'],
    faqCategories: ['Google Business Profile', 'SEO'],
    glossarySlugs: ['local-seo', 'google-business-profile', 'schema-markup'],
    serviceSlugs: ['local-seo', 'google-business-profile-optimization', 'seo'],
    relatedCaseStudies: ['maatritva'],
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    metaTitle: 'Learn AI Automation — Lead & Workflow Guides | Tag Easy',
    metaDescription:
      'Tag Easy\'s AI automation hub: lead capture, qualification, follow-up, CRM routing, and reporting. Guides, FAQs, glossary terms, and the services that build them.',
    h1: 'Learn AI Automation',
    tagline: 'Systems that capture, qualify, and follow up automatically.',
    shortAnswer:
      'AI automation connects your marketing, sales, and operations tools into one system that captures leads, qualifies intent, updates the CRM, follows up across WhatsApp and email, and refreshes reports — with human approval points where they matter. This hub gathers our automation guides, FAQs, and services.',
    intro:
      'Automation should remove busywork without removing judgement. This hub brings together our AI automation guides, FAQs, glossary terms, and the services that design and deploy these systems.',
    blogKeywords: ['ai automation', 'lead automation', 'crm', 'follow-up', 'geo'],
    faqCategories: ['AI Automation', 'Working With Tag Easy'],
    glossarySlugs: ['ai-automation', 'lead-automation', 'geo', 'conversion-tracking'],
    serviceSlugs: ['ai-automation', 'analytics-tracking', 'paid-ads'],
    relatedCaseStudies: [],
  },
  {
    slug: 'website-development',
    name: 'Website Development',
    metaTitle: 'Learn Website Development — Fast, SEO-Ready Builds | Tag Easy',
    metaDescription:
      'Tag Easy\'s website development hub: fast, conversion-focused React and Next.js builds engineered for Core Web Vitals and SEO. Guides, FAQs, glossary, and services.',
    h1: 'Learn Website Development',
    tagline: 'Building sites that are fast, crawlable, and built to convert.',
    shortAnswer:
      'A high-performing website is fast on mobile, crawlable, and built to convert — engineered for Core Web Vitals with SEO, schema, and clean URLs from day one. This hub gathers our web development guides, FAQs, definitions, and the services that build sites this way.',
    intro:
      'A website should earn its keep. This hub collects our guides, FAQs, glossary terms, and services on building fast, SEO-ready, conversion-focused websites.',
    blogKeywords: ['react seo', 'core web vitals', 'performance', 'website', 'rendering'],
    faqCategories: ['Website Development', 'SEO'],
    glossarySlugs: ['react-seo', 'core-web-vitals', 'technical-seo'],
    serviceSlugs: ['website-development', 'technical-seo', 'seo'],
    relatedCaseStudies: ['maatritva'],
  },
  {
    slug: 'google-business-profile',
    name: 'Google Business Profile',
    metaTitle: 'Learn Google Business Profile Optimisation | Tag Easy',
    metaDescription:
      'Tag Easy\'s Google Business Profile hub: optimise categories, services, posts, photos, Q&A, and reviews, and keep NAP consistent to win the local pack and Maps.',
    h1: 'Learn Google Business Profile',
    tagline: 'Turn your Google listing into a local lead engine.',
    shortAnswer:
      'A Google Business Profile is the free Google listing that controls how a business appears in Search and Maps. Optimising it — accurate categories, complete services and photos, active posts and Q&A, steady reviews, and consistent NAP — is the foundation of local visibility. This hub gathers our GBP guides, FAQs, and services.',
    intro:
      'Your Google Business Profile is often the first thing local customers see. This hub brings together our guides, FAQs, glossary terms, and services for optimising it and the local signals around it.',
    blogKeywords: ['google business profile', 'gbp optimization', 'local seo', 'map pack', 'reviews'],
    faqCategories: ['Google Business Profile', 'SEO'],
    glossarySlugs: ['google-business-profile', 'local-seo', 'schema-markup'],
    serviceSlugs: ['google-business-profile-optimization', 'local-seo', 'seo'],
    relatedCaseStudies: ['maatritva'],
  },
  {
    slug: 'analytics-tracking',
    name: 'Analytics & Tracking',
    metaTitle: 'Learn Analytics & Conversion Tracking (GA4) | Tag Easy',
    metaDescription:
      'Tag Easy\'s analytics hub: GA4, conversion tracking, and lead attribution so you see which channels drive enquiries — without sending sensitive form content.',
    h1: 'Learn Analytics & Tracking',
    tagline: 'See which channels actually drive leads.',
    shortAnswer:
      'Analytics and conversion tracking tie events — form submissions, calls, WhatsApp clicks — to real business actions, enabling cost-per-lead reporting and data-driven decisions without sending personal data into analytics tools. This hub gathers our analytics guides, FAQs, definitions, and the services that set them up.',
    intro:
      'You cannot improve what you cannot measure. This hub collects our guides, FAQs, glossary terms, and services on GA4, conversion tracking, and privacy-safe lead attribution.',
    blogKeywords: ['conversion tracking', 'analytics', 'ga4', 'attribution', 'reporting'],
    faqCategories: ['Analytics & Tracking', 'Paid Ads'],
    glossarySlugs: ['conversion-tracking', 'lead-automation'],
    serviceSlugs: ['analytics-tracking', 'paid-ads', 'ai-automation'],
    relatedCaseStudies: [],
  },
];

export const getLearnHub = (slug) => learnHubs.find((h) => h.slug === slug);

export const getLearnHubs = () => learnHubs;
