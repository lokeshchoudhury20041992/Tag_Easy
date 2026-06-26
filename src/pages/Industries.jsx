import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, Building2, HeartPulse, GraduationCap,
  Store, Rocket, Briefcase, ArrowUpRight,
} from 'lucide-react';
import { getAuditCalendarUrl } from '../lib/utils';
import SEO from '../components/SEO';
import { organizationSchema, buildBreadcrumbSchema } from '../lib/seoSchema';
import { getIndexableIndustries } from '../lib/industriesData';

const industriesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
    ]),
  ],
};

// Icon per industry slug (keeps the page's existing visual language).
const ICONS = {
  healthcare: HeartPulse,
  'real-estate': Building2,
  ecommerce: ShoppingCart,
  education: GraduationCap,
  'local-businesses': Store,
  startups: Rocket,
  'professional-services': Briefcase,
};

const IndustryCard = ({ slug, title, desc, i }) => {
  const Icon = ICONS[slug] || Briefcase;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/industries/${slug}`}
        className="liquid-glass p-8 rounded-3xl group hover:bg-white/[0.04] transition-all border border-white/5 hover:border-red-500/40 flex flex-col h-full"
      >
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-instrument text-white mb-4 group-hover:italic transition-all">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
        <span className="text-red-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
          Explore {title} <ArrowUpRight className="w-3 h-3" />
        </span>
      </Link>
    </motion.div>
  );
};

const Industries = () => {
  const industries = getIndexableIndustries().map((ind) => ({
    slug: ind.slug,
    title: ind.name,
    desc: ind.tagline,
  }));

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <SEO
        title="Industries | Tag Easy"
        description="Tag Easy builds specialized digital systems for healthcare, e-commerce, SaaS, fintech, real estate, education, travel, and analytics companies."
        path="/industries"
        schemaData={industriesSchema}
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
          <IndustryCard key={item.slug} {...item} i={i} />
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
