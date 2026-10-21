"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { QuotationCard } from "@/components/public/QuotationCard";
import { Modal } from "@/components/ui/Modal";
import { TextArea } from "@/components/forms/TextArea";
import { PrimaryButton, SecondaryButton, WhatsAppButton } from "@/components/ui/Button";
import { QUOTATIONS } from "@/data/quotations";
import { formatETB } from "@/lib/utils";
import { CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export default function QuotationViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Find quotation by id or fallback to first sample
  const quotationData = QUOTATIONS.find((q) => q.id === id) || QUOTATIONS[0];

  const [quotation, setQuotation] = useState(quotationData);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [changeNotes, setChangeNotes] = useState("");
  const [acceptedSuccess, setAcceptedSuccess] = useState(false);

  const handleAccept = () => {
    setShowAcceptModal(true);
  };

  const confirmAccept = () => {
    setQuotation({ ...quotation, status: "accepted" });
    setShowAcceptModal(false);
    setAcceptedSuccess(true);
  };

  const handleRequestChanges = () => {
    setShowChangesModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title={`Quotation ${quotation.quotationNumber}`}
        description="Review your itemized itinerary costs. Prices are in Ethiopian Birr (ETB) with assigned verified providers."
        breadcrumb={
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Quotation {quotation.quotationNumber}</span>
          </div>
        }
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex-1 w-full space-y-8">
        {acceptedSuccess && (
          <div className="p-5 rounded-xl bg-green-50 border border-green-300 text-green-900 space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              <h3 className="font-bold text-lg">Quotation Accepted!</h3>
            </div>
            <p className="text-sm text-green-800">
              Your confirmation has been transmitted to coordinator {quotation.coordinatorName}. Your verified booking document has been generated.
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

        {/* Quotation Document Component */}
        <QuotationCard
          quotation={quotation}
          onAccept={handleAccept}
          onRequestChanges={handleRequestChanges}
        />

        {/* Modal: Confirm Acceptance */}
        <Modal
          isOpen={showAcceptModal}
          onClose={() => setShowAcceptModal(false)}
          title="Accept Quotation"
        >
          <div className="space-y-4 text-sm text-charcoal">
            <p>
              You are accepting quotation <strong>{quotation.quotationNumber}</strong> for <strong>{quotation.customerName}</strong>.
            </p>
            <div className="p-4 bg-sand-50 rounded-lg border border-sand-200 space-y-2">
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span className="text-primary text-base">{formatETB(quotation.totalAmountETB)}</span>
              </div>
              <p className="text-xs text-charcoal-muted">
                Payment is settled according to the agreement (on arrival or via lodge deposit). No credit card charge is processed right now.
              </p>
            </div>
            <p className="text-xs text-charcoal-muted">
              By confirming, your assigned coordinator will place guaranteed holds on the verified driver, guide, and boat reservations.
            </p>
            <div className="flex gap-3 pt-3">
              <PrimaryButton onClick={confirmAccept} className="flex-1 font-bold">
                Confirm & Finalize Booking
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

        {/* Modal: Request Changes */}
        <Modal
          isOpen={showChangesModal}
          onClose={() => setShowChangesModal(false)}
          title="Request Quotation Changes"
        >
          <div className="space-y-4 text-sm text-charcoal">
            <p>
              Need to adjust times, change hotels, or adjust the guest count? Let coordinator {quotation.coordinatorName} know what you’d like updated:
            </p>
            <TextArea
              rows={4}
              placeholder="e.g. Please change the pickup time to 08:30 AM and add an extra day in Dorze..."
              value={changeNotes}
              onChange={(e) => setChangeNotes(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <WhatsAppButton
                message={`Hello ${quotation.coordinatorName}, regarding quotation ${quotation.quotationNumber}: ${changeNotes || "I would like to request some adjustments."}`}
                phoneNumber={quotation.coordinatorWhatsApp}
                className="flex-1"
              >
                Send Changes on WhatsApp
              </WhatsAppButton>
              <SecondaryButton
                variant="outline"
                onClick={() => setShowChangesModal(false)}
              >
                Close
              </SecondaryButton>
            </div>
          </div>
        </Modal>
      </main>

      <Footer />
    </div>
  );
}