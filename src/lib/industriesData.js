// Programmatic industry landing pages (/industries/<slug>).
//
// Each entry produces a unique, non-doorway page targeting "<service> for
// <industry>" intent (e.g. "SEO for healthcare clinics"). Content is tailored
// per industry — problems, the Tag Easy services that solve them, a
// problem→solution table for AI extraction, a GEO short-answer, FAQ categories,
// related glossary terms, and (only where genuinely relevant) a real case study.
// Service slugs map to /services/<slug> detail pages; faqCategories to faqData;
// glossarySlugs to glossaryData; relatedCaseStudies to PUBLISHED case studies.

export const industries = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    metaTitle: 'SEO & Digital Marketing for Healthcare Clinics | Tag Easy',
    metaDescription:
      'Tag Easy helps clinics, hospitals, and healthcare brands rank for high-intent patient searches with technical SEO, local SEO, Google Business Profile, and fast websites.',
    h1: 'Digital Marketing & SEO for Healthcare',
    tagline: 'Turn high-intent patient searches into booked appointments.',
    audience: 'Clinics, hospitals, specialists, and healthcare brands',
    shortAnswer:
      'Healthcare SEO makes a clinic or hospital visible for the high-intent searches patients actually make — "IVF centre near me", "best dermatologist in Kolkata" — through technical SEO, Google Business Profile optimisation, consistent NAP signals, doctor and treatment pages, and LocalBusiness/MedicalClinic-style schema, all tied to call and form tracking.',
    intro:
      'Patients research care online before they ever call. Healthcare brands win by being the trusted, well-documented answer when someone searches for a treatment, a specialist, or a clinic nearby — and by making that visit easy to book. We build the technical foundation, local signals, and conversion paths that turn search into appointments.',
    problems: [
      'Clinical reputation far exceeds online visibility for high-intent treatment searches',
      'Competitors outrank you in Google Maps and the local pack for "near me" queries',
      'Doctor and treatment pages are thin, slow, or missing structured data',
      'No clear tracking from a search to a booked call or appointment',
    ],
    problemSolution: [
      { problem: 'Invisible for treatment & "near me" searches', solution: 'Technical + local SEO, treatment pages, and LocalBusiness schema so each service ranks' },
      { problem: 'Weak Google Business Profile presence', solution: 'GBP optimisation: categories, services, photos, Q&A, reviews, and consistent NAP' },
      { problem: 'Thin or slow doctor/treatment pages', solution: 'Dedicated, fast, structured pages per doctor and treatment, built for Core Web Vitals' },
      { problem: 'No line of sight from search to bookings', solution: 'Call + form conversion tracking so every enquiry is attributed to its source' },
    ],
    services: ['local-seo', 'seo', 'google-business-profile-optimization', 'technical-seo', 'website-development'],
    faqCategories: ['SEO', 'Google Business Profile', 'Working With Tag Easy'],
    glossarySlugs: ['local-seo', 'google-business-profile', 'technical-seo', 'schema-markup'],
    relatedCaseStudies: ['maatritva'],
    formHeading: 'Grow Your Healthcare Practice',
    formCta: 'Request a Healthcare Audit',
    cta: {
      heading: 'Be the clinic patients find first',
      text: 'Book a free audit and we will show you exactly where patients are searching — and why competitors are getting found instead of you.',
    },
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    metaTitle: 'Digital Marketing for Real Estate — SEO, Ads & Lead Automation | Tag Easy',
    metaDescription:
      'Tag Easy helps real estate developers, brokers, and agencies generate qualified buyer and seller leads with SEO, paid ads, fast project websites, and AI lead follow-up.',
    h1: 'Digital Marketing for Real Estate',
    tagline: 'Capture buyer and seller intent — and follow up before the lead goes cold.',
    audience: 'Developers, brokers, agencies, and property marketers',
    shortAnswer:
      'Real estate digital marketing combines fast project and locality pages (for "flats in <area>" searches), Google and Meta ads for active buyers, and AI lead automation that calls or messages every enquiry within seconds — because in real estate the first business to respond usually wins the deal.',
    intro:
      'Property buyers and sellers search hard before they commit, and they reward the business that responds first. We build fast project and locality pages that rank, paid campaigns that reach active buyers, and automated follow-up so no enquiry sits unanswered while a competitor closes the deal.',
    problems: [
      'Project and locality pages are slow and do not rank for "flats / property in <area>" searches',
      'Ad spend generates enquiries that go cold before anyone calls back',
      'Leads scattered across portals, forms, and WhatsApp with no single view',
      'No way to tell which campaigns actually produced site visits or bookings',
    ],
    problemSolution: [
      { problem: 'Locality pages do not rank', solution: 'SEO-ready, fast project and area pages with the right local and schema signals' },
      { problem: 'Leads go cold after enquiry', solution: 'AI lead automation that calls/messages every lead in seconds and routes it to sales' },
      { problem: 'Leads scattered across channels', solution: 'CRM routing that unifies portal, form, ad, and WhatsApp leads in one pipeline' },
      { problem: 'Unclear campaign ROI', solution: 'Conversion tracking that ties each site visit or booking back to its campaign' },
    ],
    services: ['website-development', 'paid-ads', 'ai-automation', 'seo', 'analytics-tracking'],
    faqCategories: ['Paid Ads', 'AI Automation', 'Website Development', 'Working With Tag Easy'],
    glossarySlugs: ['lead-automation', 'conversion-tracking', 'local-seo'],
    relatedCaseStudies: [],
    formHeading: 'Generate More Property Leads',
    formCta: 'Plan My Real Estate Growth',
    cta: {
      heading: 'Win the deal by responding first',
      text: 'Book a free audit and we will map the fastest way to capture and follow up with property leads automatically.',
    },
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    metaTitle: 'SEO & Growth Engineering for E-commerce Brands | Tag Easy',
    metaDescription:
      'Tag Easy helps e-commerce brands win organic and paid traffic with technical SEO, fast storefronts, product schema, conversion tracking, and ROI-focused ad management.',
    h1: 'SEO & Growth for E-commerce Brands',
    tagline: 'Faster storefronts, more organic traffic, and ad spend that pays back.',
    audience: 'Online stores, D2C brands, and marketplaces',
    shortAnswer:
      'E-commerce SEO and growth focuses on technical health (crawlable category and product pages, clean canonicals, Product schema), Core Web Vitals on mobile, and conversion tracking — combined with paid ads managed to a target return on ad spend so traffic turns into profitable orders, not just visits.',
    intro:
      'Online stores live and die by speed, findability, and profitable acquisition. We fix the technical issues that bury category and product pages, make storefronts fast on mobile, and run paid campaigns against a real return-on-ad-spend target so growth is profitable, not just busy.',
    problems: [
      'Category and product pages are slow or not indexed, so they never rank',
      'Duplicate URLs and thin variants splitting ranking signals',
      'Ad spend rising while return on ad spend (ROAS) falls',
      'No reliable tracking of which products and channels actually drive revenue',
    ],
    problemSolution: [
      { problem: 'Product/category pages not indexed', solution: 'Technical SEO: crawlability, canonicals, Product schema, and a clean sitemap' },
      { problem: 'Slow storefront on mobile', solution: 'Core Web Vitals and image optimisation engineered into the build' },
      { problem: 'Falling return on ad spend', solution: 'ROAS-targeted Google & Meta campaigns with retargeting and conversion tracking' },
      { problem: 'No product-level revenue visibility', solution: 'GA4 e-commerce tracking and dashboards tying revenue to channel and product' },
    ],
    services: ['technical-seo', 'seo', 'website-development', 'paid-ads', 'analytics-tracking'],
    faqCategories: ['SEO', 'Paid Ads', 'Website Development', 'Analytics & Tracking'],
    glossarySlugs: ['technical-seo', 'core-web-vitals', 'schema-markup', 'conversion-tracking'],
    relatedCaseStudies: [],
    formHeading: 'Scale Your Store',
    formCta: 'Get My E-commerce Audit',
    cta: {
      heading: 'Grow orders, not just traffic',
      text: 'Book a free audit and we will show you the technical and paid wins that move revenue.',
    },
  },
  {
    slug: 'education',
    name: 'Education',
    metaTitle: 'Digital Marketing for Education & Coaching Institutes | Tag Easy',
    metaDescription:
      'Tag Easy helps schools, colleges, and coaching institutes fill seats with SEO, local search, fast course pages, paid ads, and automated admission follow-up.',
    h1: 'Digital Marketing for Education',
    tagline: 'Fill seats with the students actively searching for your courses.',
    audience: 'Schools, colleges, coaching institutes, and edtech brands',
    shortAnswer:
      'Education marketing helps institutes rank for course and "near me" searches, run admission-season ad campaigns, and automate enquiry follow-up — so prospective students and parents who are actively researching find you and get a fast, helpful response that turns interest into admissions.',
    intro:
      'Students and parents research courses, fees, and reputations long before they enrol. We make your courses findable in search, run focused admission-season campaigns, and automate follow-up so every enquiry gets a fast, helpful response during the narrow windows that decide admissions.',
    problems: [
      'Course and programme pages do not rank for the searches students actually make',
      'Admission-season ad spend with no clear cost per enrolled student',
      'Enquiries from forms, calls, and WhatsApp slip through during peak season',
      'No local visibility for "coaching / institute near me" searches',
    ],
    problemSolution: [
      { problem: 'Course pages do not rank', solution: 'SEO-ready course pages with the right structure, content, and schema' },
      { problem: 'Unclear cost per admission', solution: 'Conversion tracking that ties ad spend to enquiries and enrolments' },
      { problem: 'Enquiries missed in peak season', solution: 'AI follow-up that responds to every lead instantly and routes it to counsellors' },
      { problem: 'Weak local visibility', solution: 'Local SEO and Google Business Profile work for "near me" course searches' },
    ],
    services: ['seo', 'local-seo', 'paid-ads', 'ai-automation', 'website-development'],
    faqCategories: ['SEO', 'Paid Ads', 'AI Automation', 'Working With Tag Easy'],
    glossarySlugs: ['local-seo', 'lead-automation', 'conversion-tracking'],
    relatedCaseStudies: [],
    formHeading: 'Fill More Seats',
    formCta: 'Plan My Admissions Growth',
    cta: {
      heading: 'Reach students at the moment they decide',
      text: 'Book a free audit and we will map the fastest way to capture and convert admission enquiries.',
    },
  },
  {
    slug: 'local-businesses',
    name: 'Local Businesses',
    metaTitle: 'Local SEO & Marketing for Local Businesses | Tag Easy',
    metaDescription:
      'Tag Easy helps local businesses win "near me" searches with Google Business Profile optimisation, local SEO, consistent NAP, and call tracking.',
    h1: 'Local SEO & Marketing for Local Businesses',
    tagline: 'Own the local pack and turn nearby searches into calls and walk-ins.',
    audience: 'Service businesses, stores, and clinics serving a local area',
    shortAnswer:
      'Local SEO helps a business appear in Google Maps and the local pack when nearby customers search, by optimising the Google Business Profile, keeping name-address-phone (NAP) details identical everywhere, adding LocalBusiness schema, earning reviews, and tracking the calls and direction requests that result.',
    intro:
      'For a local business, most new customers start with a "near me" search and choose from the map pack in seconds. We optimise your Google Business Profile, fix inconsistent listings, add the right local signals, and track the calls and visits that follow — so you become the obvious local choice.',
    problems: [
      'Competitors outrank you in Google Maps and the local pack',
      'Inconsistent name, address, and phone (NAP) details across the web',
      'Few reviews and no system for earning or responding to them',
      'No idea how many calls or visits actually come from search',
    ],
    problemSolution: [
      { problem: 'Outranked in the map pack', solution: 'Google Business Profile optimisation plus local SEO and LocalBusiness schema' },
      { problem: 'Inconsistent NAP everywhere', solution: 'Citation cleanup so your details match across web, profile, and directories' },
      { problem: 'Few reviews, no process', solution: 'A review-generation and response workflow that builds trust signals' },
      { problem: 'No view of calls/visits from search', solution: 'Call and form conversion tracking on every local touchpoint' },
    ],
    services: ['local-seo', 'google-business-profile-optimization', 'seo', 'website-development', 'analytics-tracking'],
    faqCategories: ['SEO', 'Google Business Profile', 'Working With Tag Easy'],
    glossarySlugs: ['local-seo', 'google-business-profile', 'schema-markup', 'conversion-tracking'],
    relatedCaseStudies: ['maatritva'],
    formHeading: 'Win Your Local Market',
    formCta: 'Request a Local Audit',
    cta: {
      heading: 'Be the first business they call',
      text: 'Book a free local audit and we will benchmark you against the businesses outranking you nearby.',
    },
  },
  {
    slug: 'startups',
    name: 'Startups',
    metaTitle: 'Digital Engineering & Growth for Startups | Tag Easy',
    metaDescription:
      'Tag Easy helps startups launch fast, SEO-ready websites, set up clean analytics and lead tracking, and build AI automation that scales without adding headcount.',
    h1: 'Digital Engineering & Growth for Startups',
    tagline: 'Launch fast, measure everything, and automate before you scale.',
    audience: 'Early-stage and growth-stage startups',
    shortAnswer:
      'Startup growth engineering means launching a fast, SEO-ready website, instrumenting clean analytics and lead tracking from day one, and automating repetitive lead and ops work with AI — so a small team can capture demand, prove what works, and scale without adding headcount prematurely.',
    intro:
      'Startups need to move fast without building on sand. We ship fast, SEO-ready sites, wire up analytics and lead tracking from day one so you can prove what works, and automate the repetitive work that would otherwise force an early, expensive hire.',
    problems: [
      'A landing page that looks fine but is slow, unmeasured, and not built to rank',
      'No clean analytics, so growth decisions are guesswork',
      'Founders and small teams buried in manual lead and ops work',
      'Tooling that will not scale once volume picks up',
    ],
    problemSolution: [
      { problem: 'Unmeasured, slow landing pages', solution: 'Fast, SEO-ready site with conversion tracking built in from launch' },
      { problem: 'Growth decisions on guesswork', solution: 'GA4 + UTM lead attribution so you see what actually drives signups' },
      { problem: 'Team buried in manual work', solution: 'AI automation for lead capture, qualification, and follow-up' },
      { problem: 'Tooling that will not scale', solution: 'Systems architected to handle volume without a rebuild' },
    ],
    services: ['website-development', 'ai-automation', 'analytics-tracking', 'seo', 'technical-seo'],
    faqCategories: ['Website Development', 'AI Automation', 'Analytics & Tracking', 'Working With Tag Easy'],
    glossarySlugs: ['ai-automation', 'lead-automation', 'conversion-tracking', 'core-web-vitals'],
    relatedCaseStudies: [],
    formHeading: 'Build Your Growth Engine',
    formCta: 'Plan My Startup Stack',
    cta: {
      heading: 'Move fast without breaking your data',
      text: 'Book a free audit and we will scope a launch and growth stack you will not outgrow.',
    },
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    metaTitle: 'SEO & Lead Generation for Professional Services | Tag Easy',
    metaDescription:
      'Tag Easy helps law firms, accountants, consultants, and agencies win qualified leads with authority SEO, local search, fast websites, and automated enquiry follow-up.',
    h1: 'SEO & Lead Generation for Professional Services',
    tagline: 'Win qualified clients by being the credible, easy-to-reach expert.',
    audience: 'Law firms, accountants, consultants, and agencies',
    shortAnswer:
      'For professional services, digital marketing means ranking for the specific problems clients search ("GST consultant in Kolkata", "startup lawyer near me"), demonstrating expertise and trust (E-E-A-T) through structured author and service content, and following up on every enquiry quickly so high-value leads do not slip away.',
    intro:
      'Professional services are bought on trust and expertise. We help you rank for the precise problems your clients search for, present your expertise credibly, and respond to enquiries fast — because a single high-value client often justifies the entire investment.',
    problems: [
      'You are invisible for the specific, high-intent problems clients search for',
      'A dated website that undersells your expertise and credibility',
      'High-value enquiries lost to slow or inconsistent follow-up',
      'No local visibility for "<service> near me" professional searches',
    ],
    problemSolution: [
      { problem: 'Invisible for high-intent problems', solution: 'Authority SEO and service pages targeting the exact problems clients search' },
      { problem: 'Website undersells expertise', solution: 'A fast, credible site with author/E-E-A-T signals and clear proof' },
      { problem: 'High-value enquiries lost', solution: 'Automated, fast follow-up that routes leads to the right person instantly' },
      { problem: 'Weak local visibility', solution: 'Local SEO and Google Business Profile for "<service> near me" searches' },
    ],
    services: ['seo', 'local-seo', 'website-development', 'ai-automation', 'analytics-tracking'],
    faqCategories: ['SEO', 'AI Automation', 'Working With Tag Easy'],
    glossarySlugs: ['local-seo', 'schema-markup', 'lead-automation', 'geo'],
    relatedCaseStudies: [],
    formHeading: 'Win More Qualified Clients',
    formCta: 'Request a Professional Audit',
    cta: {
      heading: 'Be the expert clients find and trust',
      text: 'Book a free audit and we will show you where high-intent clients are searching for your expertise.',
    },
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);

export const getIndexableIndustries = () => industries;
