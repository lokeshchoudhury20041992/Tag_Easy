import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Globe, Activity, Award } from 'lucide-react';
import { cn, getAuditCalendarUrl } from '../lib/utils';
import Button from '../components/Button';
import SEO from '../components/SEO';

const GlassCard = ({ children, className }) => (
  <div className={cn("liquid-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 h-full aura-card border border-white/5 hover:border-red-500/50 hover:bg-black/60 hover:backdrop-blur-2xl transition-all duration-700", className)}>
    {children}
  </div>
);

const CaseStudyMaatritva = () => {
  return (
    <main className="bg-black pt-20 min-h-screen">
      <SEO 
        title="Maatritva Fertility IVF | Case Study | Tag Easy"
        description="Discover how Tag Easy scaled Maatritva Fertility IVF to become the leading center in Kolkata."
      />
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none z-50 mix-blend-overlay" />
      
      {/* Hero Section */}
      <header className="pt-16 md:pt-28 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-8 flex items-center gap-3">
              <Award className="w-4 h-4" /> Healthcare Excellence
            </span>
            <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-[0.85] mb-12">
                Maatritva <br />
                <span className="text-white/20">Fertility IVF</span>
            </h1>
            <p className="text-white/40 text-2xl font-light leading-relaxed hover:text-white/80 transition-colors duration-500 mb-12">
                Dominating the regional landscape as the #1 IVF Center in Kolkata and beyond. A story of digital infrastructure mapping precisely to clinical success.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="https://maatritvaivffertility.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-[10px] tracking-widest gap-2 justify-center">
                  <Globe className="w-4 h-4 shrink-0" /> maatritvaivffertility.com
                </Button>
              </a>
              <a href="https://www.maatritvaivf.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-[10px] tracking-widest gap-2 justify-center">
                  <Globe className="w-4 h-4 shrink-0" /> maatritvaivf.com
                </Button>
              </a>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/5 relative group bg-black"
        >
            <img src="/Maatritva.webp" alt="Maatritva IVF" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </motion.div>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="px-6 py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <GlassCard className="text-center group">
                    <div className="text-6xl md:text-7xl font-instrument italic text-red-500 mb-6 group-hover:scale-110 transition-transform duration-500">#1</div>
                    <div className="text-white text-xl font-light mb-2">Regional Ranking</div>
                    <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">In Kolkata & Beyond</div>
                </GlassCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
                <GlassCard className="text-center group">
                    <div className="text-6xl md:text-7xl font-instrument italic text-red-500 mb-6 group-hover:scale-110 transition-transform duration-500">100%</div>
                    <div className="text-white text-xl font-light mb-2">Clinical Tracking</div>
                    <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">Doctor-Dedicated Workflows</div>
                </GlassCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                <GlassCard className="text-center group border border-red-500/20">
                    <div className="text-6xl md:text-7xl font-instrument italic text-red-500 mb-6 group-hover:scale-110 transition-transform duration-500"><Activity className="w-16 h-16 mx-auto" /></div>
                    <div className="text-white text-xl font-light mb-2">Full Success</div>
                    <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em]">High Case Conversion Rate</div>
                </GlassCard>
            </motion.div>
        </div>
      </section>

      {/* Detail Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument mb-10 leading-[0.95]">
                  Architecting <br /><span className="text-white/20">Digital Dominance</span>
               </h2>
               <div className="space-y-8 text-lg md:text-xl text-white/40 leading-relaxed font-light">
                 <p className="hover:text-white/80 transition-all duration-500">
                    Maatritva approached us with a simple goal: to reflect their immense clinical success in the digital space. Although highly respected manually, their structural digital footprint needed to map directly to their authority.
                 </p>
                 <p className="hover:text-white/80 transition-all duration-500">
                    We engineered a robust multi-domain strategy that captures massive regional search intent, cementing them as the undisputed #1 IVF Center in Kolkata and the surrounding regions.
                 </p>
               </div>
            </div>
            <div className="space-y-6">
                {[
                    "Built & scaled multiple premier domains (maatritvaivffertility.com, maatritvaivf.com).",
                    "Engineered highly optimized, dedicated web pages for individual doctors.",
                    "Implemented aggressive local SEO to systematically capture high-intent inquiries.",
                    "Created smooth digital workflows to highlight successful patient case studies."
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 20 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-5 p-6 liquid-glass rounded-3xl border border-white/5 hover:border-red-500/30 transition-colors"
                    >
                        <CheckCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <span className="text-white/70 font-light">{item}</span>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 relative">
        <div className="max-w-7xl mx-auto">
            <div className="liquid-glass rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center relative group overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <h2 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument mb-12">
                Ready for similar <span className="text-white/20">results?</span>
            </h2>
            <Button 
                variant="primary" 
                className="px-16 py-6 text-xs tracking-[0.2em]"
                onClick={() => window.open(getAuditCalendarUrl(), '_blank')}
            >
                START YOUR BUILD
            </Button>
            </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyMaatritva;
