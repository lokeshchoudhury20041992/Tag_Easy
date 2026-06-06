// Tasks 1 & 2 — Real, original blog content with quality controls.
//
// The previous version generated 50 duplicate/spun posts from 5 templates with
// random picsum images and runtime-regenerated dates (audit §4.1, P0). That is
// replaced here with a small set of genuinely original, indexable articles.
//
// Quality fields on every post:
//   indexable     – whether the post may be indexed / appear in sitemap
//   qualityStatus – approved | noindex | redirect | draft
//   canonicalSlug – if set, this post redirects to that slug (duplicate handling)
//   authorId      – references src/lib/authors.js (real named author)
//
// Helpers expose only the right posts to listings, sitemap, prerender, and schema.

import { getBlogImage } from './seoImages.js';

const p = (text) => ({ type: 'paragraph', text });
const h = (text) => ({ type: 'heading', text });

export const blogPosts = [
  {
    id: 1,
    slug: 'why-react-pages-not-indexing-google',
    title: 'Why Your React Website Pages Are Not Indexing on Google (and How to Fix It)',
    excerpt:
      'React single-page apps often serve one empty HTML shell for every route, so Google indexes only the homepage. Here is exactly why it happens and the prerendering fix.',
    category: 'SEO',
    authorId: 'lokesh-choudhury',
    date: '2026-05-20',
    dateModified: '2026-06-06',
    keywords: ['react seo', 'spa indexing', 'prerendering', 'technical seo'],
    indexable: true,
    canonicalSlug: null,
    qualityStatus: 'approved',
    content: [
      p('If you search `site:yourdomain.com` and only the homepage shows up, you are almost certainly hitting the single-page application (SPA) indexing problem. It is one of the most common reasons modern React, Vue, and Angular sites underperform in organic search, and the good news is that it is fixable.'),
      h('Why it happens'),
      p('A React app ships a near-empty `index.html` with a single `<div id="root">` and a JavaScript bundle. The real content is rendered in the browser after the JavaScript executes. Googlebot can render JavaScript, but rendering is deferred, budget-limited, and unreliable for large sites. Worse, many hosts serve the exact same shell HTML for every route, so before JavaScript runs, every URL looks identical and empty. Google sees duplicate, contentless pages and quietly drops them.'),
      h('The fix: prerender every route'),
      p('The durable fix is to generate real, route-specific HTML at build time (prerendering) or on the server (SSR). Each route should ship its own title, meta description, canonical, structured data, and crawlable body text — before any JavaScript runs. Tools like vite-plugin-ssr, Next.js, Astro, or a custom prerender step all achieve this.'),
      p('On Tag Easy projects we generate per-route HTML during the build, write a clean canonical for each page, inject JSON-LD, and include a meaningful `<noscript>` body so crawlers and AI engines always see content. The React app then hydrates on top of that HTML for users.'),
      h('Don\'t forget the supporting signals'),
      p('Prerendering alone is not enough. Pair it with a complete sitemap that includes `lastmod`, correct robots directives, canonical URLs that strip tracking parameters, and structured data. Then submit the sitemap in Google Search Console and use IndexNow to accelerate discovery on Bing.'),
      h('How to verify'),
      p('Run `curl https://yourdomain.com/your-page` and check that the `<title>` and body text match the page — not the homepage. Use the URL Inspection tool in Search Console to confirm the rendered HTML contains your content. If both look right, indexing usually follows within a few weeks.'),
    ],
  },
  {
    id: 2,
    slug: 'ai-automation-lead-follow-up-systems',
    title: 'AI Automation for Lead Follow-Up: Stop Losing Leads to Slow Responses',
    excerpt:
      'Most leads go cold because no one replies fast enough. Here is how to build an AI automation system that captures, qualifies, and follows up with leads in seconds.',
    category: 'AI & Automation',
    authorId: 'lokesh-choudhury',
    date: '2026-05-12',
    dateModified: '2026-06-06',
    keywords: ['ai automation', 'lead automation', 'crm', 'follow-up'],
    indexable: true,
    canonicalSlug: null,
    qualityStatus: 'approved',
    content: [
      p('Speed-to-lead is one of the most under-rated growth levers. Studies consistently show that responding within the first few minutes dramatically increases the odds of converting an inquiry. Yet most businesses take hours — or days — because follow-up depends on a human noticing a form submission.'),
      h('What a lead automation system actually does'),
      p('A well-built system removes the gap between a lead arriving and the first response. When someone submits a form, the automation captures the lead, qualifies intent (often with an AI step that reads the message and scores it), routes it into the CRM, notifies the right salesperson, and sends an instant, personalised acknowledgement over WhatsApp or email.'),
      h('The building blocks'),
      p('You connect your website forms, ad platforms, CRM, inbox, calendar, and an AI reasoning layer into one flow. Tools like Make or n8n orchestrate the steps; an LLM handles qualification and drafting; the CRM holds the record; and WhatsApp or email delivers the follow-up. Crucially, you add human approval points wherever a message or decision needs oversight.'),
      h('Keep humans in control'),
      p('Automation should not fire blindly. We build in fallback rules, confidence thresholds, and approval steps so the system escalates anything unusual to a person. The goal is to remove repetitive work, not to remove judgement.'),
      h('Start small, then expand'),
      p('The fastest win is usually a single workflow: instant lead capture and follow-up. Prove the value, measure the lift in response time and conversion, then expand into reporting, nurture sequences, and custom AI agents. A first working automation is typically live within two to four weeks.'),
    ],
  },
  {
    id: 3,
    slug: 'core-web-vitals-checklist-for-marketing-sites',
    title: 'A Practical Core Web Vitals Checklist for Marketing Websites',
    excerpt:
      'Core Web Vitals are a ranking and conversion signal. This is the practical checklist we use to ship fast, stable pages — especially on mobile.',
    category: 'Engineering',
    authorId: 'shyanil-mishra',
    date: '2026-05-04',
    dateModified: '2026-06-06',
    keywords: ['core web vitals', 'performance', 'lcp', 'cls', 'mobile'],
    indexable: true,
    canonicalSlug: null,
    qualityStatus: 'approved',
    content: [
      p('Core Web Vitals measure real-world page experience: loading (Largest Contentful Paint), interactivity (Interaction to Next Paint), and visual stability (Cumulative Layout Shift). They influence both rankings and conversions, and mobile is where most sites struggle.'),
      h('Largest Contentful Paint (LCP)'),
      p('LCP is usually the hero image or headline. Give the hero a lightweight poster image, avoid autoplaying heavy video on mobile, preload the critical asset, and defer render-blocking fonts with `media="print" onload="this.media=\'all\'"`. Serve modern formats (WebP/AVIF) and correctly sized images.'),
      h('Cumulative Layout Shift (CLS)'),
      p('CLS happens when content jumps as the page loads. The single biggest fix is putting explicit `width` and `height` (or an aspect-ratio) on every image and media element so the browser reserves space before the asset arrives. Reserve space for embeds and avoid injecting content above existing content.'),
      h('Interaction to Next Paint (INP)'),
      p('INP reflects how quickly the page responds to input. Reduce long JavaScript tasks, lazy-load below-the-fold components, and avoid shipping large animation libraries eagerly when a lighter approach will do.'),
      h('The checklist'),
      p('1) Hero uses a poster and defers heavy video on mobile. 2) Every image has width/height and lazy-loads unless above the fold. 3) Fonts are non-render-blocking. 4) Critical assets are preloaded. 5) JavaScript is code-split and below-the-fold work is deferred. 6) Images are WebP/AVIF and responsive. Tick these and most marketing sites move firmly into the green.'),
    ],
  },
  {
    id: 4,
    slug: 'local-seo-google-business-profile-guide',
    title: 'Local SEO: How to Win "Near Me" Searches with Google Business Profile',
    excerpt:
      'For local businesses, the Google Business Profile and consistent NAP signals decide who shows up in the map pack. Here is how to do local SEO properly.',
    category: 'SEO',
    authorId: 'drik-sarker',
    date: '2026-04-26',
    dateModified: '2026-06-06',
    keywords: ['local seo', 'google business profile', 'near me', 'nap'],
    indexable: true,
    canonicalSlug: null,
    qualityStatus: 'approved',
    content: [
      p('When someone searches for a service "near me", Google leans heavily on local signals to decide which businesses appear in the map pack. Winning that space comes down to a few fundamentals done consistently.'),
      h('Optimise your Google Business Profile'),
      p('Your Google Business Profile is the foundation. Choose the most accurate primary category, list your services, add real photos, keep hours current, answer questions, and post updates. Reviews — and your responses to them — are a strong ranking and trust signal.'),
      h('Keep NAP consistent everywhere'),
      p('NAP stands for Name, Address, and Phone number. These must match exactly across your website, Google Business Profile, and directory listings. Inconsistent NAP confuses search engines and dilutes local authority. We also recommend adding LocalBusiness schema to your site so the details are machine-readable.'),
      h('Create locally-relevant content'),
      p('Pages that reference the city or region you serve, answer local questions, and link to relevant services help you rank for geographic queries. For multi-location businesses, dedicated location pages work well — as long as each has genuinely unique content.'),
      h('Measure what matters'),
      p('Track calls, direction requests, and form submissions from local search. Set up conversion tracking so you know which local efforts actually generate inquiries, then double down on what works.'),
    ],
  },
  {
    id: 5,
    slug: 'generative-engine-optimization-geo-guide',
    title: 'Generative Engine Optimization (GEO): Getting Cited by ChatGPT and AI Overviews',
    excerpt:
      'AI answer engines are a new discovery channel. GEO is how you structure content and entities so ChatGPT, Perplexity, and Google AI Overviews cite your business.',
    category: 'AI & Automation',
    authorId: 'lokesh-choudhury',
    date: '2026-04-18',
    dateModified: '2026-06-06',
    keywords: ['geo', 'generative engine optimization', 'ai overviews', 'llms.txt'],
    indexable: true,
    canonicalSlug: null,
    qualityStatus: 'approved',
    content: [
      p('Search is no longer just ten blue links. ChatGPT Search, Perplexity, Google AI Overviews, and Gemini increasingly answer questions directly and cite sources. Generative Engine Optimization (GEO) is the practice of making your content the kind these engines can confidently extract and cite.'),
      h('Write clear, factual, extractable claims'),
      p('AI engines prefer concrete statements over poetic marketing copy. "We completed the migration in eight weeks with zero downtime" is citable; "we architect digital headquarters that command attention" is not. Use definitions, short factual paragraphs, lists, and Q&A blocks.'),
      h('Give engines structure'),
      p('Structured data does heavy lifting. Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Article, and Person schema help engines understand your entity, services, and authors. FAQ blocks that match visible content are especially effective hooks.'),
      h('Strengthen your entity'),
      p('AI engines triangulate identity across the web. Link your profiles with `sameAs` (LinkedIn, Instagram, Crunchbase), keep consistent NAP, and consider authoritative third-party listings. The more consistently your entity appears, the more confidently engines cite you.'),
      h('Adopt AI-readable files'),
      p('Emerging conventions like `llms.txt` and `llms-full.txt` give AI crawlers a clean, structured summary of who you are, what you offer, and your key URLs. They are cheap to add and signal that you welcome citation.'),
    ],
  },
  {
    id: 6,
    slug: 'schema-markup-that-actually-moves-rankings',
    title: 'Schema Markup That Actually Moves Rankings (and AI Citations)',
    excerpt:
      'Not all structured data is worth your time. Here are the schema types that genuinely help with rich results and AI answer citations — and how to keep them valid.',
    category: 'SEO',
    authorId: 'lokesh-choudhury',
    date: '2026-04-10',
    dateModified: '2026-06-06',
    keywords: ['schema markup', 'json-ld', 'structured data', 'rich results'],
    indexable: true,
    canonicalSlug: null,
    qualityStatus: 'approved',
    content: [
      p('Structured data tells search engines and AI engines exactly what a page is about. But adding random schema does nothing — what matters is choosing the right types, keeping them accurate, and making sure they match visible content.'),
      h('The types worth implementing'),
      p('Organization and LocalBusiness establish your entity and local presence. Service describes what you offer and ties it to your organization as the provider. FAQPage powers rich snippets and gives AI engines clean Q&A to cite. BreadcrumbList improves how your URLs appear in results. Article/BlogPosting and Person establish authorship and freshness for content.'),
      h('Match schema to what users see'),
      p('Google penalises structured data that does not reflect on-page content. Your FAQPage schema must contain the same questions and answers that are visible to users. Never mark up content that is not actually on the page.'),
      h('Keep it valid'),
      p('Use JSON-LD (not microdata) in a single graph where possible, validate with the Rich Results Test, and avoid duplicate or conflicting entities. We centralise schema generation in one module so every page shares a consistent Organization identity and there is one place to fix issues.'),
      h('Why it matters for AI'),
      p('Beyond rich results, schema is increasingly how AI engines understand and attribute content. A site with clean, accurate structured data is far easier for generative engines to parse and cite than one relying on visual layout alone.'),
    ],
  },
];

// Attach the branded image + a display date to each post.
const withDerived = (post) => ({
  ...post,
  image: getBlogImage(post.category),
  displayDate: new Date(`${post.date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
});

export const blogData = blogPosts.map(withDerived);

// Posts safe to show in listings (approved, not redirects/drafts).
export const getApprovedPosts = () =>
  blogData.filter((post) => post.qualityStatus === 'approved');

// Posts safe to index / put in sitemap / prerender (approved AND indexable, no redirect).
export const getIndexablePosts = () =>
  blogData.filter(
    (post) => post.indexable && post.qualityStatus === 'approved' && !post.canonicalSlug
  );

export const getPostBySlug = (slug) => blogData.find((post) => post.slug === slug);

// Map of duplicate slug -> canonical slug, for redirect handling.
export const getRedirectMap = () =>
  blogData
    .filter((post) => post.qualityStatus === 'redirect' && post.canonicalSlug)
    .reduce((acc, post) => {
      acc[post.slug] = post.canonicalSlug;
      return acc;
    }, {});
