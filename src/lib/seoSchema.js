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
  sameAs,
};

export const localBusinessSchema = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#localbusiness`,
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
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: author
          ? {
              '@type': 'Person',
              name: author.name,
              url: author.url,
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
