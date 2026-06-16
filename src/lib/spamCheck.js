// Phase 2 · Task 16 — Lightweight, dependency-free form spam protection.
//
// Three cheap signals that stop the bulk of bots without ever blocking a real
// user or showing a CAPTCHA:
//   1. Honeypot — a hidden field real users never fill; bots often do.
//   2. Time-to-submit — humans take a few seconds; instant submits are bots.
//   3. Blocked keywords — obvious spam payloads (links, casino, crypto, etc.).
//
// `evaluateSubmission` returns { ok, reason }. On spam we silently drop the
// submission and DO NOT fire any analytics/lead event (Task 16 acceptance).
// A Turnstile/reCAPTCHA step can be layered on later without changing callers.

// Minimum seconds between form mount and submit for a human.
export const MIN_SUBMIT_SECONDS = 3;

// Name of the hidden honeypot input. Looks plausible to bots, ignored by humans.
export const HONEYPOT_FIELD = 'company_website_url';

const BLOCKED_PATTERNS = [
  /\b(viagra|cialis|casino|porn|escort|loan offer|bitcoin doubler)\b/i,
  /\[url=/i,
  /<a\s+href=/i,
  // 3+ links in a short message is almost always spam.
  /(https?:\/\/[^\s]+){3,}/i,
];

// honeypotValue: the value of the hidden field (should be empty)
// elapsedMs: ms between form mount and submit
// text: concatenated free-text fields (message, name, etc.)
export const evaluateSubmission = ({ honeypotValue = '', elapsedMs = Infinity, text = '' } = {}) => {
  if (honeypotValue && honeypotValue.trim() !== '') {
    return { ok: false, reason: 'honeypot' };
  }

  if (elapsedMs < MIN_SUBMIT_SECONDS * 1000) {
    return { ok: false, reason: 'too_fast' };
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { ok: false, reason: 'blocked_keyword' };
    }
  }

  return { ok: true, reason: null };
};
