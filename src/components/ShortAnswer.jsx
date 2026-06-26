// GEO — reusable "Short Answer" block.
//
// A clean, quotable summary that AI answer engines (ChatGPT, Perplexity, Google
// AI Overviews) can extract directly. Uses the documented `.short-answer`
// structure so the markup is predictable. The same text is also placed first in
// each page's prerendered <noscript> body (scripts/pages.mjs) so crawlers that
// do not run JavaScript still see it.

import React from 'react';

const ShortAnswer = ({ text, heading = 'Short answer', className = '' }) => {
  if (!text) return null;

  return (
    <section className={`short-answer bg-black px-4 md:px-6 py-8 md:py-10 ${className}`}>
      <div className="max-w-4xl mx-auto liquid-glass rounded-[2rem] border border-white/5 border-l-2 border-l-red-500/60 p-7 md:p-9">
        <h2 className="text-red-500 text-[10px] uppercase font-bold tracking-[0.4em] mb-4">{heading}</h2>
        <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed">{text}</p>
      </div>
    </section>
  );
};

export default ShortAnswer;
