// Task 18 — GA4 conversion event tracking helper.
// Thin, safe wrapper around react-ga4. Never throws if GA is unavailable or the
// tracking ID is the placeholder, and never sends sensitive form content — only
// non-PII metadata (event name, label, page path).

import ReactGA from 'react-ga4';

const isGaActive = () => {
  const id = import.meta.env.VITE_GA_TRACKING_ID;
  return Boolean(id) && id !== 'G-XXXXXXXXXX';
};

const currentPath = () =>
  typeof window !== 'undefined' ? window.location.pathname : '';

// Generic event sender. `params` must NOT contain names, emails, phone numbers,
// or message bodies — only safe metadata.
export const trackEvent = (action, params = {}) => {
  try {
    if (!isGaActive()) return;
    ReactGA.event(action, { page_path: currentPath(), ...params });
  } catch (err) {
    // Analytics must never break the UI.
    if (import.meta.env.DEV) console.warn('[analytics] event failed', err);
  }
};

// --- Named conversion events for major lead CTAs ---

export const trackGenerateLead = (source) =>
  trackEvent('generate_lead', { event_label: source });

export const trackContactFormSubmit = () =>
  trackEvent('contact_form_submit', { event_label: 'contact_page' });

export const trackFreeAuditSubmit = (source = 'free_audit_page') =>
  trackEvent('free_audit_submit', { event_label: source });

export const trackPhoneClick = (source = 'contact') =>
  trackEvent('phone_click', { event_label: source });

export const trackEmailClick = (source = 'contact') =>
  trackEvent('email_click', { event_label: source });

export const trackWhatsAppClick = (source = 'cta') =>
  trackEvent('whatsapp_click', { event_label: source });

export const trackBookCallClick = (source = 'cta') =>
  trackEvent('book_call_click', { event_label: source });

export const trackServiceCtaClick = (service) =>
  trackEvent('service_cta_click', { event_label: service });

export const trackProfileLinkClick = (network) =>
  trackEvent('profile_link_click', { event_label: network });
