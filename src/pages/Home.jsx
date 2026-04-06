import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Globe, Instagram, Twitter, ArrowUpRight, 
  Phone, Server, Cpu, Zap, BarChart3, Clock, 
  ShieldCheck, LayoutDashboard, Monitor
} from 'lucide-react';
import { cn } from '../lib/utils';
import TeamSection from '../components/TeamSection';

// --- Sub-components ---

const SectionContainer = ({ children, className, id }) => (
  <section id={id} className={cn("bg-black relative overflow-hidden px-4 md:px-6 py-16 md:py-32", className)}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className }) => (
  <div className={cn("liquid-glass rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 h-full transition-all duration-500 hover:bg-white/[0.03]", className)}>
    {children}
  </div>
);

// --- Brand Marquee ---

const BrandMarquee = () => {
  const items = [
    "ADAMSALVE", "AI AUTOMATION", "TECHNICAL SEO", 
    "SCALABLE SYSTEMS", "PERFORMANCE ENGINEERING", "ADAMSALVE", 
    "AI AUTOMATION", "TECHNICAL SEO", "SCALABLE SYSTEMS"
  ];
  
  return (
    <div className="bg-black py-12 border-y border-white/5 overflow-hidden">
      <div className="brand-marquee">
        <div className="brand-marquee-content">
          {items.map((item, i) => (
            <span key={i} className="text-white/20 text-4xl md:text-6xl font-instrument italic tracking-tighter whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
        <div className="brand-marquee-content" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i} className="text-white/20 text-4xl md:text-6xl font-instrument italic tracking-tighter whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Hero ---

const Hero = () => {
  const videoRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const fadeDuration = 500;

  const animateOpacity = (start, end, duration, callback) => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentOpacity = start + (end - start) * progress;
      setVideoOpacity(currentOpacity);
      if (progress < 1) requestAnimationFrame(animate);
      else if (callback) callback();
    };
    requestAnimationFrame(animate);
  };

  const handleCanPlay = () => {
    videoRef.current?.play();
    animateOpacity(0, 1, fadeDuration);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const remainingTime = videoRef.current.duration - videoRef.current.currentTime;
    if (remainingTime <= 0.55 && videoOpacity === 1) {
      animateOpacity(1, 0, fadeDuration);
    }
  };

  const handleEnded = () => {
    if (!videoRef.current) return;
    setVideoOpacity(0);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        animateOpacity(0, 1, fadeDuration);
      }
    }, 100);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-black">
      <video
        ref={videoRef}
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        muted autoPlay playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: videoOpacity }}
      >
        <source src="/Hero Section Tag easy-ezremove.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/45 z-[1] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-6 pt-28 md:pt-44 pb-12 text-center -translate-y-[10%]">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-8xl lg:text-9xl text-white tracking-tight font-instrument mb-8 md:mb-12 drop-shadow-2xl"
        >
          Know it then <em className="italic">all</em>.
        </motion.h1>

        <div className="max-w-xl w-full mb-8">
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent flex-1 text-white placeholder:text-white/40 outline-none text-sm"
            />
            <button className="bg-white rounded-full p-3 text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-white/80 text-sm leading-relaxed max-w-md mb-10 px-4 drop-shadow-md">
          Stay updated with the latest news and insights from Tag Easy. Subscribe to our newsletter today and never miss out on exciting updates.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2 group">
            <Phone className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            Get a call
          </button>
          <a href="https://adamsalve.com" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2">
            Try Adamsalve
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[Instagram, Twitter, Globe].map((Icon, i) => (
          <button key={i} className="liquid-glass rounded-full p-4 text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </section>
  );
};

// --- Adamsalve Discovery Mockup ---

const AdamsalveMockup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionContainer className="bg-black pt-32 md:pt-48 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/40 text-xs tracking-[0.3em] uppercase block mb-4">Flagship Platform</span>
            <h2 className="text-5xl md:text-7xl text-white tracking-tight font-instrument mb-8 leading-[1.1]">
              The Intelligent <br /><span className="italic text-white/60">Core</span> of Your Business.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Adamsalve isn't just an assistant; it's an infrastructure overhaul. Automate complex workflows, gain deep data insights, and scale without friction.
            </p>
            <a href="https://adamsalve.com" className="liquid-glass rounded-full px-10 py-4 text-white text-sm font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-3">
              Launch Adamsalve Discovery
              <LayoutDashboard className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          {/* Browser Mockup */}
          <div className="liquid-glass rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5 aspect-[16/10] flex flex-col">
            {/* Browser Top Bar */}
            <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              </div>
              <div className="bg-white/5 rounded-md flex-1 text-[10px] text-white/20 py-1 px-4 font-mono truncate">
                adamsalve.com/dashboard/analytics
              </div>
            </div>
            
            {/* Dashboard Content Mockup */}
            <div className="flex-1 flex overflow-hidden">
              <div className="w-16 md:w-24 bg-white/[0.02] border-r border-white/5 pt-6 flex flex-col items-center gap-6">
                {[LayoutDashboard, BarChart3, Clock, Zap, ShieldCheck].map((Icon, i) => (
                  <Icon key={i} className={cn("w-5 h-5", i === 0 ? "text-white" : "text-white/20")} />
                ))}
              </div>
              <div className="flex-1 p-6 space-y-6 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-32 h-6 bg-white/10 rounded-md animate-pulse" />
                  <div className="w-16 h-8 bg-white/5 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white/[0.03] rounded-xl p-4 h-24 flex flex-col justify-between border border-white/5">
                      <div className="w-8 h-2 bg-white/10 rounded" />
                      <div className="w-16 h-4 bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
                <div className="bg-white/[0.03] rounded-2xl p-6 flex-1 h-32 relative border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute bottom-12 left-6 right-6 h-1 w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  />
                  <div className="w-48 h-4 bg-white/10 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-white/5 rounded" />
                    <div className="w-3/4 h-2 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

// --- Progressive Stats Bento ---

const StatsBento = () => {
  const stats = [
    { label: "Efficiency Boost", val: "85%", desc: "Automated business workflows.", size: "lg", icon: Zap },
    { label: "Cost Reduction", val: "40%", desc: "Lowered operational overhead.", size: "sm", icon: ShieldCheck },
    { label: "Daily Active Users", val: "45k", desc: "Scaling across global platforms.", size: "sm", icon: Globe },
    { label: "Engineering Heritage", val: "10Y+", desc: "A decade of performance focus.", size: "md", icon: Clock },
  ];

  return (
    <SectionContainer className="pt-0 pb-20 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "group relative",
              s.size === "lg" ? "md:col-span-2 md:row-span-2" : "",
              s.size === "md" ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"
            )}
          >
            <GlassCard className="flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <s.icon className="w-12 h-12 text-white/5" />
              </div>
              <div>
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase block mb-4">{s.label}</span>
                <p className={cn("text-white tracking-tighter font-instrument mb-4", s.size === "lg" ? "text-5xl md:text-8xl" : "text-3xl md:text-5xl")}>
                  {s.val}
                </p>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-[200px]">
                {s.desc}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

// --- About ---

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase block mb-8"
        >
          About Us
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight font-instrument"
        >
          <span className="text-white/60 italic">Pioneering then ideas</span> for<br className="hidden md:block" />
          <span className="text-white/60 italic">minds that then create, build, and inspire.</span>
        </motion.h2>

        <div className="mt-16 max-w-2xl">
          <p className="text-white/50 text-lg leading-relaxed">
            Tag Easy is the architectural foundation for the brands of tomorrow. We specialize in building scalable digital systems where performance, SEO, and growth are baked into the core.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- Bento Services ---

const BentoServices = () => {
  const services = [
    { tag: "Strategy", title: "Technical SEO & Scale", icon: Monitor, desc: "We dig deep into data, culture, and human behavior to surface the insights that drive organic dominance.", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", videoType: "youtube" },
    { tag: "Craft", title: "Web Engineering", icon: Cpu, desc: "From concept to launch, we obsess over every line of code to deliver experiences that feel effortless.", video: "https://player.vimeo.com/video/76979871", videoType: "vimeo" },
    { tag: "Intelligence", title: "AI Integration", icon: BarChart3, desc: "Automate your logic with modular AI systems built for real-world business impact.", video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4", videoType: "direct" }
  ];

  const VideoRenderer = ({ service }) => {
    if (service.videoType === 'youtube') {
      const videoId = service.video.split('/').pop().split('?')[0];
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`}
          className="w-full h-full object-cover scale-[1.5] grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 pointer-events-none"
          allow="autoplay; encrypted-media"
          title={service.title}
        />
      );
    }
    if (service.videoType === 'vimeo') {
      const videoId = service.video.split('/').pop();
      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&background=1&loop=1`}
          className="w-full h-full object-cover scale-[1.5] grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 pointer-events-none"
          allow="autoplay; fullscreen"
          title={service.title}
        />
      );
    }
    return (
      <video autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
        <source src={service.video} type="video/mp4" />
      </video>
    );
  };

  return (
    <SectionContainer id="services" className="pb-40">
      <div className="flex justify-between items-end mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl text-white tracking-tight">Technical Prowess</h2>
        <span className="text-white/40 text-sm hidden md:block">The Tag Easy Stack</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard className="group overflow-hidden !p-0">
              <div className="aspect-[16/10] relative overflow-hidden pointer-events-none">
                <VideoRenderer service={s} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">{s.tag}</span>
                  <s.icon className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl text-white font-instrument mb-4 tracking-tight group-hover:italic transition-all">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

// --- Final Interactive CTA ---

const InteractiveCTA = () => {
  return (
    <SectionContainer className="pb-24 md:pb-40">
      <div className="liquid-glass rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 text-center relative group overflow-hidden border border-white/10">
        {/* Animated Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-8xl text-white tracking-tight font-instrument mb-8 md:mb-10 leading-none"
          >
            Next wave <br /><span className="italic text-white/40">engineered.</span>
          </motion.h2>
          <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Whether you need a scalable digital ecosystem or our flagship Adamsalve assistant, we are ready to build the future of your brand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-black rounded-full px-12 py-5 text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Analyze My Brand
            </button>
            <a href="https://adamsalve.com" className="liquid-glass rounded-full px-12 py-5 text-white text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Try Adamsalve
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

// --- Main Home Page ---

const Home = () => {
  return (
    <main className="bg-black relative">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-50 mix-blend-overlay" />
      <Hero />
      <BrandMarquee />
      <AboutSection />
      <AdamsalveMockup />
      <StatsBento />
      <BentoServices />
      <TeamSection />
      <InteractiveCTA />
    </main>
  );
};

export default Home;
