// Phase 2 · Task 15 — Standalone OG image generator.
// Writes one branded 1200×630 SVG per page to dist/og/<key>.svg. The prerender
// also emits these, but this script lets you regenerate them on their own
// (e.g. after editing scripts/ogImage.mjs templates) via:
//   node scripts/generate-og-images.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pages } from './pages.mjs';
import { renderOgSvg, ogKeyForPath } from './ogImage.mjs';

const ogDir = path.resolve('dist', 'og');

const run = async () => {
  await mkdir(ogDir, { recursive: true });
  await Promise.all(
    pages.map((page) => {
      const key = ogKeyForPath(page.path);
      const svg = renderOgSvg({ title: page.title, category: page.category });
      return writeFile(path.join(ogDir, `${key}.svg`), svg);
    })
  );
  console.log(`Generated ${pages.length} OG images in dist/og/.`);
};

run();
