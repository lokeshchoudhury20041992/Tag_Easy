import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, Landmark, Cpu, BarChart3, 
  Building2, GraduationCap, Plane, HeartPulse 
} from 'lucide-react';
import { getAuditCalendarUrl } from '../lib/utils';
import SEO from '../components/SEO';

const IndustryCard = ({ icon: Icon, title, desc, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
    viewport={{ once: true }}
    className="liquid-glass p-8 rounded-3xl group hover:bg-white/[0.04] transition-all border border-white/5"
  >
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-2xl font-instrument text-white mb-4 group-hover:italic transition-all">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const Industries = () => {
  const industries = [
    { title: "E-Commerce", icon: ShoppingCart, desc: "Scale your revenue with high-performance storefronts and technical SEO that dominates the SERPs." },
    { title: "FinTech", icon: Landmark, desc: "Secure, reliable, and compliant digital banking and payment systems built for heavy traffic." },
    { title: "SaaS & Tech", icon: Cpu, desc: "Engineering-first growth strategies for software platforms looking to disrupt and scale." },
    { title: "Data Analytics", icon: BarChart3, desc: "Transform your raw data into actionable business intelligence with modular AI logic." },
    { title: "Real Estate", icon: Building2, desc: "Premium digital experiences for luxury properties and large-scale asset management." },
    { title: "Education", icon: GraduationCap, desc: "Modernize learning with high-speed LMS architectures and technical SEO for institutions." },
    { title: "Travel & Hospitality", icon: Plane, desc: "Dynamic booking engines and localized digital footprints for global travelers." },
    { title: "Healthcare", icon: HeartPulse, desc: "Patient-first digital care portals and performance-driven visibility for tech-enabled clinics." }
  ];

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <SEO
        title="Industries | Tag Easy"
        description="Tag Easy builds specialized digital systems for healthcare, e-commerce, SaaS, fintech, real estate, education, travel, and analytics companies."
      />
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <span className="text-white/40 text-xs tracking-[0.4em] uppercase block mb-6">Vertical Focus</span>
          <h1 className="text-5xl md:text-8xl text-white tracking-tight font-instrument mb-8">
            Strategic impact <br />across <span className="italic">industries</span>.
          </h1>
          <p className="text-white/50 text-subtle text-lg max-w-2xl leading-relaxed">
            We don't believe in generalist solutions. Tag Easy builds specialized digital ecosystems tailored to the unique technical demands of your sector.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {industries.map((item, i) => (
          <IndustryCard key={i} {...item} i={i} />
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-40">
        <div className="liquid-glass rounded-[3rem] p-12 text-center border border-white/5">
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-instrument mb-8 leading-none">
            Ready for your vertical <br /><span className="italic text-white/40">takeover?</span>
          </h2>
          <button
            type="button"
            onClick={() => window.open(getAuditCalendarUrl(), '_blank', 'noopener,noreferrer')}
            className="bg-white text-black rounded-full px-10 py-4 text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Analyze My Sector
          </button>
        </div>
      </section>
    </main>
  );
};

export default Industries;
