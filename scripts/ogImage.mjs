// Phase 2 · Task 15 — Branded Open Graph image generator (no external deps).
//
// Produces a unique 1200×630 SVG per page with Tag Easy branding, the page
// title, and a category label. SVG keeps the build dependency-free and the
// assets tiny; they are served from /og/<key>.svg and referenced as og:image
// in the prerendered HTML. Both the prerender and the standalone generate
// script use these helpers, so keys/render always match.

export const SITE_URL = 'https://tageasy.org';

// Deterministic OG key from a route path. Must match the keys hard-coded in the
// React SEO components (e.g. /og/services-seo.svg).
export const ogKeyForPath = (p) => {
  if (!p || p === '/') return 'home';
  return p.replace(/^\//, '').replace(/\/+$/, '').replace(/\//g, '-') || 'home';
};

export const ogImageUrl = (p) => `${SITE_URL}/og/${ogKeyForPath(p)}.svg`;

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Greedy word-wrap into at most `maxLines` lines of ~`maxChars` characters.
const wrapTitle = (title, maxChars = 24, maxLines = 4) => {
  const words = String(title).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  // If we truncated, add an ellipsis to the last line.
  const consumed = lines.join(' ').split(/\s+/).length;
  if (consumed < words.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1]}…`;
  }
  return lines;
};

// Strip a trailing " | Tag Easy" / " | Tag Easy Journal" so the title reads clean.
const cleanTitle = (title) =>
  String(title).replace(/\s*\|\s*Tag Easy.*$/i, '').replace(/\s+Case Study$/i, '').trim();

export const renderOgSvg = ({ title, category = 'Tag Easy', theme = 'dark' } = {}) => {
  const bg = theme === 'light' ? '#f5f5f5' : '#0a0a0a';
  const fg = theme === 'light' ? '#0a0a0a' : '#ffffff';
  const muted = theme === 'light' ? '#555555' : '#9a9a9a';
  const accent = '#ef4444';

  const lines = wrapTitle(cleanTitle(title), 24, 4);
  const startY = 300 - (lines.length - 1) * 38; // vertically center the block
  const titleTspans = lines
    .map((ln, i) => `<text x="90" y="${startY + i * 84}" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-weight="700" fill="${fg}">${escapeXml(ln)}</text>`)
    .join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${bg}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="12" height="630" fill="${accent}"/>
  <text x="90" y="110" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" letter-spacing="6" fill="${fg}">TAG EASY</text>
  <text x="90" y="170" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="${accent}">${escapeXml(String(category).toUpperCase())}</text>
  ${titleTspans}
  <text x="90" y="560" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500" fill="${muted}">Revenue-driven digital engineering · Kolkata · India</text>
  <text x="90" y="595" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" letter-spacing="2" fill="${accent}">tageasy.org</text>
</svg>
`;
};
