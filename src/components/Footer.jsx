import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAuditCalendarUrl } from '../lib/utils';
import logo from '../assets/Logo_T.webp';

export default function Footer() {
  const platformLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/tag-easy/posts/?feedView=all', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/tag_easy/', label: 'Instagram' },
  ];

  return (
    <footer className="relative py-24 px-8 border-t border-white/5 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-24">
          {/* Brand Column */}
          <div className="md:col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="mb-10 inline-block">
                <img
                  src={logo}
                  alt="TAG EASY"
                  className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              <h2 className="text-4xl md:text-5xl text-white font-instrument mb-8 tracking-tighter leading-tight">
                Architecting the future of <br />
                <span className="text-white/20">creative technology</span>
              </h2>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/10 hover:border-red-500/30 transition-all duration-500 group"
                    >
                      <Icon className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-6 lg:col-span-3">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-white font-instrument text-2xl mb-8 tracking-tighter">Platform</h3>
              <ul className="space-y-4">
                {platformLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-zinc-500 hover:text-white transition-all duration-500 text-lg font-light flex items-center group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Summary */}
          <div className="md:col-span-6 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="liquid-glass p-10 rounded-[2.5rem] border border-white/5 relative group hover:border-red-500/20 transition-all duration-1000"
            >
              <h3 className="text-white font-instrument text-2xl mb-6 tracking-tighter">Direct Connect</h3>
              <p className="text-zinc-500 text-lg font-light mb-8 leading-relaxed group-hover:text-zinc-300 transition-colors">
                Ready to build something that redefines your market?
              </p>
              <button 
                onClick={() => window.open(getAuditCalendarUrl(), '_blank')}
                className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center hover:tracking-[0.4em] transition-all"
              >
                INITIATE PROJECT <ArrowUpRight className="w-3 h-3 ml-2" />
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <a
            href="https://adamsalve.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden bg-white text-black rounded-full px-5 py-2 text-[10px] uppercase tracking-tighter font-bold hover:scale-105 hover:neon-white-glow transition-all active:scale-95 shadow-xl"
          >
            Try Adamsalve
          </a>
          <p className="text-zinc-600 text-[10px] font-medium uppercase tracking-widest">
            @2019-2026 Tag Easy | Trademark & All rights reserved
          </p>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-white transition-colors">Governance</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
