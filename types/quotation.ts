export interface QuotationLineItem {
  item: string; // e.g., "Transport (4WD)", "Certified Local Guide", "Boat Activity"
  providerName?: string;
  amountETB: number;
  isOptional?: boolean;
}

export interface Quotation {
  id: string;
  quotationNumber: string; // e.g., "AMX-QT-2026-081"
  inquiryReferenceId: string;
  customerName: string;
  customerWhatsApp: string;
  travelDates: string;
  numberOfGuests: number;
  packageName: string;
  packageSlug: string;
  lineItems: QuotationLineItem[];
  totalAmountETB: number;
  includedServices: string[];
  excludedServices: string[];
  assignedProviders: { role: string; name: string }[];
  validityDate: string; // e.g., "Valid until October 25, 2026"
  cancellationPolicy: string;
  coordinatorName: string;
  coordinatorWhatsApp: string;
  status: "draft" | "sent" | "accepted" | "changes_requested" | "expired";
}