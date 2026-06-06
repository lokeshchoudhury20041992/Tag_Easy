// Task 9 — Reusable image component to prevent CLS and improve LCP.
// Always renders intrinsic width/height (reserving layout space), supports
// lazy/eager loading, async decoding, optional srcset/sizes, and a fallback
// image. Decorative images should pass alt="" (empty) so they are skipped by
// assistive tech and search engines; meaningful images need descriptive alt.

import React, { useState } from 'react';
import { cn } from '../lib/utils';

const OptimizedImage = ({
  src,
  alt = '',
  width,
  height,
  srcSet,
  sizes,
  loading = 'lazy',
  fetchPriority,
  fallback = '/logo.jpg',
  className,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      loading={loading === 'eager' ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={fetchPriority}
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
      className={cn(className)}
      {...props}
    />
  );
};

export default OptimizedImage;
