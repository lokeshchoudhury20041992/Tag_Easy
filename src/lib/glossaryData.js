// Task 14 — Glossary data for AI/GEO visibility.
// Each term has a short definition (extractable), an expanded explanation, a
// related service path, and a lastUpdated date. Rendered at /glossary with
// DefinedTermSet schema and clean per-term anchors.

export const glossaryTerms = [
  {
    term: 'Technical SEO',
    slug: 'technical-seo',
    short: 'The practice of optimising a website\'s infrastructure so search engines can crawl, render, and index it efficiently.',
    expanded:
      'Technical SEO covers crawlability, indexability, site speed (Core Web Vitals), structured data, canonical URLs, sitemaps, and mobile performance. For React/SPA sites it also means prerendering or server-side rendering so each route ships real HTML.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'AI Automation',
    slug: 'ai-automation',
    short: 'Connecting business tools with AI and APIs so repetitive marketing, sales, and operations tasks run automatically.',
    expanded:
      'AI automation captures leads, qualifies intent, updates CRMs, triggers follow-ups, and refreshes reports without manual work, while keeping human approval points for important decisions.',
    relatedService: '/ai-automation',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Local SEO',
    slug: 'local-seo',
    short: 'Optimising a business to appear in location-based and "near me" search results.',
    expanded:
      'Local SEO combines Google Business Profile optimisation, consistent NAP (name, address, phone) signals, LocalBusiness schema, local content, and reviews to win high-intent local queries.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Google Business Profile',
    slug: 'google-business-profile',
    short: 'A free Google listing that controls how a business appears in Google Search and Maps.',
    expanded:
      'A well-optimised Google Business Profile (categories, services, posts, photos, Q&A, and reviews) is the foundation of local visibility and feeds into the local pack and Maps rankings.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Conversion Tracking',
    slug: 'conversion-tracking',
    short: 'Measuring the actions that matter — form submissions, calls, and purchases — so marketing spend maps to outcomes.',
    expanded:
      'Conversion tracking ties analytics events (in GA4 and ad platforms) to real business actions, enabling cost-per-lead reporting and data-driven optimisation.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Crawl Budget',
    slug: 'crawl-budget',
    short: 'The number of pages a search engine will crawl on a site within a given time.',
    expanded:
      'Crawl budget matters for larger sites. Removing thin/duplicate pages, fixing soft 404s, and maintaining a clean sitemap helps search engines spend crawl budget on pages that matter.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'IndexNow',
    slug: 'indexnow',
    short: 'A protocol that instantly notifies search engines (like Bing) when URLs are added, updated, or removed.',
    expanded:
      'IndexNow speeds up discovery by pushing changed URLs to participating search engines rather than waiting for them to recrawl. It uses a public key file hosted at the site root.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Schema Markup',
    slug: 'schema-markup',
    short: 'Structured data (JSON-LD) that helps search engines and AI engines understand page content.',
    expanded:
      'Schema markup uses schema.org types (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Article, Person) to enable rich results and improve eligibility for AI answer citations.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'React SEO',
    slug: 'react-seo',
    short: 'Making React/single-page applications fully crawlable and indexable by search engines.',
    expanded:
      'Because React renders in the browser, raw SPA HTML is often empty. React SEO uses prerendering or SSR, react-helmet for per-route meta, clean canonicals, and complete sitemaps so each route is indexable.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Lead Automation',
    slug: 'lead-automation',
    short: 'Automatically capturing, qualifying, routing, and following up with leads.',
    expanded:
      'Lead automation removes the delay between a lead arriving and a human responding by routing leads into the CRM, scoring intent, and triggering instant WhatsApp/email follow-up.',
    relatedService: '/ai-automation',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Generative Engine Optimization (GEO)',
    slug: 'geo',
    short: 'Optimising content and structure so AI answer engines (ChatGPT, Perplexity, Google AI Overviews) cite your business.',
    expanded:
      'GEO emphasises clear factual claims, structured data, FAQ and definition blocks, authoritative entities (sameAs links), and AI-readable files like llms.txt so generative engines can confidently surface and cite your content.',
    relatedService: '/ai-automation',
    lastUpdated: '2026-06-06',
  },
  {
    term: 'Core Web Vitals',
    slug: 'core-web-vitals',
    short: 'Google\'s set of metrics (LCP, INP, CLS) that measure real-world page experience.',
    expanded:
      'Core Web Vitals measure loading (Largest Contentful Paint), interactivity (Interaction to Next Paint), and visual stability (Cumulative Layout Shift). They are a ranking and UX signal, especially on mobile.',
    relatedService: '/services',
    lastUpdated: '2026-06-06',
  },
];
