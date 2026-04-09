import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import TeamSection from '../components/TeamSection';
import { ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn("bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-24", className)}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className }) => (
  <div className={cn("liquid-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 h-full aura-card border border-white/5 hover:border-red-500/50 hover:bg-black/60 hover:backdrop-blur-2xl transition-all duration-700", className)}>
    {children}
  </div>
);

const About = () => {
  return (
    <div className="bg-black relative min-h-screen">
      <SEO 
        title="About Us | Tag Easy"
        description="Learn about Tag Easy's mission, vision, and team of digital engineers."
      />
      
      <header className="pt-16 md:pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
        >
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-8">Our Philosophy</span>
            <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-[0.8] mb-12">
                Beyond <br />
                <span className="text-white/20">Code</span>
            </h1>
            <p className="text-white/40 text-2xl max-w-2xl font-light leading-relaxed hover:text-white/80 transition-colors duration-500">
                Tag Easy was forged in the heat of ambitious engineering challenges. We believe software isn't just a utility—it's high-performance infrastructure.
            </p>
        </motion.div>
      </header>

      <section className="relative px-6 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard className="text-center">
                <div className="text-7xl font-instrument italic text-red-500 mb-4">10+</div>
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.3em]">Years of Excellence</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-7xl font-instrument italic text-red-500 mb-4">50+</div>
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.3em]">Digital Architects</div>
              </GlassCard>
              <GlassCard className="text-center">
                <div className="text-7xl font-instrument italic text-red-500 mb-4">200+</div>
                <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.3em]">Successful Launches</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <SectionContainer className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument mb-12 leading-[0.95]">
                Engineering <br /><span className="text-white/20 text-4xl md:text-7xl">Resilience</span>
            </h2>
            <div className="space-y-10 text-xl text-white/40 leading-relaxed font-light max-w-2xl">
              <p className="hover:text-white/80 transition-all duration-500">Like the Victoria Memorial stands as a testament to craftsmanship, our digital products stand as benchmarks of performance and aesthetic excellence.</p>
              <p className="hover:text-white/80 transition-all duration-500">We don't just build for today. We architect for longevity, ensuring every line of code adds compound value to your brand's future.</p>
            </div>
            <div className="mt-16">
              <Button variant="secondary" className="px-12 py-5 text-xs tracking-widest">
                LEARN OUR PROCESS
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="liquid-glass p-12 md:p-16 rounded-[3rem] bg-white text-black border-none relative overflow-hidden group hover:neon-white-glow transition-all duration-700">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-9xl font-instrument italic leading-none">"</span>
               </div>
               <p className="text-3xl md:text-4xl font-instrument italic font-semibold leading-tight mb-12 relative z-10">
                "We don't just build for tomorrow. We architect for the next decade of scale."
               </p>
               <div className="relative z-10">
                 <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-1">Lokesh Choudhury</p>
                 <p className="text-[10px] font-semibold text-black/40 uppercase tracking-[0.2em]">Founder & Lead Architect</p>
               </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <TeamSection />
    </div>
  );
};

export default About;
