import { ProviderType, VerificationStatus } from "./provider-onboarding";

export type ProviderRole = ProviderType;

export interface VehicleDetails {
  type: string;
  capacity: number;
  hasAirConditioning: boolean;
  plateNumberPreview?: string;
}

export interface BoatDetails {
  vesselType: string;
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
  verificationStatus?: VerificationStatus;
  lastCheckedDate: string;
  languages: string[];
  experienceYears: number;
  serviceArea: string;
  contactMethod: string;
  shortBio: string;
  servicesOffered: string[];
  priceRangeETB: string;
  vehicleDetails?: VehicleDetails;
  boatDetails?: BoatDetails;
  relatedPackageSlugs: string[];
  isAvailable: boolean;
}