import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getCalendlyUrl() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const YYYYMM = `${year}-${month}`;
  return `https://calendly.com/shyanil-tageasy/30min?back=1&month=${YYYYMM}`;
}
export function getWhatsAppUrl() {
  return "https://wa.me/917980761008?text=Hi%2C%20I%20am%20interested%20in%20growing%20my%20business%20online.";
}
