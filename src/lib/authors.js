// Task 3 — Central Person/author source of truth.
// Built ON TOP of teamData.js (the canonical team list) so author details are
// never duplicated. This adds the author-specific fields blogs need (expertise,
// a clean sameAs list, a profile URL) and exposes lookup helpers used by blog
// author blocks and BlogPosting schema.

import { teamMembers } from './teamData.js';

export const SITE_URL = 'https://tageasy.org';

// Per-person areas of expertise, keyed by team slug. Kept here (not in teamData)
// because it's an author/E-E-A-T concern, not core team display data.
const expertiseBySlug = {
  'lokesh-choudhury': ['SEO', 'AI Automation', 'Digital Strategy', 'Lead Generation'],
  'shyanil-mishra': ['Software Engineering', 'AI & Data Science', 'Business Automation'],
  'drik-sarker': ['Local SEO', 'Google Business Profile', 'Technical SEO'],
  'sam-b': ['QA Engineering', 'Test Automation'],
  'sandip-majumder': ['Creative Direction', 'Brand Design'],
  'antara-sadhukhan': ['Partnerships', 'Operations'],
  'arpita-dutta': ['Business Development', 'Client Strategy'],
  'ankita-singh': ['Frontend Development', 'UI/UX'],
};

const cleanSameAs = (socials = {}) =>
  Object.values(socials).filter((href) => href && href !== '#' && href.startsWith('http'));

// Authors who get their own public, indexable /authors/<slug> profile page.
// Deliberately scoped to verifiable, non-hidden authors (see team hidden flags)
// so author E-E-A-T pages only ever feature real, public individuals.
export const INDEXABLE_AUTHOR_SLUGS = ['lokesh-choudhury'];

export const isIndexableAuthor = (id) => INDEXABLE_AUTHOR_SLUGS.includes(id);

// Author profiles link here; non-indexable authors keep their team URL (and are
// never surfaced standalone because getAuthor() falls back to the house author).
const authorProfilePath = (slug) =>
  INDEXABLE_AUTHOR_SLUGS.includes(slug)
    ? `${SITE_URL}/authors/${slug}/`
    : `${SITE_URL}/team/${slug}/`;

// Normalised author objects, keyed by slug.
export const authors = teamMembers.reduce((acc, member) => {
  acc[member.slug] = {
    id: member.slug,
    name: member.name,
    role: member.role,
    bio: member.bio,
    image: member.image,
    url: authorProfilePath(member.slug),
    sameAs: cleanSameAs(member.socials),
    expertise: expertiseBySlug[member.slug] || [],
    worksFor: 'Tag Easy',
    hidden: member.hidden,
  };
  return acc;
}, {});

// Default house author for editorial posts without a named individual.
export const DEFAULT_AUTHOR_ID = 'lokesh-choudhury';

export const getAuthor = (id) => {
  const author = authors[id];
  if (author && !author.hidden) {
    return author;
  }
  return authors[DEFAULT_AUTHOR_ID];
};

// Authors that get a public, indexable profile page.
export const getIndexableAuthors = () =>
  INDEXABLE_AUTHOR_SLUGS.map((slug) => authors[slug]).filter(Boolean);
