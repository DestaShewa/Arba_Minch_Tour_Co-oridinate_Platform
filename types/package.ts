export interface ItineraryItem {
  time: string; // e.g., "07:30"
  title: string;
  description: string;
  location?: string;
}

export interface PackagePriceItem {
  item: string;
  status: "included" | "optional" | "excluded" | "to_be_confirmed";
  note?: string;
}

export interface ExperiencePackage {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  duration: string; // e.g., "Half day", "Two days", "Flexible"
  startingPriceETB: number; // in ETB
  priceType: "fixed" | "custom_quotation" | "per_person";
  priceNote: string;
  lastPriceUpdate: string; // e.g., "October 2026"
  groupSizeRange: string; // e.g., "1 - 8 travelers"
  heroImage: string;
  galleryImages: string[];
  keyHighlights: string[];
  itinerary: ItineraryItem[];
  includedList: string[];
  excludedList: string[];
  priceTable: PackagePriceItem[];
  cancellationPolicy: string;
  safetyAndPreparation: string[];
  faqs: { question: string; answer: string }[];
  featuredProviderIds: string[];
  relatedPackageSlugs: string[];
}