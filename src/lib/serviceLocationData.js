// Service + location combination pages (/services/<service>/<location>).
//
// High-intent local landing pages (e.g. "SEO in Kolkata"). Each is UNIQUE,
// non-doorway content: a localised explanation of the service, genuine local
// proof/context, the service area, a NAP block that matches schema, and FAQs.
// `service` references a serviceDetailPages slug; `location` references a
// locationsData slug. Both must resolve, or the route renders NotFound.

export const serviceLocations = [
  {
    service: 'seo',
    location: 'kolkata',
    metaTitle: 'SEO Services in Kolkata — Rank, Get Found, Convert | Tag Easy',
    metaDescription:
      'Kolkata SEO services from Tag Easy: technical, on-page, and local SEO that gets your site indexed, ranked for high-intent Kolkata searches, and converting into leads.',
    h1: 'SEO Services in Kolkata',
    tagline: 'Full-funnel SEO built for one of India\'s most competitive local markets.',
    shortAnswer:
      'SEO in Kolkata means winning a crowded local market — healthcare, education, real estate, and retail all compete for the same searches. We combine a crawlable technical foundation, content that answers real queries, and strong local signals (Google Business Profile, NAP consistency, LocalBusiness schema) so your site ranks for high-intent Kolkata searches and turns them into enquiries.',
    intro:
      'Kolkata is a dense, competitive search market where ranking is less about spending more and more about technical foundations, local signals, and content that answers what people actually search. We build all three and tie them to lead tracking so you can see Kolkata search turn into revenue.',
    localProof:
      'From our Kolkata base we have taken a regional healthcare brand — Maatritva Fertility IVF — to #1 positioning for high-intent fertility searches across the city and beyond. We understand Kolkata\'s bilingual (Bengali + English) search behaviour, neighbourhood-level competition from Salt Lake and New Town to Behala and the northern suburbs, and the review dynamics that drive the local pack here.',
    serviceExplanation: [
      'We start with a technical audit — crawlability, indexing, canonicals, Core Web Vitals — then prioritise the fixes that move rankings fastest. For React and modern sites, that usually means making every route render real, indexable HTML.',
      'On top of the foundation we build on-page SEO (titles, structure, internal linking) and local SEO (an optimised Google Business Profile, consistent NAP, and LocalBusiness schema) so you rank both in classic results and the Kolkata local pack.',
      'Everything ties back to conversion tracking, so you see which Kolkata searches generate calls and form submissions — not just rankings.',
    ],
    problemSolution: [
      { problem: 'Not ranking for competitive Kolkata searches', solution: 'Technical + on-page SEO prioritised by local search impact' },
      { problem: 'Losing "near me" queries to local competitors', solution: 'Local SEO, Google Business Profile, and LocalBusiness schema' },
      { problem: 'Rankings that do not turn into enquiries', solution: 'Conversion tracking from Kolkata search to calls and forms' },
    ],
    faqCategories: ['SEO', 'Google Business Profile', 'Pricing & Timelines'],
    glossarySlugs: ['technical-seo', 'local-seo', 'schema-markup', 'core-web-vitals'],
    relatedCaseStudies: ['maatritva'],
    formHeading: 'Request a Kolkata SEO Audit',
    formCta: 'Get My SEO Audit',
    cta: {
      heading: 'Outrank your Kolkata competitors',
      text: 'Book a free SEO audit and we will benchmark you against the Kolkata businesses outranking you today.',
    },
  },
  {
    service: 'website-development',
    location: 'kolkata',
    metaTitle: 'Website Development in Kolkata — Fast, SEO-Ready Sites | Tag Easy',
    metaDescription:
      'Kolkata website development by Tag Easy: fast, conversion-focused React and Next.js sites engineered for Core Web Vitals, SEO, and lead tracking from day one.',
    h1: 'Website Development in Kolkata',
    tagline: 'Fast, SEO-ready websites built to rank and convert.',
    shortAnswer:
      'Website development in Kolkata should produce a site that is fast on mobile, crawlable, and built to convert. We engineer React and Next.js sites for Core Web Vitals, bake in SEO, schema, and clean URLs, and wire up analytics and lead tracking — so a Kolkata business gets a site that earns enquiries, not just one that looks good.',
    intro:
      'A website should be fast, crawlable, and built to convert from day one. We build React and Next.js sites for Kolkata businesses that are engineered for Core Web Vitals, SEO-ready out of the box, and instrumented so you can see the leads they generate.',
    localProof:
      'We build and maintain high-performance sites for Kolkata and regional brands, including the multi-domain web presence behind the Maatritva Fertility IVF growth case study. Because the team is local, project communication is fast — calls, WhatsApp, and shared progress — without the distance that slows remote-only builds.',
    serviceExplanation: [
      'We scope the build around your goals, then design and engineer a fast, responsive, accessible site — prerendered or server-rendered so every page ships real, indexable HTML.',
      'SEO, structured data, and clean canonical URLs are built in, not bolted on, so the site is ready to rank the day it launches.',
      'We bake in analytics and lead forms with spam protection and instant follow-up hooks, so the site is a measurable lead engine from launch.',
    ],
    problemSolution: [
      { problem: 'Slow, dated site hurting conversions', solution: 'A fast React/Next.js rebuild engineered for Core Web Vitals' },
      { problem: 'Site not built for SEO or mobile', solution: 'Prerendering, schema, clean URLs, and mobile-first design baked in' },
      { problem: 'No tracking of leads from the site', solution: 'Analytics and conversion-tracked lead forms from day one' },
    ],
    faqCategories: ['Website Development', 'SEO', 'Pricing & Timelines'],
    glossarySlugs: ['react-seo', 'core-web-vitals', 'technical-seo'],
    relatedCaseStudies: ['maatritva'],
    formHeading: 'Start a Kolkata Website Project',
    formCta: 'Start My Website Project',
    cta: {
      heading: 'Launch a website that ranks and converts',
      text: 'Tell us about your project and we will scope a fast, SEO-ready build for your Kolkata business.',
    },
  },
  {
    service: 'ai-automation',
    location: 'kolkata',
    metaTitle: 'AI Automation Services in Kolkata — Lead & Workflow Automation | Tag Easy',
    metaDescription:
      'Kolkata AI automation from Tag Easy: lead capture, qualification, voice and WhatsApp follow-up, CRM routing, and reporting workflows that stop leads going cold.',
    h1: 'AI Automation in Kolkata',
    tagline: 'Capture, qualify, and follow up with every lead — automatically.',
    shortAnswer:
      'AI automation for Kolkata businesses connects your forms, ads, CRM, and messaging into one system that captures every lead, qualifies intent with AI, follows up instantly over WhatsApp, email, or voice, and routes it to the right person — so enquiries do not go cold while a competitor responds first.',
    intro:
      'Most Kolkata businesses lose leads to slow follow-up and drown in repetitive work. We design connected systems that capture every lead, qualify intent with AI, follow up instantly, and route it into your CRM — while keeping you in control with clear approval points.',
    localProof:
      'We work with Kolkata service businesses — clinics, real estate teams, and agencies — where speed-to-lead decides who wins the customer. Being local means we can sit with your sales team, map the real workflow, and tune automations to how enquiries actually arrive here: a mix of calls, WhatsApp, and web forms.',
    serviceExplanation: [
      'We audit how leads and repetitive work flow through your business today, then design the highest-impact automation first — usually instant lead capture and follow-up.',
      'We connect your tools (forms, ads, CRM, WhatsApp Business, voice) with an AI layer that qualifies intent, drafts responses, and escalates anything unusual to a human.',
      'You get connected dashboards and notifications, plus clear approval points so automation removes busywork without removing judgement.',
    ],
    problemSolution: [
      { problem: 'Leads going cold before anyone replies', solution: 'Instant AI capture, qualification, and WhatsApp/voice follow-up' },
      { problem: 'Manual data entry across tools', solution: 'Automated CRM routing and record updates' },
      { problem: 'No single view of sales activity', solution: 'Connected dashboards and notifications' },
    ],
    faqCategories: ['AI Automation', 'Working With Tag Easy', 'Pricing & Timelines'],
    glossarySlugs: ['ai-automation', 'lead-automation', 'conversion-tracking'],
    relatedCaseStudies: [],
    formHeading: 'Plan a Kolkata Automation Workflow',
    formCta: 'Plan My Automation',
    cta: {
      heading: 'Stop losing Kolkata leads to slow follow-up',
      text: 'Book a free automation audit and we will map your highest-impact lead or workflow automation.',
    },
  },
  {
    service: 'google-business-profile-optimization',
    location: 'kolkata',
    metaTitle: 'Google Business Profile Optimisation in Kolkata | Tag Easy',
    metaDescription:
      'Tag Easy optimises Google Business Profiles for Kolkata businesses — categories, services, posts, photos, Q&A, reviews, and NAP consistency — to win the local pack.',
    h1: 'Google Business Profile Optimisation in Kolkata',
    tagline: 'Turn your Google listing into a Kolkata lead engine.',
    shortAnswer:
      'Google Business Profile optimisation in Kolkata means making your listing the obvious local choice: the right primary category, complete services and photos, active posts and Q&A, a steady flow of reviews, and NAP details that match your website and schema — so you rank in Google Maps and the Kolkata local pack and earn more calls and direction requests.',
    intro:
      'Your Google Business Profile is often the first thing Kolkata customers see — and a major local ranking factor. We optimise every part of it and keep your details consistent with your website and schema so you rank higher in Maps and the local pack across the city.',
    localProof:
      'Local pack competition in Kolkata is fierce and review-driven, especially in healthcare, food, and professional services. We have run Google Business Profile and local SEO for Kolkata brands — including the Maatritva fertility case study — and understand the categories, review patterns, and bilingual search behaviour that move local rankings here.',
    serviceExplanation: [
      'We audit your current profile, fix categories, services, attributes, and the business description, and align your NAP with your website and LocalBusiness schema.',
      'We keep the profile active with posts, photos, and seeded Q&A, and set up a review-generation and response workflow that builds trust signals.',
      'We track calls, direction requests, and clicks so you can see exactly how the profile is performing in the Kolkata market.',
    ],
    problemSolution: [
      { problem: 'Outranked in the Kolkata map pack', solution: 'Full profile optimisation plus supporting local SEO signals' },
      { problem: 'Inconsistent NAP across listings', solution: 'NAP cleanup aligned with your site and LocalBusiness schema' },
      { problem: 'Few reviews, no response process', solution: 'A review generation and response workflow' },
    ],
    faqCategories: ['Google Business Profile', 'SEO', 'Working With Tag Easy'],
    glossarySlugs: ['google-business-profile', 'local-seo', 'schema-markup'],
    relatedCaseStudies: ['maatritva'],
    formHeading: 'Optimise My Kolkata Profile',
    formCta: 'Improve My Listing',
    cta: {
      heading: 'Get found first in Kolkata Maps',
      text: 'Book a free profile review and we will show you exactly what to fix to rank in the Kolkata local pack.',
    },
  },
  {
    service: 'technical-seo',
    location: 'india',
    metaTitle: 'Technical SEO Services in India — React & Modern Sites | Tag Easy',
    metaDescription:
      'Tag Easy delivers technical SEO across India: fixing indexing, crawlability, Core Web Vitals, and structured data on React and modern sites — remotely, nationwide.',
    h1: 'Technical SEO Services in India',
    tagline: 'Make every route render real, indexable HTML — anywhere in India.',
    shortAnswer:
      'Technical SEO in India fixes the foundation that decides whether a site can rank at all: crawlability, indexing, canonicals, Core Web Vitals, and structured data. Because it is delivered remotely, we work with brands in Delhi, Mumbai, Bengaluru, Hyderabad, and beyond with the same depth as our local Kolkata clients — making every route crawlable, indexable, and fast.',
    intro:
      'Most of what moves the needle in technical SEO — prerendering, schema, site speed, clean canonicals — is delivered remotely. That lets us fix the technical foundation for brands across India with the same rigour we bring to local Kolkata work.',
    localProof:
      'We operate from Kolkata and serve clients nationwide and in remote markets worldwide. Our technical SEO work centres on the SPA indexing problem common to Indian React and Next.js builds: every route shipping one empty shell, so Google indexes only the homepage. We make each route ship real HTML, then submit and monitor in Search Console and via IndexNow.',
    serviceExplanation: [
      'We crawl and audit your site, identify the pages Google cannot see or index, and prioritise fixes by impact.',
      'We implement per-route prerendering or SSR, clean canonicals, valid structured data, a complete sitemap with lastmod, and Core Web Vitals improvements.',
      'We submit to Google Search Console and push changes via IndexNow, then monitor indexing and rankings so you can see the recovery.',
    ],
    problemSolution: [
      { problem: 'Only the homepage is indexed', solution: 'Per-route prerendering/SSR so every page ships real HTML' },
      { problem: 'Invalid or missing structured data', solution: 'A single, valid schema graph across the site' },
      { problem: 'Slow Core Web Vitals on mobile', solution: 'Performance and image optimisation engineering' },
    ],
    faqCategories: ['SEO', 'Working With Tag Easy', 'Pricing & Timelines'],
    glossarySlugs: ['technical-seo', 'react-seo', 'crawl-budget', 'core-web-vitals', 'indexnow'],
    relatedCaseStudies: ['maatritva'],
    formHeading: 'Request a Technical SEO Audit',
    formCta: 'Audit My Site',
    cta: {
      heading: 'Stop losing pages to the SPA indexing problem',
      text: 'We will crawl your site and show you which pages are invisible to Google across India — and why.',
    },
  },
];

const key = (service, location) => `${service}/${location}`;

export const getServiceLocation = (service, location) =>
  serviceLocations.find((sl) => sl.service === service && sl.location === location);

export const getServiceLocationKey = key;

export const getIndexableServiceLocations = () => serviceLocations;
