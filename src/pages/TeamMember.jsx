import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageSquare, 
  Share2,
  ArrowLeft,
  Mail
} from 'lucide-react';
import { teamMembers } from '../lib/teamData';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { buildPersonSchema, buildBreadcrumbSchema } from '../lib/seoSchema';
import { trackProfileLinkClick } from '../lib/analytics';

const TeamMember = () => {
  const { slug } = useParams();
  const member = teamMembers.find(m => m.slug === slug);

  if (!member || member.hidden) {
    return <Navigate to="/404" replace />;
  }

  const memberSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(member),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: member.name, path: `/team/${member.slug}` },
      ]),
    ],
  };

  const socialIcons = [
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { key: 'github', icon: Github, label: 'GitHub' },
    { key: 'facebook', icon: Facebook, label: 'Facebook' },
    { key: 'instagram', icon: Instagram, label: 'Instagram' },
    { key: 'youtube', icon: Youtube, label: 'YouTube' },
    { key: 'reddit', icon: MessageSquare, label: 'Reddit' },
    { key: 'quora', icon: Share2, label: 'Quora' },
    { key: 'email', icon: Mail, label: 'Email' },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-8 bg-black relative overflow-hidden">
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <SEO
        title={`${member.name} | ${member.role} at Tag Easy`}
        description={member.bio}
        path={`/team/${member.slug}`}
        image={`https://tageasy.org${member.image}`}
        type="profile"
        schemaData={memberSchema}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: member.name, path: `/team/${member.slug}` },
          ]}
          className="!px-0 mb-8"
        />

        <Link
          to="/about"
          className="inline-flex items-center gap-3 text-white/50 hover:text-red-500 transition-colors mb-12 group uppercase text-[10px] font-bold tracking-[0.25em]"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative group"
          >
            {/* Glowing card border aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-red-500/15 to-purple-500/15 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-300" />
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative liquid-glass">
              <img
                src={member.image}
                alt={`${member.name}, ${member.role} at Tag Easy`}
                width="640"
                height="800"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale brightness-[0.75] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center h-full pt-4 md:pt-10"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Team Member
            </div>
            
            <h1 className="text-5xl md:text-8xl text-white tracking-tighter font-instrument mb-4 leading-none italic">
              {member.name}
            </h1>
            <p className="text-lg md:text-xl font-light text-red-500 uppercase tracking-[0.2em] mb-10">
              {member.role}
            </p>
            
            <div className="max-w-xl mb-16">
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Custom Vertical Timelines */}
            {member.experience && (
              <div className="mb-14 max-w-xl">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-8 flex items-center gap-4">
                  Experience
                  <span className="h-px flex-1 bg-white/10" />
                </h3>
                <div className="relative border-l border-white/10 pl-6 space-y-8 ml-2">
                  {member.experience.map((exp, idx) => (
                    <div key={idx} className="group/item relative pl-6 pb-2 last:pb-0">
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] top-[6px] flex items-center justify-center">
                        <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-500/20 group-hover/item:bg-red-500/40 animate-ping opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-black transition-colors group-hover/item:bg-red-400" />
                      </div>
                      <h4 className="text-xl font-medium text-white group-hover/item:text-red-500 transition-colors duration-300">
                        {exp.title}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1.5 text-sm">
                        <span className="text-white/75">{exp.company}</span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{exp.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {member.education && (
              <div className="mb-16 max-w-xl">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-8 flex items-center gap-4">
                  Education
                  <span className="h-px flex-1 bg-white/10" />
                </h3>
                <div className="relative border-l border-white/10 pl-6 space-y-8 ml-2">
                  {member.education.map((edu, idx) => (
                    <div key={idx} className="group/item relative pl-6 pb-2 last:pb-0">
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] top-[6px] flex items-center justify-center">
                        <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-500/20 group-hover/item:bg-red-500/40 animate-ping opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-black transition-colors group-hover/item:bg-red-400" />
                      </div>
                      <h4 className="text-xl font-medium text-white group-hover/item:text-red-500 transition-colors duration-300">
                        {edu.degree}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 mt-1.5 text-sm">
                        <span className="text-white/75">{edu.institution}</span>
                        <span className="hidden sm:inline text-white/20">•</span>
                        <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{edu.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {socialIcons.map((social) => {
                const Icon = social.icon;
                const href = member.socials[social.key];
                
                if (!href || href === '' || href === '#') return null;

                return (
                  <motion.a
                    key={social.key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProfileLinkClick(social.key)}
                    whileHover={{ scale: 1.08, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-white/5 rounded-full border border-white/5 text-white/40 hover:text-red-500 hover:border-red-500/30 transition-all duration-300 shadow-xl"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default TeamMember;
