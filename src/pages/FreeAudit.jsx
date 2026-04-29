import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { cn, getAuditCalendarUrl } from '../lib/utils';
import Button from '../components/Button';
import { testimonials } from '../lib/testimonialData';
import SEO from '../components/SEO';
import { submitToWebhook } from '../lib/submitForm';

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn("bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-24", className)}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className }) => (
  <div className={cn("liquid-glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 h-full aura-card", className)}>
    {children}
  </div>
);

const FreeAudit = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitToWebhook({ email });
      setSubmitStatus('success');
      setEmail('');
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Error submitting email:", error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-32">
      <SEO 
        title="Free Technical Audit | Tag Easy"
        description="Identify your revenue leaks. Drop your email to schedule a deep-dive analysis of your digital ecosystem."
      />
      <SectionContainer className="pt-10 md:pt-20">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-6 block">
              Free Technical Audit
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-[7.5rem] text-white tracking-tighter font-instrument mb-10 leading-[0.85]">
              Identify Your <br/> Revenue Leaks
            </h1>
            <p className="text-white/40 text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Drop your email below and our engineering team will get back to you within 24 hours to schedule a deep-dive analysis of your digital ecosystem.
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="w-full max-w-md mb-8"
          >
            <div className="relative group/form mb-4">
              <form onSubmit={handleSubmit} className={cn(
                "liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 transition-all duration-500",
                submitStatus === 'error' ? "border-red-500/50 neon-red-glow" : "group-hover/form:neon-red-glow focus-within:neon-red-glow"
              )}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={submitStatus === 'success' ? "Audit requested successfully!" : "Enter email for Free Audit"}
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="bg-transparent flex-1 text-white placeholder:text-white/30 outline-none text-[11px] font-medium uppercase tracking-widest disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={cn(
                    "rounded-full p-4 transition-all shadow-xl active:scale-95 disabled:opacity-50",
                    submitStatus === 'success' ? "bg-green-500 text-white" : "bg-white text-black hover:scale-105 group-hover/form:neon-white-glow"
                  )}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <AnimatePresence>
                {submitStatus === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 left-0 right-0 text-red-500 text-[10px] uppercase font-bold tracking-widest text-center"
                  >
                    Invalid email or connection error
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="absolute -bottom-12 left-0 right-0 text-white/30 text-[10px] uppercase tracking-widest text-center transition-colors">
                We respond within 24 hours
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <span className="text-red-500 text-[10px] uppercase font-bold tracking-[0.2em] block">
              Limited Slots Available This Week
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Button variant="secondary" onClick={() => window.open(getAuditCalendarUrl(), '_blank')} className="px-10">
              <Phone className="w-4 h-4" />
              Book Call Directly
            </Button>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Network Trust (Testimonials) Section */}
      <SectionContainer className="pt-24 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">Network Trust</span>
            <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-none">
              Client <span className="text-white/20 italic">Protocols</span>
            </h2>
          </div>
          <p className="text-white/30 text-lg font-light max-w-md">
            Verified outcomes from global leaders synchronizing their vision with our engineering edge. Over 50+ Audits Delivered.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={cn(
                "group cursor-pointer",
                i === 0 ? "lg:col-span-2" : "",
                i === 3 ? "lg:col-span-2" : ""
              )}
            >
              <GlassCard className="h-full flex flex-col justify-between border border-white/5 hover:border-red-500/30 transition-all duration-700 p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-red-500 text-[9px] uppercase font-bold tracking-[0.3em]">{t.tag}</span>
                    <div className="flex gap-1">
                      {[1,2,3].map(j => <div key={j} className="w-1 h-1 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors" />)}
                    </div>
                  </div>
                  <p className="text-white text-xl md:text-2xl font-instrument italic leading-tight tracking-tight">
                    "{t.quote}"
                  </p>
                </div>

                <div className="relative z-10 pt-12 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 font-bold text-xs group-hover:neon-red-glow transition-all duration-500">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-semibold">{t.author}</h5>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>
    </main>
  );
};

export default FreeAudit;
