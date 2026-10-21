"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { INQUIRIES } from "@/data/inquiries";
import { InquiryStatus } from "@/types/inquiry";
import { StatusBadge } from "@/components/ui/Badge";
import { PrimaryButton, SecondaryButton, WhatsAppButton } from "@/components/ui/Button";
import { SelectInput } from "@/components/forms/SelectInput";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Clock, MessageSquare, ShieldCheck, UserCheck, CheckCircle2 } from "lucide-react";

export default function AdminInquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const initialInq = INQUIRIES.find((i) => i.id === id) || INQUIRIES[0];
  const [inquiry, setInquiry] = useState(initialInq);
  const [currentStatus, setCurrentStatus] = useState<InquiryStatus>(initialInq.status);
  const [successNote, setSuccessNote] = useState("");

  const statusOptions: { value: InquiryStatus; label: string }[] = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "awaiting_provider", label: "Awaiting Provider" },
    { value: "quotation_sent", label: "Quotation Sent" },
    { value: "confirmed", label: "Confirmed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ];

  const handleStatusChange = (newStatus: InquiryStatus) => {
    setCurrentStatus(newStatus);
    setInquiry({
      ...inquiry,
      status: newStatus,
      lastActivity: `Status updated to ${newStatus} by Samson Tefera`,
    });
    setSuccessNote(`Status updated to "${newStatus.replace("_", " ")}".`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/inquiries"
          className="tap-target p-2 text-charcoal-muted hover:text-primary rounded-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs font-mono font-bold text-accent">
            {inquiry.referenceNumber}
          </span>
          <h1 className="text-2xl font-bold text-primary">
            Inquiry from {inquiry.fullName}
          </h1>
        </div>
      </div>

      {successNote && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs font-semibold text-green-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Questionnaire Responses */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-6 bg-white border border-sand-300">
            <div className="flex justify-between items-start border-b border-sand-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-charcoal">
                  Customer Submission
                </h2>
                <span className="text-xs text-charcoal-muted">
                  Submitted: {new Date(inquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <StatusBadge status={currentStatus} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-sand-50 rounded-lg">
                <span className="text-xs text-charcoal-muted block">Full Name</span>
                <strong className="text-charcoal">{inquiry.fullName}</strong>
              </div>
              <div className="p-3 bg-sand-50 rounded-lg">
                <span className="text-xs text-charcoal-muted block">WhatsApp Phone</span>
                <strong className="text-charcoal">{inquiry.whatsappNumber}</strong>
              </div>
              <div className="p-3 bg-sand-50 rounded-lg">
                <span className="text-xs text-charcoal-muted block">Travel Date</span>
                <strong className="text-charcoal">{inquiry.travelDate}</strong>
              </div>
              <div className="p-3 bg-sand-50 rounded-lg">
                <span className="text-xs text-charcoal-muted block">Guests</span>
                <strong className="text-charcoal">{inquiry.numberOfTravelers} Travelers</strong>
              </div>
              <div className="p-3 bg-sand-50 rounded-lg">
                <span className="text-xs text-charcoal-muted block">Package Requested</span>
                <strong className="text-charcoal">{inquiry.packageSlug}</strong>
              </div>
              <div className="p-3 bg-sand-50 rounded-lg">
                <span className="text-xs text-charcoal-muted block">Budget Range</span>
                <strong className="text-charcoal">{inquiry.budgetRangeETB || "Not specified"}</strong>
              </div>
            </div>

            {/* Logistics Requirements */}
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 space-y-2 text-xs">
              <span className="font-bold text-charcoal block">Logistics Requirements:</span>
              <div className="flex gap-4">
                <span>4WD Transport: <strong>{inquiry.transportNeeded ? "Required" : "Self-arranged"}</strong></span>
                <span>Lodge Reservation: <strong>{inquiry.hotelNeeded ? "Required" : "Not needed"}</strong></span>
              </div>
              {inquiry.arrivalLocation && (
                <div className="pt-1">Arrival point: <strong>{inquiry.arrivalLocation}</strong></div>
              )}
            </div>

            {/* Special Notes */}
            {inquiry.specialRequirements && (
              <div className="space-y-1 text-sm">
                <span className="text-xs text-charcoal-muted font-bold block">Special Requirements / Notes:</span>
                <p className="p-3 rounded-lg bg-sand-50 border border-sand-200 text-charcoal">
                  {inquiry.specialRequirements}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Coordinator Actions & Status Control */}
        <div className="space-y-6">
          {/* Status Switcher Card */}
          <Card className="p-6 space-y-4 bg-white border border-sand-300">
            <h3 className="text-base font-bold text-charcoal">Update Inquiry Status</h3>
            <p className="text-xs text-charcoal-muted">
              Select lifecycle stage according to current provider responses.
            </p>

            <SelectInput
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
              options={statusOptions}
            />

            <div className="pt-2 space-y-2">
              <span className="text-xs text-charcoal-muted block font-semibold">
                Direct Coordinator Actions:
              </span>
              <WhatsAppButton
                phoneNumber={inquiry.whatsappNumber}
                message={`Hello ${inquiry.fullName}, this is Samson from AMX regarding your trip inquiry ${inquiry.referenceNumber}.`}
                className="w-full text-xs"
              >
                Chat with Customer
              </WhatsAppButton>

              <Link href="/quotation/qt-001" className="block">
                <PrimaryButton size="sm" className="w-full text-xs font-bold">
                  Generate / Open Quotation
                </PrimaryButton>
              </Link>
            </div>
          </Card>

          {/* Coordination Log */}
          <Card className="p-6 space-y-3 bg-white border border-sand-300 text-xs">
            <h4 className="font-bold text-charcoal">Activity Log</h4>
            <div className="space-y-2 border-l-2 border-primary/30 pl-3">
              <div>
                <span className="text-[10px] text-charcoal-muted block">Current Assignment</span>
                <span className="font-semibold">{inquiry.assignedCoordinator}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted block">Last Activity</span>
                <span className="text-charcoal">{inquiry.lastActivity}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-muted block">Next Recommended Step</span>
                <span className="text-secondary-800 font-semibold">{inquiry.nextAction}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}