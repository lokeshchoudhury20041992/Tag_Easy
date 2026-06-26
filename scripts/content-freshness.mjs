// Task — Content freshness report.
// Scans editorial + page content for staleness and missing review metadata,
// then writes a human-readable report to dist/content-freshness-report.md.
// Run with: npm run content:freshness
//
// Reports:
//   • blogs older than 6 months (by dateModified)
//   • service pages not reviewed in 90 days (or missing a review date)
//   • case studies without a recent review
//   • pages missing dateModified / lastReviewed metadata
//   • stale FAQ entries (no review metadata)

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { blogData } from '../src/lib/blogData.js';
import { serviceDetailPages } from '../src/lib/servicesData.js';
import { caseStudies } from '../src/lib/caseStudyData.js';
import { faqs } from '../src/lib/faqData.js';
import { locations } from '../src/lib/locationsData.js';

const distDir = path.resolve('dist');
const NOW = new Date();
const DAY = 24 * 60 * 60 * 1000;

const daysSince = (dateStr) => {
  if (!dateStr) return null;
  const t = new Date(`${dateStr}T00:00:00Z`).getTime();
  if (Number.isNaN(t)) return null;
  return Math.floor((NOW.getTime() - t) / DAY);
};

const STALE_BLOG_DAYS = 183; // ~6 months
const STALE_PAGE_DAYS = 90;

const staleBlogs = [];
const missingBlogDates = [];
for (const post of blogData) {
  const ref = post.dateModified || post.date;
  const age = daysSince(ref);
  if (age === null) {
    missingBlogDates.push(`${post.slug} — no date/dateModified`);
  } else if (age > STALE_BLOG_DAYS) {
    staleBlogs.push(`${post.slug} — last updated ${ref} (${age} days ago)`);
  }
}

// Service/location/case-study pages do not yet carry a lastReviewed date.
const reviewField = (entry) => entry.lastReviewed || entry.dateModified || null;

const staleServices = [];
const servicesMissingDate = [];
for (const svc of serviceDetailPages) {
  const ref = reviewField(svc);
  const age = daysSince(ref);
  if (age === null) servicesMissingDate.push(`/services/${svc.slug} — add a lastReviewed date`);
  else if (age > STALE_PAGE_DAYS) staleServices.push(`/services/${svc.slug} — reviewed ${ref} (${age} days ago)`);
}

const staleCaseStudies = [];
const caseStudiesMissingDate = [];
for (const cs of caseStudies) {
  const ref = reviewField(cs);
  const age = daysSince(ref);
  if (age === null) caseStudiesMissingDate.push(`${cs.path} — add a lastReviewed date`);
  else if (age > STALE_PAGE_DAYS) staleCaseStudies.push(`${cs.path} — reviewed ${ref} (${age} days ago)`);
}

const locationsMissingDate = locations
  .filter((l) => !reviewField(l))
  .map((l) => `/locations/${l.slug} — add a lastReviewed date`);

// FAQs carry no review metadata at all today.
const faqsWithoutReview = faqs.filter((f) => !f.lastReviewed).length;

const section = (title, items, emptyNote = 'none') =>
  `## ${title}\n${items.length ? items.map((i) => `- ${i}`).join('\n') : `- ${emptyNote}`}\n`;

const totalActions =
  staleBlogs.length +
  missingBlogDates.length +
  staleServices.length +
  servicesMissingDate.length +
  staleCaseStudies.length +
  caseStudiesMissingDate.length +
  locationsMissingDate.length +
  (faqsWithoutReview ? 1 : 0);

const report = `# Content Freshness Report

Generated: ${NOW.toISOString()}

- Blogs scanned: ${blogData.length}
- Service pages scanned: ${serviceDetailPages.length}
- Case studies scanned: ${caseStudies.length}
- Location pages scanned: ${locations.length}
- FAQ entries scanned: ${faqs.length}
- Action items: ${totalActions}

${section(`Blogs older than 6 months (> ${STALE_BLOG_DAYS} days)`, staleBlogs, 'all blogs are fresh')}
${section('Service pages not reviewed in 90 days', staleServices, 'none stale by date')}
${section('Case studies without a recent review', staleCaseStudies, 'none stale by date')}
${section('Pages missing dateModified / lastReviewed', [
  ...missingBlogDates,
  ...servicesMissingDate,
  ...caseStudiesMissingDate,
  ...locationsMissingDate,
])}
${section('Stale FAQ entries', faqsWithoutReview ? [`${faqsWithoutReview} FAQ entries have no lastReviewed metadata — add review dates to track freshness`] : [], 'all FAQs have review metadata')}
`;

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, 'content-freshness-report.md'), report);

console.log(`Content freshness: ${totalActions} action item(s).`);
console.log('Report written to dist/content-freshness-report.md');
