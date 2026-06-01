import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://tageasy.org';
const DEFAULT_IMAGE = `${SITE_URL}/logo.jpg`;

// Build a clean canonical URL — strips query strings, fragments, and trailing
// slashes so tracking params (?utm_source=...) never split ranking signals.
const buildCanonical = (canonical, path) => {
  if (canonical) return canonical;

  const fromPath =
    path !== undefined
      ? path
      : typeof window !== 'undefined'
      ? window.location.pathname
      : '/';

  // The host serves directory-style URLs with a trailing slash (200), and
  // 301-redirects the non-slash form to it. Emit the trailing-slash form so the
  // canonical points at the URL that actually resolves, not at a redirect.
  const clean = fromPath.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return clean === '' ? `${SITE_URL}/` : `${SITE_URL}${clean}/`;
};

const SEO = ({
  title = 'Tag Easy | Revenue Driven Digital Engineering',
  description = 'We architect high-performance digital ecosystems, Ads Hub dominance, and AI integrations for global brands.',
  canonical,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  schemaData,
}) => {
  const url = buildCanonical(canonical, path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}
      />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content="Tag Easy" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
