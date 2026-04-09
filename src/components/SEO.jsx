import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Tag Easy | Enterprise Digital Engineering",
  description = "We architect high-performance digital ecosystems, Ads Hub dominance, and AI integrations for global brands.",
  canonical,
  schemaData
}) => {
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://tageasy.org');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />

      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
