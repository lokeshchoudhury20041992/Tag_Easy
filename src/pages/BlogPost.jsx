import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { blogData } from '../lib/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundPost = blogData.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/not-found'); // Or simply show a 404 state
    }
  }, [slug, navigate]);

  if (!post) {
    return <div className="min-h-screen bg-black" />; // Loading state
  }

  return (
    <main className="bg-black min-h-screen pb-32">
      <SEO 
        title={`${post.title} | Tag Easy Journal`}
        description={post.excerpt}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6 min-h-[60vh] flex flex-col justify-center overflow-hidden">
        {/* Background Image with Parallax & Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-20 w-full mt-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 hover:text-white mb-10 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft className="w-3 h-3" />
            </div>
            Back to Journal
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                {post.category}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-2">
                <Clock className="w-3 h-3" /> 5 Min Read
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter font-instrument mb-6 leading-[1.1]">
              {post.title}
            </h1>
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl border-l border-red-500/30 pl-4">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 md:px-6 relative z-20 -mt-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6 border-y border-white/5 mb-12 text-[10px] uppercase tracking-widest text-white/30 font-semibold">
            <span>Published on {post.date}</span>
            <span>By Tag Easy Engineering</span>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-12"
          >
            {post.content && post.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className="text-3xl md:text-4xl text-white font-instrument tracking-tight mt-16 mb-8">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'image') {
                return (
                  <div key={index} className="my-16">
                    <div className="liquid-glass rounded-[2rem] p-2 border border-white/5">
                      <img 
                        src={block.url} 
                        alt={block.alt} 
                        className="w-full h-auto rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[21/9]"
                      />
                    </div>
                    {block.alt && (
                      <p className="text-center text-[10px] uppercase tracking-widest text-white/30 mt-4">
                        {block.alt}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
