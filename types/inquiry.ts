export type InquiryStatus =
  | "new"
  | "contacted"
  | "awaiting_provider"
  | "quotation_sent"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface TripInquiry {
  id: string;
  referenceNumber: string; // e.g., "AMX-REQ-8492"
  createdAt: string;
  status: InquiryStatus;
  
  // Required initial fields (4-5 fields)
  fullName: string;
  whatsappNumber: string;
  travelDate: string;
  numberOfTravelers: number;
  packageSlug?: string;

  // Optional fields
  email?: string;
  numberOfDays?: number;
  budgetRangeETB?: string;
  arrivalLocation?: string;
  hotelNeeded: boolean;
  transportNeeded: boolean;
  interests?: string[];
  specialRequirements?: string;

  // Internal coordinator tracking
  assignedCoordinator?: string;
  lastActivity: string;
  nextAction: string;
}

export type InquiryFormInput = Omit<
  TripInquiry,
  "id" | "referenceNumber" | "createdAt" | "status" | "assignedCoordinator" | "lastActivity" | "nextAction"
>;
