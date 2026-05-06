import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn, getAuditCalendarUrl } from '../lib/utils';
import { Terminal, ArrowUpRight, Shield, Globe, Zap } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn("bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-24", className)}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const MediaRenderer = ({ project, index }) => {
  const commonClasses = cn(
    "w-full h-full object-cover transition-all duration-700 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
  );

  if (project.textHero) {
    return (
      <div className="w-full h-full bg-red-500/5 flex items-center justify-center transition-all duration-700 border border-red-500/10 group-hover:bg-red-500/10">
        <h2 className="text-5xl md:text-[6rem] lg:text-[8rem] font-instrument text-white/40 tracking-tighter group-hover:text-white transition-all duration-700 group-hover:scale-110 drop-shadow-2xl">
          {project.textHero}
        </h2>
      </div>
    );
  }

  if (project.image) {
    return (
      <img src={project.image} alt={project.title} className={commonClasses} />
    );
  }

  return (
    <video autoPlay loop muted playsInline preload="metadata" className={commonClasses}>
      <source src={project.video} type="video/mp4" />
    </video>
  );
};

const GlassCard = ({ children, className }) => (
  <div className={cn("liquid-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 h-full aura-card border border-white/5 hover:border-red-500/50 hover:bg-black/60 hover:backdrop-blur-2xl transition-all duration-700", className)}>
    {children}
  </div>
);

const CaseStudies = () => {
    const projects = [
        { 
            title: "Maatritva IVF", 
            cat: "Healthcare Scale", 
            stats: "#1 Regional", 
            icon: Globe,
            image: "/Maatritva.webp",
            link: '/case-studies/maatritva'
        },
        { 
            title: "Metropolitan Scale", 
            cat: "Infrastructure", 
            stats: "400% Growth", 
            icon: Globe,
            image: '/case-studies/metropolitan.webp'
        },
        { 
            title: "Bespoke Commerce", 
            cat: "Digital Systems", 
            stats: "98% Efficiency", 
            icon: Zap,
            image: '/case-studies/commerce.webp'
        },
        { 
            title: "Legacy Migration", 
            cat: "Engineering", 
            stats: "99% Uptime", 
            icon: Shield,
            image: '/case-studies/migration.webp'
        }
    ];

  return (
    <main className="bg-black pt-20">
      <SEO
        title="Case Studies | Tag Easy"
        description="See Tag Easy case studies showing digital growth, SEO, Ads Hub performance, and engineering results for client brands."
      />
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none z-50 mix-blend-overlay" />
      
      <header className="pt-16 md:pt-24 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <span className="text-red-500 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-8">Our Portfolio</span>
            <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument leading-[0.8] mb-12">
                Architectural <br />
                <span className="text-white/20">Victories</span>
            </h1>
            <p className="text-white/40 text-2xl max-w-2xl mx-auto font-light leading-relaxed hover:text-white/80 transition-colors duration-500">
                Stories of performance, resilience, and digital dominance delivered for global brands.
            </p>
        </motion.div>
      </header>

      <SectionContainer className="pt-0">
        {(() => {
          const FeaturedIcon = projects[0].icon;
          return (
            <>
              {/* Featured Project */}
              <div className="mb-16">
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
          >
            <Link to={projects[0].link} className="block h-full cursor-pointer">
              <GlassCard className="group flex flex-col md:flex-row !p-0 overflow-hidden border-red-500/20 hover:border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                <div className="w-full md:w-3/5 lg:w-2/3 aspect-[16/10] md:aspect-auto relative overflow-hidden pointer-events-none border-b md:border-b-0 md:border-r border-white/5">
                <MediaRenderer project={projects[0]} index={0} />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black via-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="p-10 md:p-16 flex-1 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:text-red-500/10 transition-colors duration-1000">
                  <FeaturedIcon className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] block mb-6">{projects[0].cat} &bull; FULL PROTOCOL</span>
                    <h3 className="text-5xl md:text-7xl text-white font-instrument mb-6 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">{projects[0].title}</h3>
                    <p className="text-white/40 text-lg md:text-xl font-light mb-12">Want results like them on your domain? Why not. Discover how we scaled them to become the most successful in Kolkata.</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 mt-10 md:mt-auto relative z-10">
                    <span className="text-white text-4xl md:text-5xl font-instrument italic tracking-tighter group-hover:text-red-500 transition-colors uppercase shrink-0">{projects[0].stats}</span>
                    <Button variant="primary" className="!px-6 !py-4 text-[10px] tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 w-full sm:w-auto shrink-0 justify-center">
                        READ PROTOCOL <ArrowUpRight className="w-4 h-4 ml-2 inline" />
                    </Button>
                </div>
              </div>
              </GlassCard>
            </Link>
          </motion.div>
        </div>

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.slice(1).map((p, i) => {
            const CardContent = (
              <GlassCard className="group flex flex-col justify-between !p-0 overflow-hidden">
                <div className="aspect-[16/10] relative overflow-hidden pointer-events-none border-b border-white/5">
                <MediaRenderer project={p} index={i + 1} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="p-10 flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-white/30 text-[10px] uppercase font-semibold tracking-[0.4em] block mb-6">{p.cat}</span>
                    <h3 className="text-3xl lg:text-4xl text-white font-instrument mb-8 group-hover:translate-x-2 transition-transform duration-500">{p.title}</h3>
                </div>
                <div className="flex justify-between items-center mt-10">
                    <span className="text-white/80 text-2xl lg:text-3xl font-instrument italic tracking-tighter group-hover:text-red-500 transition-colors uppercase">{p.stats}</span>
                </div>
              </div>
              </GlassCard>
            );

            return (
              <motion.div 
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
              >
                {p.link ? (
                  <Link to={p.link} className="block h-full cursor-pointer">
                    {CardContent}
                  </Link>
                ) : (
                  <div className="h-full cursor-default">
                    {CardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
            </>
          );
        })()}
      </SectionContainer>

      <SectionContainer className="pt-0 pb-24">
        <div className="liquid-glass rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center relative group overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-1000">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <h2 className="text-4xl md:text-7xl text-white tracking-tighter font-instrument mb-12">
            Build your <span className="text-white/20">legacy</span>
          </h2>
          <Button 
            variant="primary" 
            className="px-16 py-6 text-xs tracking-[0.2em]"
            onClick={() => window.open(getAuditCalendarUrl(), '_blank')}
          >
            START EXPLORATION
          </Button>
        </div>
      </SectionContainer>
    </main>
  );
};

export default CaseStudies;
