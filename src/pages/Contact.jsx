import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

  return (
    <main className="pb-32 px-6 pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 py-32 items-center">
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
            <motion.span variants={itemVariants} className="font-label text-primary tracking-[0.4em] text-[9px] uppercase font-bold block mb-6">Contact Architecture</motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-10 tracking-tight">Ready to <br /><span className="text-primary italic font-display">Manifest?</span></motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-zinc-500 font-medium leading-relaxed mb-12 max-w-md">Set the foundation for your project's digital scale with Kolkata's premier engineers.</motion.p>
            
            <div className="space-y-10">
                <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-xl text-zinc-500 group-hover:text-primary">mail</span>
                    </div>
                    <div>
                        <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Email</div>
                        <div className="text-white font-medium">hello@tageasy.in</div>
                    </div>
                </div>
                <div className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-xl text-zinc-500 group-hover:text-primary">call</span>
                    </div>
                    <div>
                        <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Phone</div>
                        <div className="text-white font-medium">+91 033 400X XXXX</div>
                    </div>
                </div>
            </div>
        </motion.div>

        <div className="bg-zinc-950/50 p-12 rounded-[3rem] border border-white/[0.03] backdrop-blur-2xl shadow-3xl">
            <h3 className="text-2xl font-bold text-white mb-10 tracking-tight">Project Inquiry</h3>
            <form className="space-y-8">
                <div className="relative group">
                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-primary transition-all font-medium placeholder:text-zinc-700" placeholder="Full Name"/>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
                </div>
                <div className="relative group">
                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-primary transition-all font-medium placeholder:text-zinc-700" placeholder="Business Email"/>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
                </div>
                <div className="relative group">
                    <textarea className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-primary transition-all font-medium placeholder:text-zinc-700 h-32 resize-none" placeholder="Tell us about your structural needs..."></textarea>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within:w-full transition-all duration-500"></div>
                </div>
                <button className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all shadow-xl">
                    Submit Brief
                </button>
            </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
