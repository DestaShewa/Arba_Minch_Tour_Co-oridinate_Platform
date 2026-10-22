"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Quotation } from "@/types/quotation";
import { QuotationCard } from "@/components/public/QuotationCard";
import { Modal } from "@/components/ui/Modal";
import { TextArea } from "@/components/forms/TextArea";
import { PrimaryButton, SecondaryButton, WhatsAppButton } from "@/components/ui/Button";
import { quotationService } from "@/lib/services/quotationService";
import { formatETB } from "@/lib/utils";
import { CheckCircle2, Clock, Check } from "lucide-react";

const COMMON_REVISION_OPTIONS = [
  "Change Hotel / Lodge Category",
  "Adjust Pickup Time or Date",
  "Modify Group Size / Traveler Count",
  "Upgrade / Change Vehicle Type (e.g. Land Cruiser Prado)",
  "Add / Remove Specific Activity (e.g. Forty Springs Walk)",
  "Request Different Guiding Language",
];

export const QuotationClientView: React.FC<{ quotation: Quotation }> = ({
  quotation: initialQuote,
}) => {
  const [quotation, setQuotation] = useState(initialQuote);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState("");
  const [acceptedSuccess, setAcceptedSuccess] = useState(quotation.status === "accepted");

  const toggleChangeOption = (option: string) => {
    if (selectedChanges.includes(option)) {
      setSelectedChanges(selectedChanges.filter((item) => item !== option));
    } else {
      setSelectedChanges([...selectedChanges, option]);
    }
  };

  const confirmAccept = () => {
    const updated = quotationService.accept(quotation.id);
    if (updated) {
      setQuotation(updated);
    } else {
      setQuotation({ ...quotation, status: "accepted" });
    }
    setShowAcceptModal(false);
    setAcceptedSuccess(true);
  };

  // Build Structured WhatsApp Revision Payload
  const formattedRevisionPayload = `Hello ${quotation.coordinatorName},
Regarding quotation *${quotation.quotationNumber}* for *${quotation.customerName}*:

*Requested Adjustments:*
${selectedChanges.length > 0 ? selectedChanges.map((c) => `• ${c}`).join("\n") : "• General schedule review"}

*Additional Notes:*
${customNotes.trim() ? customNotes.trim() : "None provided"}

Please prepare an updated ETB breakdown.`;

  return (
    <div className="space-y-8">
      {acceptedSuccess && (
        <div className="p-5 rounded-xl bg-green-50 border border-green-300 text-green-900 space-y-3 shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
            <h3 className="font-bold text-lg">Quotation Accepted!</h3>
          </div>
          <p className="text-sm text-green-800 leading-relaxed">
            Your confirmation has been transmitted to coordinator <strong>{quotation.coordinatorName}</strong>. Provider schedule holds are being locked into place.
          </p>
          <div className="pt-2">
            <Link href="/booking/bk-7315">
              <PrimaryButton size="sm" className="font-bold">
                View Confirmed Booking Voucher →
              </PrimaryButton>
            </Link>
          </div>
        </div>
      )}

      {/* Main Quotation Document Component */}
      <QuotationCard
        quotation={quotation}
        onAccept={() => setShowAcceptModal(true)}
        onRequestChanges={() => setShowChangesModal(true)}
      />

      {/* Modal 1: 3-Bullet Accept Modal */}
      <Modal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        title="Accept Quotation"
      >
        <div className="space-y-4 text-sm text-charcoal">
          <div className="p-3 bg-sand-50 rounded-lg border border-sand-200 flex justify-between items-center">
            <span className="font-semibold">{quotation.packageName}</span>
            <span className="font-bold text-primary text-base">
              {formatETB(quotation.totalAmountETB)}
            </span>
          </div>

          <ul className="space-y-2 text-xs text-charcoal-muted">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>No upfront charge:</strong> Payment terms remain as agreed upon arrival.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Schedule lock:</strong> Coordinator immediately reserves verified drivers & boat captains.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Confirmed voucher:</strong> Your digital travel voucher will be issued immediately.</span>
            </li>
          </ul>

          <div className="flex gap-3 pt-3 border-t border-sand-200">
            <PrimaryButton onClick={confirmAccept} className="flex-1 font-bold">
              Confirm Booking
            </PrimaryButton>
            <SecondaryButton
              variant="outline"
              onClick={() => setShowAcceptModal(false)}
              className="flex-1"
            >
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Modal>

      {/* Modal 2: Granular Line-Item Change Request Modal */}
      <Modal
        isOpen={showChangesModal}
        onClose={() => setShowChangesModal(false)}
        title="Request Specific Adjustments"
      >
        <div className="space-y-4 text-sm text-charcoal">
          <p className="text-xs text-charcoal-muted">
            Select the components you want coordinator <strong>{quotation.coordinatorName}</strong> to modify:
          </p>

          {/* Granular Revision Checkboxes */}
          <div className="space-y-2">
            {COMMON_REVISION_OPTIONS.map((opt) => {
              const isChecked = selectedChanges.includes(opt);
              return (
                <label
                  key={opt}
                  className={`tap-target flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer select-none text-xs font-semibold ${
                    isChecked
                      ? "bg-primary-50/60 border-primary text-primary"
                      : "bg-white border-sand-300 text-charcoal hover:bg-sand-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleChangeOption(opt)}
                    className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>

          <div className="space-y-1">
            <label htmlFor="revisionNotes" className="text-xs font-bold text-charcoal block">
              Additional Details (Optional):
            </label>
            <TextArea
              id="revisionNotes"
              rows={3}
              placeholder="e.g. Prefer an early 07:00 AM start to catch calm waters on Lake Chamo..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-sand-200">
            <WhatsAppButton
              phoneNumber={quotation.coordinatorWhatsApp}
              message={formattedRevisionPayload}
              className="flex-1 font-bold"
            >
              Send Changes on WhatsApp
            </WhatsAppButton>
            <SecondaryButton
              variant="outline"
              onClick={() => setShowChangesModal(false)}
            >
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};