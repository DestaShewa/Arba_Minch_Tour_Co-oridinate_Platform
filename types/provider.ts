export type ProviderRole = "guide" | "driver" | "boat_operator" | "hotel";

export interface VehicleDetails {
  type: string; // e.g., "4WD Land Cruiser", "Toyota HiAce Minibus"
  capacity: number;
  hasAirConditioning: boolean;
  plateNumberPreview?: string;
}

export interface BoatDetails {
  vesselType: string; // e.g., "Motorized Lake Boat"
  lifeJacketsProvided: boolean;
  maxPassengers: number;
  engineHorsepower?: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  role: ProviderRole;
  photo: string;
  isVerified: boolean;
  lastCheckedDate: string; // e.g., "October 2026"
  languages: string[]; // e.g., ["English", "Amharic", "Dorze"]
  experienceYears: number;
  serviceArea: string; // e.g., "Lake Chamo & Nech Sar", "Dorze Highlands & Chencha"
  contactMethod: string; // e.g., "Via AMX Coordinator"
  shortBio: string;
  servicesOffered: string[];
  priceRangeETB: string; // e.g., "1,500 - 2,500 ETB / day"
  vehicleDetails?: VehicleDetails;
  boatDetails?: BoatDetails;
  relatedPackageSlugs: string[];
  isAvailable: boolean;
}