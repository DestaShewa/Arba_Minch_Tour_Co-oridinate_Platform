export type PaymentStatus = "pending_on_arrival" | "deposit_paid" | "fully_settled";
export type BookingStatus = "confirmed" | "in_progress" | "completed" | "cancelled";

export interface Booking {
  id: string;
  bookingNumber: string; // e.g., "AMX-BK-7319"
  quotationId: string;
  customerName: string;
  customerWhatsApp: string;
  travelDates: string;
  packageName: string;
  packageSlug: string;
  pickupPoint: string;
  pickupTime: string;
  itinerarySummary: { time: string; description: string }[];
  assignedProviders: {
    role: string;
    name: string;
    contactMethod: string;
    details?: string; // e.g., "Plate: ET-3-98211"
  }[];
  totalPriceETB: number;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  cancellationTerms: string;
  emergencyContact: {
    title: string;
    phone: string;
    availableHours: string;
  };
}