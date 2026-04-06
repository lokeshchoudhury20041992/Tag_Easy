import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 w-full pointer-events-none">
      <div className="liquid-glass bg-black/20 rounded-full max-w-5xl mx-auto px-4 md:px-6 py-1.5 md:py-2 flex items-center justify-between pointer-events-auto shadow-2xl">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center">
            <img 
              src="/logo-removebg-preview.png" 
              alt="Tag Easy Logo" 
              style={{
                width: 'clamp(70px, 12vw, 110px)',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </NavLink>
          <div className="hidden md:flex items-center gap-4 md:gap-5 ml-4 md:ml-8">
            {[
              { name: 'Case Studies', href: '/case-studies' },
              { name: 'Industries', href: '/industries' },
              { name: 'Services', href: '/services' },
              { name: 'About Us', href: '/about' }
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <button className="text-white text-sm font-medium hover:text-white/80 transition-colors">Get a call</button>
          <a
            href="https://adamsalve.com"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass bg-black/20 rounded-full px-4 md:px-6 py-1.5 md:py-2 text-white text-[10px] md:text-sm font-medium hover:bg-white/10 transition-colors shadow-lg"
          >
            Try Adamsalve
          </a>
        </div>
      </div>
    </nav>
  );
}