import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn, getCalendlyUrl } from '../lib/utils';
import logoT from '../assets/Logo_T.png';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={cn(
      isHome ? "fixed" : "sticky",
      "top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-5 w-full pointer-events-none"
    )}>
      <div className={cn(
    "liquid-glass bg-black/40 rounded-full max-w-7xl mx-auto px-5 md:px-8 py-2 md:py-2.5 flex items-center justify-between pointer-events-auto",
    "transition-all duration-700 border border-white/5 hover:border-red-500/50 hover:neon-red-glow hover:scale-[1.01]"
      )}>
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center hover:scale-105 transition-transform">
            <img 
              src={logoT} 
              alt="Tag Easy Logo" 
              style={{
                width: 'clamp(50px, 8vw, 75px)',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </NavLink>
          <div className="hidden lg:flex items-center gap-6 ml-8">
            {location.pathname !== '/free-audit' && [
              { name: 'Case Studies', href: '/case-studies' },
              { name: 'Industries', href: '/industries' },
              { name: 'Services', href: '/services' },
              { name: 'About Us', href: '/about' },
              { name: 'Contact Us', href: '/contact' }
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  "text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300",
                  isActive ? "text-white" : "text-white/40 hover:text-white hover:tracking-[0.25em]"
                )}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => window.open(getCalendlyUrl(), '_blank')}
            className="text-white/50 text-[10px] uppercase tracking-widest font-medium hover:text-white transition-colors"
          >
            Get Free Audit
          </button>
          <a
            href="https://adamsalve.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-white text-black rounded-full px-5 py-2 text-[10px] uppercase tracking-tighter font-bold hover:scale-105 hover:neon-white-glow transition-all active:scale-95 shadow-xl"
          >
            Try Adamsalve
          </a>
        </div>
      </div>
    </nav>
  );
}