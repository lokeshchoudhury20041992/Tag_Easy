// Task 6 — IndexNow submission for faster Bing/Yandex discovery.
// Submits only clean, canonical, indexable URLs (no noindex/draft/duplicate).
// Run with: npm run indexnow
//
// The key file must be publicly accessible at:
//   https://tageasy.org/8f4e2a9c7b1d4f6e8a3c5b7d9e1f2a4c.txt

import { SITE_URL } from '../src/lib/seoSchema.js';
import { teamMembers } from '../src/lib/teamData.js';
import { getIndexablePosts } from '../src/lib/blogData.js';

const KEY = '8f4e2a9c7b1d4f6e8a3c5b7d9e1f2a4c';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const host = new URL(SITE_URL).host;

const corePaths = [
  '/', '/services', '/ai-automation', '/industries', '/case-studies',
  '/case-studies/maatritva', '/about', '/contact', '/free-audit',
  '/blog', '/glossary', '/faqs',
];

const canonical = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}/`);

const urlList = [
  ...corePaths.map(canonical),
  ...teamMembers.map((m) => canonical(`/team/${m.slug}`)),
  ...getIndexablePosts().map((post) => canonical(`/blog/${post.slug}`)),
];

const submit = async () => {
  const body = { host, key: KEY, keyLocation: KEY_LOCATION, urlList };
  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    if (res.ok || res.status === 202) {
      console.log(`✓ IndexNow accepted (${res.status}).`);
    } else {
      console.warn(`IndexNow responded with ${res.status} ${res.statusText}.`);
    }
  } catch (err) {
    console.error('IndexNow submission failed:', err.message);
    process.exitCode = 1;
  }
};

submit();
