import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../lib/teamData';

const TeamSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-instrument text-white tracking-tight mb-6"
          >
            Meet the Founders & Team
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-xl mx-auto font-light text-lg leading-relaxed hover:text-white/80 transition-colors duration-500"
          >
            The people behind our technology, strategy, and execution.
          </motion.p>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar hide-scrollbar scroll-smooth snap-x snap-mandatory">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.slug}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-none w-[280px] md:w-[350px] snap-center liquid-glass rounded-3xl overflow-hidden group flex flex-col h-full border border-white/5 hover:border-red-500/50 hover:bg-black/60 hover:backdrop-blur-2xl transition-all duration-700"
            >
              <div className="flex-1 flex flex-col">
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 mt-auto">
                  <h3 className="text-xl font-instrument text-white mb-1 group-hover:italic transition-all">
                    {member.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold group-hover:text-red-500 transition-colors">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
