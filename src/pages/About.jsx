import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <main className="pb-32 pt-12">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden rounded-[3rem] mx-6">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale brightness-[0.3]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6q46c5FiTvmpc5feKe9L_ruwe0URoXQnZK-Upu3czEOFmmBd1Gbd1ftNgGn8Pj11g3_lpx9S3SzSkEMC_W_daEmnQi23XUKtqFMBdeB1UuFYJ8XQVstElOXRIIrPQsS4IhLE3PIzWbl6R6YfCaCG4FxwWDrxYGZVhNvLnPZtXkqu7ZhPZoIh4dB01Ke-u-euoQf74vxXKmMvLqMtn_xcxK4SU3YquWXV99YELHh9XyaBjAelI4CnE0Zarhi-gBfzeepIkiNu9IVUY" 
            alt="HQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <span className="font-label text-primary tracking-[0.4em] uppercase text-[10px] mb-6 block font-black">Our Philosophy</span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white italic">Beyond Code.</h1>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-5xl font-black mb-10 font-headline leading-tight text-white">The Architecture of <br /><span className="text-primary italic font-display">Resilience.</span></h2>
            <div className="space-y-8 text-lg text-zinc-400 leading-relaxed font-medium">
              <p>Tag Easy wasn't built in a Silicon Valley garage. It was forged in the heat and heritage of Kolkata. We believe that software isn't just a utility—it's infrastructure that should last.</p>
              <p>Like the Victoria Memorial stands as a testament to craftsmanship, our digital products stand as benchmarks of performance and aesthetic excellence.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12 text-center">
               <div className="p-8 rounded-2xl bg-zinc-950 border border-white/5">
                 <div className="text-3xl font-black text-primary mb-1 font-display">10+</div>
                 <div className="text-[10px] font-label text-zinc-600 uppercase tracking-widest font-black">Years</div>
               </div>
               <div className="p-8 rounded-2xl bg-zinc-950 border border-white/5">
                 <div className="text-3xl font-black text-primary mb-1 font-display">50+</div>
                 <div className="text-[10px] font-label text-zinc-600 uppercase tracking-widest font-black">Architects</div>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-primary p-10 rounded-[2rem] text-background">
              <p className="text-2xl font-display italic font-black leading-tight mb-6">"In Kolkata, we don't just build for today. We build for the soul."</p>
              <p className="font-label text-[10px] uppercase tracking-widest font-black opacity-60">— S. Mishra, Founder</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
