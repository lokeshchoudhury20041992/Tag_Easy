// Task — Author profile detail page (/authors/<slug>).
// Indexable E-E-A-T page for verified authors only (INDEXABLE_AUTHOR_SLUGS).
// Shows bio, role, expertise, articles written, services contributed to,
// sameAs links, and Person + Breadcrumb schema tied to the Organization.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFound from './NotFound';
import { authors, isIndexableAuthor } from '../lib/authors';
import { getApprovedPosts } from '../lib/blogData';
import { getServiceDetail } from '../lib/servicesData';
import { organizationSchema, buildAuthorSchema } from '../lib/seoSchema';

const SectionContainer = ({ children, className }) => (
  <section className={cn('bg-black relative overflow-hidden px-4 md:px-6 py-10 md:py-14', className)}>
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
);

// Map an author's stated expertise to the service pages they contribute to.
const EXPERTISE_TO_SERVICE = {
  SEO: 'seo',
  'Technical SEO': 'technical-seo',
  'Local SEO': 'local-seo',
  'Google Business Profile': 'google-business-profile-optimization',
  'AI Automation': 'ai-automation',
  'Lead Generation': 'analytics-tracking',
  'Digital Strategy': 'seo',
  'Software Engineering': 'website-development',
};

const AuthorProfile = () => {
  const { slug } = useParams();
  const author = authors[slug];

  // Only verified, indexable authors get a public profile page.
  if (!author || !isIndexableAuthor(slug)) return <NotFound />;

  const path = `/authors/${slug}`;
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: author.name, path },
  ];

  const articles = getApprovedPosts().filter((p) => p.authorId === slug);

  const serviceSlugs = [
    ...new Set((author.expertise || []).map((e) => EXPERTISE_TO_SERVICE[e]).filter(Boolean)),
  ];
  const services = serviceSlugs.map(getServiceDetail).filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, ...buildAuthorSchema(author, breadcrumbItems)['@graph']],
  };

  return (
    <main className="bg-black relative min-h-screen pt-24 md:pt-28">
      <SEO
        title={`${author.name} — ${author.role} | Tag Easy`}
        description={`${author.name} — ${author.role} at Tag Easy, specialising in ${(author.expertise || []).slice(0, 3).join(', ')}.`}
        path={path}
        image={`https://tageasy.org${author.image}`}
        type="profile"
        schemaData={schema}
      />

      <Breadcrumbs items={breadcrumbItems} className="pt-4 pb-2" />

      <SectionContainer className="pt-6">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-white/50 hover:text-red-500 transition-colors mb-10 group uppercase text-[10px] font-bold tracking-[0.25em]"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> About Tag Easy
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-1">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 liquid-glass">
              <img
                src={author.image}
                alt={`${author.name}, ${author.role} at Tag Easy`}
                width="480"
                height="600"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover grayscale brightness-90"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-2">
            <span className="text-red-500 text-[10px] uppercase font-semibold tracking-[0.4em] mb-5 block">Author</span>
            <h1 className="text-4xl md:text-6xl text-white tracking-tighter font-instrument leading-[0.95] mb-4">{author.name}</h1>
            <p className="text-red-500 text-sm uppercase tracking-[0.2em] font-bold mb-8">{author.role} · Tag Easy</p>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-8">{author.bio}</p>

            {author.expertise && author.expertise.length > 0 && (
              <div className="mb-8">
                <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] block mb-3">Expertise</span>
                <div className="flex flex-wrap gap-2">
                  {author.expertise.map((e) => (
                    <span key={e} className="text-white/60 text-[11px] border border-white/10 rounded-full px-3 py-1">{e}</span>
                  ))}
                </div>
              </div>
            )}

            {author.sameAs && author.sameAs.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {author.sameAs.map((href) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-red-500 text-[11px] uppercase tracking-widest font-bold transition-colors flex items-center gap-1"
                  >
                    {href.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]} <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </SectionContainer>

      {/* Articles written */}
      {articles.length > 0 && (
        <SectionContainer>
          <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-none mb-10">
            Articles by {author.name.split(' ')[0]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="liquid-glass rounded-[2rem] p-8 border border-white/5 hover:border-red-500/40 transition-all duration-500 group"
              >
                <div className="flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest text-white/40">
                  <span className="text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">{post.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.displayDate}</span>
                </div>
                <h3 className="text-white text-xl font-instrument tracking-tight mb-3 group-hover:translate-x-1 transition-transform">{post.title}</h3>
                <p className="text-white/40 text-sm font-light line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Services contributed to */}
      {services.length > 0 && (
        <SectionContainer className="pb-24">
          <h2 className="text-3xl md:text-5xl text-white tracking-tighter font-instrument leading-none mb-10">
            Services {author.name.split(' ')[0]} contributes to
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                className="liquid-glass rounded-[2rem] p-8 border border-white/5 hover:border-red-500/40 transition-all duration-500 group"
              >
                <h3 className="text-white text-xl font-instrument tracking-tight mb-3 group-hover:translate-x-1 transition-transform">{svc.h1.replace(/ —.*$/, '')}</h3>
                <p className="text-white/40 text-sm font-light mb-4">{svc.tagline}</p>
                <span className="text-red-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">Learn more <ArrowUpRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </SectionContainer>
      )}
    </main>
  );
};

export default AuthorProfile;
