import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getWhatsAppUrlForPage, getGoogleBusinessProfileUrl } from '../lib/utils';
import { Mail, Phone, Video, ArrowRight, Calendar, User, Building, Briefcase, MessageSquare, Send, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import { submitToWebhook } from '../lib/submitForm';
import SEO from '../components/SEO';
import FAQ from '../components/FAQ';
import { NAP } from '../lib/locationsData';
import {
  SITE_URL,
  organizationSchema,
  localBusinessSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '../lib/seoSchema';
import { getFaqsByCategory } from '../lib/faqData';
import { getAttribution } from '../lib/utmTracking';
import {
  trackContactFormSubmit,
  trackGenerateLead,
  trackPhoneClick,
  trackEmailClick,
  trackWhatsAppClick,
} from '../lib/analytics';

const contactFaqs = getFaqsByCategory('Working With Tag Easy');

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    localBusinessSchema,
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact/#webpage`,
      url: `${SITE_URL}/contact/`,
      name: 'Contact Tag Easy',
      about: { '@id': `${SITE_URL}/#organization` },
    },
    buildFaqSchema(contactFaqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ],
};

const Contact = () => {
  const navigate = useNavigate();
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitToWebhook({ name, company, role, phone, email, notes, source: 'contact_form', pagePath: '/contact', ...getAttribution() });
      trackContactFormSubmit();
      trackGenerateLead('contact_form');
      setSubmitStatus('success');
      setName('');
      setCompany('');
      setRole('');
      setPhone('');
      setEmail('');
      setNotes('');
      setTimeout(() => navigate('/contact/thank-you'), 400);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-black pt-20 overflow-hidden">
      <SEO
        title="Contact Tag Easy | SEO, AI Automation & Website Growth"
        description="Contact Tag Easy for SEO, AI automation, website development, Ads Hub, analytics, and digital growth services in Kolkata, India and remote markets."
        path="/contact"
        schemaData={contactSchema}
      />
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none z-50 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 py-20 md:py-28 px-6 items-start">
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
            <motion.span variants={itemVariants} className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-8">Structural Inquiry</motion.span>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-[0.8] mb-12">
                Ready to <br /><span className="text-white/20">Manifest</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-white/40 text-2xl font-light leading-relaxed mb-16 max-w-md hover:text-white/80 transition-colors duration-500">
                Set the foundation for your project's digital scale with premier engineering.
            </motion.p>
            
            <div className="space-y-12">
                {[
                  { icon: Mail, label: 'Email', value: 'lokesh.choudhury@tageasy.org', href: 'mailto:lokesh.choudhury@tageasy.org', onClick: () => trackEmailClick('contact_page') },
                  { icon: Phone, label: 'Phone', value: '+91 7980761008', href: 'tel:+917980761008', onClick: () => trackPhoneClick('contact_page') },
                  { icon: Video, label: 'Virtual Node', value: 'Google Meet / Zoom' }
                ].map((item, i) => {
                  const Inner = (
                    <>
                      <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:neon-red-glow transition-all duration-700">
                          <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white/20 group-hover:text-red-500 transition-colors" />
                      </div>
                      <div className="min-w-0">
                          <div className="text-red-500 text-[9px] uppercase font-semibold tracking-[0.3em] mb-1 md:mb-2">{item.label}</div>
                          <div className="text-white text-base md:text-xl font-light tracking-tight group-hover:text-red-500 transition-colors break-words leading-relaxed">{item.value}</div>
                      </div>
                    </>
                  );
                  return (
                    <motion.div key={i} variants={itemVariants} className="flex items-center gap-4 md:gap-8 group">
                      {item.href ? (
                        <a href={item.href} onClick={item.onClick} className="flex items-center gap-4 md:gap-8 w-full">{Inner}</a>
                      ) : Inner}
                    </motion.div>
                  );
                })}
            </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="liquid-glass p-12 md:p-16 rounded-[3rem] border border-white/5 relative aura-card group hover:border-red-500/50 hover:bg-black/60 hover:backdrop-blur-2xl transition-all duration-700"
        >
            <h3 className="text-4xl font-instrument text-white mb-12 tracking-tighter">Brief Acquisition</h3>
            <form onSubmit={handleSubmit} className="space-y-6 relative mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group/input shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-white/30 group-focus-within/input:text-red-500 transition-colors duration-500" />
                        </div>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required disabled={isSubmitting} className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all duration-500 font-light placeholder:text-white/20 text-sm focus:ring-4 focus:ring-red-500/10 backdrop-blur-md" placeholder="Full Name"/>
                    </div>
                    <div className="relative group/input shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Building className="h-4 w-4 text-white/30 group-focus-within/input:text-red-500 transition-colors duration-500" />
                        </div>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} disabled={isSubmitting} className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all duration-500 font-light placeholder:text-white/20 text-sm focus:ring-4 focus:ring-red-500/10 backdrop-blur-md" placeholder="Company Name"/>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group/input shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Briefcase className="h-4 w-4 text-white/30 group-focus-within/input:text-red-500 transition-colors duration-500" />
                        </div>
                        <input type="text" value={role} onChange={e => setRole(e.target.value)} disabled={isSubmitting} className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all duration-500 font-light placeholder:text-white/20 text-sm focus:ring-4 focus:ring-red-500/10 backdrop-blur-md" placeholder="Your Role"/>
                    </div>
                    <div className="relative group/input shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-white/30 group-focus-within/input:text-red-500 transition-colors duration-500" />
                        </div>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} disabled={isSubmitting} className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all duration-500 font-light placeholder:text-white/20 text-sm focus:ring-4 focus:ring-red-500/10 backdrop-blur-md" placeholder="Phone Number"/>
                    </div>
                </div>

                <div className="relative group/input shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-white/30 group-focus-within/input:text-red-500 transition-colors duration-500" />
                    </div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting} className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all duration-500 font-light placeholder:text-white/20 text-sm focus:ring-4 focus:ring-red-500/10 backdrop-blur-md" placeholder="Email Address"/>
                </div>

                <div className="relative group/input shadow-sm">
                    <div className="absolute top-5 left-0 pl-5 flex pointer-events-none">
                        <MessageSquare className="h-4 w-4 text-white/30 group-focus-within/input:text-red-500 transition-colors duration-500" />
                    </div>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} required disabled={isSubmitting} className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-white outline-none focus:border-red-500/50 focus:bg-white/[0.05] transition-all duration-500 font-light placeholder:text-white/20 text-sm focus:ring-4 focus:ring-red-500/10 backdrop-blur-md h-32 resize-none" placeholder="Project Details..."></textarea>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting} className="w-full py-5 rounded-2xl text-[11px] uppercase tracking-[0.3em] font-bold group mt-8 relative overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50">
                    <div className="flex items-center justify-center gap-3 relative z-10 transition-transform duration-500 group-hover:scale-105">
                        {isSubmitting ? 'DECODING...' : (submitStatus === 'success' ? 'BRIEF RECEIVED' : 'INITIALIZE PROTOCOL')} 
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                </Button>
                
                <AnimatePresence>
                  {submitStatus === 'error' && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center mt-4 absolute -bottom-8 left-0 right-0">
                      Connection error. Please try again.
                    </motion.p>
                  )}
                  {submitStatus === 'success' && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500 text-[10px] uppercase font-bold tracking-widest text-center mt-4 absolute -bottom-8 left-0 right-0">
                      Protocol initiated successfully. We will respond shortly.
                    </motion.p>
                  )}
                </AnimatePresence>
            </form>
        </motion.div>
      </div>

      {/* Phase 2 · Task 3 — Local trust / Google Business Profile section.
          NAP here matches the LocalBusiness schema and Google Business Profile. */}
      <section className="px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">Local Trust</span>
          <h2 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument leading-none mb-12">
            Visit or Contact Tag Easy in Kolkata
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5">
              <h3 className="text-white text-2xl font-instrument tracking-tighter mb-2">{NAP.name}</h3>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-6">{NAP.legalName}</p>
              <address className="not-italic space-y-4 text-white/60 text-sm font-light">
                <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <span>{NAP.addressLocality}, {NAP.addressRegion}, {NAP.country}</span></div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-red-500 shrink-0" /> <a href={NAP.phoneHref} onClick={() => trackPhoneClick('contact_local')} className="hover:text-white transition-colors">{NAP.phone}</a></div>
                <div className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-red-500 shrink-0" /> <a href={getWhatsAppUrlForPage('Contact', 'contact_page')} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('contact_local')} className="hover:text-white transition-colors">WhatsApp: {NAP.phone}</a></div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-red-500 shrink-0" /> <a href={`mailto:${NAP.email}`} onClick={() => trackEmailClick('contact_local')} className="hover:text-white transition-colors break-all">{NAP.email}</a></div>
                <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-red-500 shrink-0" /> <span>{NAP.hours}</span></div>
              </address>

              <div className="mt-6 pt-6 border-t border-white/5">
                <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-3">Service areas</span>
                <div className="flex flex-wrap gap-2">
                  {['Kolkata', 'North Dumdum', 'West Bengal', 'India', 'Remote'].map((a) => (
                    <span key={a} className="text-white/50 text-[11px] border border-white/10 rounded-full px-3 py-1">{a}</span>
                  ))}
                </div>
              </div>

              <p className="text-white/40 text-xs font-light mt-6">
                We work remotely and by appointment — book a call or message us on WhatsApp and we will confirm a time.
              </p>

              <a
                href={getGoogleBusinessProfileUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-red-500 text-[11px] uppercase tracking-widest font-bold hover:tracking-[0.2em] transition-all"
              >
                View our Google Business Profile <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-[2rem] overflow-hidden border border-white/5 min-h-[360px]">
              <iframe
                title="Tag Easy location — Kolkata"
                src="https://www.google.com/maps?q=Kolkata,%20West%20Bengal,%20India&output=embed"
                className="w-full h-full min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <FAQ
        faqs={contactFaqs}
        title="Working with Tag Easy"
        subtitle="Where we're based, who we work with, and how to get started."
      />
    </main>
  );
};

export default Contact;
