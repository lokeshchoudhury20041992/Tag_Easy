// Task 10 — Central image mapping. Every public/OG/blog/service image is named
// here and points at a locally-hosted, branded asset (no random picsum/Unsplash).
// If a dedicated asset doesn't exist yet, we fall back to a relevant branded
// image already in /public rather than a random third-party URL.

export const seoImages = {
  // Open Graph / social
  homeOg: '/logo.jpg',
  defaultOg: '/logo.jpg',

  // Service visuals (reuse branded/case assets until bespoke art is produced)
  aiAutomation: '/tim.webp',
  technicalSeo: '/case-studies/metropolitan.webp',
  webDevelopment: '/case-studies/commerce.webp',
  adsHub: '/case-studies/migration.webp',
  analytics: '/case-studies/metropolitan.webp',
  leadGen: '/tim.webp',

  // Case studies
  maatritva: '/Maatritva.webp',
  metropolitan: '/case-studies/metropolitan.webp',
  commerce: '/case-studies/commerce.webp',
  migration: '/case-studies/migration.webp',
};

// Blog hero image by category — branded local assets, topic-relevant.
export const blogImageByCategory = {
  Engineering: '/case-studies/metropolitan.webp',
  Marketing: '/case-studies/migration.webp',
  Design: '/tim.webp',
  'AI & Automation': '/tim.webp',
  Infrastructure: '/case-studies/commerce.webp',
  SEO: '/case-studies/metropolitan.webp',
  'Local SEO': '/Maatritva.webp',
};

export const getBlogImage = (category) =>
  blogImageByCategory[category] || seoImages.defaultOg;
