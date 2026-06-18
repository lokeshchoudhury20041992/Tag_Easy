import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn, getAuditCalendarUrl, getWhatsAppUrlForPage } from '../lib/utils';
import {
  Monitor, Cpu, BarChart3, Rocket,
  Smartphone, Brain, Zap, ArrowUpRight,
  MessageCircle, Calendar, CheckCircle2, Users, Wrench, Clock, Target
} from 'lucide-react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import PricingCalculator from '../components/PricingCalculator';
import { services as serviceDetails, serviceCatalog } from '../lib/servicesData';
import { getCaseStudy } from '../lib/caseStudyData';
import { getFaqsByCategories } from '../lib/faqData';
import {
  organizationSchema,
  buildOfferCatalogSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '../lib/seoSchema';
import { trackWhatsAppClick, trackBookCallClick } from '../lib/analytics';

const servicesFaqs = getFaqsByCategories([
  'SEO',
  'AI Automation',
  'Website Development',
  'Paid Ads',
  'Pricing & Timelines',
]);

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    buildOfferCatalogSchema(serviceCatalog),
    buildFaqSchema(servicesFaqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
  ],
};

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
      desc: 'High-ticket AI systems for voice calling assistants, lead capture, direct lead calling, lead generation, ad creation, CRM workflows, reporting, and business intelligence.',
      icon: Brain,
      tags: ['Voice Calls', 'Lead Gen', 'Ad Creation', 'AI Agents'],
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
    }
  ];

  return (
    <div className="bg-black relative min-h-screen">
      <SEO
        title="Our Services | Tag Easy"
        description="Tag Easy services: technical SEO, AI automation, high-performance website development, and Ads Hub management — with clear deliverables, process, and timelines."
        path="/services"
        schemaData={servicesSchema}
      />
      
      <header className="pt-16 md:pt-24 pb-16 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
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

        {/* Up and Right Heading Callout */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="liquid-glass p-8 rounded-3xl border border-red-500/20 bg-black/40 max-w-md w-full relative overflow-hidden group mb-4 lg:mb-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.05)_0%,_transparent_50%)]" />
          <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] block mb-3">Investment Strategy</span>
          <h3 className="text-white text-xl font-instrument mb-4 tracking-tight">
            Standard Pricing for <span className="text-white/20 italic">Top Experience</span> — <br />
            <span className="text-red-500/80">Adjustable based on your style</span>
          </h3>
          <div className="flex flex-col gap-3 relative z-10">
            <Button 
              variant="primary" 
              className="w-full py-4 bg-[#25D366] hover:bg-[#22c35e] border-none text-[10px] tracking-widest text-white flex items-center justify-center gap-3 group/wa"
              onClick={() => { trackWhatsAppClick('services_header'); window.open(getWhatsAppUrlForPage('Services', 'services_header'), '_blank'); }}
            >
              <MessageCircle className="w-4 h-4 group-hover/wa:scale-110 transition-transform" />
              WHATSAPP US
            </Button>
            <Button 
              variant="outline" 
              className="w-full py-4 border-white/10 text-[10px] tracking-widest text-white hover:bg-white/5 flex items-center justify-center gap-3 group/meet"
              onClick={() => { trackBookCallClick('services_header'); window.open(getAuditCalendarUrl(), '_blank'); }}
            >
              <Calendar className="w-4 h-4 group-hover/meet:scale-110 transition-transform" />
              SCHEDULE MEETING
            </Button>
          </div>
        </motion.div>
      </header>


      <SectionContainer className="pt-0">
        <PricingCalculator />
      </SectionContainer>

      {/* Structured, extractable service detail (Task 12) */}
      <SectionContainer className="pt-0">
        <div className="mb-16">
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">What We Deliver</span>
          <h2 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument leading-none">
            Services in <span className="text-white/20 italic">detail</span>
          </h2>
        </div>

        <div className="space-y-8">
          {serviceDetails.map((svc, i) => {
            const relatedCs = (svc.relatedCaseStudies || []).map(getCaseStudy).filter(Boolean);
            return (
              <motion.article
                key={svc.slug}
                id={svc.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.05 }}
                className="liquid-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 hover:border-red-500/30 transition-all duration-700"
              >
                <header className="mb-8">
                  <h3 className="text-3xl md:text-5xl text-white font-instrument tracking-tighter mb-4">{svc.title}</h3>
                  <p className="text-white/50 text-lg font-light">{svc.short}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Users className="w-3.5 h-3.5" /> Who it's for</div>
                    <p className="text-white/50 text-sm font-light leading-relaxed mb-8">{svc.audience}</p>

                    <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Target className="w-3.5 h-3.5" /> Problems we solve</div>
                    <ul className="space-y-2">
                      {svc.problems.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-white/50 text-sm font-light"><Zap className="w-3.5 h-3.5 text-red-500 mt-1 shrink-0" />{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><CheckCircle2 className="w-3.5 h-3.5" /> Deliverables</div>
                    <ul className="space-y-2 mb-8">
                      {svc.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-white/50 text-sm font-light"><CheckCircle2 className="w-3.5 h-3.5 text-red-500 mt-1 shrink-0" />{item}</li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Wrench className="w-3.5 h-3.5" /> Tools</div>
                    <div className="flex flex-wrap gap-2">
                      {svc.tools.map((t) => (
                        <span key={t} className="text-white/40 text-[11px] border border-white/10 rounded-full px-3 py-1">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div>
                    <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4">Process</div>
                    <div className="flex flex-wrap gap-2">
                      {svc.process.map((step, idx) => (
                        <span key={step} className="text-white/60 text-xs font-light flex items-center gap-2">
                          <span className="text-red-500 font-bold">0{idx + 1}</span>{step}
                          {idx < svc.process.length - 1 && <ArrowUpRight className="w-3 h-3 text-white/20" />}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-red-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-4"><Clock className="w-3.5 h-3.5" /> Typical timeline</div>
                    <p className="text-white/60 text-sm font-light">{svc.timeline}</p>
                    <p className="text-white/30 text-[11px] font-light mt-2">Pricing factors: {svc.pricingFactors.join(' · ')}</p>
                  </div>
                </div>

                {relatedCs.length > 0 && (
                  <div className="pt-8 mt-8 border-t border-white/5 flex flex-wrap gap-4 items-center">
                    <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Proof:</span>
                    {relatedCs.map((cs) => (
                      <Link key={cs.slug} to={cs.path} className="text-red-500 text-xs uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all flex items-center gap-1">
                        {cs.title} <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </SectionContainer>

      <FAQ
        faqs={servicesFaqs}
        title="Service questions, answered"
        subtitle="Common questions about how Tag Easy delivers SEO, AI automation, websites, and ads."
      />

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
              onClick={() => { trackBookCallClick('services_footer'); window.open(getAuditCalendarUrl(), '_blank'); }}
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
