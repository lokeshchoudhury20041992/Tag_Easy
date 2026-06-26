// Single source of truth for Tag Easy structured data (JSON-LD).
// Pure JS (no JSX / browser APIs) so the Node prerender script can import it too.

import { serviceCatalog } from './servicesData.js';

export const SITE_URL = 'https://tageasy.org';

export const ORG_ID = `${SITE_URL}/#organization`;

export const sameAs = [
  'https://www.linkedin.com/company/tag-easy',
  'https://www.instagram.com/tag_easy/',
];

// Truthful NAP — no unverified street address is published (see SEO audit §6.1).
const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Kolkata',
  addressRegion: 'West Bengal',
  addressCountry: 'IN',
};

// Stable @id anchors used across the entity graph (Task — advanced schema graph
// linking). Centralised so every node references the same canonical identifiers.
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const SERVICE_CATALOG_ID = `${SITE_URL}/#service-catalog`;
export const FOUNDER_ID = `${SITE_URL}/authors/lokesh-choudhury/#person`;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Tag Easy',
  legalName: 'TAG EASY LLP',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/logo.jpg`,
  description:
    'Tag Easy is a digital engineering company providing SEO, AI automation, website development, Ads Hub management, analytics, and lead-generation systems for businesses in Kolkata, India and remote markets.',
  email: 'lokesh.choudhury@tageasy.org',
  telephone: '+91-7980761008',
  address,
  areaServed: ['Kolkata', 'West Bengal', 'India'],
  founder: {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: 'Lokesh Choudhury',
    jobTitle: 'Founder & Director',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'lokesh.choudhury@tageasy.org',
    telephone: '+91-7980761008',
    areaServed: 'IN',
    availableLanguage: ['en'],
  },
  // Connect the entity graph: Organization → LocalBusiness + OfferCatalog.
  // These @id references resolve to nodes defined on the relevant pages.
  subOrganization: { '@id': LOCALBUSINESS_ID },
  hasOfferCatalog: { '@id': SERVICE_CATALOG_ID },
  sameAs,
};

export const localBusinessSchema = {
  '@type': 'ProfessionalService',
  '@id': LOCALBUSINESS_ID,
  name: 'Tag Easy',
  legalName: 'TAG EASY LLP',
  url: SITE_URL,
  image: `${SITE_URL}/logo.jpg`,
  telephone: '+91-7980761008',
  email: 'lokesh.choudhury@tageasy.org',
  priceRange: '₹₹',
  address,
  areaServed: ['Kolkata', 'West Bengal', 'India'],
  openingHours: 'Mo-Fr 09:00-19:00',
  parentOrganization: { '@id': ORG_ID },
  sameAs,
};

// OfferCatalog node (no @context — embedded inside the homepage @graph).
const homepageOfferCatalog = {
  '@type': 'OfferCatalog',
  '@id': `${SITE_URL}/#service-catalog`,
  name: 'Tag Easy Services',
  url: `${SITE_URL}/services/`,
  provider: { '@id': ORG_ID },
  itemListElement: serviceCatalog.map((svc) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: svc.name,
      description: svc.description,
      url: `${SITE_URL}${svc.url}`,
      provider: { '@id': ORG_ID },
      areaServed: ['Kolkata', 'West Bengal', 'India'],
    },
  })),
};

// Rich graph for the homepage: Organization + WebSite + LocalBusiness + Catalog.
export const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Tag Easy',
      publisher: { '@id': ORG_ID },
    },
    localBusinessSchema,
    homepageOfferCatalog,
  ],
};

// Build a Service + FAQ + Breadcrumb graph for a service-style page.
export const buildServiceSchema = ({ name, description, path, faqs = [] }) => {
  const url = `${SITE_URL}${path}`;
  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name,
      description,
      serviceType: name,
      url,
      provider: { '@id': ORG_ID },
      areaServed: ['Kolkata', 'West Bengal', 'India'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    },
  ];

  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

// Task 4 — Breadcrumb schema. items: [{ name, path }] (path is route path).
export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${item.path}/`,
  })),
});

// Task 11 — FAQ schema from [{ question, answer }].
export const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

// Task 2 — BlogPosting schema. `author` is an author object from authors.js.
// Returns null for posts that must not carry article schema (non-approved).
export const buildBlogPostingSchema = (post, author) => {
  if (!post || post.qualityStatus !== 'approved' || !post.indexable) return null;
  const url = `${SITE_URL}/blog/${post.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/logo.jpg`,
        datePublished: post.date,
        dateModified: post.dateModified || post.date,
        articleSection: post.category,
        keywords: (post.keywords || []).join(', '),
        ...(post.sources && post.sources.length
          ? {
              citation: post.sources.map((s) => ({
                '@type': 'CreativeWork',
                name: s.title,
                url: s.url,
                ...(s.publisher ? { publisher: { '@type': 'Organization', name: s.publisher } } : {}),
              })),
            }
          : {}),
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: { '@id': WEBSITE_ID },
        author: author
          ? {
              '@type': 'Person',
              ...(author.url ? { '@id': `${author.url.replace(/\/$/, '')}#person` } : {}),
              name: author.name,
              url: author.url,
              worksFor: { '@id': ORG_ID },
              ...(author.sameAs && author.sameAs.length ? { sameAs: author.sameAs } : {}),
            }
          : { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
};

// Task 13 — OfferCatalog of Tag Easy services, provided by the organization.
export const buildOfferCatalogSchema = (catalog) => ({
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Tag Easy Services',
  url: `${SITE_URL}/services/`,
  provider: { '@id': ORG_ID },
  itemListElement: catalog.map((svc) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: svc.name,
      description: svc.description,
      url: `${SITE_URL}${svc.url}`,
      provider: { '@id': ORG_ID },
      areaServed: ['Kolkata', 'West Bengal', 'India'],
    },
  })),
});

// Task 14 — DefinedTermSet for the glossary.
export const buildGlossarySchema = (terms) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/glossary/#glossary`,
  name: 'Tag Easy Digital Marketing & Engineering Glossary',
  url: `${SITE_URL}/glossary/`,
  hasDefinedTerm: terms.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/glossary/#${t.slug}`,
    name: t.term,
    description: t.short,
    inDefinedTermSet: `${SITE_URL}/glossary/`,
  })),
});

// Phase 2 · Task 1 — Service detail page graph (Service + FAQ + custom
// breadcrumb). Unlike buildServiceSchema this supports a full breadcrumb trail
// (Home › Services › <service>) and is used by /services/<slug> pages.
export const buildServiceDetailSchema = ({ name, description, path, faqs = [], breadcrumb = [] }) => {
  const url = `${SITE_URL}${path}/`;
  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name,
      description,
      serviceType: name,
      url,
      provider: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: url,
      areaServed: ['Kolkata', 'West Bengal', 'India'],
    },
  ];

  if (breadcrumb.length) {
    graph.push(buildBreadcrumbSchema(breadcrumb));
  }

  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      // Link the FAQ back to the Service it documents (Service → FAQ).
      about: { '@id': `${url}#service` },
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

// Phase 2 · Task 2 — Per-location LocalBusiness graph. Reuses the canonical
// address/contact so NAP stays consistent, but scopes areaServed + url to the
// location page.
export const buildLocationSchema = (location, faqs = []) => {
  const url = `${SITE_URL}/locations/${location.slug}/`;
  const graph = [
    {
      '@type': 'ProfessionalService',
      '@id': `${url}#localbusiness`,
      name: `Tag Easy — ${location.name}`,
      legalName: 'TAG EASY LLP',
      url,
      image: `${SITE_URL}/logo.jpg`,
      telephone: '+91-7980761008',
      email: 'lokesh.choudhury@tageasy.org',
      priceRange: '₹₹',
      address,
      areaServed: location.areaServed && location.areaServed.length ? location.areaServed : ['Kolkata', 'West Bengal', 'India'],
      openingHours: 'Mo-Fr 09:00-19:00',
      parentOrganization: { '@id': ORG_ID },
      sameAs,
    },
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: location.name, path: `/locations/${location.slug}` },
    ]),
  ];

  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

// Phase 2 · Task 10 — CollectionPage + ItemList for the case-studies index.
export const buildCaseStudiesCollectionSchema = (studies) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/case-studies/#collection`,
      name: 'Tag Easy Case Studies',
      url: `${SITE_URL}/case-studies/`,
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
      about: { '@id': ORG_ID },
    },
    {
      '@type': 'ItemList',
      itemListElement: studies.map((cs, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}${cs.path}/`,
        name: cs.title,
      })),
    },
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
    ]),
  ],
});

// Phase 2 · Task 11 — Article graph for a data-driven case study detail page.
export const buildCaseStudyArticleSchema = (cs) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${cs.path}/#article`,
      headline: `${cs.title} Case Study`,
      description: cs.summary || cs.overview || cs.problem,
      image: cs.image ? `${SITE_URL}${cs.image}` : `${SITE_URL}/logo.jpg`,
      // Link the case study to the client type AND the Services it demonstrates
      // (CaseStudy Article → Service) so engines connect proof to offerings.
      about: [
        ...(cs.clientType ? [{ '@type': 'Thing', name: cs.clientType }] : []),
        ...(cs.relatedServices || []).map((s) => ({ '@id': `${SITE_URL}/services/${s}/#service` })),
      ],
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${cs.path}/` },
    },
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: cs.title, path: cs.path },
    ]),
  ],
});

// Phase 2 · Task 4 — Review + AggregateRating, built ONLY from verified +
// consented testimonials. Pass getVerifiedTestimonials(); returns null when
// there are none so no fake review schema is ever emitted.
export const buildReviewSchema = (verifiedTestimonials = []) => {
  if (!verifiedTestimonials.length) return null;
  const ratings = verifiedTestimonials.map((t) => Number(t.rating) || 5);
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: verifiedTestimonials.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: verifiedTestimonials.map((t) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: String(Number(t.rating) || 5), bestRating: '5' },
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.quote,
      ...(t.date ? { datePublished: t.date } : {}),
    })),
  };
};

// Build a Person graph for a team member page.
export const buildPersonSchema = (member) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  url: `${SITE_URL}/team/${member.slug}/`,
  image: `${SITE_URL}${member.image}`,
  worksFor: { '@id': ORG_ID },
  sameAs: Object.values(member.socials || {}).filter(
    (href) => href && href !== '#' && href.startsWith('http')
  ),
});

// =====================================================================
// Programmatic GEO/SEO page families — industry, service+location,
// comparison, topic-cluster hub, and author profile graphs. Each leads
// with a typed entity, links a BreadcrumbList, and (where relevant) a
// FAQPage that references the entity it documents.
// =====================================================================

const faqPageNode = (url, faqs, aboutId) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  ...(aboutId ? { about: { '@id': aboutId } } : {}),
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

// Industry landing page — a Service scoped to an industry audience.
export const buildIndustrySchema = ({ name, description, path, audience, faqs = [], breadcrumb = [] }) => {
  const url = `${SITE_URL}${path}/`;
  const serviceId = `${url}#service`;
  const graph = [
    {
      '@type': 'Service',
      '@id': serviceId,
      name,
      description,
      serviceType: name,
      url,
      provider: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: url,
      areaServed: ['Kolkata', 'West Bengal', 'India'],
      ...(audience ? { audience: { '@type': 'Audience', audienceType: audience } } : {}),
    },
  ];
  if (breadcrumb.length) graph.push(buildBreadcrumbSchema(breadcrumb));
  if (faqs.length) graph.push(faqPageNode(url, faqs, serviceId));
  return { '@context': 'https://schema.org', '@graph': graph };
};

// Service + location combination page — a localised Service plus a
// location-scoped LocalBusiness, so it reads as a genuine local offering.
export const buildServiceLocationSchema = ({ name, description, path, areaServed = [], faqs = [], breadcrumb = [] }) => {
  const url = `${SITE_URL}${path}/`;
  const serviceId = `${url}#service`;
  const area = areaServed.length ? areaServed : ['Kolkata', 'West Bengal', 'India'];
  const graph = [
    {
      '@type': 'Service',
      '@id': serviceId,
      name,
      description,
      serviceType: name,
      url,
      provider: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: url,
      areaServed: area,
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${url}#localbusiness`,
      name: 'Tag Easy',
      legalName: 'TAG EASY LLP',
      url,
      image: `${SITE_URL}/logo.jpg`,
      telephone: '+91-7980761008',
      email: 'lokesh.choudhury@tageasy.org',
      priceRange: '₹₹',
      address,
      areaServed: area,
      openingHours: 'Mo-Fr 09:00-19:00',
      parentOrganization: { '@id': ORG_ID },
      sameAs,
    },
  ];
  if (breadcrumb.length) graph.push(buildBreadcrumbSchema(breadcrumb));
  if (faqs.length) graph.push(faqPageNode(url, faqs, serviceId));
  return { '@context': 'https://schema.org', '@graph': graph };
};

// Comparison page — an Article (extractable answer) plus FAQ + breadcrumb.
export const buildComparisonSchema = ({ title, description, path, datePublished, dateModified, faqs = [], breadcrumb = [] }) => {
  const url = `${SITE_URL}${path}/`;
  const graph = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: title,
      description,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified || datePublished ? { dateModified: dateModified || datePublished } : {}),
    },
  ];
  if (breadcrumb.length) graph.push(buildBreadcrumbSchema(breadcrumb));
  if (faqs.length) graph.push(faqPageNode(url, faqs));
  return { '@context': 'https://schema.org', '@graph': graph };
};

// Topic-cluster hub — a CollectionPage + ItemList of the resources it gathers.
export const buildLearnHubSchema = ({ name, description, path, items = [], breadcrumb = [] }) => {
  const url = `${SITE_URL}${path}/`;
  const graph = [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#collection`,
      name,
      description,
      url,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORG_ID },
    },
    {
      '@type': 'ItemList',
      '@id': `${url}#itemlist`,
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        name: item.name,
      })),
    },
  ];
  if (breadcrumb.length) graph.push(buildBreadcrumbSchema(breadcrumb));
  return { '@context': 'https://schema.org', '@graph': graph };
};

// Author profile page — a Person tied to the Organization (E-E-A-T).
export const buildAuthorSchema = (author, breadcrumb = []) => {
  const url = author.url;
  const graph = [
    {
      '@type': 'Person',
      '@id': `${url.replace(/\/$/, '')}#person`,
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      url,
      image: author.image ? `${SITE_URL}${author.image}` : `${SITE_URL}/logo.jpg`,
      worksFor: { '@id': ORG_ID },
      ...(author.expertise && author.expertise.length ? { knowsAbout: author.expertise } : {}),
      ...(author.sameAs && author.sameAs.length ? { sameAs: author.sameAs } : {}),
    },
  ];
  if (breadcrumb.length) graph.push(buildBreadcrumbSchema(breadcrumb));
  return { '@context': 'https://schema.org', '@graph': graph };
};
