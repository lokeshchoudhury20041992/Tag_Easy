// Single source of truth for Tag Easy structured data (JSON-LD).
// Pure JS (no JSX / browser APIs) so the Node prerender script can import it too.

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

// Rich graph for the homepage: Organization + WebSite + LocalBusiness.
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

// Build a Person graph for a team member page.
export const buildPersonSchema = (member) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  url: `${SITE_URL}/team/${member.slug}`,
  image: `${SITE_URL}${member.image}`,
  worksFor: { '@id': ORG_ID },
  sameAs: Object.values(member.socials || {}).filter(
    (href) => href && href !== '#' && href.startsWith('http')
  ),
});
