import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Calendar,
  CheckCircle2,
  Cpu,
  DatabaseZap,
  FileSearch,
  MessageCircle,
  MousePointerClick,
  Network,
  Search,
  Sparkles,
  Target,
  Workflow,
  Zap
} from 'lucide-react';
import { cn, getAuditCalendarUrl, getWhatsAppUrl } from '../lib/utils';
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
  <div className={cn("group liquid-glass rounded-[2rem] md:rounded-[3rem] p-7 md:p-10 h-full aura-card border border-white/5 hover:border-red-500/40 hover:bg-black/60 transition-all duration-700", className)}>
    {children}
  </div>
);

const automationPillars = [
  {
    title: 'Ads Automation',
    desc: 'Campaign setup, audience flows, retargeting signals, conversion tracking, and reporting systems that reduce manual campaign work.',
    icon: Target,
    items: ['Meta and Google workflows', 'Retargeting sequences', 'Performance reporting']
  },
  {
    title: 'Lead Generation',
    desc: 'Capture, qualify, route, and follow up with leads automatically so sales conversations happen faster.',
    icon: MousePointerClick,
    items: ['Lead capture logic', 'CRM routing', 'WhatsApp and email follow-up']
  },
  {
    title: 'SEO Automation',
    desc: 'Content planning, technical checks, keyword tracking, indexing workflows, and recurring optimization systems.',
    icon: Search,
    items: ['Keyword opportunity tracking', 'Content briefs', 'Technical SEO alerts']
  },
  {
    title: 'AI Content Systems',
    desc: 'Repeatable AI-assisted content pipelines for blogs, ads, landing pages, social posts, and nurture messages.',
    icon: FileSearch,
    items: ['Blog and social pipelines', 'Ad copy variants', 'Brand-safe prompts']
  },
  {
    title: 'CRM and Operations',
    desc: 'Connect forms, sheets, CRMs, calendars, inboxes, and internal tools into one reliable operating layer.',
    icon: DatabaseZap,
    items: ['Pipeline automation', 'Task creation', 'Internal notifications']
  },
  {
    title: 'Custom AI Agents',
    desc: 'Purpose-built assistants that answer, research, summarize, classify, and trigger actions for your business.',
    icon: Brain,
    items: ['Support agents', 'Research assistants', 'Data classification']
  }
];

const processSteps = [
  { title: 'Audit', desc: 'We map manual work, revenue leaks, and repeated tasks across marketing, sales, and operations.' },
  { title: 'Architect', desc: 'We design the automation logic, data flow, integrations, fallback rules, and human approval points.' },
  { title: 'Deploy', desc: 'We build, test, and connect the system using the right mix of AI, APIs, CRM tools, and dashboards.' },
  { title: 'Optimize', desc: 'We monitor performance, tighten prompts, improve routing, and expand the system as the business grows.' }
];

const outcomes = [
  'More qualified leads without more manual chasing',
  'Faster follow-up across WhatsApp, email, forms, and CRM',
  'Cleaner reporting for ads, SEO, and sales activity',
  'Lower operating load for repetitive marketing tasks',
  'Scalable systems that can grow into full AI agents'
];

const AIAutomation = () => {
  return (
    <main className="bg-black relative min-h-screen">
      <SEO
        title="AI Automation Services | Tag Easy"
        description="Tag Easy builds AI automation systems for ads, lead generation, SEO, CRM workflows, reporting, and custom AI agents."
      />

      <section className="relative min-h-[92vh] px-4 md:px-6 pt-32 md:pt-44 pb-20 overflow-hidden flex items-center bg-black">
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
            <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] text-white tracking-tighter font-instrument leading-[0.82] mb-10">
              AI Automation <br />
              <span className="text-white/20 italic">that sells while you scale</span>
            </h1>
            <p className="text-white/45 text-xl md:text-2xl font-light max-w-3xl leading-relaxed mb-12 hover:text-white/80 transition-colors duration-500">
              We build automation systems for ads, lead generation, SEO, CRM, reporting, content, and custom AI workflows. If it repeats, waits, routes, analyzes, or follows up, we can usually automate it.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Button variant="primary" onClick={() => window.open(getAuditCalendarUrl(), '_blank')} className="px-10 py-5 text-xs tracking-[0.2em]">
                Build My Automation
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" onClick={() => window.open(getWhatsAppUrl(), '_blank')} className="px-10 py-5 text-xs tracking-[0.2em]">
                WhatsApp Us
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="liquid-glass rounded-[3rem] p-6 md:p-8 border border-red-500/20 bg-black/50 relative overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.75)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.16)_0%,_transparent_58%)] pointer-events-none" />
              <div className="relative z-10 space-y-5">
                {[
                  { label: 'Lead captured', icon: MousePointerClick, active: true },
                  { label: 'AI qualifies intent', icon: Brain, active: true },
                  { label: 'CRM updated', icon: DatabaseZap, active: true },
                  { label: 'Sales team notified', icon: MessageCircle, active: true },
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

      <SectionContainer id="automation-systems" className="pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
              What We Automate
            </span>
            <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-none">
              Revenue systems, <span className="text-white/20 italic">not small tricks</span>
            </h2>
          </div>
          <p className="text-white/35 text-lg font-light max-w-md leading-relaxed">
            The goal is simple: remove repetitive work, respond faster, and give the client a system that can keep earning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {automationPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
            >
              <GlassCard>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <pillar.icon className="w-7 h-7 text-red-500" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-red-500 transition-colors" />
                </div>
                <h3 className="text-3xl text-white font-instrument tracking-tighter mb-5">{pillar.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light mb-8">{pillar.desc}</p>
                <div className="space-y-3">
                  {pillar.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-white/45 text-xs font-light">
                      <Zap className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="py-10 md:py-16">
        <div className="liquid-glass rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.08)_0%,_transparent_70%)] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
                Automation Engine
              </span>
              <h2 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">
                One connected flow from visitor to revenue.
              </h2>
              <p className="text-white/40 text-lg leading-relaxed font-light">
                We connect the client&apos;s marketing channels, website, CRM, inbox, calendar, sheets, analytics, and AI logic into one operating system.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Website Forms', icon: Workflow },
                { label: 'Ad Platforms', icon: Target },
                { label: 'SEO Data', icon: Search },
                { label: 'CRM Pipeline', icon: Network },
                { label: 'AI Reasoning', icon: Cpu },
                { label: 'Dashboards', icon: BarChart3 }
              ].map((node, index) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 flex items-center gap-4 hover:border-red-500/30 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] flex items-center justify-center">
                    <node.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-white/70 text-sm font-medium">{node.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
              Delivery Model
            </span>
            <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-none mb-8">
              Built carefully. <span className="text-white/20 italic">Scaled aggressively.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed font-light mb-10">
              Automation should not break the business when volume increases. We build the logic with testing, visibility, and clear human control points.
            </p>
            <Button variant="secondary" href="/services" className="px-10 py-5 text-xs tracking-[0.2em]">
              View Pricing
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step, index) => (
              <GlassCard key={step.title} className="min-h-[220px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-red-500 text-[10px] uppercase font-bold tracking-[0.3em]">0{index + 1}</span>
                  <Sparkles className="w-5 h-5 text-white/15" />
                </div>
                <div>
                  <h3 className="text-3xl text-white font-instrument tracking-tighter mb-4">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 liquid-glass rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 border border-white/5 relative overflow-hidden">
            <Calendar className="absolute right-10 top-10 w-28 h-28 text-white/5" />
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">
              Expected Impact
            </span>
            <h2 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument leading-[0.9] mb-10">
              Automation becomes a high-ticket growth asset.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 text-white/45 text-sm font-light leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
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
              <h3 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument leading-[0.9] mb-8">
                Let&apos;s find what can be automated first.
              </h3>
              <p className="text-white/40 text-lg leading-relaxed font-light">
                We will audit the client&apos;s current ads, leads, SEO, tools, and manual tasks, then propose the fastest automation wins.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="primary" onClick={() => window.open(getAuditCalendarUrl(), '_blank')} className="w-full py-5 text-xs tracking-[0.2em]">
                Get Free Automation Audit
              </Button>
              <Link to="/contact" className="text-center text-white/40 hover:text-white text-[10px] uppercase tracking-[0.3em] font-semibold transition-colors">
                Contact Tag Easy
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  );
};

export default AIAutomation;
