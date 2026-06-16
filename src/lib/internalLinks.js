// Phase 2 · Task 12 — Internal linking automation.
//
// One helper that, given the current page context, returns contextual links to
// related services, FAQs, glossary terms, blog posts, and case studies. It uses
// clean canonical route paths and never links a page to itself, which deepens
// crawl paths and builds topical authority without manual link maintenance.

import { serviceDetailPages, getServiceDetail } from './servicesData.js';
import { faqs, getFaqsByCategories } from './faqData.js';
import { glossaryTerms } from './glossaryData.js';
import { getIndexablePosts } from './blogData.js';
import { getPublishedCaseStudies, getCaseStudy } from './caseStudyData.js';

const svcHref = (slug) => `/services/${slug}`;
const glossaryHref = (slug) => `/glossary#${slug}`;
const blogHref = (slug) => `/blog/${slug}`;

const serviceLabel = (slug) => {
  const s = getServiceDetail(slug);
  return s ? s.h1.replace(/ —.*$/, '') : slug;
};

// Pick blog posts relevant to a set of keyword/category hints, excluding none.
const blogFor = (hints = [], limit = 3) => {
  const wants = hints.map((h) => h.toLowerCase());
  const posts = getIndexablePosts();
  const scored = posts
    .map((post) => {
      const hay = [post.category, ...(post.keywords || [])].join(' ').toLowerCase();
      const score = wants.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
      return { post, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const chosen = (scored.length ? scored.map((x) => x.post) : posts).slice(0, limit);
  return chosen.map((post) => ({ title: post.title, href: blogHref(post.slug) }));
};

/**
 * getRelatedLinks — contextual internal links for a page.
 * @param {object} opts
 * @param {('service'|'location'|'case-study'|'page')} opts.currentPageType
 * @param {string} [opts.serviceSlug]   current service slug (for self-link exclusion)
 * @param {string} [opts.caseStudySlug] current case study slug (for self-link exclusion)
 * @param {string[]} [opts.serviceSlugs] explicit related service slugs (e.g. a location's services)
 * @param {string[]} [opts.glossarySlugs] explicit glossary slugs to surface
 * @param {string[]} [opts.faqCategories] FAQ categories to surface
 * @param {string[]} [opts.keywords]     hints for choosing related blog posts
 * @param {number}  [opts.limit]         max items per group (default 4)
 */
export const getRelatedLinks = (opts = {}) => {
  const {
    currentPageType = 'page',
    serviceSlug,
    caseStudySlug,
    serviceSlugs,
    glossarySlugs,
    faqCategories,
    keywords = [],
    limit = 4,
  } = opts;

  const svc = serviceSlug ? getServiceDetail(serviceSlug) : null;

  // --- Related services (clean, deduped, no self-link) ---
  let relatedServiceSlugs =
    serviceSlugs ||
    (svc && svc.relatedServices) ||
    serviceDetailPages.map((s) => s.slug);
  relatedServiceSlugs = [...new Set(relatedServiceSlugs)].filter((s) => s !== serviceSlug);
  const services = relatedServiceSlugs
    .map((slug) => getServiceDetail(slug))
    .filter(Boolean)
    .slice(0, limit)
    .map((s) => ({ label: serviceLabel(s.slug), href: svcHref(s.slug) }));

  // --- Related glossary terms ---
  const wantedGlossary = glossarySlugs || (svc && svc.glossarySlugs) || [];
  const glossaryPool = wantedGlossary.length
    ? glossaryTerms.filter((t) => wantedGlossary.includes(t.slug))
    : glossaryTerms;
  const glossary = glossaryPool
    .slice(0, limit)
    .map((t) => ({ label: t.term, href: glossaryHref(t.slug) }));

  // --- Related FAQs ---
  const cats = faqCategories || (svc && svc.faqCategories) || [];
  const faqPool = cats.length ? getFaqsByCategories(cats) : faqs;
  const relatedFaqs = faqPool
    .slice(0, limit)
    .map((f) => ({ question: f.question, answer: f.answer, href: '/faqs' }));

  // --- Related blog posts ---
  const blogHints = keywords.length
    ? keywords
    : svc
    ? [svc.slug.replace(/-/g, ' '), ...(svc.faqCategories || [])]
    : [];
  const blog = blogFor(blogHints, limit);

  // --- Related case studies (no self-link) ---
  const csSlugs = (svc && svc.relatedCaseStudies) || (opts.caseStudySlugs || []);
  let csList = csSlugs.length
    ? csSlugs.map((s) => getCaseStudy(s)).filter((c) => c && c.published)
    : getPublishedCaseStudies();
  csList = csList.filter((c) => c.slug !== caseStudySlug).slice(0, limit);
  const caseStudies = csList.map((c) => ({ label: c.title, href: c.path }));

  void currentPageType; // reserved for future page-type-specific weighting
  return { services, glossary, faqs: relatedFaqs, blog, caseStudies };
};
