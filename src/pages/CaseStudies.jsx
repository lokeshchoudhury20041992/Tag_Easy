import React from 'react';
import { motion } from 'framer-motion';

const CaseStudies = () => {
    const projects = [
        { title: "Metropolitan Scale", cat: "Infrastructure", stats: "400% Growth" },
        { title: "Bespoke Commerce", cat: "Architecture", stats: "98% Efficiency" },
        { title: "Legacy Migration", cat: "Engineering", stats: "0 Downtime" }
    ];

  return (
    <main className="pb-32 pt-24">
      <header className="mb-24 mt-12 text-center max-w-7xl mx-auto px-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <span className="font-label text-[10px] text-primary uppercase tracking-[0.4em] font-black mb-6 block">Our Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8">Architectural <span className="text-primary-container italic">Victories.</span></h1>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-medium">Stories of performance, resilience, and digital dominance delivered for global brands.</p>
        </motion.div>
      </header>

      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
            <motion.div 
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-zinc-950 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all group"
            >
                <div className="aspect-video bg-zinc-900 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-zinc-800">terminal</span>
                </div>
                <div className="p-8">
                    <span className="text-primary font-label text-[9px] uppercase tracking-widest font-black block mb-4">{p.cat}</span>
                    <h3 className="text-xl font-black text-white mb-2">{p.title}</h3>
                    <div className="flex justify-between items-center mt-6">
                        <span className="text-primary-container font-display italic text-lg">{p.stats}</span>
                        <span className="material-symbols-outlined text-zinc-600">arrow_outward</span>
                    </div>
                </div>
            </motion.div>
        ))}
      </section>
    </main>
  );
};

export default CaseStudies;
