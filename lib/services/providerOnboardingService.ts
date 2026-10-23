import {
  ProviderApplication,
  VerificationStatus,
  VerificationAuditChecklist,
  CommissionTerms,
  ProviderType,
  ProviderServicePayload,
} from "@/types/provider-onboarding";
import { SEED_PROVIDER_APPLICATIONS } from "@/data/providerApplications";

const STORAGE_KEY = "amx_provider_applications_store";
const ACTIVE_PROVIDER_SESSION_KEY = "amx_active_provider_session";

function getStoredApplications(): ProviderApplication[] {
  if (typeof window === "undefined") return SEED_PROVIDER_APPLICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROVIDER_APPLICATIONS));
      return SEED_PROVIDER_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_PROVIDER_APPLICATIONS;
  }
}

function persistApplications(data: ProviderApplication[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist provider applications", err);
  }
}

export const providerOnboardingService = {
  getAllApplications(): ProviderApplication[] {
    return getStoredApplications();
  },

  getApplicationById(id: string): ProviderApplication | undefined {
    const list = getStoredApplications();
    return list.find((app) => app.id === id || app.applicationNumber === id);
  },

  getApplicationsByStatus(status: VerificationStatus): ProviderApplication[] {
    return getStoredApplications().filter((app) => app.status === status);
  },

  createApplication(payload: {
    fullName: string;
    phoneNumber: string;
    whatsappNumber: string;
    email: string;
    cityArea: string;
    preferredLanguage: string;
    businessName?: string;
    businessRegistrationNumber?: string;
    tinNumber?: string;
    managerName?: string;
    emergencyContact: { name: string; phone: string; relationship: string };
    providerType: ProviderType;
    serviceProfile: ProviderServicePayload;
    profilePhotoUrl?: string;
    customerPriceETB: string;
    netPriceETB: string;
    commissionModel: "percentage" | "fixed_referral_fee" | "negotiated";
    commissionRateOrAmount: string;
    settlementTerms: string;
    cancellationPolicy: string;
  }): ProviderApplication {
    const list = getStoredApplications();
    const appNumber = `AMX-PROV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp: ProviderApplication = {
      id: `app-prov-${Date.now()}`,
      applicationNumber: appNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending",
      fullName: payload.fullName.trim(),
      phoneNumber: payload.phoneNumber.trim(),
      whatsappNumber: payload.whatsappNumber.trim(),
      email: payload.email.trim(),
      cityArea: payload.cityArea.trim(),
      preferredLanguage: payload.preferredLanguage,
      businessName: payload.businessName?.trim(),
      businessRegistrationNumber: payload.businessRegistrationNumber?.trim(),
      tinNumber: payload.tinNumber?.trim(),
      managerName: payload.managerName?.trim(),
      emergencyContact: payload.emergencyContact,
      providerType: payload.providerType,
      serviceProfile: payload.serviceProfile,
      profilePhotoUrl: payload.profilePhotoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      servicePhotos: [],
      documents: [],
      regularWorkingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      blackoutDates: [],
      advanceBookingHoursNotice: 12,
      commissionTerms: {
        model: payload.commissionModel,
        ratePercentage: payload.commissionModel === "percentage" ? parseFloat(payload.commissionRateOrAmount) || 10 : undefined,
        fixedAmountETB: payload.commissionModel === "fixed_referral_fee" ? parseFloat(payload.commissionRateOrAmount) || 500 : undefined,
        customerPriceETB: payload.customerPriceETB,
        netPriceETB: payload.netPriceETB,
        paymentCollector: "amx_coordinator",
        settlementTerms: payload.settlementTerms,
        cancellationPolicy: payload.cancellationPolicy,
      },
      agreementAcceptedDate: new Date().toISOString(),
      auditChecklist: {
        phoneVerified: false,
        whatsappVerified: false,
        locationVerified: false,
        documentsReceived: false,
        photosReviewed: false,
        serviceInspected: false,
        safetyConfirmed: false,
        pricesConfirmed: false,
        availabilityConfirmed: false,
        agreementAccepted: true,
        commissionAgreed: false,
        emergencyContactConfirmed: false,
        reviewerName: "Unassigned",
        internalNotes: "Application submitted. Awaiting initial coordinator phone verification.",
      },
    };

    const updated = [newApp, ...list];
    persistApplications(updated);
    return newApp;
  },

  updateAuditChecklist(id: string, checklist: Partial<VerificationAuditChecklist>): ProviderApplication | undefined {
    const list = getStoredApplications();
    const index = list.findIndex((a) => a.id === id || a.applicationNumber === id);
    if (index === -1) return undefined;

    const target = list[index];
    const updated: ProviderApplication = {
      ...target,
      updatedAt: new Date().toISOString(),
      auditChecklist: {
        ...target.auditChecklist,
        ...checklist,
      },
    };

    list[index] = updated;
    persistApplications(list);
    return updated;
  },

  updateVerificationStatus(id: string, status: VerificationStatus, reviewerName = "Samson Tefera"): ProviderApplication | undefined {
    const list = getStoredApplications();
    const index = list.findIndex((a) => a.id === id || a.applicationNumber === id);
    if (index === -1) return undefined;

    const target = list[index];
    const updated: ProviderApplication = {
      ...target,
      status,
      updatedAt: new Date().toISOString(),
      auditChecklist: {
        ...target.auditChecklist,
        reviewerName,
        verificationDate: status === "verified" || status === "trusted" ? new Date().toISOString().split("T")[0] : target.auditChecklist.verificationDate,
      },
    };

    list[index] = updated;
    persistApplications(list);
    return updated;
  },

  updateCommissionTerms(id: string, terms: Partial<CommissionTerms>): ProviderApplication | undefined {
    const list = getStoredApplications();
    const index = list.findIndex((a) => a.id === id || a.applicationNumber === id);
    if (index === -1) return undefined;

    const target = list[index];
    const updated: ProviderApplication = {
      ...target,
      updatedAt: new Date().toISOString(),
      commissionTerms: {
        ...target.commissionTerms,
        ...terms,
      },
    };

    list[index] = updated;
    persistApplications(list);
    return updated;
  },

  // Provider Portal Mock Session
  getActiveProviderSession(): ProviderApplication {
    const list = getStoredApplications();
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem(ACTIVE_PROVIDER_SESSION_KEY);
      if (storedId) {
        const found = list.find((a) => a.id === storedId || a.applicationNumber === storedId);
        if (found) return found;
      }
    }
    // Fallback default: Dawit Wolde (Driver)
    return list[0] || SEED_PROVIDER_APPLICATIONS[0];
  },

  setActiveProviderSession(id: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_PROVIDER_SESSION_KEY, id);
    }
  },
};