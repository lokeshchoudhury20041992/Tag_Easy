import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CheckCircle2,
  DatabaseZap,
  FileSearch,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  PhoneCall,
  Search,
  Sparkles,
  Stethoscope,
  Target,
  Users
} from 'lucide-react';
import { cn, getAuditCalendarUrl, getWhatsAppUrlForPage } from '../lib/utils';
import Button from '../components/Button';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { getFaqsByCategory } from '../lib/faqData';
import {
  organizationSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '../lib/seoSchema';
import { trackWhatsAppClick, trackBookCallClick } from '../lib/analytics';

const aiFaqs = getFaqsByCategory('AI Automation');

const aiAutomationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    ...buildServiceSchema({
      name: 'AI Automation Services',
      description:
        'AI automation systems for voice calling assistants, lead capture, direct lead calling, lead generation, ad creation, CRM workflows, reporting, and custom AI agents.',
      path: '/ai-automation',
    })['@graph'],
    buildFaqSchema(aiFaqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'AI Automation', path: '/ai-automation' },
    ]),
  ],
};

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn("bg-black relative overflow-hidden px-4 md:px-6 py-12 md:py-16", className)}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className }) => (
  <div className={cn("group liquid-glass rounded-[2rem] p-6 h-full aura-card border border-white/5 hover:border-red-500/40 hover:bg-black/60 transition-all duration-700", className)}>
    {children}
  </div>
);

const automationPillars = [
  {
    title: 'Ads Automation',
    desc: 'Ad copy, variants, retargeting, tracking.',
    icon: Target,
    items: ['Google + Meta', 'AI creatives', 'Reports']
  },
  {
    title: 'Lead Generation',
    desc: 'Capture, qualify, route, follow up.',
    icon: MousePointerClick,
    items: ['Lead capture', 'Lead gen', 'Follow-up']
  },
  {
    title: 'SEO Automation',
    desc: 'Briefs, checks, alerts, indexing.',
    icon: Search,
    items: ['Keywords', 'Briefs', 'SEO alerts']
  },
  {
    title: 'AI Content Systems',
    desc: 'Content pipelines for ads and pages.',
    icon: FileSearch,
    items: ['Blogs', 'Social', 'Prompts']
  },
  {
    title: 'CRM and Operations',
    desc: 'Forms, CRM, sheets, calendars.',
    icon: DatabaseZap,
    items: ['Pipelines', 'Tasks', 'Alerts']
  },
  {
    title: 'Custom AI Agents',
    desc: 'Agents that answer, call, classify.',
    icon: Brain,
    items: ['Voice agents', 'Calling agents', 'Classification']
  }
];

const popularAutomations = [
  {
    title: 'Voice Calling',
    desc: 'Missed calls, reminders, enquiry handling.',
    icon: PhoneCall,
    tags: ['ElevenLabs', 'Calls', 'Reminders']
  },
  {
    title: 'Lead Capture',
    desc: 'Forms, WhatsApp, ads, CRM entry.',
    icon: MousePointerClick,
    tags: ['Forms', 'WhatsApp', 'CRM']
  },
  {
    title: 'Direct Lead Calling',
    desc: 'Instant callback and sales handoff.',
    icon: Users,
    tags: ['Callback', 'Qualify', 'Handoff']
  },
  {
    title: 'Lead Generation',
    desc: 'Prospect lists, enrichment, outreach.',
    icon: BriefcaseBusiness,
    tags: ['Research', 'Lists', 'Outreach']
  },
  {
    title: 'AI Ad Creation',
    desc: 'Angles, copy, briefs, campaign tests.',
    icon: Megaphone,
    tags: ['Copy', 'Briefs', 'Tests']
  }
];

const industryScenarios = [
  {
    title: 'Real Estate',
    desc: 'Call fresh leads, qualify budget, book site visits.',
    icon: Building2
  },
  {
    title: 'Doctor Clinics',
    desc: 'Book appointments, remind patients, route urgent calls.',
    icon: Stethoscope
  },
  {
    title: 'Recruiting Agencies',
    desc: 'Screen candidates, schedule interviews, update pipelines.',
    icon: BriefcaseBusiness
  }
];

const processSteps = ['Audit', 'Build', 'Connect', 'Optimize'];

const outcomes = [
  'Faster response',
  'More qualified leads',
  'Lower manual work',
  'Cleaner reporting'
];

const AIAutomation = () => {
  return (
    <main className="bg-black relative min-h-screen">
      <SEO
        title="AI Automation Services | Tag Easy"
        description="Tag Easy builds AI automation systems for voice calling assistants, lead capture, direct lead calling, lead generation, ad creation, CRM workflows, reporting, and custom AI agents."
        path="/ai-automation"
        schemaData={aiAutomationSchema}
      />

      <section className="relative min-h-[72vh] px-4 md:px-6 pt-28 md:pt-36 pb-14 overflow-hidden flex items-center bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[-10%] w-[520px] h-[520px] rounded-full bg-red-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-[-10%] w-[420px] h-[420px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_rgba(0,0,0,0.85))]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-8">
              Core Tag Easy Skill
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-[5.75rem] text-white tracking-tighter font-instrument leading-[0.88] mb-8">
              AI Automation <br />
              <span className="text-white/20 italic">for calls, leads, and ads</span>
            </h1>
            <p className="text-white/45 text-base md:text-lg font-light max-w-2xl leading-relaxed mb-8 hover:text-white/80 transition-colors duration-500">
              Sellable AI workflows for service businesses: phone calls, lead capture, direct lead calling, lead generation, ad creation, CRM, SEO, and reporting.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-2xl">
              {['ElevenLabs voice assistants', 'Lead capture + calling', 'AI ad creation help'].map((item) => (
                <div key={item} className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-white/70 text-xs uppercase tracking-[0.16em] font-semibold">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button variant="primary" onClick={() => { trackBookCallClick('ai_hero'); window.open(getAuditCalendarUrl(), '_blank'); }} className="px-10 py-5 text-xs tracking-[0.2em]">
                Build My Automation
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" onClick={() => { trackWhatsAppClick('ai_hero'); window.open(getWhatsAppUrlForPage('AI Automation', 'ai_hero'), '_blank'); }} className="px-10 py-5 text-xs tracking-[0.2em]">
                WhatsApp Us
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="liquid-glass rounded-[3rem] p-6 md:p-8 border border-red-500/20 bg-black/50 relative overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.75)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.16)_0%,_transparent_58%)] pointer-events-none" />
              <div className="relative z-10 space-y-3">
                {[
                  { label: 'Lead captured', icon: MousePointerClick, active: true },
                  { label: 'AI qualifies intent', icon: Brain, active: true },
                  { label: 'Assistant calls or follows up', icon: PhoneCall, active: true },
                  { label: 'CRM updated and team notified', icon: DatabaseZap, active: true },
                  { label: 'Report refreshed', icon: BarChart3, active: false }
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 group hover:border-red-500/30 transition-all duration-500">
                    <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-500", item.active ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-white/[0.03] border-white/10 text-white/30")}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <div className="h-1 mt-3 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: item.active ? `${76 + index * 5}%` : '42%' }}
                          transition={{ duration: 1.2, delay: 0.4 + index * 0.1 }}
                          className={cn("h-full rounded-full", item.active ? "bg-red-500" : "bg-white/15")}
                        />
                      </div>
                    </div>
                    <CheckCircle2 className={cn("w-5 h-5", item.active ? "text-red-500" : "text-white/15")} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionContainer id="popular-ai-automations" className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-6">
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
              Popular Automations
            </span>
            <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument leading-none mb-8">
              Clear offers. Easy to sell.
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-2xl">
              The five automation products most buyers understand immediately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          {popularAutomations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: index * 0.05 }}
              className="rounded-[2rem] border border-red-500/20 bg-red-500/[0.045] p-6 min-h-[260px] hover:bg-red-500/[0.08] hover:border-red-500/40 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl text-white font-instrument tracking-tighter mb-3">{item.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed font-light mb-5">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <div key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/55 text-[10px] uppercase tracking-[0.16em] font-semibold">
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {industryScenarios.map((scenario) => (
            <div key={scenario.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0">
                <scenario.icon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl text-white font-instrument tracking-tight mb-3">{scenario.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{scenario.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer id="automation-systems">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
              Also Automates
            </span>
            <h2 className="text-4xl md:text-5xl text-white tracking-tighter font-instrument leading-none mb-6">
              Keep the rest visible.
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {automationPillars.map((pillar) => (
              <GlassCard key={pillar.title} className="min-h-[190px]">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                  <pillar.icon className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl text-white font-instrument tracking-tight mb-3">{pillar.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed font-light mb-4">{pillar.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {pillar.items.map((item) => (
                    <span key={item} className="text-white/45 text-[10px] border border-white/10 rounded-full px-2 py-1">{item}</span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 liquid-glass rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 border border-white/5 relative overflow-hidden">
            <Calendar className="absolute right-10 top-10 w-28 h-28 text-white/5" />
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
              Expected Impact
            </span>
            <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-[0.95] mb-8">
              Built in 4 focused steps.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {processSteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Sparkles className="w-5 h-5 text-red-500 mb-5" />
                  <div className="text-red-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">0{index + 1}</div>
                  <div className="text-white text-2xl font-instrument tracking-tight">{step}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {outcomes.map((outcome) => (
                <div key={outcome} className="rounded-2xl border border-red-500/15 bg-red-500/[0.05] p-4 text-white/60 text-xs uppercase tracking-[0.16em] font-semibold">
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 liquid-glass rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 border border-red-500/20 bg-black/50 flex flex-col justify-between gap-10">
            <div>
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
                Start Here
              </span>
              <h3 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-[0.95] mb-6">
                Pick the first workflow.
              </h3>
              <p className="text-white/40 text-base leading-relaxed font-light">
                We will map the fastest sellable automation for the client&apos;s current leads, calls, ads, and tools.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="primary" onClick={() => { trackBookCallClick('ai_audit'); window.open(getAuditCalendarUrl(), '_blank'); }} className="w-full py-5 text-xs tracking-[0.2em]">
                Get Free Automation Audit
              </Button>
              <Link to="/contact" className="text-center text-white/40 hover:text-white text-[10px] uppercase tracking-[0.3em] font-semibold transition-colors">
                Contact Tag Easy
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>

      <FAQ
        faqs={aiFaqs}
        title="AI automation questions"
        subtitle="What automation is, how fast it ships, and how we keep humans in control."
      />
    </main>
  );
};

export default AIAutomation;
