"use client";

import React from "react";
import { TripInquiry } from "@/types/inquiry";
import { WhatsAppButton } from "@/components/ui/Button";
import { MessageSquare, Send, MapPin } from "lucide-react";

export const CoordinatorQuickTemplates: React.FC<{
  inquiry: TripInquiry;
  coordinatorName?: string;
}> = ({ inquiry, coordinatorName = "Samson Tefera" }) => {
  // Template 1: Acknowledge & Check Availability
  const templateAcknowledge = `Hello ${inquiry.fullName},
Thank you for requesting an Arba Minch trip with AMX (Ref: ${inquiry.referenceNumber}).

I am ${coordinatorName}, your assigned coordinator. I have received your request for ${inquiry.numberOfTravelers} guests on ${inquiry.travelDate}. I am currently confirming boat captain and driver availability in Arba Minch and will follow up with your clear ETB quotation shortly.`;

  // Template 2: Send Itemized Quotation Notice
  const templateQuotation = `Hello ${inquiry.fullName},
Great news — your providers are confirmed and your itemized quotation is ready:

• Reference: ${inquiry.referenceNumber}
• Experience: ${inquiry.packageSlug?.replace(/-/g, " ")}
• Online Document: https://amx.et/quotation/qt-001

Please review the breakdown. Let me know if you would like to adjust the schedule or hotel category.`;

  // Template 3: Request Arrival / Pickup Point
  const templateArrival = `Hello ${inquiry.fullName},
To coordinate your driver pickup for ${inquiry.travelDate}, could you please share your arrival details?

• Arriving by Flight (ET135 / AMH Airport) or Private Vehicle?
• Do you need assistance with luggage or hotel transfer upon landing?

Thank you,
${coordinatorName} (AMX Coordination Desk)`;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-primary" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
          1-Click WhatsApp Response Templates
        </h4>
      </div>

      <div className="space-y-2">
        <WhatsAppButton
          phoneNumber={inquiry.whatsappNumber}
          message={templateAcknowledge}
          size="sm"
          className="w-full text-xs font-semibold justify-start text-left bg-sand-100 hover:bg-sand-200 text-charcoal border border-sand-300 shadow-none"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 shrink-0" />
          <span>1. Acknowledge Request & Check Availability</span>
        </WhatsAppButton>

        <WhatsAppButton
          phoneNumber={inquiry.whatsappNumber}
          message={templateQuotation}
          size="sm"
          className="w-full text-xs font-semibold justify-start text-left bg-sand-100 hover:bg-sand-200 text-charcoal border border-sand-300 shadow-none"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 shrink-0" />
          <span>2. Send Itemized ETB Quotation Link</span>
        </WhatsAppButton>

        <WhatsAppButton
          phoneNumber={inquiry.whatsappNumber}
          message={templateArrival}
          size="sm"
          className="w-full text-xs font-semibold justify-start text-left bg-sand-100 hover:bg-sand-200 text-charcoal border border-sand-300 shadow-none"
        >
          <span className="w-2 h-2 rounded-full bg-accent mr-2 shrink-0" />
          <span>3. Request Flight Number & Pickup Point</span>
        </WhatsAppButton>
      </div>
    </div>
  );
};