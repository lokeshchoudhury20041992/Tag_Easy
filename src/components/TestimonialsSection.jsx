// Phase 2 · Task 4 — Gated testimonials display.
//
// Renders ONLY testimonials the client has consented to (permissionGranted).
// If there are none, the component renders nothing (like the FAQ component) so
// no empty "trust" section and no fake testimonials ever appear. Review schema
// is emitted separately (prerender) and only for `verified` testimonials.

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import {
  getDisplayableTestimonials,
  getTestimonialsForService,
  getTestimonialsForLocation,
} from '../lib/testimonialsData';

const TestimonialsSection = ({
  service,
  location,
  title = 'Client Outcomes',
  subtitle = 'What it is like to work with Tag Easy.',
  eyebrow = 'Network Trust',
  className = '',
}) => {
  let items = getDisplayableTestimonials();
  if (service) items = getTestimonialsForService(service);
  else if (location) items = getTestimonialsForLocation(location);

  if (!items.length) return null;

  return (
    <section className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-24', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">{eyebrow}</span>
          <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument leading-none">{title}</h2>
          {subtitle && <p className="text-white/40 text-lg font-light mt-6 max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.figure
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.05 }}
              className="liquid-glass rounded-[2rem] p-8 border border-white/5 hover:border-red-500/30 transition-all duration-700 flex flex-col justify-between"
            >
              <blockquote className="text-white text-lg md:text-xl font-instrument italic leading-tight tracking-tight mb-8">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-white/30 text-[10px] uppercase tracking-widest">
                    {[t.role, t.company].filter(Boolean).join(', ')}
                  </div>
                </div>
                {t.verified && (
                  <span className="ml-auto text-[9px] uppercase tracking-widest text-green-500/80 font-bold">Verified</span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
