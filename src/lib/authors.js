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

// Normalised author objects, keyed by slug.
export const authors = teamMembers.reduce((acc, member) => {
  acc[member.slug] = {
    id: member.slug,
    name: member.name,
    role: member.role,
    bio: member.bio,
    image: member.image,
    url: `${SITE_URL}/team/${member.slug}/`,
    sameAs: cleanSameAs(member.socials),
    expertise: expertiseBySlug[member.slug] || [],
    worksFor: 'Tag Easy',
  };
  return acc;
}, {});

// Default house author for editorial posts without a named individual.
export const DEFAULT_AUTHOR_ID = 'lokesh-choudhury';

export const getAuthor = (id) => authors[id] || authors[DEFAULT_AUTHOR_ID];
