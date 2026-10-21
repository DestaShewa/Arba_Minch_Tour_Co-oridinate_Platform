import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind classes safely avoiding conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number into clean Ethiopian Birr (ETB) format.
 * Example: 3500 -> "3,500 ETB"
 */
export function formatETB(amount: number): string {
  return `${new Intl.NumberFormat("en-US").format(amount)} ETB`;
}

/**
 * Formats date into human-readable string.
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Validates WhatsApp / Phone numbers:
 * Accepts international format (+251...) or local Ethiopian formats (09..., 07...).
 */
export function isValidWhatsAppNumber(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  // Matches +251..., 251..., 09..., 07... with 9 to 13 digits
  const phoneRegex = /^(\+?251|0)?[97]\d{8}$/;
  return phoneRegex.test(cleaned) || cleaned.length >= 9;
}