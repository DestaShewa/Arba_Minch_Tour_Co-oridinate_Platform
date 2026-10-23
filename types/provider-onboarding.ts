export type ProviderType =
  | "guide"
  | "driver"
  | "boat_operator"
  | "hotel"
  | "restaurant"
  | "cultural_provider"
  | "tour_operator"
  | "other";

export type VerificationStatus =
  | "pending"             // Application submitted
  | "under_review"        // AMX coordinator inspecting data
  | "more_info_needed"    // Documents or clarifications requested
  | "verified"            // Passed all checks and approved
  | "trusted"             // High-performing partner record
  | "restricted"          // Temporary operational limitation
  | "suspended";          // Cannot receive bookings

export type CommissionModelType = "percentage" | "fixed_referral_fee" | "negotiated";
export type PaymentCollector = "amx_coordinator" | "direct_provider";

export interface CommissionTerms {
  model: CommissionModelType;
  ratePercentage?: number; // e.g. 10 (for 10%)
  fixedAmountETB?: number; // e.g. 500 ETB
  customerPriceETB: string; // Retail price presented to traveler
  netPriceETB: string;      // Confidential provider earnings
  paymentCollector: PaymentCollector;
  settlementTerms: string;  // e.g. "Settled within 24 hours of trip completion"
  cancellationPolicy: string;
}

// 1. Guide-Specific Service Details
export interface GuideServiceDetails {
  licenseNumber?: string;
  associationName?: string; // e.g., "Arba Minch Tour Guides Association"
  specializations: ("wildlife" | "culture" | "hiking" | "photography" | "birdwatching")[];
  languages: string[];
  experienceYears: number;
  serviceAreas: string[]; // e.g. ["Lake Chamo", "Dorze Village", "Nech Sar Plains"]
  dailyRateETB: string;
}

// 2. Driver-Specific Service Details
export interface DriverServiceDetails {
  vehicleType: string; // e.g., "Toyota Land Cruiser 4WD", "Toyota HiAce Minibus"
  seatCapacity: number;
  plateNumber: string;
  hasAirConditioning: boolean;
  driverLicenseNumber: string;
  insuranceExpiryDate?: string;
  priceBasis: "per_day" | "per_trip" | "per_kilometer";
  serviceAreas: string[];
  vehiclePhotoUrl?: string;
}

// 3. Boat-Operator-Specific Service Details
export interface BoatOperatorServiceDetails {
  boatName: string;
  capacityPassengers: number;
  lifeJacketsAvailable: boolean;
  captainName: string;
  departureDock: string; // e.g., "Lake Chamo Main Dock"
  tripDurationHours: string;
  safetyRulesSummary: string;
  weatherCancellationPolicy: string;
  boatPhotoUrl?: string;
}

// 4. Hotel-Specific Service Details
export interface HotelServiceDetails {
  propertyType: "lodge" | "hotel" | "resort" | "guesthouse";
  totalRooms: number;
  roomCategories: {
    categoryName: string; // e.g. "Twin Room", "Lake View Chalet"
    count: number;
    priceRangeETB: string;
  }[];
  facilities: string[]; // e.g. ["Restaurant", "Wi-Fi", "Lake View", "Generator Backup"]
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  contactPersonName: string;
}

// 5. Restaurant-Specific Service Details
export interface RestaurantServiceDetails {
  cuisineTypes: string[]; // e.g. ["Traditional Ethiopian", "Chamo Fresh Fish", "Vegetarian / Fasting"]
  seatingCapacity: number;
  hasGroupMenu: boolean;
  openingHours: string;
  averageMealPriceETB: string;
}

// 6. Cultural-Provider-Specific Service Details
export interface CulturalProviderServiceDetails {
  experienceName: string; // e.g. "Dorze Weaving & Enset Bread Making"
  communityName: string;  // e.g. "Dorze Weavers Cooperative"
  durationHours: string;
  maxGroupSize: number;
  languages: string[];
  culturalGuidelines: string;
}

// Union of all dynamic service payloads
export type ProviderServicePayload =
  | { type: "guide"; details: GuideServiceDetails }
  | { type: "driver"; details: DriverServiceDetails }
  | { type: "boat_operator"; details: BoatOperatorServiceDetails }
  | { type: "hotel"; details: HotelServiceDetails }
  | { type: "restaurant"; details: RestaurantServiceDetails }
  | { type: "cultural_provider"; details: CulturalProviderServiceDetails }
  | { type: "tour_operator" | "other"; details: Record<string, string | number | boolean> };

export interface ProviderDocumentItem {
  id: string;
  documentType: "kebele_id" | "driver_license" | "guide_license" | "business_registration" | "vehicle_photo" | "safety_certificate";
  label: string;
  fileUrl: string;
  fileName: string;
  isVerified: boolean;
  uploadedAt: string;
}

// 14-Point Internal AMX Verification Checklist
export interface VerificationAuditChecklist {
  phoneVerified: boolean;
  whatsappVerified: boolean;
  locationVerified: boolean;
  documentsReceived: boolean;
  photosReviewed: boolean;
  serviceInspected: boolean; // physical visit or vehicle/boat check
  safetyConfirmed: boolean;  // life jackets, vehicle roadworthiness
  pricesConfirmed: boolean;
  availabilityConfirmed: boolean;
  agreementAccepted: boolean;
  commissionAgreed: boolean;
  emergencyContactConfirmed: boolean;
  reviewerName: string;
  verificationDate?: string;
  internalNotes: string;
}

export interface ProviderApplication {
  id: string;
  applicationNumber: string; // e.g., "AMX-PROV-4819"
  createdAt: string;
  updatedAt: string;
  status: VerificationStatus;

  // Contact & Personal Info
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  cityArea: string; // e.g. "Arba Minch - Sikela" or "Dorze Highlands"
  preferredLanguage: string;

  // Business Information
  businessName?: string;
  businessRegistrationNumber?: string;
  tinNumber?: string;
  managerName?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };

  // Dynamic Service Information
  providerType: ProviderType;
  serviceProfile: ProviderServicePayload;
  profilePhotoUrl: string;
  servicePhotos: string[];
  documents: ProviderDocumentItem[];

  // Pricing & Availability
  regularWorkingDays: string[];
  blackoutDates: string[];
  advanceBookingHoursNotice: number;

  // Confidential Commercial Agreement
  commissionTerms: CommissionTerms;
  agreementAcceptedDate: string;

  // Coordinator Audit Record
  auditChecklist: VerificationAuditChecklist;
}