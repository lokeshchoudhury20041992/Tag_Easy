// Phase 2 · Task 2 — Location landing page data (local SEO).
//
// Each entry produces a genuine, non-doorway location page at /locations/<slug>
// with real local context, a NAP block matching the Organization/LocalBusiness
// schema, the services offered there, and internal links to service + contact
// pages. Content is location-specific (not spun) so pages stay useful and
// AI-citable. NAP here MUST match src/lib/seoSchema.js (address/phone/email).

export const NAP = {
  name: 'Tag Easy',
  legalName: 'TAG EASY LLP',
  addressLocality: 'Kolkata',
  addressRegion: 'West Bengal',
  postalRegion: 'West Bengal',
  country: 'India',
  countryCode: 'IN',
  phone: '+91 79807 61008',
  phoneHref: 'tel:+917980761008',
  email: 'lokesh.choudhury@tageasy.org',
  hours: 'Monday–Friday, 9:00 AM – 7:00 PM IST',
};

// Service slugs that map to /services/<slug> detail pages (servicesData.js).
const ALL_LOCAL_SERVICES = [
  'seo',
  'local-seo',
  'technical-seo',
  'google-business-profile-optimization',
  'website-development',
  'ai-automation',
  'paid-ads',
  'analytics-tracking',
];

export const locations = [
  {
    slug: 'kolkata',
    name: 'Kolkata',
    region: 'West Bengal',
    country: 'India',
    type: 'City',
    title: 'Digital Marketing, SEO & AI Automation Agency in Kolkata | Tag Easy',
    metaDescription:
      'Kolkata-based agency Tag Easy delivers local SEO, technical SEO, AI automation, websites, and Google Business Profile optimisation for businesses across the city.',
    heading: 'Digital Marketing & SEO Agency in Kolkata',
    intro:
      'Tag Easy (TAG EASY LLP) is a digital engineering team headquartered in Kolkata, West Bengal. We help Kolkata businesses get found in local search, rank for high-intent "near me" queries, and convert that visibility into real enquiries with fast websites and automated follow-up.',
    context: [
      'Kolkata is one of India\'s most competitive local markets — healthcare, education, real estate, retail, and professional services all fight for the same high-intent searches. Winning here is less about spending more and more about technical foundations, a fully optimised Google Business Profile, and consistent local signals.',
      'We work with clinics, institutes, and growing brands across neighbourhoods from Salt Lake and New Town to Behala, Gariahat, and the northern suburbs. Our Maatritva Fertility IVF case study shows how a Kolkata healthcare brand reached #1 regional positioning for fertility searches.',
      'Because the team is local, we understand Bengali-and-English bilingual search behaviour, regional competitor patterns, and the review dynamics that drive the Kolkata local pack.',
    ],
    services: ALL_LOCAL_SERVICES,
    areaServed: ['Kolkata', 'Salt Lake', 'New Town', 'Howrah', 'West Bengal'],
    faqCategories: ['SEO', 'Google Business Profile', 'Working With Tag Easy'],
    relatedCaseStudies: ['maatritva'],
    indexable: true,
  },
  {
    slug: 'north-dumdum',
    name: 'North Dumdum',
    region: 'West Bengal',
    country: 'India',
    type: 'City',
    title: 'SEO & Digital Marketing Agency in North Dumdum | Tag Easy',
    metaDescription:
      'Local SEO, Google Business Profile optimisation, websites, and AI automation for North Dumdum and the northern Kolkata suburbs — delivered by Tag Easy.',
    heading: 'SEO & Digital Marketing in North Dumdum',
    intro:
      'Tag Easy supports businesses in North Dumdum and the wider northern Kolkata belt — from Nagerbazar and Birati to Dum Dum and Madhyamgram — with local SEO, Google Business Profile optimisation, websites, and automation that turn local searches into walk-ins and calls.',
    context: [
      'North Dumdum and the northern suburbs are densely populated, fast-growing, and increasingly searched on mobile. For local businesses here, the difference between page one and invisibility is often a properly optimised Google Business Profile plus consistent name, address, and phone (NAP) details across the web.',
      'We build location-relevant content, accurate local citations, and LocalBusiness schema so search engines clearly understand where you operate and who you serve. Combined with fast, mobile-first websites, this captures the high-intent "near me" demand in the area.',
      'For service businesses that rely on phone enquiries, we add WhatsApp and call-based lead capture with instant automated follow-up so no enquiry goes cold.',
    ],
    services: ['local-seo', 'google-business-profile-optimization', 'seo', 'website-development', 'ai-automation', 'paid-ads'],
    areaServed: ['North Dumdum', 'Dum Dum', 'Nagerbazar', 'Birati', 'Madhyamgram'],
    faqCategories: ['SEO', 'Google Business Profile', 'Working With Tag Easy'],
    relatedCaseStudies: ['maatritva'],
    indexable: true,
  },
  {
    slug: 'west-bengal',
    name: 'West Bengal',
    region: 'West Bengal',
    country: 'India',
    type: 'State',
    title: 'SEO, Web Development & AI Automation Agency in West Bengal | Tag Easy',
    metaDescription:
      'Tag Easy serves businesses across West Bengal with technical SEO, local SEO, fast websites, paid ads, and AI automation — from Kolkata to Siliguri and Durgapur.',
    heading: 'Digital Growth Across West Bengal',
    intro:
      'From our Kolkata base, Tag Easy delivers SEO, website development, paid advertising, and AI automation to businesses across West Bengal — including Howrah, Siliguri, Durgapur, Asansol, and the wider state.',
    context: [
      'West Bengal blends a major metro (Kolkata) with fast-growing tier-2 cities. Each has its own search behaviour and competitive landscape, so a one-size template rarely works. We tailor local SEO and content to the specific cities and districts a business actually serves.',
      'For multi-location and regional brands, we focus on a consistent entity footprint: matching NAP data, structured data, and location pages that genuinely describe each market rather than spun duplicates.',
      'Whether you serve a single town or the whole state, the goal is the same — be the obvious, well-documented choice when someone in your area searches for what you do.',
    ],
    services: ALL_LOCAL_SERVICES,
    areaServed: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol', 'West Bengal'],
    faqCategories: ['SEO', 'Website Development', 'Working With Tag Easy'],
    relatedCaseStudies: ['maatritva'],
    indexable: true,
  },
  {
    slug: 'india',
    name: 'India',
    region: '',
    country: 'India',
    type: 'Country',
    title: 'SEO & AI Automation Agency in India | Remote Digital Growth | Tag Easy',
    metaDescription:
      'India-based agency Tag Easy delivers technical SEO, AI automation, website development, and performance marketing to businesses nationwide and in remote markets.',
    heading: 'SEO & AI Automation for Businesses Across India',
    intro:
      'Tag Easy works with businesses across India and with remote clients worldwide. Operating from Kolkata, we deliver technical SEO, AI automation, website development, and performance marketing without needing to be in the same city as our clients.',
    context: [
      'Most of what moves the needle in digital growth — technical SEO, schema, site speed, automation, and analytics — is delivered remotely. That lets us work with brands in Delhi, Mumbai, Bengaluru, Hyderabad, and beyond with the same depth as our local Kolkata clients.',
      'For national brands we focus on scalable systems: prerendered, fast websites; clean structured data; lead automation that routes and follows up instantly; and reporting that ties spend to real outcomes.',
      'We keep communication tight with scheduled calls, WhatsApp, and shared dashboards, so distance never slows a project down.',
    ],
    services: ['technical-seo', 'seo', 'ai-automation', 'website-development', 'paid-ads', 'analytics-tracking'],
    areaServed: ['India', 'Remote'],
    faqCategories: ['SEO', 'AI Automation', 'Working With Tag Easy'],
    relatedCaseStudies: ['maatritva'],
    indexable: true,
  },
];

export const getLocation = (slug) => locations.find((l) => l.slug === slug);

export const getIndexableLocations = () => locations.filter((l) => l.indexable);
