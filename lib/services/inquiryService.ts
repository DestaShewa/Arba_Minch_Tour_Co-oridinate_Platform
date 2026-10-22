import { TripInquiry, InquiryStatus } from "@/types/inquiry";
import { INQUIRIES } from "@/data/inquiries";
import { InquiryFormSchemaType } from "@/lib/validations/inquiry";

const STORAGE_KEY = "amx_inquiries_store";

function getStoredInquiries(): TripInquiry[] {
  if (typeof window === "undefined") return INQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INQUIRIES));
      return INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INQUIRIES;
  }
}

function persistInquiries(data: TripInquiry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist inquiries", err);
  }
}

export const inquiryService = {
  getAll(): TripInquiry[] {
    return getStoredInquiries();
  },

  getById(id: string): TripInquiry | undefined {
    const list = getStoredInquiries();
    return list.find((item) => item.id === id || item.referenceNumber === id);
  },

  create(payload: InquiryFormSchemaType): TripInquiry {
    const list = getStoredInquiries();
    const randomRef = `AMX-REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry: TripInquiry = {
      id: `inq-${Date.now()}`,
      referenceNumber: randomRef,
      createdAt: new Date().toISOString(),
      status: "new",
      fullName: payload.fullName.trim(),
      whatsappNumber: payload.whatsappNumber.trim(),
      travelDate: payload.travelDate,
      numberOfTravelers: payload.numberOfTravelers,
      packageSlug: payload.packageSlug,
      email: payload.email || undefined,
      numberOfDays: payload.numberOfDays || 1,
      budgetRangeETB: payload.budgetRangeETB || undefined,
      arrivalLocation: payload.arrivalLocation || undefined,
      hotelNeeded: payload.hotelNeeded,
      transportNeeded: payload.transportNeeded,
      specialRequirements: payload.specialRequirements?.trim() || undefined,
      assignedCoordinator: "Unassigned",
      lastActivity: "Submitted via online request form",
      nextAction: "Assign coordinator & check provider availability",
    };

    const updated = [newInquiry, ...list];
    persistInquiries(updated);
    return newInquiry;
  },

  updateStatus(id: string, newStatus: InquiryStatus, coordinatorName = "Samson Tefera"): TripInquiry | undefined {
    const list = getStoredInquiries();
    const index = list.findIndex((i) => i.id === id || i.referenceNumber === id);
    if (index === -1) return undefined;

    const target = list[index];
    const updatedItem: TripInquiry = {
      ...target,
      status: newStatus,
      assignedCoordinator: target.assignedCoordinator === "Unassigned" ? coordinatorName : target.assignedCoordinator,
      lastActivity: `Status updated to ${newStatus.replace("_", " ")} by ${coordinatorName}`,
    };

    list[index] = updatedItem;
    persistInquiries(list);
    return updatedItem;
  },
};