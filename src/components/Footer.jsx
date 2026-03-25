import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../assets/Logo.png';

export default function Footer() {
  const footerLinks = {
    Company: ['About', 'Careers', 'Blog', 'Press'],
    Services: ['Web Development', 'Mobile Apps', 'AI Integration', 'Cloud Solutions'],
    Resources: ['Documentation', 'Case Studies', 'Support', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative py-24 px-8 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <img 
                  src={logo} 
                  alt="TAG EASY" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-zinc-500 text-lg mb-8 max-w-sm leading-relaxed">
                Architecting the future of creative technology. High-performance engineering for the most ambitious global brands.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                    >
                      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{category}</h3>
              <ul className="space-y-4">
                {links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-zinc-500 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-xs font-label">
              © 2024 TAG EASY | Thynk Unlimited. Engineered in Kolkata.
            </p>
            <div className="flex gap-8 text-xs font-label text-zinc-600">
              <a href="#" className="hover:text-white transition-colors">Privacy Architecture</a>
              <a href="#" className="hover:text-white transition-colors">Service Terms</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
