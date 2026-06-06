// Task 11 — Reusable FAQ section (visible accordion).
// Renders the user-visible FAQs. The matching FAQPage schema is composed into
// each page's SEO graph (via buildFaqSchema) so it is present in the prerendered
// HTML and always mirrors the visible content exactly.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = ({ faqs = [], title = 'Frequently Asked Questions', subtitle }) => {
  const [open, setOpen] = useState(0);

  if (!faqs.length) return null;

  return (
    <section className="bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
            FAQ
          </span>
          <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument leading-none">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/40 text-lg font-light mt-6 max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className="liquid-glass rounded-3xl border border-white/5 overflow-hidden transition-colors duration-500 hover:border-red-500/20"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-8 py-6"
                >
                  <span className="text-white text-lg md:text-xl font-light tracking-tight">
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-red-500">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 md:px-8 pb-7 text-white/50 text-base font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
