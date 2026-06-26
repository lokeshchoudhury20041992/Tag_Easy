// Comparison pages (/compare/<slug>) for GEO/AI-search extraction.
//
// Each page leads with a short answer, then a comparison table, pros/cons,
// when-to-choose guidance, a Tag Easy recommendation, and FAQs. Comparisons are
// balanced and factual (no fake claims). `relatedServices` references real
// serviceDetailPages slugs; `glossarySlugs` references glossaryData terms.

export const comparisons = [
  {
    slug: 'ai-automation-vs-manual-marketing',
    metaTitle: 'AI Automation vs Manual Marketing: Which Should You Choose? | Tag Easy',
    metaDescription:
      'AI automation vs manual marketing compared: speed, cost, consistency, control, and when each makes sense — plus how to combine both without losing the human touch.',
    h1: 'AI Automation vs Manual Marketing',
    tagline: 'Where automation wins, where humans win, and how to combine them.',
    datePublished: '2026-06-25',
    dateModified: '2026-06-25',
    shortAnswer:
      'AI automation is best for high-volume, repeatable work — instant lead follow-up, qualification, CRM updates, and reporting — where speed and consistency matter. Manual marketing is best for strategy, creative judgement, relationships, and anything requiring nuance. Most businesses should automate the repetitive layer and keep humans for judgement, with clear approval points between them.',
    optionA: {
      name: 'AI Automation',
      blurb: 'Software and AI handle repetitive marketing, sales, and ops tasks automatically.',
      pros: [
        'Responds to leads in seconds, around the clock',
        'Consistent — never forgets a follow-up or a data-entry step',
        'Scales without adding headcount',
        'Frees the team for higher-value work',
      ],
      cons: [
        'Needs upfront setup and integration',
        'Poorly designed automation can feel impersonal',
        'Requires human approval points for sensitive decisions',
      ],
      bestWhen: 'You have repetitive, high-volume work — lead follow-up, qualification, CRM updates, reporting — that is slow or inconsistent when done by hand.',
    },
    optionB: {
      name: 'Manual Marketing',
      blurb: 'People plan, create, and execute marketing with full human judgement.',
      pros: [
        'Strong creative and strategic judgement',
        'Genuine relationship-building and nuance',
        'No setup or integration overhead',
        'Easy to adapt on the fly',
      ],
      cons: [
        'Slow to respond, especially outside working hours',
        'Inconsistent under load — tasks get missed',
        'Does not scale without hiring',
        'Time lost to repetitive busywork',
      ],
      bestWhen: 'Work needs strategy, creativity, relationships, or sensitive judgement that does not follow fixed rules.',
    },
    comparisonTable: [
      { dimension: 'Response speed', a: 'Seconds, 24/7', b: 'Minutes to days, business hours' },
      { dimension: 'Consistency', a: 'Very high — rule-based', b: 'Varies with workload' },
      { dimension: 'Scalability', a: 'Scales without headcount', b: 'Needs more people' },
      { dimension: 'Creative & strategic judgement', a: 'Limited; needs human input', b: 'Strong' },
      { dimension: 'Setup effort', a: 'Upfront build & integration', b: 'Low' },
      { dimension: 'Best for', a: 'Repetitive, high-volume tasks', b: 'Strategy, creative, relationships' },
    ],
    recommendation:
      'For most businesses it is not either/or. Automate the repetitive layer — instant lead capture, qualification, follow-up, CRM routing, and reporting — and keep humans focused on strategy, creative, and relationships. Tag Easy builds automation with explicit approval points and fallback rules, so you get the speed and consistency of automation without losing human judgement.',
    faqs: [
      {
        question: 'Will AI automation replace my marketing team?',
        answer:
          'No. Automation removes repetitive work so your team focuses on strategy, creative, and relationships. We build clear human control and approval points into every system.',
      },
      {
        question: 'How quickly can I see value from marketing automation?',
        answer:
          'A first working automation — usually instant lead capture and follow-up — is typically live within 2–4 weeks, and the lift in response time is visible immediately.',
      },
      {
        question: 'What should I automate first?',
        answer:
          'Start with the highest-impact repetitive workflow, which for most businesses is lead capture, qualification, and instant follow-up. Prove the value, then expand into reporting and nurture sequences.',
      },
    ],
    relatedServices: ['ai-automation', 'analytics-tracking', 'paid-ads'],
    glossarySlugs: ['ai-automation', 'lead-automation', 'conversion-tracking'],
    formHeading: 'Plan Your Automation',
    formCta: 'Book an Automation Audit',
    cta: {
      heading: 'Automate the busywork, keep the judgement',
      text: 'Book a free automation audit and we will map which workflows to automate first.',
    },
  },
  {
    slug: 'seo-vs-paid-ads',
    metaTitle: 'SEO vs Paid Ads: Which Drives Better ROI? | Tag Easy',
    metaDescription:
      'SEO vs paid ads compared: speed, cost over time, sustainability, and trust. Learn when to invest in SEO, when to run ads, and how to combine both for compounding ROI.',
    h1: 'SEO vs Paid Ads',
    tagline: 'Fast traffic now vs compounding traffic later — and why you usually want both.',
    datePublished: '2026-06-25',
    dateModified: '2026-06-25',
    shortAnswer:
      'Paid ads buy traffic immediately but stop the moment you stop paying; SEO takes 2–3 months to compound but keeps delivering traffic at a low marginal cost. Use paid ads for speed, testing, and seasonal pushes, and SEO for sustainable, lower-cost demand. The strongest strategy runs both: ads while SEO matures, then SEO carrying the baseline as ad budget is focused on the highest-return campaigns.',
    optionA: {
      name: 'SEO',
      blurb: 'Earn organic rankings so people find you in search without paying per click.',
      pros: [
        'Compounding, durable traffic over time',
        'Low marginal cost once ranking',
        'Higher trust — organic results are not "ads"',
        'Captures the full funnel, including research queries',
      ],
      cons: [
        'Takes 2–3 months to show meaningful results',
        'Requires technical, content, and authority work',
        'Rankings can shift with algorithm updates',
      ],
      bestWhen: 'You want sustainable, lower-cost demand and can invest over a 3–6 month horizon.',
    },
    optionB: {
      name: 'Paid Ads',
      blurb: 'Pay platforms like Google and Meta to place you in front of buyers now.',
      pros: [
        'Traffic and leads almost immediately',
        'Precise targeting and fast testing',
        'Easy to scale up or down',
        'Great for launches and seasonal pushes',
      ],
      cons: [
        'Traffic stops when spend stops',
        'Cost per click rises in competitive markets',
        'Needs constant optimisation and budget',
      ],
      bestWhen: 'You need leads now, are testing offers, or have time-sensitive campaigns.',
    },
    comparisonTable: [
      { dimension: 'Time to results', a: '2–3 months to compound', b: 'Days' },
      { dimension: 'Cost over time', a: 'Falls as rankings hold', b: 'Ongoing per click' },
      { dimension: 'Sustainability', a: 'Durable', b: 'Stops when spend stops' },
      { dimension: 'Targeting control', a: 'Indirect (keywords/intent)', b: 'Precise and immediate' },
      { dimension: 'User trust', a: 'Higher (organic)', b: 'Lower (labelled ads)' },
      { dimension: 'Best for', a: 'Sustainable baseline demand', b: 'Speed, testing, seasonality' },
    ],
    recommendation:
      'Run both, sequenced. Use paid ads to generate leads and test messaging immediately, while SEO builds the technical foundation and content that compounds. As organic rankings mature, they carry the baseline and you focus ad budget on your highest-return campaigns. Tag Easy ties both to the same conversion tracking so you can compare true cost-per-lead by channel.',
    faqs: [
      {
        question: 'Is SEO or paid advertising cheaper?',
        answer:
          'Paid ads cost less to start but charge for every click indefinitely. SEO costs more upfront in work but has a low marginal cost once you rank, making it cheaper per lead over time for most businesses.',
      },
      {
        question: 'How long before SEO beats paid ads on cost?',
        answer:
          'It varies by market, but many businesses see SEO produce a lower cost-per-lead than ads within 3–6 months of consistent work, after which the gap usually widens.',
      },
      {
        question: 'Should a new business start with SEO or ads?',
        answer:
          'Often both: ads for immediate leads and learning, and SEO started in parallel so the durable, lower-cost channel is maturing while ads carry the early load.',
      },
    ],
    relatedServices: ['seo', 'paid-ads', 'analytics-tracking'],
    glossarySlugs: ['technical-seo', 'conversion-tracking', 'local-seo'],
    formHeading: 'Plan Your Growth Mix',
    formCta: 'Book a Strategy Call',
    cta: {
      heading: 'Get the SEO + ads mix right',
      text: 'Book a free strategy call and we will recommend the channel mix for your market and timeline.',
    },
  },
  {
    slug: 'react-seo-vs-traditional-seo',
    metaTitle: 'React SEO vs Traditional SEO: What\'s Different? | Tag Easy',
    metaDescription:
      'React SEO vs traditional SEO compared: rendering, indexing, metadata, and Core Web Vitals. Learn why React sites need extra work and how prerendering fixes it.',
    h1: 'React SEO vs Traditional SEO',
    tagline: 'Same goals, one extra problem to solve: rendering.',
    datePublished: '2026-06-25',
    dateModified: '2026-06-25',
    shortAnswer:
      'Traditional SEO and React SEO share the same goals — relevant content, clean structure, fast pages, good links. The difference is rendering: a React single-page app ships an almost-empty HTML shell and builds pages in the browser, so crawlers and AI engines often see nothing. React SEO adds server-side rendering, static generation, or prerendering plus per-route metadata so each page ships real, indexable HTML. Everything else is the same.',
    optionA: {
      name: 'React SEO',
      blurb: 'SEO for React/SPA sites, where content is rendered in the browser by JavaScript.',
      pros: [
        'Keeps React\'s fast, app-like user experience',
        'Once rendered properly, ranks as well as any site',
        'Per-route metadata and schema are fully controllable',
      ],
      cons: [
        'Default SPA HTML is empty to crawlers — pages may not index',
        'Requires SSR, static generation, or prerendering',
        'AI crawlers often do not execute JavaScript at all',
      ],
      bestWhen: 'You are building or already run a React/Next.js/Vue site and need it fully crawlable.',
    },
    optionB: {
      name: 'Traditional SEO',
      blurb: 'SEO for server-rendered or static sites that ship complete HTML by default.',
      pros: [
        'Content is in the HTML from the first request',
        'No rendering workarounds needed for indexing',
        'Simpler crawl and indexing behaviour',
      ],
      cons: [
        'Often a less dynamic, app-like front end',
        'Same content, structure, speed, and link work still required',
      ],
      bestWhen: 'Your stack already serves full HTML (server-rendered, static, or classic CMS).',
    },
    comparisonTable: [
      { dimension: 'Default HTML to crawlers', a: 'Empty shell until JS runs', b: 'Complete from first request' },
      { dimension: 'Extra work needed', a: 'SSR / SSG / prerendering', b: 'None for rendering' },
      { dimension: 'Per-route metadata', a: 'Needs helmet/SSR handling', b: 'Native' },
      { dimension: 'AI crawler visibility', a: 'Poor without prerendering', b: 'Good' },
      { dimension: 'Core Web Vitals', a: 'Watch JS bundle size', b: 'Generally lighter' },
      { dimension: 'Content & link strategy', a: 'Identical', b: 'Identical' },
    ],
    recommendation:
      'React is not bad for SEO — it just needs the right rendering strategy. If you are on React, prerender or server-render every route, give each page a unique title, meta description, canonical, and JSON-LD, and keep the JavaScript bundle lean. Do that and a React site ranks as well as any server-rendered one. This is exactly the technical SEO work Tag Easy specialises in.',
    faqs: [
      {
        question: 'Is React bad for SEO?',
        answer:
          'No. React only struggles when pages render entirely in the browser, leaving crawlers an empty shell. With server-side rendering, static generation, or prerendering, React sites rank as well as any other.',
      },
      {
        question: 'Do I need to rebuild my React site for SEO?',
        answer:
          'Usually not. Adding prerendering or SSR, per-route metadata, clean canonicals, and structured data fixes most indexing problems without a full rebuild.',
      },
      {
        question: 'How do I check if my React pages are indexable?',
        answer:
          'Use View Source (not Inspect) or run curl on a page and confirm the title and body text match that page rather than the homepage. Then verify the rendered HTML in Search Console\'s URL Inspection tool.',
      },
    ],
    relatedServices: ['technical-seo', 'seo', 'website-development'],
    glossarySlugs: ['react-seo', 'technical-seo', 'core-web-vitals', 'schema-markup'],
    formHeading: 'Audit My React Site',
    formCta: 'Get a Technical Audit',
    cta: {
      heading: 'Make your React site fully indexable',
      text: 'Book a free technical audit and we will show you which React pages are invisible to Google — and why.',
    },
  },
  {
    slug: 'google-business-profile-vs-local-seo',
    metaTitle: 'Google Business Profile vs Local SEO: What\'s the Difference? | Tag Easy',
    metaDescription:
      'Google Business Profile vs local SEO explained: how they differ, how they work together, and what to prioritise to win the map pack and "near me" searches.',
    h1: 'Google Business Profile vs Local SEO',
    tagline: 'One is a tool; the other is the whole strategy that uses it.',
    datePublished: '2026-06-25',
    dateModified: '2026-06-25',
    shortAnswer:
      'They are not competing options. Your Google Business Profile (GBP) is a single, critical asset — the listing that controls how you appear in Google Maps and the local pack. Local SEO is the broader strategy that optimises GBP plus consistent NAP citations, LocalBusiness schema, local content, reviews, and on-site signals. You need the profile optimised and the wider local SEO around it to actually rank.',
    optionA: {
      name: 'Google Business Profile',
      blurb: 'The free Google listing that controls your presence in Maps and the local pack.',
      pros: [
        'Direct control over Maps/local-pack appearance',
        'Fast wins: categories, photos, posts, Q&A, reviews',
        'Free to create and manage',
      ],
      cons: [
        'A profile alone rarely ranks without supporting signals',
        'Limited by the strength of your wider local footprint',
      ],
      bestWhen: 'You need to fix and activate the single most important local asset first.',
    },
    optionB: {
      name: 'Local SEO',
      blurb: 'The full strategy to rank locally — GBP plus citations, schema, content, and reviews.',
      pros: [
        'Addresses every local ranking factor, not just the listing',
        'Builds durable local authority',
        'Includes on-site local content and LocalBusiness schema',
      ],
      cons: [
        'Broader scope and more ongoing work',
        'Results compound over weeks to months',
      ],
      bestWhen: 'You want to genuinely win and hold the local pack, not just complete a listing.',
    },
    comparisonTable: [
      { dimension: 'What it is', a: 'A single Google asset/listing', b: 'A full ranking strategy' },
      { dimension: 'Scope', a: 'The profile itself', b: 'Profile + citations + schema + content + reviews' },
      { dimension: 'Control', a: 'Direct, immediate', b: 'Multiple signals over time' },
      { dimension: 'Ranking power alone', a: 'Limited without support', b: 'High when done fully' },
      { dimension: 'Relationship', a: 'Part of local SEO', b: 'Includes the profile' },
    ],
    recommendation:
      'Optimise the Google Business Profile first — it delivers the fastest local wins — then build the local SEO around it: consistent NAP citations, LocalBusiness schema, location-relevant content, and a review workflow. Treating GBP as the whole plan is the most common local SEO mistake. Tag Easy does both, keeping your profile, website, and schema perfectly aligned.',
    faqs: [
      {
        question: 'Is Google Business Profile the same as local SEO?',
        answer:
          'No. Google Business Profile is one asset within local SEO. Local SEO is the broader strategy that optimises the profile alongside NAP citations, schema, local content, and reviews.',
      },
      {
        question: 'Can I rank locally with just a Google Business Profile?',
        answer:
          'Sometimes in low-competition areas, but in most markets a profile alone is not enough. Consistent citations, schema, reviews, and local content are what hold a top local-pack position.',
      },
      {
        question: 'What should I fix first for local rankings?',
        answer:
          'Start with the Google Business Profile — accurate primary category, complete information, photos, and reviews — then align your NAP everywhere and add LocalBusiness schema to your site.',
      },
    ],
    relatedServices: ['google-business-profile-optimization', 'local-seo', 'seo'],
    glossarySlugs: ['google-business-profile', 'local-seo', 'schema-markup'],
    formHeading: 'Win Local Search',
    formCta: 'Book a Local Audit',
    cta: {
      heading: 'Get the profile and the strategy right',
      text: 'Book a free local audit and we will show you what to fix on your profile and across your local footprint.',
    },
  },
  {
    slug: 'custom-website-vs-template-website',
    metaTitle: 'Custom Website vs Template Website: Which Is Right for You? | Tag Easy',
    metaDescription:
      'Custom vs template website compared: cost, speed, SEO, performance, and scalability. Learn when a template is enough and when a custom build pays for itself.',
    h1: 'Custom Website vs Template Website',
    tagline: 'When a template is enough — and when it quietly costs you more.',
    datePublished: '2026-06-25',
    dateModified: '2026-06-25',
    shortAnswer:
      'A template website is cheaper and faster to launch and is fine for simple needs. A custom website costs more upfront but gives you full control over performance, SEO, integrations, and scalability — which pays back when the site is central to lead generation. Choose a template to validate quickly; choose custom when speed, SEO, and conversion directly drive revenue.',
    optionA: {
      name: 'Custom Website',
      blurb: 'A site engineered to your needs, with full control over code, performance, and SEO.',
      pros: [
        'Full control over Core Web Vitals and SEO',
        'Tailored UX and conversion paths',
        'Clean integrations with your tools and CRM',
        'Scales without fighting the platform',
      ],
      cons: [
        'Higher upfront cost',
        'Longer initial build time',
        'Needs a capable team to build and maintain',
      ],
      bestWhen: 'Your website is central to revenue and you need speed, SEO, and integrations under your control.',
    },
    optionB: {
      name: 'Template Website',
      blurb: 'A pre-built theme on a platform (e.g. a page builder or off-the-shelf theme).',
      pros: [
        'Low cost and fast launch',
        'No development needed to start',
        'Fine for simple, brochure-style sites',
      ],
      cons: [
        'Limited control over performance and Core Web Vitals',
        'Bloated code can hurt SEO and speed',
        'Harder to customise UX or integrate deeply',
        'Can become a constraint as you grow',
      ],
      bestWhen: 'You need a simple site live quickly and cheaply, or are validating an idea.',
    },
    comparisonTable: [
      { dimension: 'Upfront cost', a: 'Higher', b: 'Lower' },
      { dimension: 'Time to launch', a: 'Weeks', b: 'Days' },
      { dimension: 'Performance control', a: 'Full', b: 'Limited by the platform' },
      { dimension: 'SEO ceiling', a: 'High', b: 'Often capped by template code' },
      { dimension: 'Customisation & integrations', a: 'Unlimited', b: 'Constrained' },
      { dimension: 'Best for', a: 'Revenue-critical sites', b: 'Simple or early-stage sites' },
    ],
    recommendation:
      'If your website is mainly informational or you are validating an idea, a good template is a sensible, economical start. Once the site is central to lead generation — where speed, SEO, and conversion directly drive revenue — a custom build usually pays for itself. Tag Easy builds fast, SEO-ready custom sites, and can also tell you honestly when a template is the right call for now.',
    faqs: [
      {
        question: 'Is a custom website worth the extra cost?',
        answer:
          'When the website materially drives revenue, yes — the control over performance, SEO, and conversion typically pays back. For simple or early-stage needs, a quality template can be the smarter spend.',
      },
      {
        question: 'Are template websites bad for SEO?',
        answer:
          'Not inherently, but many templates ship bloated code that hurts Core Web Vitals and limits technical control, which can cap your SEO ceiling compared with a lean custom build.',
      },
      {
        question: 'Can I start on a template and move to custom later?',
        answer:
          'Yes. Many businesses validate with a template, then move to a custom build once the site proves its role in revenue. Planning the migration early keeps SEO equity intact.',
      },
    ],
    relatedServices: ['website-development', 'technical-seo', 'seo'],
    glossarySlugs: ['core-web-vitals', 'technical-seo', 'react-seo'],
    formHeading: 'Plan Your Website',
    formCta: 'Discuss My Build',
    cta: {
      heading: 'Build the right website for where you are',
      text: 'Tell us your goals and we will recommend custom or template — honestly — and scope the build.',
    },
  },
];

export const getComparison = (slug) => comparisons.find((c) => c.slug === slug);

export const getComparisons = () => comparisons;
