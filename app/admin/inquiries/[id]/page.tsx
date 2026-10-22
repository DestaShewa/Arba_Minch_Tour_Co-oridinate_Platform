"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { inquiryService } from "@/lib/services/inquiryService";
import { TripInquiry, InquiryStatus } from "@/types/inquiry";
import { StatusBadge } from "@/components/ui/Badge";
import { SLACountdownBadge } from "@/components/admin/SLACountdownBadge";
import { CoordinatorQuickTemplates } from "@/components/admin/CoordinatorQuickTemplates";
import { PrimaryButton } from "@/components/ui/Button";
import { SelectInput } from "@/components/forms/SelectInput";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AdminInquiryDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [inquiry, setInquiry] = useState<TripInquiry | null>(null);
  const [currentStatus, setCurrentStatus] = useState<InquiryStatus>("new");
  const [successNote, setSuccessNote] = useState("");

  useEffect(() => {
    const item = inquiryService.getById(id);
    if (item) {
      setInquiry(item);
      setCurrentStatus(item.status);
    }
  }, [id]);

  if (!inquiry) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-charcoal-muted">Inquiry not found.</p>
        <Link href="/admin/inquiries" className="text-primary font-bold hover:underline">
          ← Return to Inquiries Roster
        </Link>
      </div>
    );
  }

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
    const updated = inquiryService.updateStatus(inquiry.id, newStatus);
    if (updated) {
      setInquiry(updated);
      setCurrentStatus(updated.status);
      setSuccessNote(`Status updated to "${newStatus.replace("_", " ")}" and logged.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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

        <SLACountdownBadge createdAt={inquiry.createdAt} status={currentStatus} />
      </div>

      {successNote && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs font-semibold text-green-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Inquiry Submission Data */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-6 bg-white border border-sand-300">
            <div className="flex justify-between items-start border-b border-sand-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-charcoal">Customer Submission</h2>
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

            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 space-y-2 text-xs">
              <span className="font-bold text-charcoal block">Logistics Requirements:</span>
              <div className="flex gap-4">
                <span>Transport: <strong>{inquiry.transportNeeded ? "Required" : "Self-arranged"}</strong></span>
                <span>Lodge Reservation: <strong>{inquiry.hotelNeeded ? "Required" : "Not needed"}</strong></span>
              </div>
              {inquiry.arrivalLocation && (
                <div className="pt-1">Arrival point: <strong>{inquiry.arrivalLocation}</strong></div>
              )}
            </div>

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

        {/* Right Column: 1-Click WhatsApp Templates & Status Switcher */}
        <div className="space-y-6">
          {/* Status Lifecycle Switcher */}
          <Card className="p-6 space-y-4 bg-white border border-sand-300">
            <h3 className="text-base font-bold text-charcoal">Update Inquiry Status</h3>
            <p className="text-xs text-charcoal-muted">
              Move inquiry through the operational lifecycle as providers confirm.
            </p>

            <SelectInput
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
              options={statusOptions}
            />

            <div className="pt-2">
              <Link href="/quotation/qt-001" className="block">
                <PrimaryButton size="sm" className="w-full text-xs font-bold">
                  Generate / Open Quotation
                </PrimaryButton>
              </Link>
            </div>
          </Card>

          {/* 1-Click WhatsApp Quick Templates */}
          <Card className="p-6 bg-white border border-sand-300">
            <CoordinatorQuickTemplates inquiry={inquiry} />
          </Card>

          {/* Activity Log */}
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