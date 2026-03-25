import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="py-24 px-8 max-w-7xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-[12rem] md:text-[20rem] font-black mb-8 font-display italic text-primary/10 absolute pointer-events-none"
      >
        404
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-8 font-headline">Lost in the Archive.</h2>
        <p className="text-zinc-500 max-w-md mx-auto mb-12 text-lg font-medium">
          The architectural record you are looking for has been moved or doesn't exist in our current digital infrastructure.
        </p>
        <Link to="/" className="inline-block bg-primary text-background px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
          Return to Foundation
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
