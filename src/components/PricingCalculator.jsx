import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getCalendlyUrl } from '../lib/utils';
import { 
  Check, Plus, Minus, Globe, 
  Smartphone, Zap, BarChart3, 
  ArrowRight, Info
} from 'lucide-react';
import Button from './Button';

const PRICING_DATA = {
  web: {
    title: "Website Design & Development",
    packages: [
      {
        id: 'starter',
        name: 'Starter Package',
        subtitle: 'Best for small businesses / landing pages',
        usd: 224,
        inr: 18000,
        features: [
          '1–5 Pages (Home, About, Services, Contact)',
          'Responsive Design (Mobile + Desktop)',
          'Basic UI/UX (Figma or direct build)',
          'Contact Form Integration',
          'Basic SEO Setup (Meta tags, sitemap)',
          'Fast loading optimization',
          'Deployment (Netlify / Hosting setup)'
        ]
      },
      {
        id: 'growth',
        name: 'Growth Package',
        subtitle: 'Best for businesses who want leads + SEO',
        usd: 449,
        inr: 36000,
        isPopular: true,
        features: [
          'Up to 10 Pages',
          'Custom UI Design (Figma)',
          'Advanced SEO Setup',
          'Blog Setup (for content marketing)',
          'Google Analytics + Search Console',
          'WhatsApp / Chat Integration',
          'Speed optimization + Core Web Vitals',
          'Basic copywriting support'
        ]
      },
      {
        id: 'pro',
        name: 'Pro Business Website',
        subtitle: 'Best for serious brands / startups',
        usd: 899,
        inr: 72000,
        features: [
          'Unlimited Pages',
          'Fully Custom Design System',
          'Advanced animations (modern UI)',
          'Conversion-focused design (CTA, funnels)',
          'CMS (so client can edit content)',
          'Landing page for ads',
          'Advanced SEO (on-page optimization)',
          'Performance + security optimization'
        ]
      },
      {
        id: 'premium',
        name: 'Premium / Custom Web App',
        subtitle: 'Best for SaaS / platforms / dashboards',
        usd: 1350,
        inr: 108000,
        isPlus: true,
        features: [
          'Full custom development (React / Next.js)',
          'Backend integration (API, DB)',
          'User login / dashboard',
          'Payment integration',
          'Scalable architecture',
          'Automation workflows'
        ]
      }
    ],
    addons: [
      { id: 'extra_page', name: 'Extra Page', usd: 27, inr: 2250 },
      { id: 'blog_setup', name: 'Blog Setup', usd: 72, inr: 5850 },
      { id: 'adv_seo', name: 'Advanced SEO Setup', usd: 135, inr: 10800 },
      { id: 'monthly_seo', name: 'Monthly SEO Retainer', usd: 135, inr: 10800 },
      { id: 'speed_opt', name: 'Speed Optimization', usd: 45, inr: 3600 },
      { id: 'ui_figma', name: 'Full UI Design (Figma)', usd: 135, inr: 10800 },
      { id: 'copywriting', name: 'Copywriting Support', usd: 90, inr: 7200 },
      { id: 'payment_gw', name: 'Payment Gateway', usd: 108, inr: 9000 },
      { id: 'cms', name: 'CMS Integration', usd: 135, inr: 10800 },
      { id: 'animations', name: 'Premium UI / Animations', usd: 90, inr: 7200 }
    ]
  },
  marketing: {
    title: "Digital Marketing",
    packages: [
      {
        id: 'meta',
        name: 'Meta Ads Management',
        subtitle: 'Facebook + Instagram Ads scaling',
        usd: 108,
        inr: 9000,
        isMonthly: true,
        features: [
          'Campaign Strategy',
          'Ad Creative Setup',
          'Audience Targeting',
          'A/B Testing',
          'Weekly Reporting',
          'Pixel Integration'
        ]
      },
      {
        id: 'google',
        name: 'Google Ads Management',
        subtitle: 'Search + Display network dominance',
        usd: 108,
        inr: 9000,
        isMonthly: true,
        features: [
          'Keyword Research',
          'Search Ads Setup',
          'Conversion Tracking',
          'Negative Keywords Opt',
          'ROI Dashboard',
          'Monthly Optimization'
        ]
      },
      {
        id: 'linkedin',
        name: 'LinkedIn / TikTok Ads',
        subtitle: 'High-intent or High-viral management',
        usd: 216,
        inr: 18000,
        isMonthly: true,
        features: [
          'Enterprise/B2B targeting',
          'Custom Ad Formats',
          'Lead Gen Form integration',
          'In-depth Analytics',
          'Competitor Analysis',
          'Content consultation'
        ]
      }
    ],
    addons: [
      { id: 'ads_setup', name: 'One-time Setup Fee', usd: 72, inr: 5850 }
    ]
  },
  apps: {
    title: "Mobile App Development",
    packages: [
      {
        id: 'app_basic',
        name: 'Basic App Package',
        subtitle: 'MVP development for startups',
        usd: 899,
        inr: 72000,
        features: [
          'Cross-platform (Flutter / React Native)',
          '5–7 Screens',
          'Basic Backend',
          'User Auth',
          'Core Functionality',
          'App Store submission'
        ]
      },
      {
        id: 'app_adv',
        name: 'Advanced App Package',
        subtitle: 'Full-scale enterprise infrastructure',
        usd: 2250,
        inr: 180000,
        isPlus: true,
        features: [
          'Unlimited Screens',
          'Full Backend Architecture',
          'Admin Dashboard',
          'API Integrations',
          'Third-party services',
          'Performance Tuning'
        ]
      }
    ],
    addons: [
      { id: 'push_notify', name: 'Push Notifications', usd: 90, inr: 7200 },
      { id: 'multilang', name: 'Multi-language Support', usd: 135, inr: 10800 }
    ]
  },
  automation: {
    title: "AI Automation",
    packages: [
      {
        id: 'auto_basic',
        name: 'Basic Automation',
        subtitle: 'Workflow optimization (n8n/Zapier)',
        usd: 269,
        inr: 22500,
        features: [
          'Lead Capture Automation',
          'CRM Integration',
          'Basic Content Automation',
          'Email logic workflows'
        ]
      },
      {
        id: 'auto_adv',
        name: 'Advanced Automation',
        subtitle: 'Intelligent AI-driven ecosystem',
        usd: 899,
        inr: 72000,
        features: [
          'Full-scale lead flow',
          'AI Agent Integration',
          'Custom database logic',
          'Scale-ready architecture',
          'Complex data transformation'
        ]
      }
    ]
  }
};

const PricingCalculator = () => {
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('web');
  const [selectedPkg, setSelectedPkg] = useState(PRICING_DATA.web.packages[1]);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Currency Formatter
  const formatPrice = (val) => {
    if (currency === 'USD') return `$${val}`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // Switch category and reset state
  const handleCategoryChange = (catId) => {
    setCategory(catId);
    setSelectedPkg(PRICING_DATA[catId].packages[0]);
    setSelectedAddons([]);
  };

  const handleAddonToggle = (addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const totalEstimate = useMemo(() => {
    const pkgPrice = currency === 'USD' ? selectedPkg.usd : selectedPkg.inr;
    const addonsPrice = selectedAddons.reduce((sum, a) => {
      return sum + (currency === 'USD' ? a.usd : a.inr);
    }, 0);
    return pkgPrice + addonsPrice;
  }, [selectedPkg, selectedAddons, currency]);

  return (
    <div className="w-full">
      {/* Header & Currency Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">Investment Structure</span>
          <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-none">
            Architectural <span className="text-white/20">Value</span>
          </h2>
        </div>
        
        {/* Currency Switcher */}
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button 
            onClick={() => setCurrency('USD')}
            className={cn(
              "px-6 py-2 rounded-full text-[10px] font-semibold tracking-widest transition-all duration-300",
              currency === 'USD' ? "bg-red-500 text-white" : "text-white/40 hover:text-white"
            )}
          >USD</button>
          <button 
            onClick={() => setCurrency('INR')}
            className={cn(
              "px-6 py-2 rounded-full text-[10px] font-semibold tracking-widest transition-all duration-300",
              currency === 'INR' ? "bg-red-500 text-white" : "text-white/40 hover:text-white"
            )}
          >INR</button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 mb-20">
        {Object.entries(PRICING_DATA).map(([id, data]) => (
          <button 
            key={id}
            onClick={() => handleCategoryChange(id)}
            className={cn(
              "px-8 py-4 rounded-2xl border transition-all duration-500 text-sm font-light tracking-wide",
              category === id 
                ? "bg-white/10 border-red-500/50 text-white neon-red-glow" 
                : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white"
            )}
          >
            {data.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Packages Grid */}
        <div className="xl:col-span-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICING_DATA[category].packages.map((pkg) => (
              <motion.div 
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={cn(
                  "liquid-glass p-8 rounded-[2.5rem] border transition-all duration-700 cursor-pointer group relative overflow-hidden",
                  selectedPkg.id === pkg.id 
                    ? "border-red-500/50 bg-black/40" 
                    : "border-white/5 hover:border-white/20"
                )}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-6 right-6 px-4 py-1.5 bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-full neon-red-glow">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-3xl text-white font-instrument mb-2 tracking-tighter">{pkg.name}</h3>
                <p className="text-white/30 text-sm font-light mb-8 group-hover:text-white/60 transition-colors">{pkg.subtitle}</p>
                
                <div className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-5xl font-instrument text-white mb-1 tracking-tighter">
                    {formatPrice(currency === 'USD' ? pkg.usd : pkg.inr)}
                    {pkg.isPlus && <span className="text-white/20">+</span>}
                  </div>
                  <div className="text-[10px] text-white/20 uppercase font-semibold tracking-[0.2em]">
                    {pkg.isMonthly ? "Per Month Support" : "Initial Investment"}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-white/40 font-light group-hover:px-1 transition-all duration-500">
                      <Check className="w-4 h-4 mr-3 text-red-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {pkg.features.length > 5 && (
                    <li className="text-[10px] text-white/20 uppercase font-semibold tracking-widest pt-2">
                      + {pkg.features.length - 5} More Architectural Components
                    </li>
                  )}
                </ul>

                <div className={cn(
                  "w-full h-1 rounded-full transition-all duration-1000",
                  selectedPkg.id === pkg.id ? "bg-red-500 neon-red-glow" : "bg-white/5 group-hover:bg-white/20"
                )} />
              </motion.div>
            ))}
          </div>

          {/* Detailed Features (Selected Package) */}
          <div className="liquid-glass p-12 rounded-[3.5rem] border border-white/5 relative group overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.03)_0%,_transparent_50%)]" />
             <h4 className="text-2xl text-white font-instrument mb-10 border-b border-white/10 pb-6">Component Breakdown: <span className="text-red-500 opacity-60">{selectedPkg.name}</span></h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {selectedPkg.features.map((f, i) => (
                  <div key={i} className="flex items-start group/feature">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-2 mr-4 group-hover/feature:bg-red-500 group-hover/feature:scale-150 transition-all duration-500" />
                    <span className="text-white/50 text-sm font-light group-hover/feature:text-white transition-colors">{f}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Estimation Sidebar */}
        <div className="xl:col-span-4 lg:sticky lg:top-32 h-fit">
          <div className="liquid-glass p-10 rounded-[3rem] border border-red-500/20 bg-black/60 relative overflow-hidden flex flex-col gap-10">
            <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
              <Zap className="w-32 h-32 rotate-12" />
            </div>

            <div>
              <h4 className="text-2xl text-white font-instrument mb-2">Estimate Total</h4>
              <p className="text-white/20 text-[10px] font-semibold tracking-[0.4em] uppercase">Scale Calculation</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 relative overflow-hidden group/total">
              <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/total:opacity-100 transition-opacity duration-1000" />
              <div className="relative text-5xl md:text-7xl font-instrument text-white mb-2 tracking-tighter">
                {formatPrice(totalEstimate)}
                {selectedPkg.isPlus && <span className="text-white/20">+</span>}
              </div>
              <div className="text-[10px] text-red-500/60 uppercase font-semibold tracking-[0.2em] animate-pulse">
                Projected Investment Sum
              </div>
            </div>

            {/* Add-ons List */}
            {PRICING_DATA[category].addons && (
              <div className="space-y-6">
                <h5 className="text-[10px] text-white/20 uppercase font-semibold tracking-[0.4em]">Available Augmentations</h5>
                <div className="flex flex-wrap gap-2">
                  {PRICING_DATA[category].addons.map((addon) => {
                    const isSelected = selectedAddons.find(a => a.id === addon.id);
                    return (
                      <button 
                        key={addon.id}
                        onClick={() => handleAddonToggle(addon)}
                        className={cn(
                          "px-4 py-2 rounded-xl border text-[10px] font-medium tracking-wide transition-all duration-500 flex items-center gap-3",
                          isSelected 
                            ? "bg-red-500/20 border-red-500/50 text-white" 
                            : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                        )}
                      >
                        {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        {addon.name} ({formatPrice(currency === 'USD' ? addon.usd : addon.inr)})
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-white/10">
               <div className="flex justify-between items-center text-sm text-white/40 font-light">
                  <span>Base Package</span>
                  <span>{formatPrice(currency === 'USD' ? selectedPkg.usd : selectedPkg.inr)}</span>
               </div>
               <div className="flex justify-between items-center text-sm text-white/40 font-light">
                  <span>Augmentations ({selectedAddons.length})</span>
                  <span>{formatPrice(selectedAddons.reduce((sum, a) => sum + (currency === 'USD' ? a.usd : a.inr), 0))}</span>
               </div>
               <div className="mt-8">
                 <Button 
                   variant="primary" 
                   className="w-full py-6 group"
                   onClick={() => window.open(getCalendlyUrl(), '_blank')}
                 >
                   INITIATE COLLABORATION
                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                 </Button>
               </div>
                <p className="text-[10px] text-center text-white/20 font-light uppercase tracking-widest mt-4">
                  * Final quote subject to engineering audit <br />
                  <span className="text-red-500/60 mt-1 block">Pricing is adjustable based on scale</span>
                </p>
            </div>
          </div>

          <div className="mt-10 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-start gap-5 group">
             <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:neon-red-glow transition-all duration-700">
               <Info className="w-6 h-6 text-red-500" />
             </div>
             <div>
               <h6 className="text-white text-sm font-medium mb-1">Architecture Note</h6>
               <p className="text-white/30 text-xs leading-relaxed font-light">
                 Instead of bundled products, we build scalable digital systems that evolve with your market position.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
