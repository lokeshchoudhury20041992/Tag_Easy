import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

import heroVideo from '../assets/Home.mp4';

const Home = () => {
    return (
        <div className="overflow-x-hidden bg-background min-h-screen selection:bg-primary-container selection:text-white">
            {/* Full Screen Cinematic Video Hero */}
            <section className="relative h-screen w-full overflow-hidden bg-black">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
                
                {/* Central High-Impact Headline */}
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-2xl sm:text-4xl md:text-7xl font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-white text-center leading-[1.2] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-8"
                    >
                        ARCHITECTING THE <br/>
                        <span className="text-primary italic font-display">DIGITAL FRONTIER</span>
                    </motion.h2>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] text-white/50 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                            Discover the Arsenal
                        </span>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-white/50 text-4xl">keyboard_double_arrow_down</span>
                </div>
            </section>

            {/* Strategic Statement Section - Now separate from Video */}
            <section className="relative py-32 md:py-48 flex items-center justify-center px-8 border-b border-white/5">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block mb-10 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                            Based in the Heart of Kolkata
                        </span>
                        
                        <div className="space-y-6 mb-12">
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-zinc-100 leading-[0.85]">
                                WE BUILD.<br/>
                                <span className="text-primary-container italic font-display">OPTIMIZE.</span><br/>
                                WE SCALE.
                            </h1>
                            <p className="font-label text-zinc-500 uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] font-black italic">Digitally Engineered for the Global Frontier</p>
                        </div>
                        
                        <p className="text-xl text-zinc-400 max-w-xl mb-12 leading-relaxed font-medium">
                            Helping Kolkata businesses dominate the digital landscape with bespoke websites, high-performance apps, and aggressive SEO strategies.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-background font-black rounded-2xl text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(255,83,91,0.2)] hover:scale-103 transition-all">
                                Claim Your Free Audit
                            </button>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                             <img 
                                alt="Digital Architecture" 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                                src="src/assets/hero_art.png"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-zinc-900 p-10 rounded-[2.5rem] border border-white/10 shadow-2xl hidden md:block">
                            <div className="text-primary font-black text-5xl mb-2">10Y+</div>
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Market<br/>Authority</div>
                        </div>
                    </motion.div>
                </div>
            </section>
                    

            {/* Services Overview */}
            <section className="py-32 px-8 bg-zinc-950 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                        <div className="max-w-2xl">
                            <span className="font-label text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-4 block">Expertise</span>
                            <h2 className="text-4xl md:text-6xl font-black text-zinc-100 tracking-tighter">Forging Digital Empires.</h2>
                        </div>
                        <div className="text-zinc-600 font-label text-[10px] font-black md:text-right uppercase tracking-[0.2em]">
                            22.5726° N, 88.3639° E <br/> TACKLING THE MODERN WEB
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Web Architecture', icon: 'language', desc: 'Premium, lightning-fast websites built for conversion and aesthetic authority.', points: ['Next.js & React', 'Headless E-commerce'], transform: '' },
                            { title: 'SEO Dominance', icon: 'rocket_launch', desc: 'We don\'t just rank; we capture the intent that drives high-value revenue.', points: ['Technical Audits', 'Content Strategy'], transform: 'md:-translate-y-8' },
                            { title: 'Mobile Scaling', icon: 'app_settings_alt', desc: 'Native and Cross-platform apps that keep your customers engaged 24/7.', points: ['iOS & Android', 'UX/UI Innovation'], transform: '' }
                        ].map((service, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "bg-white/5 backdrop-blur-xl p-10 rounded-3xl group hover:bg-white/10 transition-all duration-500 border border-white/5",
                                    service.transform
                                )}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-primary text-4xl">{service.icon}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{service.title}</h3>
                                <p className="text-zinc-500 leading-relaxed mb-10 font-medium">{service.desc}</p>
                                <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                    {service.points.map(p => (
                                        <li key={p} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-40 px-8 bg-background overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative group">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all duration-1000"></div>
                        <img 
                            alt="Our Tech Team" 
                            className="rounded-3xl grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/5" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD6E-w9de07GkvJptXkubq7bJCcYEOnX7ou9pQ9gzGGSJupqXW7UOyr_2IhquQeVb-axEtfeD38kpPJ9lKJTucmBGjY1UahYaWbf-5T6FNnvh3v0iWturjDSNi3-JeDP-xWt3gVaHAM8uTL6nK2k60J_3RjyEm7MZOLKBzjyJkGUfF5z1sRzB7u0eIT3uhJPjxuPm3GWqyfhZwnN9fjiXWk8BZwUl2q-cL2VllwVXCumZ77EKpUk8bQnKeiLc19sMJj1Vv7ISne9M6"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-zinc-900 p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <p className="text-primary font-black text-5xl mb-2 tracking-tighter">98%</p>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Client Retention</p>
                        </div>
                    </div>
                    <div>
                        <span className="font-label text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-6 block">The Advantage</span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-zinc-100 tracking-tighter mb-12 leading-[1.1]">Global Standards, <br/><span className="text-primary italic font-display text-3xl sm:text-4xl md:text-5xl">Kolkata Spirit</span>.</h2>
                        <div className="space-y-12">
                            {[
                                { title: 'High-Velocity Delivery', icon: 'bolt', desc: 'We operate with agile precision, ensuring your project moves from blueprint to launch in record time.' },
                                { title: 'Local Market Intelligence', icon: 'map', desc: 'Deep understanding of Kolkata\'s consumer psychology combined with international design trends.' },
                                { title: 'Radical Transparency', icon: 'verified', desc: 'Real-time dashboards, weekly audits, and no hidden technical jargon. You see what we see.' }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-8 group"
                                >
                                    <div className="shrink-0 w-14 h-14 rounded-2xl border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
                                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-zinc-100 mb-2">{item.title}</h4>
                                        <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Study Preview */}
            <section className="py-40 px-8 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-zinc-100 tracking-tighter mb-6 leading-none">Proven Results.</h2>
                        <p className="text-zinc-500 max-w-xl mx-auto font-medium text-lg">Real numbers from businesses in Park Street, Salt Lake, and beyond.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            { 
                                type: 'E-COMMERCE', 
                                title: 'Jewelry Retailer Scale', 
                                desc: 'Increased monthly organic revenue by 400% through aggressive technical SEO and a revamped UX architecture.', 
                                stats: [{ l: 'Traffic Growth', v: '+312%' }, { l: 'Load Speed', v: '0.8s' }],
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz0bbbzawDjIsEkeOMx7QYXFb_bSBxr4vybKeDADRLA8-vXpnnNTim7ApAN2f_9WJBk7yp6_gaMwTReln28pgrNnr3Ij9oAiLTEoDWoQPXrOwvl0WYBJnF2shv5NLZGanw1WHRfs2QGpcMo0Lsp83B3T0KOlQ1euCLIuS3L5g5FeFulKTftUAvdeZL1D7TtPm_zX8vPvUSoFqJjj2teCOJ3cr5W_C8Pxth17-PIFxtROaJbA56YT0Bfay94AZXI9tsMdn1kA8JAbO_"
                            },
                            { 
                                type: 'REAL ESTATE', 
                                title: 'Property Portal UX', 
                                desc: 'Reduced bounce rates by 65% for a luxury Kolkata real estate developer via custom interactive map integration.', 
                                stats: [{ l: 'Leads/Mo', v: '2.4k' }, { l: 'Conversion', v: '+18%' }],
                                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLrKPdD4y6luPLGXxhMyXeF7NloQ86PRRuL0xNCcUpPSquPQJk0ZKcEhinSdLZridjB1HnkdHXzG783C7GU05nNT5pqeVZqfEfvhg2LLsc2kwzdJ_d1ApG8BAqomP80Y1V8bRurbJYt9W5CwW2JMKInFPX1B6A-Ac-xjvi_Vid3XBhOzW7oqonVZy4ZZi0_GT6JLGWLOEg0P8FJBPcuZu8nMIxwnG6V6BzG_dfjSHfgvE9-ZYyxGAChWVuqvls4Cx4K9Nptzwh_uY9"
                            }
                        ].map((study, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900/40 border border-white/5"
                            >
                                <div className="aspect-[16/10] relative overflow-hidden">
                                    <img 
                                        alt={study.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60" 
                                        src={study.img}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                                </div>
                                <div className="p-10 relative -mt-24">
                                    <div className="bg-primary-container text-background inline-block px-4 py-1 rounded-lg mb-6 font-black text-[10px] uppercase tracking-widest">{study.type}</div>
                                    <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-none">{study.title}</h3>
                                    <p className="text-zinc-500 mb-10 font-medium leading-relaxed">{study.desc}</p>
                                    <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                                        {study.stats.map(s => (
                                            <div key={s.l}>
                                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{s.l}</p>
                                                <p className="text-3xl font-black text-primary tracking-tighter">{s.v}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Ticker */}
            <section className="py-24 px-8 bg-background">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12 text-center md:text-left">
                    {[
                        { v: '150+', l: 'Projects Delivered' },
                        { v: '₹12Cr+', l: 'Ad Spend Managed' },
                        { v: '45k', l: 'Daily Active Users' },
                        { v: '12ms', l: 'Avg Response Time' }
                    ].map((s, i) => (
                        <div key={i}>
                            <p className="text-5xl font-black text-white tracking-tighter mb-2">{s.v}</p>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{s.l}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Free SEO Audit Banner */}
            <section className="py-32 px-8">
                <div className="max-w-7xl mx-auto bg-gradient-to-br from-primary-container to-red-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group border border-white/10 shadow-[0_48px_96px_rgba(255,83,91,0.2)]">
                    <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-[0.9]">Your Competitors are Growing. <br/><span className="text-zinc-950/40">Why aren't you?</span></h2>
                        <p className="text-white/80 text-xl md:text-2xl mb-12 font-medium max-w-xl">Get a detailed technical audit of your website—completely free. No strings, just pure value.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-xl" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-2xl px-8 py-5 focus:ring-2 focus:ring-white outline-none backdrop-blur-md transition-all" 
                                placeholder="yourwebsite.com" 
                                type="text"
                            />
                            <button className="bg-white text-primary-container font-black px-12 py-5 rounded-2xl hover:bg-zinc-100 transition-all uppercase tracking-widest text-xs">
                                Analyze Now
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
