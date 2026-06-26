// Task — Citation / source block for authority content.
//
// Renders a list of external sources at the bottom of an article. External
// links use rel="nofollow noopener" and open in a new tab. The matching
// `citation` array is added to the article's schema (buildBlogPostingSchema)
// so the references are machine-readable for AI engines too.

import React from 'react';
import { ExternalLink } from 'lucide-react';

const Sources = ({ sources = [], className = '' }) => {
  if (!sources.length) return null;

  return (
    <section className={`mt-16 pt-10 border-t border-white/5 ${className}`}>
      <h2 className="text-red-500 text-[10px] uppercase font-bold tracking-[0.4em] mb-6">Sources</h2>
      <ol className="space-y-4 list-decimal list-inside">
        {sources.map((s, i) => (
          <li key={`${s.url}-${i}`} className="text-white/50 text-sm font-light leading-relaxed">
            <a
              href={s.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-white/80 hover:text-red-500 transition-colors inline-flex items-center gap-1"
            >
              {s.title}
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
            {s.publisher && <span className="text-white/35"> — {s.publisher}</span>}
            {s.accessedDate && (
              <span className="text-white/25"> (accessed {s.accessedDate})</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Sources;
