// Phase 2 · Task 8 — UTM capture & first-touch lead attribution.
//
// On first visit with UTM parameters we store first-touch attribution in
// localStorage so it survives navigation and is attached to any later lead
// submission. We deliberately store ONLY campaign metadata + landing page +
// referrer — never anything that identifies the user. Safe to call on every
// page load; first-touch values are never overwritten.

const STORAGE_KEY = 'te_attribution';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const isBrowser = () => typeof window !== 'undefined';

const safeGet = () => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const safeSet = (value) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage may be unavailable (private mode / blocked). Fail silently.
  }
};

// Capture UTM params on load. Stores first-touch attribution once and then
// leaves it untouched, but always refreshes last-touch landing data.
export const captureUtmParams = () => {
  if (!isBrowser()) return null;

  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return safeGet();
  }

  const incoming = {};
  let hasUtm = false;
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      incoming[key] = val.slice(0, 200);
      hasUtm = true;
    }
  }

  const existing = safeGet();

  // First touch: only set once, when we first see UTM params (or first visit).
  if (!existing) {
    const record = {
      first: hasUtm ? incoming : {},
      last: hasUtm ? incoming : {},
      landing_page: window.location.pathname,
      referrer: (document.referrer || '').slice(0, 300),
      // first_seen_at is stamped client-side; not used for anything sensitive.
      first_seen_at: new Date().toISOString(),
    };
    safeSet(record);
    return record;
  }

  // Returning visit with NEW utm params: update last-touch only.
  if (hasUtm) {
    const record = { ...existing, last: incoming };
    safeSet(record);
    return record;
  }

  return existing;
};

// Flatten attribution into the field names the webhook / CRM expects.
// Returns only non-empty values; safe to spread into a form payload.
export const getAttribution = () => {
  const record = safeGet() || {};
  const first = record.first || {};
  const last = record.last || {};

  const out = {
    utm_source: last.utm_source || first.utm_source || '',
    utm_medium: last.utm_medium || first.utm_medium || '',
    utm_campaign: last.utm_campaign || first.utm_campaign || '',
    utm_term: last.utm_term || first.utm_term || '',
    utm_content: last.utm_content || first.utm_content || '',
    landing_page: record.landing_page || '',
    first_seen_at: record.first_seen_at || '',
    referrer: record.referrer || '',
  };

  // Drop empty keys so we don't send a wall of blanks.
  return Object.fromEntries(Object.entries(out).filter(([, v]) => v));
};

// Convenience: the campaign source for GA labelling (non-PII, safe to track).
export const getAttributionSource = () => {
  const a = getAttribution();
  return a.utm_source || 'direct';
};
