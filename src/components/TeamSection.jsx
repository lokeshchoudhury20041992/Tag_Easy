import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { teamMembers } from '../lib/teamData';

const TeamSection = () => {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />
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
            className="text-white/40 max-w-xl mx-auto font-medium text-lg leading-relaxed"
          >
            The people behind our technology, strategy, and execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="liquid-glass rounded-3xl overflow-hidden group flex flex-col h-full"
            >
              <Link to={`/team/${member.slug}`} className="block flex-1 flex flex-col">
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                    {member.role}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
