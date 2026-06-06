// Tasks 11 & 15 — Central FAQ data.
// One source for every FAQ shown on-site. Each FAQ has a `category` (used by the
// /faqs hub) and concise, factual, AI-extractable answers. Service pages pull a
// filtered subset via `getFaqsByCategory` / `getFaqsByCategories`; the FAQ hub
// renders everything grouped by category.

export const faqs = [
  // --- SEO ---
  {
    category: 'SEO',
    question: 'How long does a technical SEO fix take for a React website?',
    answer:
      'Most priority fixes — crawlability, indexing, schema, and Core Web Vitals — are completed in 2–4 weeks after we get crawl and deployment access. Ranking improvements then compound over the following 2–3 months.',
  },
  {
    category: 'SEO',
    question: 'Why are my React / single-page app pages not getting indexed?',
    answer:
      'SPAs often ship one HTML shell for every route, so Google sees duplicate or empty pages. We fix this with per-route prerendering, clean canonicals, correct robots directives, and a complete sitemap so each page is crawlable and indexable.',
  },
  {
    category: 'SEO',
    question: 'Do you guarantee first-page Google rankings?',
    answer:
      'No reputable agency can guarantee specific rankings. We guarantee the technical foundation, content structure, and tracking that make ranking possible, and we report on measurable progress every month.',
  },
  // --- Local SEO ---
  {
    category: 'SEO',
    question: 'Can you help my business rank for "near me" and local searches?',
    answer:
      'Yes. We optimise your Google Business Profile, build consistent name-address-phone (NAP) signals, add LocalBusiness schema, and create location-relevant content so you appear for high-intent local queries.',
  },
  // --- AI Automation ---
  {
    category: 'AI Automation',
    question: 'What is AI automation for a business?',
    answer:
      'AI automation connects your marketing, sales, and operations tools into one system that captures leads, qualifies intent, updates your CRM, follows up across WhatsApp and email, and refreshes reports — with human approval points where they matter.',
  },
  {
    category: 'AI Automation',
    question: 'How long does an AI automation project take?',
    answer:
      'A first working automation is usually live within 2–4 weeks. We start with a focused, high-impact workflow (such as lead capture and follow-up), prove the value, then expand the system.',
  },
  {
    category: 'AI Automation',
    question: 'What is included in an AI automation audit?',
    answer:
      'We map your current manual work, revenue leaks, and repeated tasks across marketing, sales, and operations, then propose the fastest automation wins with expected impact and a build plan.',
  },
  {
    category: 'AI Automation',
    question: 'Will automation replace my team?',
    answer:
      'No. Automation removes repetitive work so your team focuses on higher-value tasks. We build clear human control and approval points into every system.',
  },
  // --- Website Development ---
  {
    category: 'Website Development',
    question: 'What technology do you build websites with?',
    answer:
      'We build high-performance sites with React, Next.js, and modern tooling, engineered for Core Web Vitals, SEO, and conversion. We can also work within your existing stack.',
  },
  {
    category: 'Website Development',
    question: 'Will my new website be SEO-ready and fast on mobile?',
    answer:
      'Yes. Every build ships with prerendered/SSR HTML, optimised images, lazy loading, structured data, and clean canonicals so it is fast on mobile and crawlable from day one.',
  },
  // --- Google Business Profile ---
  {
    category: 'Google Business Profile',
    question: 'Do you manage Google Business Profile optimisation?',
    answer:
      'Yes. We optimise categories, services, posts, photos, Q&A, and reviews, and keep NAP details consistent with your website and schema to strengthen local ranking.',
  },
  // --- Paid Ads ---
  {
    category: 'Paid Ads',
    question: 'Which ad platforms do you manage?',
    answer:
      'We run and automate Google Ads and Meta (Facebook/Instagram) campaigns, including audience flows, retargeting, conversion tracking, and performance reporting.',
  },
  {
    category: 'Paid Ads',
    question: 'How do you track whether ads actually generate leads?',
    answer:
      'We set up conversion tracking in GA4 and the ad platforms, tie events to form submissions and calls, and report cost-per-lead so spend maps to real business outcomes.',
  },
  // --- Analytics & Tracking ---
  {
    category: 'Analytics & Tracking',
    question: 'What analytics and tracking do you set up?',
    answer:
      'We configure GA4 with conversion events for form submissions, calls, WhatsApp, and key CTAs, plus dashboards so you can see which channels drive leads — without sending sensitive form content.',
  },
  // --- Pricing & Timelines ---
  {
    category: 'Pricing & Timelines',
    question: 'How much do Tag Easy services cost?',
    answer:
      'Pricing depends on scope, complexity, and timeline. We offer standard pricing for a top-tier build, adjustable to your needs. Use the pricing calculator on our Services page or book a call for a tailored quote.',
  },
  {
    category: 'Pricing & Timelines',
    question: 'How quickly can we start?',
    answer:
      'We typically begin within a week of a signed scope. Book a free audit and we will outline a timeline for your specific project.',
  },
  // --- Working With Tag Easy ---
  {
    category: 'Working With Tag Easy',
    question: 'Where is Tag Easy based and who do you work with?',
    answer:
      'Tag Easy (TAG EASY LLP) is based in Kolkata, West Bengal, India, and works with businesses locally and in remote markets worldwide across healthcare, e-commerce, SaaS, fintech, real estate, education, and more.',
  },
  {
    category: 'Working With Tag Easy',
    question: 'How do we get started?',
    answer:
      'Book a free technical audit or contact us with your goals. We respond within 24 hours, run a discovery and audit, then propose a clear scope, timeline, and the fastest high-impact wins.',
  },
];

export const faqCategories = [
  'SEO',
  'AI Automation',
  'Website Development',
  'Google Business Profile',
  'Paid Ads',
  'Analytics & Tracking',
  'Pricing & Timelines',
  'Working With Tag Easy',
];

export const getFaqsByCategory = (category) =>
  faqs.filter((f) => f.category === category);

export const getFaqsByCategories = (categories) =>
  faqs.filter((f) => categories.includes(f.category));
