// Phase 2 · Task 4 — Central testimonial / review system with trust controls.
//
// Honesty rules enforced by the helpers below (do NOT bypass them):
//   • A testimonial is only DISPLAYED if `permissionGranted === true`
//     (the client has agreed their words/name can appear publicly).
//   • A testimonial only contributes Review/AggregateRating SCHEMA if
//     `verified === true` (Tag Easy can evidence the review is genuine,
//     e.g. a real Google review).
//
// The four entries migrated from the old testimonialData.js are kept here but
// gated OFF (permissionGranted:false, verified:false) until leadership confirms
// they are real and consented. Flip the flags per entry once confirmed — the UI
// and schema then pick them up automatically. No fake testimonials render.

export const testimonials = [
  {
    name: 'Priya Nair',
    role: 'CEO',
    company: 'Nexus AI',
    quote:
      "Tag Easy didn't just rebuild our platform; they architected a growth engine. The efficiency boost was a complete transformation of our operational logic.",
    serviceUsed: 'ai-automation',
    location: '',
    source: 'Client Feedback',
    rating: 5,
    date: '',
    verified: false,
    permissionGranted: false,
  },
  {
    name: 'Amit Sharma',
    role: 'Growth Lead',
    company: 'DataPulse',
    quote:
      "The Ads Hub work changed our ROI trajectory. We're now seeing a meaningful increase in qualified lead volume with a more efficient budget strategy.",
    serviceUsed: 'paid-ads',
    location: '',
    source: 'Client Feedback',
    rating: 5,
    date: '',
    verified: false,
    permissionGranted: false,
  },
  {
    name: 'Rohan Sen',
    role: 'CMO',
    company: 'Velo Growth',
    quote:
      'Their engineering edge is undeniable. The Ads Hub transition led to a clear reduction in our operational overhead within the first quarter.',
    serviceUsed: 'paid-ads',
    location: '',
    source: 'Client Feedback',
    rating: 5,
    date: '',
    verified: false,
    permissionGranted: false,
  },
  {
    name: 'Sneha Banerjee',
    role: 'Product Lead',
    company: 'Modular Bios',
    quote:
      "The approach to our UI significantly improved user retention. They don't just design; they engineer experiences.",
    serviceUsed: 'website-development',
    location: '',
    source: 'Client Feedback',
    rating: 5,
    date: '',
    verified: false,
    permissionGranted: false,
  },
];

// Displayable = the client consented to appear publicly.
export const getDisplayableTestimonials = () =>
  testimonials.filter((t) => t.permissionGranted);

// Verified = genuine and evidenced; the only ones eligible for Review schema.
export const getVerifiedTestimonials = () =>
  testimonials.filter((t) => t.permissionGranted && t.verified);

// Displayable testimonials for a specific service slug (used on service pages).
export const getTestimonialsForService = (serviceSlug) =>
  getDisplayableTestimonials().filter((t) => t.serviceUsed === serviceSlug);

// Displayable testimonials tied to a location (used on location pages).
export const getTestimonialsForLocation = (locationName) =>
  getDisplayableTestimonials().filter(
    (t) => t.location && t.location.toLowerCase() === String(locationName).toLowerCase()
  );

export const hasDisplayableTestimonials = () => getDisplayableTestimonials().length > 0;
