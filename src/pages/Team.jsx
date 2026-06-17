import React from 'react';
import { teamMembers } from '../lib/teamData';
import SEO from '../components/SEO';

const Team = () => {
  return (
    <main className="min-h-screen bg-black px-6 py-32 md:px-8">
      <SEO
        title="Team | Tag Easy"
        description="Meet the people behind Tag Easy."
        path="/team"
      />
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-12 font-instrument text-5xl tracking-tight text-white md:text-7xl">
          Team
        </h1>
        <ul className="space-y-5">
          {teamMembers.map((member) => (
            <li
              key={member.slug}
              className="border-b border-white/10 pb-5 text-2xl font-light text-white md:text-3xl"
            >
              {member.name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Team;
