import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Mail, Phone, Video, ArrowRight, Calendar } from 'lucide-react';
import Button from '../components/Button';
import { submitToWebhook } from '../lib/submitForm';

const Contact = () => {
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
      await submitToWebhook({ name, company, role, phone, email, notes });
      setSubmitStatus('success');
      setName('');
      setCompany('');
      setRole('');
      setPhone('');
      setEmail('');
      setNotes('');
      setTimeout(() => setSubmitStatus(null), 5000);
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
                  { icon: Mail, label: 'Email', value: 'lokesh.choudhury@tageasy.org' },
                  { icon: Phone, label: 'Phone', value: '+91 7980761008' },
                  { icon: Video, label: 'Virtual Node', value: 'Google Meet / Zoom' }
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-center gap-8 group">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:neon-red-glow transition-all duration-700">
                        <item.icon className="w-6 h-6 text-white/20 group-hover:text-red-500 transition-colors" />
                    </div>
                    <div>
                        <div className="text-red-500 text-[9px] uppercase font-semibold tracking-[0.3em] mb-2">{item.label}</div>
                        <div className="text-white text-xl font-light tracking-tight group-hover:text-red-500 transition-colors">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
            </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="liquid-glass p-12 md:p-16 rounded-[3rem] border border-white/5 relative aura-card group hover:border-red-500/50 hover:bg-black/60 hover:backdrop-blur-2xl transition-all duration-700"
        >
            <h3 className="text-4xl font-instrument text-white mb-12 tracking-tighter">Brief Acquisition</h3>
            <form onSubmit={handleSubmit} className="space-y-10 relative">
                <div className="relative group/input">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required disabled={isSubmitting} className="w-full bg-white/5 border-b border-white/40 py-5 px-4 text-white outline-none focus:border-red-500 transition-all font-light placeholder:text-white/50 text-lg" placeholder="NAME"/>
                    <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
                <div className="relative group/input">
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)} disabled={isSubmitting} className="w-full bg-white/5 border-b border-white/40 py-5 px-4 text-white outline-none focus:border-red-500 transition-all font-light placeholder:text-white/50 text-lg" placeholder="COMPANY"/>
                    <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
                <div className="relative group/input">
                    <input type="text" value={role} onChange={e => setRole(e.target.value)} disabled={isSubmitting} className="w-full bg-white/5 border-b border-white/40 py-5 px-4 text-white outline-none focus:border-red-500 transition-all font-light placeholder:text-white/50 text-lg" placeholder="ROLE"/>
                    <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
                <div className="relative group/input">
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} disabled={isSubmitting} className="w-full bg-white/5 border-b border-white/40 py-5 px-4 text-white outline-none focus:border-red-500 transition-all font-light placeholder:text-white/50 text-lg" placeholder="PHONE"/>
                    <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
                <div className="relative group/input">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting} className="w-full bg-white/5 border-b border-white/40 py-5 px-4 text-white outline-none focus:border-red-500 transition-all font-light placeholder:text-white/50 text-lg" placeholder="EMAIL"/>
                    <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
                <div className="relative group/input">
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} required disabled={isSubmitting} className="w-full bg-white/5 border-b border-white/40 py-5 px-4 text-white outline-none focus:border-red-500 transition-all font-light placeholder:text-white/50 text-lg h-40 resize-none" placeholder="NOTES"></textarea>
                    <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-red-500 group-focus-within/input:w-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>
                <Button variant="primary" type="submit" disabled={isSubmitting} className="w-full py-6 text-[11px] uppercase tracking-[0.3em] font-bold group">
                    {isSubmitting ? 'DECODING...' : (submitStatus === 'success' ? 'BRIEF RECEIVED' : 'DECODE BRIEF')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                <AnimatePresence>
                  {submitStatus === 'error' && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center absolute -bottom-6 left-0 right-0">
                      Connection error. Please try again.
                    </motion.p>
                  )}
                  {submitStatus === 'success' && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500 text-[10px] uppercase font-bold tracking-widest text-center absolute -bottom-6 left-0 right-0">
                      We will respond shortly
                    </motion.p>
                  )}
                </AnimatePresence>
            </form>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
