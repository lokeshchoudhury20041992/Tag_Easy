import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getAuditCalendarUrl() {
  return "https://calendar.app.google/ax8kWmVBg4U3Wagd8";
}
export function getWhatsAppUrl() {
  return "https://wa.me/917980761008?text=Hi%2C%20I%20am%20interested%20in%20growing%20my%20business%20online.";
}
