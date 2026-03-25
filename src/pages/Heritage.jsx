import React from 'react';
import { motion } from 'framer-motion';

const Heritage = () => {
  return (
    <main className="pb-32 pt-12">
      <header className="relative h-[50vh] flex items-center justify-center overflow-hidden rounded-[3rem] mx-6">
        <div className="absolute inset-0 z-0 text-center">
            <img 
                className="w-full h-full object-cover grayscale brightness-[0.3]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb2Fflt0YbUlwxkvafQkrPBt5k-_P3rxrvLqajd1R_mg4rjFMpm9eOnjnWxZdU7i0GP4rT4UXFNZlhXz93SdTN4oEWTj-1b3m9pcOuZcefEDj4sx9IG0IShy7bywbSSRmcrnsi7BLNJDCBzVTMOmVaH-j-Zxum48avPwsaMu5y0yQh3xWraaOKOVZEbVl77n1B-P_r7B665uqox8zxV1XKUoLFrh7PJpbKPAvNpsmHh0y_vEq01onLZxVu9Psk8hSn-b3Dg-s8dXBF" 
                alt="City"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-black text-white italic font-display relative z-10"
        >
          City of Joy.
        </motion.h1>
      </header>

      <section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
            <h2 className="text-4xl md:text-5xl font-black mb-10 font-headline leading-tight text-white">Software as <br /><span className="text-primary italic font-display">Artistry.</span></h2>
            <p className="text-lg text-zinc-500 font-medium leading-relaxed">Kolkata isn't just our location; it's our source code. We draw inspiration from the city's architectural evolution to create websites that are both timeless and high-performing.</p>
        </div>
        <div className="bg-zinc-950 p-12 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-zinc-700 text-9xl mb-8">temple_hindu</span>
            <p className="text-xl italic font-display text-zinc-400">"Built in the City of Joy, architected for the world."</p>
        </div>
      </section>
    </main>
  );
};

export default Heritage;
