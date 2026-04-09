import React from 'react';
import { motion } from 'framer-motion';
import { cn, getCalendlyUrl } from '../lib/utils';
import { 
  Monitor, Cpu, BarChart3, Rocket, 
  Smartphone, Brain, Zap, ArrowUpRight 
} from 'lucide-react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SEO from '../components/SEO';

import PricingCalculator from '../components/PricingCalculator';

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

const VideoRenderer = ({ service, index }) => {
  const commonClasses = cn(
    "w-full h-full object-cover transition-all duration-700 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
  );

  return (
    <video autoPlay loop muted playsInline preload="metadata" className={commonClasses}>
      <source src={service.video} type="video/mp4" />
    </video>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Ads Hub',
      desc: 'Intelligent advertising engines built for scaling brand awareness and conversion dominance.',
      icon: Zap,
      tags: ['Google Ads', 'Meta Ads'],
      video: 'https://www.pexels.com/download/video/8072444/'
    },
    {
      title: 'Web Site Development',
      desc: 'Intelligent digital ecosystems built to architect scale and engineered for high-performance dominance.',
      icon: Monitor,
      tags: ['Next.js & React', 'UX/UI Innovation'],
      video: 'https://www.pexels.com/download/video/2887463/'
    },
    {
      title: 'AI Automation',
      desc: 'Intelligent systems built to automate logic and scale business intelligence.',
      icon: Brain,
      tags: ['Automation', 'Data Insights'],
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
    }
  ];

  return (
    <div className="bg-black relative min-h-screen">
      <SEO 
        title="Our Services | Tag Easy"
        description="Comprehensive digital engineering services including SEO, Ads Hub, and AI Automation."
      />
      
      <header className="pt-16 md:pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-8">Engineering Excellence</span>
          <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-[0.8] mb-12">
            Building systems <br />
            <span className="text-white/20">that redefine scale</span>
          </h1>
          <p className="text-white/40 text-2xl max-w-2xl font-light leading-relaxed hover:text-white/80 transition-colors duration-500">
            Our stack is more than code; it's the architectural foundation for the brands of tomorrow.
          </p>
        </motion.div>
      </header>


      <SectionContainer className="pt-0">
        <PricingCalculator />
      </SectionContainer>

      <SectionContainer className="pt-0 pb-24">
        <div className="liquid-glass rounded-[3rem] md:rounded-[5rem] p-12 md:p-32 text-center relative group overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-[7rem] text-white tracking-tighter font-instrument italic mb-12 leading-none">
              Ready to <span className="text-white/20 not-italic">architect your scale?</span>
            </h2>
            <Button 
              variant="primary" 
              className="px-16 py-6 text-xs tracking-[0.2em]"
              onClick={() => window.open(getCalendlyUrl(), '_blank')}
            >
              CONSTRUCT YOUR PLAN
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Services;
