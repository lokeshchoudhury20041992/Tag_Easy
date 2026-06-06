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

  if (!member) {
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
    <main className="min-h-screen pt-32 pb-24 px-8 bg-background">
      <SEO
        title={`${member.name} | ${member.role} at Tag Easy`}
        description={member.bio}
        path={`/team/${member.slug}`}
        image={`https://tageasy.org${member.image}`}
        type="profile"
        schemaData={memberSchema}
      />
      <div className="max-w-7xl mx-auto">
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
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-12 group uppercase text-[10px] font-bold tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Team
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src={member.image}
                alt={`${member.name}, ${member.role} at Tag Easy`}
                width="640"
                height="800"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 flex flex-col justify-center h-full pt-10"
          >
            <div className="inline-block mb-6 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-[10px] font-bold uppercase tracking-[0.4em]">
              The Team
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4 leading-none uppercase">
              {member.name}
            </h1>
            <p className="text-xl font-display italic text-primary-container mb-12 tracking-wide">
              {member.role}
            </p>
            
            <div className="max-w-xl space-y-8 mb-16">
              <p className="text-zinc-400 text-lg leading-relaxed font-label">
                {member.bio}
              </p>
            </div>

            {member.experience && (
              <div className="mb-12 max-w-xl">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-[14px]">Experience</h3>
                <ul className="space-y-6">
                  {member.experience.map((exp, idx) => (
                    <li key={idx} className="text-zinc-400 font-label border-l-2 border-white/10 pl-4 py-1">
                      <strong className="text-zinc-200 text-lg block mb-1">{exp.title}</strong>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="text-primary font-medium">{exp.company}</span>
                        <span className="hidden sm:inline text-zinc-600">•</span>
                        <span className="text-zinc-500 text-sm uppercase tracking-wide">{exp.period}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {member.education && (
              <div className="mb-16 max-w-xl">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-[14px]">Education</h3>
                <ul className="space-y-6">
                  {member.education.map((edu, idx) => (
                    <li key={idx} className="text-zinc-400 font-label border-l-2 border-white/10 pl-4 py-1">
                      <strong className="text-zinc-200 text-lg block mb-1">{edu.degree}</strong>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                        <span className="text-primary-container font-medium">{edu.institution}</span>
                        <span className="hidden sm:inline text-zinc-600 mt-0.5">•</span>
                        <span className="text-zinc-500 text-sm uppercase tracking-wide mt-0.5">{edu.period}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {socialIcons.map((social) => {
                const Icon = social.icon;
                const href = member.socials[social.key];
                
                if (!href || href === '') return null;

                return (
                  <motion.a
                    key={social.key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProfileLinkClick(social.key)}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 83, 91, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="p-5 bg-white/5 rounded-2xl border border-white/5 text-zinc-400 hover:text-primary hover:border-primary/20 transition-all shadow-xl"
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
