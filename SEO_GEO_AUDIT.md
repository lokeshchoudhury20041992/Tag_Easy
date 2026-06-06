# Tag Easy — SEO & GEO Audit

**Audit date:** 2026-05-28
**Last updated:** 2026-06-06 (remediation pass — see §0)
**Scope:** entire codebase at `C:\Users\Asus\Tag_Easy`
**Site:** https://tageasy.org
**Stack:** React 18 SPA, Vite 5, react-router-dom v6, react-helmet-async, build-time prerendering (`scripts/prerender-seo.mjs`)

---

## 0. Remediation Status (2026-06-06)

A 20-task remediation pass was implemented and verified. `npm run build` passes, `npm run seo:check` reports **41 passed / 0 warnings / 0 errors**, and **26 routes + `404.html`** are prerendered. Full details in `SEO_GEO_IMPLEMENTATION_REPORT.md`.

| # | Task | Status | Evidence |
|---|---|:-:|---|
| 1 | Blog cleanup (dedupe/thin, quality fields) | ✅ | `blogData.js` rewritten — 6 original posts, `indexable`/`qualityStatus`/`canonicalSlug`, fixed dates, branded images |
| 2 | `BlogPosting` schema (approved only) | ✅ | `buildBlogPostingSchema`; prerendered into each `/blog/*` with real Person author |
| 3 | Central author/Person source | ✅ | `src/lib/authors.js` (built on `teamData.js`) |
| 4 | `BreadcrumbList` on inner pages | ✅ | `buildBreadcrumbSchema` + `Breadcrumbs.jsx` across services, blog, team, case studies, glossary, FAQs |
| 5 | Real 404 status | ✅ | `dist/404.html` (noindex) + `_redirects` `/* /404.html 404` |
| 6 | IndexNow support | ✅ | `scripts/indexnow.mjs`, key file, `npm run indexnow` |
| 7 | Sitemap priority/changefreq/filtering | ✅ | `lastmod`+priority per URL; noindex excluded; 26 canonical URLs |
| 8 | Core Web Vitals — hero video | ✅ | `preload="none"` + poster, desktop-only (protects mobile LCP) |
| 9 | OptimizedImage component | ✅ | `OptimizedImage.jsx` (width/height/lazy/async/fallback); imgs given dimensions |
| 10 | Branded local images | ✅ | `src/lib/seoImages.js`; picsum generator removed |
| 11 | Reusable FAQ + `FAQPage` schema | ✅ | `FAQ.jsx` + `faqData.js`; on Services/AI/Audit/Contact/FAQ hub |
| 12 | Extractable service sections | ✅ | `servicesData.js` + rewritten Services page detail blocks |
| 13 | OfferCatalog / Service catalog | ✅ | `buildOfferCatalogSchema`; in homepage + Services graph |
| 14 | Glossary system | ✅ | `/glossary` + `glossaryData.js` + `DefinedTermSet` schema |
| 15 | FAQ hub | ✅ | `/faqs` with categorized FAQs + `FAQPage` schema |
| 16 | Case-study template w/ proof | ✅ | `caseStudyData.js` (proof + caveats) + Article schema on Maatritva |
| 17 | Approved proof-claims library | ✅ | `proofClaims.js`; Home/About stats sourced from it (fixes §4.3 conflicts) |
| 18 | GA4 conversion events | ✅ | `analytics.js`; wired to forms, phone/email/WhatsApp, CTAs, profile links |
| 19 | SEO/GEO QA dashboard | ✅ | `seoQaStatus.js` + env-gated noindex `/seo-dashboard` |
| 20 | Automated SEO validation | ✅ | `scripts/seo-check.mjs`, `npm run seo:check` |

The original findings below are retained for historical context; most P0/P1 items in §2–§7 are now addressed by the above.

Severity legend: **P0** = blocks indexing or causes Google to drop pages • **P1** = significant ranking/visibility loss • **P2** = best-practice gap, fix when convenient.

"GEO" in this report covers both meanings used in industry:
- **Generative Engine Optimization** — visibility in AI answers (ChatGPT, Perplexity, Google AI Overviews, Gemini)
- **Geographic / local SEO** — ranking for "near me" / city-level queries

---

## 1. Executive Summary

The site has a **functioning SEO prerendering pipeline** added in commit `ebe6db0` (2026-05-06) that produces per-route HTML with titles, descriptions, canonicals, JSON-LD, and `<noscript>` text. That fixed the original duplicate-shell problem, but the system has **substantial gaps** in coverage, content depth, schema breadth, and local/GEO signals.

**Top 5 blockers (fix first):**
1. **`index.html` title is wrong & competes with prerender** — base template still says `Tag Easy | Creative Engineering Lab`, which Google may still see on the first crawl of any unprerendered route.
2. **`/contact` has NO `<SEO>` component** — no title, no description, no canonical. Will inherit base template defaults and show garbage in SERPs.
3. **Team member pages (`/team/:slug`) and individual blog posts (`/blog/:slug`) are NOT prerendered** — `scripts/prerender-seo.mjs` writes static HTML for routes listed in its `pages` array; team routes are missing entirely, blog posts only have meta but no body content for the noscript block (no `content[]` on blog entries).
4. **All 50 blog posts share 5 base titles + 5 identical excerpts + identical body text** (`generateContent()` in `src/lib/blogData.js`) — Google will classify these as **doorway / spun / thin content** and suppress them; AI engines will not cite them.
5. **No LocalBusiness / Organization / FAQ / Service schema beyond a minimal `Organization` block on the homepage** — kills local SEO and AI-engine citation potential.

---

## 2. Technical SEO

### 2.1 `index.html` template — P0
- **`<title>` is "Tag Easy | Creative Engineering Lab"** (`index.html:7`). The prerenderer **strips** this from the per-route output (`scripts/prerender-seo.mjs:233`), but if any route fetches the unprerendered shell (CSR fallback for unknown routes, or hosts that don't serve nested `index.html`), Google will index that wrong title.
- **No meta description** in `index.html`.
- **No default canonical** or `og:image` or favicon-`apple-touch-icon` or theme-color.
- **No `<html lang>` localisation** beyond `lang="en"` — fine, but no hreflang anywhere.
- **No Twitter card meta** (`twitter:card`, `twitter:image`, `twitter:title`).
- **No `og:image`** in either base or prerender output — social shares will render without a preview image. (`scripts/prerender-seo.mjs:207-217` writes og:title/description/url/type but **no og:image**.)
- **No `<meta name="theme-color">`**, no PWA manifest.
- **Google Fonts loaded render-blocking** (`index.html:8-11`) — `preconnect` exists but the stylesheet is not `media="print" onload="this.media='all'"` swapped. Hurts LCP/CLS.

### 2.2 `public/robots.txt` — OK (P2)
- Allows all, references sitemap. Good baseline.
- **Missing:** no `Disallow: /404` or other utility paths, no separate user-agent rules for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `OAI-SearchBot`, `CCBot`. Whether to allow or deny these is a policy call — but the file makes no statement, and AI crawlers default to varying behavior. **Recommend explicitly Allow these** if you want GEO citations.

### 2.3 `public/sitemap.xml` (committed) vs. generated — P1
- **Committed** `public/sitemap.xml` has **only 10 URLs** (missing `/team/*` and all 50 blog posts).
- **Build script** (`scripts/prerender-seo.mjs:259-273`) overwrites `dist/sitemap.xml` with **~60 URLs**.
- **Risk:** if anyone deploys the `public/` folder without running the build script, the deployed sitemap only advertises 10 URLs. Confirm deploy pipeline runs `npm run build`, not raw static copy.
- **Missing `<lastmod>`** on every URL in both versions — Google uses `lastmod` to prioritize re-crawl. Hurts indexing speed.
- **No image sitemap** (`<image:image>`) for team photos, case study images, blog images — leaves Google Image traffic on the table.
- **No video sitemap** entry for the hero video (`public/Hero Section Tag easy-ezremove.mp4`) or Adamsalve simulation.

### 2.4 `public/_redirects` — P2
- `/* /index.html 200` is correct SPA fallback for Netlify, BUT — on Netlify, this rule is applied **after** file matching, so prerendered `dist/about/index.html` etc. will be served directly. **Verify your host treats this rule the same way** (Vercel, Cloudflare Pages, Apache, Nginx all behave differently).
- If host does pure rewrite, **every route returns the homepage HTML** → prerender is wasted and `site:tageasy.org` will continue to show only the homepage.
- **Test:** `curl -s https://tageasy.org/about | grep "<title>"` — must show "About Us | Tag Easy", not "Tag Easy | Revenue Driven Digital Engineering". (Already flagged in earlier diagnosis.)

### 2.5 Prerender script (`scripts/prerender-seo.mjs`) — P1
- **Hard-coded route list** (line 46-168). Misses:
  - `/team/:slug` (all 8 team members) — **0 routes prerendered**
  - 50 blog posts only have meta tags written, but the **content[] for the noscript fallback uses generic 2-line placeholders** (line 163-167), not the actual blog body. Crawlers see almost-empty noscript bodies for every blog post.
- **Hard-coded blog list duplicates** `src/lib/blogData.js` — they will drift apart over time. Single source of truth needed.
- **`<noscript>` content is the only crawlable text** for the page body. The actual rendered React content never reaches the static HTML. AI engines and rendering-restricted crawlers see only that block.
  - Recommendation: render a much richer `<noscript>` block (full headings + paragraphs), OR adopt true SSG (Vite SSG, `vite-plugin-ssr`, or Next.js).
- **`stripGeneratedHead`** uses regex on raw HTML — fragile. If Vite output format changes, may not strip cleanly and you'll end up with double `<title>` / duplicate canonical tags.

### 2.6 Canonical handling — P1
- `src/components/SEO.jsx:10` builds canonical from `window.location.href` in CSR mode. This includes **query strings, fragments, tracking params** — Google sees `?utm_source=…` as canonical, splits PageRank.
- The prerendered output writes a clean canonical, but client hydration of `react-helmet-async` will overwrite it with the dirty `window.location.href` once JS runs. Helmet wins over static head tags on hydration.

### 2.7 Routing & SPA hydration — P2
- React-router routes are correctly using `<Link>` and `<NavLink>` — so internal links render as crawlable `<a href>`.
- `BrowserRouter` is fine for SEO since URLs are clean (no `#`).
- **`<NotFound />` returns HTTP 200** with React content but no real 404 status code. Google treats SPA "404" pages as **soft 404s** and may drop them or eat crawl budget. Need server-side 404 status for unknown routes.

### 2.8 Performance signals (Core Web Vitals) — P1
- **Hero video** (`public/Hero Section Tag easy-ezremove.mp4`) auto-loads on every homepage view, **no `poster`, no lazy strategy beyond `preload="auto"`** which is the **opposite** of lazy. Will hurt LCP on mobile.
- **External Pexels videos** and CloudFront videos used as `<video>` sources (`Services.jsx`, `Home.jsx:482, 508-510`) — third-party assets break performance budgets and are not under your control. Several auto-play simultaneously.
- **Blog images use `picsum.photos`** placeholder service (`src/lib/blogData.js:29`) — random images, change on every load, no caching, no alt-text relevance. Disastrous for E-E-A-T.
- **Spline asset** (`public/animated_characters_by_heyvlad.spline`) is imported but the asset is heavy — if loaded anywhere it tanks LCP.
- **No `<link rel="preload">`** for hero video, logo, or critical CSS.
- **No `width`/`height` attributes on `<img>`** in most components → CLS issues. (e.g. `Navbar.jsx:21-29` uses `style={width: 'clamp(...)'}` — no intrinsic dimensions.)
- **No font preload** — Google Fonts request blocks render.
- **Framer Motion is loaded eagerly** on every page; could be deferred or replaced for above-the-fold sections.
- React lazy-loads page components (`App.jsx:6-18`) — good for TTI, but Suspense fallback is plain text "Loading Core..." — Google may see this on crawl if hydration is slow.

### 2.9 Structured data (JSON-LD) — P1
Current state:
| Route | Schema | Notes |
|---|---|---|
| `/` (CSR) | `Organization` (minimal) | `Home.jsx:893-899`: name, url, logo only. **No `sameAs`, no `address`, no `contactPoint`, no `description`.** |
| All prerendered routes | `WebPage` | Generic, no `breadcrumb`, no `author`, no `datePublished`. |
| `/case-studies/maatritva` | None additional | No `Article`, no `CaseStudy`, no `MedicalOrganization` mention. |
| `/blog/*` | None additional | No `BlogPosting` / `Article` schema. **Massive loss for Discover, AI Overviews.** |
| `/team/:slug` | None | No `Person` schema. |
| `/services`, `/ai-automation` | None | No `Service` / `OfferCatalog`. |
| `/free-audit` | None | No `Offer` / `Service`. |
| `/contact` | None | No `ContactPage` / `LocalBusiness`. |

---

## 3. Per-Page SEO

### 3.1 `<SEO>` component coverage — P0 / P1
| Page | `<SEO>` used | Title | Description | Schema |
|---|:-:|---|---|---|
| `Home` | ✅ | "Tag Easy \| Revenue Driven Digital Engineering" | Good (108 chars) | Minimal Organization |
| `Services` | ✅ | "Our Services \| Tag Easy" | Generic (74 chars) | None |
| `AIAutomation` | ✅ | "AI Automation Services \| Tag Easy" | Strong (126 chars) | None |
| `About` | ✅ | "About Us \| Tag Easy" | Generic (61 chars) | None |
| `Industries` | ✅ | Good | Good | None |
| `CaseStudies` | ✅ | Good | Good | None |
| `CaseStudyMaatritva` | ✅ | Good | Short (75 chars) | None |
| `FreeAudit` | ✅ | Good | Good | None |
| `Blog` | ✅ | "Engineering Journal \| Tag Easy" | Good | None |
| `BlogPost` | ✅ | Good (template) | Uses post excerpt | None |
| **`Contact`** | **❌ MISSING** | — | — | — |
| **`TeamMember`** | **❌ MISSING** | — | — | — |
| **`NotFound`** | **❌ MISSING** | — | — | No `noindex`! |

**Critical:**
- `Contact.jsx` has no `<SEO>` at all → falls back to base template title "Tag Easy | Creative Engineering Lab" and **no description**.
- `TeamMember.jsx` has no `<SEO>` → every team member URL is indexed with the wrong title and description, killing personal brand SEO.
- `NotFound.jsx` has no `<SEO>` and crucially **no `noindex` meta** → Google indexes 404 content as a real page.

### 3.2 H1 / heading hierarchy — P1
- **Multiple H1s on the homepage?** `Home.jsx:184` has `<h1>Want Explosive Growth?</h1>` — only one H1, good.
- Several pages use only `<h1>` once but the H1 text is brand-voice flair ("Beyond Code", "Architectural Victories", "Lost in the Archive", "Ready to Manifest", "Want Explosive Growth?") — these are **not keyword-bearing**. Search engines cannot tell what the page is about from the H1 alone.
- **Recommendation:** H1s should pair brand voice with a keyword anchor:
  - `Home`: "Want Explosive Growth? AI Automation & SEO for Brands"
  - `About`: "Beyond Code — Tag Easy Digital Engineering Team"
  - `CaseStudies`: "Architectural Victories — Tag Easy Client Case Studies"
  - `Contact`: "Ready to Manifest — Contact Tag Easy"

### 3.3 Body content depth — P1
- **Services.jsx is shockingly thin** (153 lines, mostly UI). The page renders the `PricingCalculator` and a CTA. **No descriptive text about what each service entails, no FAQ, no comparison, no targeted keyword density.** A page targeting "AI automation services" or "Ads Hub services" needs 800-1500 words of substantive copy to rank.
- **Industries.jsx** lists 8 industries with one-line descriptions each. No dedicated industry sub-pages. Missing opportunity to capture vertical search like "healthcare digital agency Kolkata", "ecommerce SEO India".
- **About.jsx** has ~50 words of bio text + team carousel. No company history, founding story, accolades, awards, press mentions — all critical **E-E-A-T** signals.
- **Contact.jsx** is form-only. No NAP block, no map, no business hours, no service area description.

### 3.4 Image alt text & assets — P1
- Most `<img>` tags have alt attributes, but alts are **generic**:
  - `alt="Tag Easy Logo"` (fine)
  - `alt="Maatritva IVF"` — should be "Maatritva Fertility IVF clinic Kolkata"
  - `alt="Engineering Edge"` (`Home.jsx:683`) — meaningless
  - `alt={member.name}` (`TeamMember.jsx:57`, `TeamSection.jsx:99`) — should include role + company for AI mentions: `alt="Lokesh Choudhury, Founder & Director of Tag Easy"`
  - Blog post images use `picsum.photos` — alt is the post title but the **image has zero relevance to the title**, so alt is misleading.
- **No `loading="lazy"`** on most images (TeamSection does it, others don't).
- **No `decoding="async"`** uniformly.
- **No `srcSet` / responsive images** — single-size `.webp` served to phones and 4K monitors alike.

### 3.5 Internal linking — P2
- Navbar covers Case Studies, Industries, AI Automation, Services, About, Blog, Contact. Good.
- **Footer** only links to 6 pages, omits Industries, Blog, AI Automation. Misses opportunity to redistribute link equity. Also has dead `href="#"` for Infrastructure & Governance (`Footer.jsx:132-133`).
- **No breadcrumbs anywhere** — no BreadcrumbList schema, no visual breadcrumbs. Affects rich snippets.
- **CaseStudyMaatritva** doesn't link back to `/case-studies` or to related services. Orphan-ish.
- **BlogPost** doesn't link to related posts, author bio, or category archives. No `rel="prev"`/`rel="next"` on Blog index pagination.
- **TeamMember.jsx** "Back to Home" instead of "Back to Team" — and the About page only embeds team carousel; no dedicated `/team` index page.
- **`Footer.jsx:132-133`** `<a href="#">` "Infrastructure" / "Governance" — these are dead links and dilute crawl budget.

### 3.6 URL structure — P2
- Mostly clean (`/services`, `/about`, `/case-studies/maatritva`). Good.
- `/team/:slug` is fine but **no `/team` index** to anchor them.
- Blog slugs include trailing number (`/blog/architecting-high-performance-digital-ecosystems-1`) — ugly, betrays auto-generation, hurts CTR.

---

## 4. Content Quality (E-E-A-T)

### 4.1 Blog content — P0 (severe)
**`src/lib/blogData.js`** generates 50 posts that are **all identical templates**:
- Only 5 unique titles, repeated as "— Part 2", "— Part 3" up to Part 10.
- Every post uses the **same `generateContent()`** body — same 8 paragraphs and headings, only the title token swapped in via template string.
- Excerpt is identical to the base post's excerpt.
- Images are random `picsum.photos` placeholders that change on every page load.
- "By Tag Easy Engineering" hard-coded — no author entity, no author schema.
- Date is `new Date()` staggered by 3 days starting from runtime — **dates regenerate every build**, so Google sees the same URL with a different published date every deploy. Treats this as page churn.

**Consequence:** Google's spam systems classify this as auto-generated/spun content. AI engines (ChatGPT, Perplexity) will not cite these articles because they fail factuality and originality checks.

**Fix priority:** either
- (a) **Delete the blog entirely** until you have real content (set `/blog` to `noindex,follow` and remove sitemap entries), OR
- (b) Write 5-10 genuinely original 1200-2000 word posts and remove the generator.

The current state is actively hurting domain trust.

### 4.2 Testimonials — P2
`src/lib/testimonialData.js` — names like "Sarah Chen", "Marcus Thorne", "Elena Rodriguez", "David Park" at companies "Nexus AI", "DataPulse", "Velo Growth", "Modular Bios". These read as fictional. If they are, Google's review-spam policy and AI verification will flag the site. If real, **add `Review` / `AggregateRating` schema** with verifiable identifiers (LinkedIn URL, real company domain) to capitalize.

### 4.3 Stats — P1
`Home.jsx:387-392`: "85% Efficiency Boost", "40% Cost Reduction", "20+ Brands Scaled", "10Y+ Engineering Heritage". `About.jsx:53-62`: "10+ Years", "50+ Digital Architects", "200+ Successful Launches" — **conflicts with "20+ brands" on home** and "10Y+" on home. Inconsistent numbers across pages erode trust and AI engines will refuse to cite contradictory claims.

### 4.4 Founder / team authority signals — P1
- Only 2 of 8 team members have real LinkedIn URLs; rest use `#` placeholders (`teamData.js`). Looks fake.
- No `Person` schema for team members — invisible to Google Knowledge Graph and AI engines doing entity lookups.
- Lokesh's bio is generic. No mentioned credentials, certifications, talks, publications. He has an "MS in AI from Purdue Global" listed under education — that's an authority signal worth highlighting in `Person` schema (`alumniOf`) and `sameAs` (LinkedIn).
- No author byline on blog posts (just "Tag Easy Engineering").

---

## 5. GEO — Generative Engine Optimization

AI search engines (ChatGPT Search, Perplexity, Google AI Overviews, Bing Copilot, Gemini) prioritize:
1. **Clear factual claims** with citable structure (lists, definitions, Q&A)
2. **Structured data** (Organization, FAQPage, HowTo, Service, LocalBusiness)
3. **`llms.txt`** convention (proposed standard for AI crawler guidance)
4. **Authoritative entities** (linked to Wikidata, LinkedIn, Crunchbase via `sameAs`)
5. **Original research, data, quotes** rather than generic marketing prose

### 5.1 Missing files — P1
- **No `/llms.txt`** at the site root (proposed AI-readable summary file).
- **No `/llms-full.txt`** (richer variant).
- **No `/ai.txt`** (alternative proposal).
- **No `humans.txt`** (minor).
- **No `security.txt`** (P2, not GEO-relevant but credibility).

### 5.2 Robots.txt is silent on AI crawlers — P2
Recommended additions if you want AI citations (you do, per the audit context):
```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```
If you want to **block** training-only crawlers but allow citation-only crawlers, separate them. As of 2026 the distinction matters.

### 5.3 Schema for AI citation — P1
AI engines need rich entity data. Add:
- **Organization** (homepage) — currently minimal. Needs: `description`, `foundingDate`, `founder` (Person), `numberOfEmployees`, `address` (PostalAddress), `contactPoint` (ContactPoint with `email`, `telephone`, `availableLanguage`, `areaServed`), `sameAs` (LinkedIn, Instagram, Crunchbase, GitHub).
- **Service** on each service page with `provider`, `areaServed`, `serviceType`, `offers` (Offer with `price`, `priceCurrency`).
- **FAQPage** on Services, AI Automation, Free Audit — generates rich snippets AND AI citation hooks.
- **BlogPosting / Article** on every blog post with `author` (Person), `datePublished`, `dateModified`, `headline`, `articleBody`, `image`, `publisher`.
- **Person** on team member pages with `jobTitle`, `worksFor`, `alumniOf`, `sameAs`, `knowsAbout`.
- **BreadcrumbList** across the site.

### 5.4 Content patterns AI engines prefer — P2
Current pages are heavy on poetic copy ("Architectural Victories", "Pioneering Breakthroughs", "Beyond Code", "Manifest"). This is **terrible for GEO**:
- AI engines extract facts and definitions. "We architect digital headquarters that psychologically command attention" is not a citable claim.
- Need to add Q&A style sections, "What is X?" definitions, bullet lists of services with concrete deliverables, pricing transparency, comparison tables.
- Example fix: add to AIAutomation.jsx an FAQ with "What is AI automation for ads?", "How long does an AI automation project take?", "What's included in an AI automation audit?" — each answer is a citable paragraph.

### 5.5 Citation hooks — P2
- **No publication dates** visible on most pages (only blog).
- **No author entities** on blog posts.
- **No data tables, statistics with sources, original research** — AI engines preferentially cite content with hard numbers and methodology.
- **No glossary / definitions page** — common GEO win.

### 5.6 Brand entity consolidation — P1
For AI engines to confidently cite "Tag Easy", they need to triangulate entity identity. Currently:
- Domain: tageasy.org
- LinkedIn: https://www.linkedin.com/company/tag-easy
- Instagram: https://www.instagram.com/tag_easy/
- Email: lokesh.choudhury@tageasy.org
- Phone: +91 7980761008

These are scattered. **None are referenced via `sameAs` in JSON-LD anywhere.** Add a single canonical `Organization` schema in `index.html` or in the prerender header, with all `sameAs` URLs. Also: claim a **Wikidata** entry, **Crunchbase** profile, **Google Business Profile** to give AI engines authoritative third-party signals.

---

## 6. Geographic / Local SEO

### 6.1 City / region targeting — P0
Lokesh's experience says **Kolkata** and the Maatritva case study brags about "#1 IVF Center in Kolkata". But:
- **No `LocalBusiness` schema** anywhere.
- **No address listed on Contact, Footer, or About** — only an email and phone.
- **No Google Business Profile mentioned / linked.**
- **No city-targeted landing pages** ("Digital marketing agency in Kolkata", "SEO services Kolkata", "AI automation Kolkata").
- **`<html lang="en">` only** — no `en-IN` regional targeting (less important than schema, but a signal).
- **Phone is Indian (+91 7980761008)** but the site never explicitly states "India" or "Kolkata-based agency". Crawlers must infer.

### 6.2 NAP consistency — P1
**Name, Address, Phone consistency** is the foundation of local SEO. Currently:
- **Name** present (Tag Easy)
- **Address** ABSENT
- **Phone** present only on Contact page (`Contact.jsx:72`)
- **Email** present on Contact only

Add a consistent NAP block to the footer (and in `LocalBusiness` schema) with the registered Tag Easy LLP address.

### 6.3 Local schema needed — P1
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tag Easy",
  "legalName": "TAG EASY LLP",
  "image": "https://tageasy.org/logo.jpg",
  "url": "https://tageasy.org",
  "telephone": "+91-7980761008",
  "email": "lokesh.choudhury@tageasy.org",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<actual street>",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "postalCode": "<actual>",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "<>", "longitude": "<>" },
  "areaServed": ["India", "Kolkata", "West Bengal"],
  "openingHours": "Mo-Fr 09:00-19:00",
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.linkedin.com/company/tag-easy",
    "https://www.instagram.com/tag_easy/"
  ]
}
```

### 6.4 hreflang — P2
- Single-language site, mostly serving India + global. Add `<link rel="alternate" hreflang="en-IN" href="..." />` and `hreflang="x-default"` if you intend to target India specifically.
- If you ever localize to Hindi or Bengali, must add `hreflang` accordingly.

### 6.5 Google Business Profile — P0 (off-site, but critical)
Not visible from the codebase, but **mandatory** for local visibility:
- Claim/verify a Google Business Profile for Tag Easy at the Kolkata address.
- Link tageasy.org from the GBP.
- Reciprocate by linking to the GBP from your Contact / Footer (and listing it in `sameAs`).

---

## 7. Analytics, Tracking, Indexing tools

### 7.1 Google Analytics 4 — partial setup — P2
- `src/main.jsx:8` calls `ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID || "G-XXXXXXXXXX")` — the **fallback ID is a placeholder**. If env var is missing in deploy, hits are sent to a non-existent property and lost silently.
- `src/App.jsx:20-28` AnalyticsTracker fires pageview on route change — good for SPA.
- **No GA4 conversion events** for form submission, audit booking click, WhatsApp click. Lots of conversion data being lost.

### 7.2 Google Search Console — not detectable from code — P1
No verification meta tag in `index.html` (`<meta name="google-site-verification">`). If verification is via DNS or HTML file upload, that's fine — but no evidence of it in the repo.

### 7.3 Bing Webmaster Tools, IndexNow — P2
- No `<meta name="msvalidate.01">`.
- No IndexNow integration — would accelerate Bing indexing of new content.

### 7.4 No `sitemap_index.xml` — P2
Single sitemap is fine for ~60 URLs, but if blog grows past 200 URLs, split into `sitemap-pages.xml`, `sitemap-blog.xml`, `sitemap-team.xml` and reference via index.

---

## 8. Accessibility (a11y) — affects SEO indirectly

- Most interactive elements use `<button>` and `<a>` correctly.
- `aria-label` present on social icons (`Footer.jsx:55`, `TeamSection.jsx:55,63`).
- **Hero loader text** ("Loading Core...") is a `<div>`, not announced.
- **`<a href="#">` in Footer** for Infrastructure/Governance is a broken pseudo-link (a11y + SEO issue).
- **Color contrast**: `text-white/40`, `text-white/30`, `text-white/20` heavy use on dark backgrounds — likely fails WCAG AA on many surfaces. Lighthouse SEO score penalizes.
- **Form labels:** Contact form uses placeholders only, no `<label for>` — fails accessibility audit and reduces SEO health score.

---

## 9. Security / Trust signals (minor for SEO)

- `_redirects` line 1 — fine.
- No CSP header visible in the codebase (would be set in host config).
- `Make_Webhook` in `submitForm.js:2` reads an env var with **inconsistent casing** (`Make_Webhook` vs `VITE_MAKE_WEBHOOK`) — Vite only exposes vars prefixed `VITE_`, so `Make_Webhook` will always be undefined. Submissions land in the hardcoded fallback URL exposed in the bundle. Not strictly SEO, but a credibility leak.

---

## 10. Quick fixes (≤ 30 minutes each)

| # | Fix | Priority | File |
|---|---|---|---|
| 1 | Update `index.html` `<title>` to match prerendered homepage title | P0 | `index.html:7` |
| 2 | Add `<SEO>` to `Contact.jsx` | P0 | `src/pages/Contact.jsx` |
| 3 | Add `<SEO>` to `TeamMember.jsx` (per-member dynamic) | P0 | `src/pages/TeamMember.jsx` |
| 4 | Add `<SEO>` + `<meta name="robots" content="noindex,follow">` to `NotFound.jsx` | P0 | `src/pages/NotFound.jsx` |
| 5 | Add `<lastmod>` to every URL in `prerender-seo.mjs` sitemap output | P1 | `scripts/prerender-seo.mjs:259-273` |
| 6 | Add `og:image` to `buildHead()` in prerender script | P1 | `scripts/prerender-seo.mjs:207-217` |
| 7 | Strip query params from canonical in `SEO.jsx` (`new URL(window.location.href).origin + pathname`) | P1 | `src/components/SEO.jsx:10` |
| 8 | Remove dead `<a href="#">` Infrastructure / Governance links from Footer | P2 | `src/components/Footer.jsx:132-133` |
| 9 | Add Industries, Blog, AI Automation to Footer platformLinks | P2 | `src/components/Footer.jsx:9-16` |
| 10 | Fix `Make_Webhook` env var name to `VITE_MAKE_WEBHOOK` only | P2 | `src/lib/submitForm.js:2` |
| 11 | Add `User-agent: GPTBot/ClaudeBot/PerplexityBot Allow: /` to `robots.txt` | P1 | `public/robots.txt` |
| 12 | Add real address + phone NAP block to Footer | P1 | `src/components/Footer.jsx` |
| 13 | Add `<meta name="theme-color">`, `apple-touch-icon` to `index.html` | P2 | `index.html` |

---

## 11. Medium fixes (a few hours each)

1. **Add prerendering for `/team/:slug`** — extend `pages` array in `scripts/prerender-seo.mjs` to enumerate all team members from `src/lib/teamData.js` (import shared module to avoid drift).
2. **Replace blog generator** with real posts. Until then, set `<meta name="robots" content="noindex,follow">` on `/blog/*` pages.
3. **Add `LocalBusiness` JSON-LD** to homepage (or layout-level) with full Kolkata address.
4. **Add `FAQPage` JSON-LD** to Services, AIAutomation, FreeAudit.
5. **Add `Service` JSON-LD** to each service section.
6. **Add `BlogPosting` JSON-LD** to BlogPost.jsx (once real content exists).
7. **Add `Person` JSON-LD** to TeamMember.jsx — with `sameAs` LinkedIn links.
8. **Add Breadcrumb JSON-LD + visual breadcrumbs** across all non-home routes.
9. **Create `/llms.txt`** at site root with a structured summary of the company, services, key URLs.
10. **Set up server-side 404** (Netlify `_redirects` `/not-found /404.html 404` pattern + a prerendered 404 page).
11. **Add image sitemap section** to sitemap.xml.
12. **Add `width`/`height` to all `<img>`** for CLS.
13. **Lazy-load all decorative images** with `loading="lazy"`.
14. **Defer Google Fonts** with `media="print" onload="this.media='all'"`.

---

## 12. Large initiatives (multi-day)

1. **Migrate to true SSG** — Vite SSG, vite-plugin-ssr, or rewrite in Next.js / Astro. The current `noscript`-fallback prerender is a stopgap; real SSG renders the full DOM into HTML, dramatically improving SEO/GEO/perf.
2. **Write 10-20 original long-form blog posts** (1500+ words each) covering: AI automation case studies, technical SEO walkthroughs, ads strategy postmortems, Kolkata digital economy insights. Each with `BlogPosting` schema and author `Person` schema.
3. **Build dedicated industry sub-pages** (e.g., `/industries/healthcare`, `/industries/ecommerce`) — capture vertical-specific search demand.
4. **Build dedicated location pages** if you serve multiple cities (Kolkata, Mumbai, Delhi).
5. **Set up Google Business Profile** with Q&A, posts, photos. Link reciprocally with site.
6. **Wikidata entry** for Tag Easy with the canonical site URL — strong GEO citation signal.
7. **Crunchbase / G2 / Clutch / DesignRush listings** — third-party authority.
8. **Programmatic image generation** for blog posts (replacing picsum) with branded thumbnails.
9. **Content refresh cadence** — date-stamped, signed by an author Person entity, updated quarterly.

---

## 13. Checklist for "site:tageasy.org shows only homepage" specifically

- [ ] Confirm deploy ran `npm run build` (not raw `public/` copy)
- [ ] `curl https://tageasy.org/about` returns "About Us | Tag Easy" in `<title>`
- [ ] Submit `https://tageasy.org/sitemap.xml` in Google Search Console
- [ ] Add `<lastmod>` to sitemap so Google knows pages are new
- [ ] Use GSC "URL Inspection → Request Indexing" on: /about, /services, /ai-automation, /case-studies, /case-studies/maatritva, /blog, /industries, /free-audit, /contact
- [ ] Fix Contact, TeamMember, NotFound `<SEO>` gaps
- [ ] Update `index.html` base title so unprerendered fallbacks don't conflict
- [ ] Add internal links to Industries, Blog, AI Automation in Footer (already in Navbar)
- [ ] Build links from social bios → key inner pages, not just homepage
- [ ] Wait 2-4 weeks; if pages still not indexed, check `coverage` report in GSC for soft-404 / duplicate signals

---

*Report generated by reviewing all 31 source files in `src/` plus `public/`, `scripts/`, `index.html`, `package.json`, `vite.config.js`. No code changes were made.*
