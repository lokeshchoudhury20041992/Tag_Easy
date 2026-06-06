// Task 17 — Central approved proof / statistics library.
// Single source of truth for every numeric claim shown publicly. Components must
// read from here instead of hardcoding numbers, so claims stay consistent across
// the homepage, About, services, case studies, OG copy, schema, and llms-full.txt.
//
// `approved: false` claims are NEVER rendered publicly — use `publicClaims` /
// `getClaim()` which filter them out. `context` documents how each claim may be
// used and where the number comes from (audit §4.3 flagged inconsistent stats).

export const proofClaims = {
  yearsExperience: {
    value: '10+',
    label: 'years of digital engineering',
    approved: true,
    context: "Founder Lokesh Choudhury's experience since 2018 (gozo SEO lead onward).",
  },
  brandsScaled: {
    value: '20+',
    label: 'brands scaled',
    approved: true,
    context: 'Use for client/brand count. Do NOT also claim a different client count elsewhere.',
  },
  shippedDeliverables: {
    value: '200+',
    label: 'shipped deliverables',
    approved: true,
    context: 'Project/deliverable count — NOT a client count. Replaces the old "200+ launches".',
  },
  auditsDelivered: {
    value: '50+',
    label: 'free audits delivered',
    approved: true,
    context: 'Technical audits delivered through the free-audit funnel.',
  },
  efficiencyBoost: {
    value: '85%',
    label: 'average workflow efficiency boost',
    approved: true,
    context: 'Typical automation efficiency gain. Frame as "average" / "typical", not guaranteed.',
  },
  costReduction: {
    value: '40%',
    label: 'operational cost reduction',
    approved: true,
    context: 'Typical operational overhead reduction after automation.',
  },
  // Not verified by leadership — kept for reference, never rendered.
  teamSize: {
    value: '50+',
    label: 'digital architects',
    approved: false,
    context: 'UNVERIFIED. Real team list (teamData.js) has 8 members. Do not publish "50+".',
  },
};

// Only approved claims, keyed the same way.
export const publicClaims = Object.fromEntries(
  Object.entries(proofClaims).filter(([, c]) => c.approved)
);

// Safe accessor: returns the claim only if approved, else null.
export const getClaim = (key) => {
  const claim = proofClaims[key];
  return claim && claim.approved ? claim : null;
};
