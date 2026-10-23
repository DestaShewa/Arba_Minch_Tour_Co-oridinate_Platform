import { Provider, ProviderRole } from "@/types/provider";
import { PROVIDERS } from "@/data/providers";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication } from "@/types/provider-onboarding";

const STORAGE_KEY = "amx_providers_store";

function getStoredProviders(): Provider[] {
  if (typeof window === "undefined") return PROVIDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PROVIDERS));
      return PROVIDERS;
    }
    return JSON.parse(raw);
  } catch {
    return PROVIDERS;
  }
}

function persistProviders(data: Provider[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist providers", err);
  }
}

/**
 * Converts an approved ProviderApplication into the public Provider interface
 */
function mapApplicationToPublicProvider(app: ProviderApplication): Provider {
  const slug = `${app.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${app.providerType}`;

  let vehicleDetails = undefined;
  if (app.providerType === "driver" && "details" in app.serviceProfile) {
    const d = app.serviceProfile.details as any;
    vehicleDetails = {
      type: d.vehicleType || "Land Cruiser 4WD",
      capacity: d.seatCapacity || 6,
      hasAirConditioning: d.hasAirConditioning ?? true,
      plateNumberPreview: d.plateNumber ? `${d.plateNumber.substring(0, 5)}*** (Verified)` : undefined,
    };
  }

  let boatDetails = undefined;
  if (app.providerType === "boat_operator" && "details" in app.serviceProfile) {
    const b = app.serviceProfile.details as any;
    boatDetails = {
      vesselType: b.boatName || "Lake Chamo Boat",
      lifeJacketsProvided: b.lifeJacketsAvailable ?? true,
      maxPassengers: b.capacityPassengers || 8,
      engineHorsepower: "Yamaha 40HP",
    };
  }

  return {
    id: app.id,
    slug,
    name: app.fullName,
    role: app.providerType,
    photo: app.profilePhotoUrl,
    isVerified: app.status === "verified" || app.status === "trusted",
    verificationStatus: app.status,
    lastCheckedDate: app.auditChecklist.verificationDate || "Verified Recently",
    languages: ["Amharic", "English", app.preferredLanguage],
    experienceYears: 6,
    serviceArea: app.cityArea,
    contactMethod: "Directly coordinated via AMX Desk",
    shortBio: app.businessName
      ? `${app.businessName} — Operating verified tourism services in ${app.cityArea}.`
      : `Verified local ${app.providerType.replace(/_/g, " ")} based in ${app.cityArea}, Arba Minch.`,
    servicesOffered: ["Coordinated Regional Transport", "Lake Wildlife Safaris", "Cultural Activities"],
    priceRangeETB: app.commissionTerms.customerPriceETB || "Standard local rate",
    vehicleDetails,
    boatDetails,
    relatedPackageSlugs: ["lake-chamo-experience", "dorze-and-lake-chamo"],
    isAvailable: true,
  };
}

export const providerService = {
  /**
   * Retrieves all providers (internal view)
   */
  getAll(): Provider[] {
    const staticProviders = getStoredProviders();
    const dynamicApplications = providerOnboardingService.getAllApplications();

    // Map approved applications to public format
    const approvedDynamic = dynamicApplications
      .filter((app) => app.status === "verified" || app.status === "trusted")
      .map(mapApplicationToPublicProvider);

    return [...staticProviders, ...approvedDynamic];
  },

  /**
   * STRICT SECURITY GUARD:
   * Returns ONLY providers who have passed verification (Verified or Trusted),
   * are actively marked available, and are NOT suspended or in review.
   */
  getPublicVerifiedProviders(): Provider[] {
    const all = this.getAll();
    return all.filter((p) => {
      const isApprovedStatus =
        p.verificationStatus === "verified" ||
        p.verificationStatus === "trusted" ||
        (p.verificationStatus === undefined && p.isVerified);

      const isNotSuspended =
        p.verificationStatus !== "suspended" &&
        p.verificationStatus !== "restricted" &&
        p.verificationStatus !== "pending" &&
        p.verificationStatus !== "under_review" &&
        p.verificationStatus !== "more_info_needed";

      return isApprovedStatus && isNotSuspended && p.isAvailable;
    });
  },

  /**
   * STRICT SECURITY GUARD:
   * Looks up a public provider profile. If provider is unverified,
   * under review, or suspended, returns undefined to trigger a 404.
   */
  getPublicProviderBySlug(slug: string): Provider | undefined {
    const verifiedList = this.getPublicVerifiedProviders();
    return verifiedList.find((p) => p.slug === slug || p.id === slug);
  },

  getByRole(role: ProviderRole): Provider[] {
    return this.getPublicVerifiedProviders().filter((p) => p.role === role);
  },

  toggleAvailability(id: string): Provider | undefined {
    const list = getStoredProviders();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const updated = { ...list[index], isAvailable: !list[index].isAvailable };
    list[index] = updated;
    persistProviders(list);
    return updated;
  },
};