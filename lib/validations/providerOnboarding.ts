import { z } from "zod";
import { isValidWhatsAppNumber } from "@/lib/utils";

// Step 1: Provider Type
export const ProviderCategorySchema = z.object({
  providerType: z.enum([
    "guide",
    "driver",
    "boat_operator",
    "hotel",
    "restaurant",
    "cultural_provider",
    "tour_operator",
    "other",
  ]),
});

// Step 2: Contact & Account
export const ProviderContactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  phoneNumber: z.string().refine((val) => isValidWhatsAppNumber(val), {
    message: "Please enter a valid phone number (+251... or 09...).",
  }),
  whatsappNumber: z.string().refine((val) => isValidWhatsAppNumber(val), {
    message: "Please enter a valid WhatsApp number.",
  }),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  cityArea: z.string().min(2, "Please enter your city or service base in Arba Minch."),
  preferredLanguage: z.string().min(1, "Please select your preferred language."),
});

// Step 3: Business / Legal Details
export const ProviderBusinessSchema = z.object({
  businessName: z.string().optional(),
  businessRegistrationNumber: z.string().optional(),
  tinNumber: z.string().optional(),
  managerName: z.string().optional(),
  emergencyContactName: z.string().min(2, "Emergency contact name is required."),
  emergencyContactPhone: z.string().refine((val) => isValidWhatsAppNumber(val), {
    message: "Please enter a valid emergency phone number.",
  }),
  emergencyContactRelationship: z.string().min(2, "Please indicate relationship (e.g. Spouse, Manager, Colleague)."),
});

// Step 4: Category Specific Schemas
export const GuideDetailsSchema = z.object({
  licenseNumber: z.string().optional(),
  associationName: z.string().optional(),
  specializations: z.array(z.string()).min(1, "Select at least one guiding specialization."),
  languages: z.array(z.string()).min(1, "At least one language is required."),
  experienceYears: z.coerce.number().min(0).max(50),
  dailyRateETB: z.string().min(1, "Please enter your standard daily rate in ETB."),
  serviceAreas: z.string().min(2, "Enter primary guiding areas (e.g. Lake Chamo, Dorze)."),
});

export const DriverDetailsSchema = z.object({
  vehicleType: z.string().min(2, "Vehicle model is required (e.g. Land Cruiser 4WD)."),
  seatCapacity: z.coerce.number().min(1).max(60),
  plateNumber: z.string().min(3, "Plate number is required."),
  hasAirConditioning: z.boolean().default(true),
  driverLicenseNumber: z.string().min(3, "Driver license number is required."),
  priceBasis: z.enum(["per_day", "per_trip", "per_kilometer"]),
  serviceAreas: z.string().min(2, "Enter primary service routes."),
});

export const BoatOperatorDetailsSchema = z.object({
  boatName: z.string().min(2, "Boat name or vessel ID is required."),
  capacityPassengers: z.coerce.number().min(1).max(40),
  lifeJacketsAvailable: z.boolean().refine((val) => val === true, {
    message: "You must confirm that personal flotation life jackets are provided.",
  }),
  captainName: z.string().min(2, "Captain name is required."),
  departureDock: z.string().min(2, "Departure dock is required (e.g. Lake Chamo Main Dock)."),
  weatherCancellationPolicy: z.string().min(5, "Safety weather policy is required."),
});

export const HotelDetailsSchema = z.object({
  propertyType: z.enum(["lodge", "hotel", "resort", "guesthouse"]),
  totalRooms: z.coerce.number().min(1),
  priceRangeETB: z.string().min(1, "Standard price range in ETB is required."),
  checkInTime: z.string().min(1, "Check-in time is required."),
  checkOutTime: z.string().min(1, "Check-out time is required."),
  contactPersonName: z.string().min(2, "Front desk manager name is required."),
});

export const RestaurantDetailsSchema = z.object({
  cuisineTypes: z.string().min(2, "Please state primary cuisines offered."),
  seatingCapacity: z.coerce.number().min(5),
  openingHours: z.string().min(2, "Opening hours are required."),
  averageMealPriceETB: z.string().min(1, "Average meal price in ETB is required."),
});

export const CulturalProviderDetailsSchema = z.object({
  experienceName: z.string().min(2, "Cultural experience name is required."),
  communityName: z.string().min(2, "Community or organization name is required."),
  durationHours: z.string().min(1, "Duration is required."),
  culturalGuidelines: z.string().min(5, "Community etiquette guidelines are required."),
});

// Step 6: Pricing, Commission Preference & Availability
export const ProviderPricingCommissionSchema = z.object({
  customerPriceETB: z.string().min(1, "Customer-facing price range is required."),
  netPriceETB: z.string().min(1, "Your net earning rate in ETB is required."),
  commissionModel: z.enum(["percentage", "fixed_referral_fee", "negotiated"]),
  commissionValue: z.string().min(1, "Please specify commission percentage (e.g. 10%) or fixed fee."),
  settlementTerms: z.string().min(2, "Preferred settlement timeline (e.g. Next day, weekly)."),
  advanceBookingHoursNotice: z.coerce.number().default(12),
  cancellationPolicy: z.string().min(5, "Cancellation policy is required."),
});

// Step 7: Agreement Sign-Off
export const ProviderAgreementSignoffSchema = z.object({
  acceptAccurateInfo: z.boolean().refine((val) => val === true, "You must agree to provide accurate information."),
  acceptServiceStandards: z.boolean().refine((val) => val === true, "You must agree to AMX service & punctuality standards."),
  acceptSafetyResponsibility: z.boolean().refine((val) => val === true, "You must accept legal responsibility for customer safety."),
  acceptCommissionTerms: z.boolean().refine((val) => val === true, "You must accept agreed commission and settlement terms."),
  acceptSuspensionRight: z.boolean().refine((val) => val === true, "You must accept AMX's right to suspend unverified or non-compliant providers."),
});