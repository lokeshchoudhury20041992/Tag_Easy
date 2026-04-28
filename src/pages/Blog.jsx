import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import { blogData } from '../lib/blogData';

const POSTS_PER_PAGE = 12;

const Blog = () => {
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setDisplayedPosts(blogData.slice(0, page * POSTS_PER_PAGE));
  }, [page]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(p => p + 1);
      setLoading(false);
    }, 600); // Simulate network delay for smooth experience
  };

  const hasMore = displayedPosts.length < blogData.length;

  return (
    <main className="bg-black min-h-screen pt-32 pb-24 px-4 md:px-6">
      <SEO 
        title="Engineering Journal | Tag Easy" 
        description="Insights, architectural blueprints, and strategies for building high-performance digital ecosystems."
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-red-500 text-[10px] uppercase font-bold tracking-[0.4em] block mb-6">
              Insights & Engineering
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-[8rem] text-white tracking-tighter font-instrument mb-8 leading-[0.85]">
              The <span className="text-white/20 italic">Journal</span>
            </h1>
            <p className="text-white/40 text-xl font-light max-w-2xl leading-relaxed">
              Explore our latest thoughts on digital ecosystems, performance engineering, and the future of AI automation.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-16">
          {displayedPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (i % POSTS_PER_PAGE) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer liquid-glass rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-700 h-full flex flex-col"
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
                  <h3 className="text-2xl md:text-3xl text-white font-instrument mb-4 tracking-tight leading-snug group-hover:text-red-500 transition-colors duration-500">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors duration-500 mt-auto line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Pagination / Load More */}
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-20"
          >
            <Button 
              variant="secondary" 
              onClick={handleLoadMore}
              className="px-12 py-5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  LOADING...
                </span>
              ) : (
                "LOAD MORE ARTICLES"
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Blog;
