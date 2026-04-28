import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { blogData } from '../lib/blogData';
import Button from './Button';

const BlogSection = () => {
  // Take exactly 3 posts
  const recentPosts = blogData.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-6">Our Journal</span>
            <h2 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-none">
              Engineering <span className="text-white/20 italic">Insights</span>
            </h2>
          </div>
          <p className="text-white/30 text-lg font-light max-w-md">
            Architectural blueprints, performance optimization strategies, and the psychology behind high-converting digital ecosystems.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {recentPosts.map((post) => (
            <motion.article 
              key={post.id} 
              variants={itemVariants}
              className="group cursor-pointer liquid-glass rounded-[2rem] overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-700 h-full flex flex-col"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-6 right-6 z-20">
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 md:p-10 flex-1 flex flex-col relative z-20 bg-black/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest text-white/40">
                    <span className="text-red-500/80">{post.date}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span>5 Min Read</span>
                  </div>
                  <h3 className="text-2xl text-white font-instrument mb-4 tracking-tight leading-snug group-hover:text-red-500 transition-colors duration-500">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors duration-500 mt-auto">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <Link to="/blog">
            <Button variant="secondary" className="px-10 py-5 text-xs tracking-widest gap-3 group">
              VIEW ALL ARTICLES <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
