import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getAuditCalendarUrl() {
  return "https://calendar.app.google/ax8kWmVBg4U3Wagd8";
}

export const WHATSAPP_NUMBER = "917980761008";

// Phase 2 · Task 9 — Dynamic, page-aware WhatsApp deep links.
//
// Pass a custom message to pre-fill the chat with page context (and an optional
// campaign source) so enquiries arrive already attributed. Called with no args
// it returns the original generic link, so existing usages keep working.
export function getWhatsAppUrl(message) {
  const text =
    message || "Hi, I am interested in growing my business online.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Build a context-rich WhatsApp message for a given page.
// pageLabel: human label (e.g. "Technical SEO"); url defaults to current page;
// source: optional campaign/utm source to include for attribution.
export function buildWhatsAppMessage({ pageLabel, url, source } = {}) {
  const here =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const parts = ["Hi Tag Easy,"];
  if (pageLabel) {
    parts.push(`I visited the ${pageLabel} page and want to discuss it for my business.`);
  } else {
    parts.push("I am interested in growing my business online.");
  }
  if (here) parts.push(`(${here})`);
  if (source) parts.push(`[source: ${source}]`);
  return parts.join(" ");
}

// Convenience: a page-aware WhatsApp URL in one call.
export function getWhatsAppUrlForPage(pageLabel, source) {
  return getWhatsAppUrl(buildWhatsAppMessage({ pageLabel, source }));
}

// Phase 2 · Task 5 — Google review link used by /review-us.
// TODO: replace with the exact "write a review" deep link once the Google
// Business Profile Place ID is confirmed:
//   https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
export function getGoogleReviewUrl() {
  return "https://www.google.com/search?q=Tag+Easy+Kolkata+reviews";
}

// Phase 2 · Task 3 — Google Business Profile link used on the Contact page.
// TODO: replace with the canonical GBP share link / Maps place URL once available.
export function getGoogleBusinessProfileUrl() {
  return "https://www.google.com/maps/search/Tag+Easy+Kolkata";
}
