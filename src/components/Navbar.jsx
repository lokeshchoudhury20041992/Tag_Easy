import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import logo from '../assets/Logo_T.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About', href: '/about' },
    { name: 'Heritage', href: '/heritage' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? 'backdrop-blur-xl bg-black/40 border-b border-white/10 py-4' : 'backdrop-blur-md bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="z-10 flex items-center gap-3">
            <img 
              src={logo} 
              alt="TAG EASY" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/10",
                  isActive ? "text-primary bg-white/5 border-white/10" : "text-white/70 hover:text-white"
                )}
              >
                {item.name}
              </NavLink>
            ))}
            <button className="ml-4 bg-primary text-background px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                Audit
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10 z-10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden backdrop-blur-2xl bg-black/60 border-t border-white/10"
          >
            <div className="px-6 pt-4 pb-8 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg",
                    isActive ? "text-primary bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
              <button className="w-full mt-4 bg-primary text-background py-4 rounded-xl font-black uppercase tracking-widest text-xs">
                Free Tech Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
