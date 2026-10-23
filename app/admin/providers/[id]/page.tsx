"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication, VerificationStatus, VerificationAuditChecklist } from "@/types/provider-onboarding";
import { VerificationStatusBadge } from "@/components/admin/VerificationStatusBadge";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, SecondaryButton, WhatsAppButton } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextInput } from "@/components/forms/TextInput";
import { TextArea } from "@/components/forms/TextArea";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  AlertTriangle,
  Upload,
} from "lucide-react";

export default function AdminProviderDossierPage() {
  const params = useParams();
  const id = params?.id as string;

  const [application, setApplication] = useState<ProviderApplication | null>(null);
  const [currentStatus, setCurrentStatus] = useState<VerificationStatus>("pending");
  const [checklist, setChecklist] = useState<VerificationAuditChecklist | null>(null);
  const [reviewerName, setReviewerName] = useState("Samson Tefera");
  const [internalNotes, setInternalNotes] = useState("");

  // Confidential Commercial State
  const [netPrice, setNetPrice] = useState("");
  const [customerPrice, setCustomerPrice] = useState("");
  const [commissionRate, setCommissionRate] = useState("10");
  const [successNote, setSuccessNote] = useState("");

  useEffect(() => {
    const app = providerOnboardingService.getApplicationById(id);
    if (app) {
      setApplication(app);
      setCurrentStatus(app.status);
      setChecklist(app.auditChecklist);
      setInternalNotes(app.auditChecklist.internalNotes || "");
      setReviewerName(app.auditChecklist.reviewerName !== "Unassigned" ? app.auditChecklist.reviewerName : "Samson Tefera");
      setNetPrice(app.commissionTerms.netPriceETB);
      setCustomerPrice(app.commissionTerms.customerPriceETB);
      setCommissionRate(String(app.commissionTerms.ratePercentage || "10"));
    }
  }, [id]);

  if (!application || !checklist) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-charcoal-muted">Provider application not found.</p>
        <Link href="/admin/providers/applications" className="text-primary font-bold hover:underline">
          ← Return to Applications Queue
        </Link>
      </div>
    );
  }

  const toggleCheck = (field: keyof VerificationAuditChecklist) => {
    if (!checklist) return;
    const currentVal = checklist[field];
    if (typeof currentVal === "boolean") {
      const updated = { ...checklist, [field]: !currentVal };
      setChecklist(updated);
    }
  };

  const handleSaveAudit = () => {
    providerOnboardingService.updateAuditChecklist(application.id, {
      ...checklist,
      reviewerName,
      internalNotes,
    });
    providerOnboardingService.updateCommissionTerms(application.id, {
      netPriceETB: netPrice,
      customerPriceETB: customerPrice,
      ratePercentage: parseFloat(commissionRate) || 10,
    });
    setSuccessNote("14-point audit checklist and commission terms saved.");
    setTimeout(() => setSuccessNote(""), 3500);
  };

  const handleStatusChange = (newStatus: VerificationStatus) => {
    setCurrentStatus(newStatus);
    providerOnboardingService.updateVerificationStatus(application.id, newStatus, reviewerName);
    setSuccessNote(`Provider verification status updated to "${newStatus.replace(/_/g, " ").toUpperCase()}".`);
    setTimeout(() => setSuccessNote(""), 3500);
  };

  // 1-Click WhatsApp Communication Payloads
  const msgRequestDocs = `Hello ${application.fullName}, this is ${reviewerName} from the AMX Coordination Desk regarding application ${application.applicationNumber}. We are reviewing your profile. Please WhatsApp us clear photos of your valid license and vehicle/boat.`;
  const msgScheduleInspection = `Hello ${application.fullName}, this is ${reviewerName} from AMX. We would like to schedule a 10-minute in-person inspection of your service in Arba Minch (Sikela / Secha / Chamo Dock) this week. What day and time works best for you?`;
  const msgApprovalNotice = `Congratulations ${application.fullName}! Your AMX provider application (${application.applicationNumber}) has been approved and awarded the AMX Verified badge. Your profile is now live for trip assignments.`;

  return (
    <div className="space-y-6">
      {/* Dossier Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-sand-300 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/providers/applications" className="tap-target p-2 text-charcoal-muted hover:text-primary rounded-md">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs font-mono font-bold text-accent">{application.applicationNumber}</span>
            <h1 className="text-2xl font-bold text-charcoal">{application.fullName}</h1>
            <span className="text-xs font-semibold uppercase text-secondary-800">{application.providerType.replace(/_/g, " ")} • {application.cityArea}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <VerificationStatusBadge status={currentStatus} />
          <PrimaryButton onClick={handleSaveAudit} size="sm" className="font-bold">
            Save Audit Record
          </PrimaryButton>
        </div>
      </div>

      {successNote && (
        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Main Grid: Audit Checklist (Left) vs Commercial / Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): 14-Point Interactive Checklist & Profile Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* 14-Point Manual Audit Checklist Card */}
          <Card className="p-6 bg-white border border-sand-300 space-y-5">
            <div className="flex justify-between items-center border-b border-sand-200 pb-3">
              <h2 className="text-base font-bold text-primary flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> 14-Point Provider Verification Checklist
              </h2>
              <span className="text-xs font-mono text-charcoal-muted">
                {Object.values(checklist).filter((v) => v === true).length} / 12 Verified
              </span>
            </div>

            <p className="text-xs text-charcoal-muted">
              Check off items as you verify them by phone, document review, or in-person visit in Arba Minch:
            </p>

            <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
              {[
                { key: "phoneVerified", label: "1. Phone Number Reachable & Verified" },
                { key: "whatsappVerified", label: "2. WhatsApp Number Confirmed Active" },
                { key: "locationVerified", label: "3. Service Base / Location in Arba Minch" },
                { key: "documentsReceived", label: "4. Identification (Kebele/Passport) Valid" },
                { key: "photosReviewed", label: "5. Real Photos (No internet stock photos)" },
                { key: "serviceInspected", label: "6. Vehicle / Boat / Lodge Inspected" },
                { key: "safetyConfirmed", label: "7. Life Jackets / Seatbelts Roadworthy" },
                { key: "pricesConfirmed", label: "8. Realistic Rates & Currency (ETB)" },
                { key: "availabilityConfirmed", label: "9. Working Days & Blackouts Confirmed" },
                { key: "commissionAgreed", label: "10. Commission Rate & Settlement Agreed" },
                { key: "emergencyContactConfirmed", label: "11. 24/7 Emergency Contact Reachable" },
                { key: "agreementAccepted", label: "12. AMX Provider Agreement Signed" },
              ].map((item) => {
                const isChecked = checklist[item.key as keyof VerificationAuditChecklist] === true;
                return (
                  <label
                    key={item.key}
                    className={`tap-target flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors cursor-pointer select-none ${
                      isChecked
                        ? "bg-green-50/70 border-green-300 text-green-950 font-semibold"
                        : "bg-sand-50 border-sand-300 text-charcoal hover:bg-sand-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(item.key as keyof VerificationAuditChecklist)}
                      className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Audit Notes & Reviewer Sign-off */}
            <div className="pt-4 border-t border-sand-200 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <FormField label="Assigned Reviewer Name" htmlFor="reviewer">
                  <TextInput
                    id="reviewer"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="text-xs"
                  />
                </FormField>

                <FormField label="Verification Audit Date" htmlFor="vDate">
                  <TextInput
                    id="vDate"
                    value={checklist.verificationDate || new Date().toISOString().split("T")[0]}
                    readOnly
                    className="bg-sand-50 text-xs"
                  />
                </FormField>
              </div>

              <FormField label="Internal Inspection Notes (Confidential)" htmlFor="notes">
                <TextArea
                  id="notes"
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record vehicle inspection condition, boat captain license status, or phone interview feedback..."
                  className="text-xs"
                />
              </FormField>
            </div>
          </Card>

          {/* Submitted Service Profile Card */}
          <Card className="p-6 bg-white border border-sand-300 space-y-4">
            <h3 className="text-base font-bold text-charcoal border-b border-sand-200 pb-3">
              Submitted Service Specifications
            </h3>

            <div className="p-4 bg-sand-50 rounded-xl space-y-2 text-xs">
              {application.providerType === "driver" && "details" in application.serviceProfile && (
                <div className="grid sm:grid-cols-2 gap-2 text-charcoal-muted">
                  <p>Vehicle: <strong className="text-charcoal">{(application.serviceProfile.details as any).vehicleType}</strong></p>
                  <p>Plate #: <strong className="text-charcoal">{(application.serviceProfile.details as any).plateNumber}</strong></p>
                  <p>Seat Capacity: <strong className="text-charcoal">{(application.serviceProfile.details as any).seatCapacity} Seats</strong></p>
                  <p>Air Conditioning: <strong className="text-charcoal">{(application.serviceProfile.details as any).hasAirConditioning ? "Equipped" : "None"}</strong></p>
                </div>
              )}

              {application.providerType === "guide" && "details" in application.serviceProfile && (
                <div className="space-y-1 text-charcoal-muted">
                  <p>License / Association: <strong className="text-charcoal">{(application.serviceProfile.details as any).licenseNumber || "Association Member"}</strong></p>
                  <p>Languages: <strong className="text-charcoal">{(application.serviceProfile.details as any).languages?.join(", ")}</strong></p>
                  <p>Specialties: <strong className="text-charcoal">{(application.serviceProfile.details as any).specializations?.join(", ")}</strong></p>
                </div>
              )}

              {application.providerType === "boat_operator" && "details" in application.serviceProfile && (
                <div className="space-y-1 text-charcoal-muted">
                  <p>Boat Vessel: <strong className="text-charcoal">{(application.serviceProfile.details as any).boatName}</strong></p>
                  <p>Capacity: <strong className="text-charcoal">{(application.serviceProfile.details as any).capacityPassengers} Travelers</strong></p>
                  <p>Life Jackets: <strong className="text-green-700">✓ Mandatory Life Jackets Confirmed</strong></p>
                </div>
              )}
            </div>

            <div className="text-xs space-y-1 text-charcoal-muted">
              <span className="font-bold text-charcoal block">Emergency Contact:</span>
              <p>{application.emergencyContact.name} ({application.emergencyContact.relationship}) — <strong className="text-charcoal">{application.emergencyContact.phone}</strong></p>
            </div>
          </Card>
        </div>

        {/* Right Column (5 cols): Status Switcher, Confidential Commission & WhatsApp Triggers */}
        <div className="lg:col-span-5 space-y-6">
          {/* Verification Status Switcher */}
          <Card className="p-6 bg-white border border-sand-300 space-y-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-charcoal">Verification Level</h3>
              <p className="text-xs text-charcoal-muted">Set partner status based on audit completion:</p>
            </div>

            <SelectInput
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as VerificationStatus)}
              options={[
                { value: "pending", label: "Pending (Application Received)" },
                { value: "under_review", label: "Under Review (Checks in progress)" },
                { value: "more_info_needed", label: "More Information Needed" },
                { value: "verified", label: "AMX Verified (Approved & Public)" },
                { value: "trusted", label: "Trusted Partner (High Performance)" },
                { value: "restricted", label: "Restricted (Warning / Temporary)" },
                { value: "suspended", label: "Suspended (Cannot receive bookings)" },
              ]}
            />
          </Card>

          {/* Confidential Commercial & Commission Configuration */}
          <Card className="p-6 bg-white border border-sand-300 space-y-4">
            <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
              <Lock className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-bold text-charcoal">Confidential Commercial Agreement</h3>
            </div>

            <p className="text-[11px] text-charcoal-muted">
              Visible only to AMX coordinators. Net price is never exposed publicly to travelers.
            </p>

            <div className="space-y-3">
              <FormField label="Provider True Net Rate (ETB)" htmlFor="net">
                <TextInput
                  id="net"
                  value={netPrice}
                  onChange={(e) => setNetPrice(e.target.value)}
                  className="text-xs"
                />
              </FormField>

              <FormField label="Customer Retail Price (ETB)" htmlFor="retail">
                <TextInput
                  id="retail"
                  value={customerPrice}
                  onChange={(e) => setCustomerPrice(e.target.value)}
                  className="text-xs"
                />
              </FormField>

              <FormField label="Agreed Commission (%)" htmlFor="comm">
                <TextInput
                  id="comm"
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="text-xs"
                />
              </FormField>
            </div>
          </Card>

          {/* 1-Click Coordinator WhatsApp Triggers */}
          <Card className="p-6 bg-white border border-sand-300 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-primary" /> Coordinator WhatsApp Shortcuts
            </h4>

            <div className="space-y-2">
              <WhatsAppButton
                phoneNumber={application.whatsappNumber}
                message={msgRequestDocs}
                size="sm"
                className="w-full text-xs font-semibold justify-start text-left bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 shadow-none"
              >
                <span>1. Request Missing Documents</span>
              </WhatsAppButton>

              <WhatsAppButton
                phoneNumber={application.whatsappNumber}
                message={msgScheduleInspection}
                size="sm"
                className="w-full text-xs font-semibold justify-start text-left bg-blue-50 hover:bg-blue-100 text-secondary-900 border border-secondary-300 shadow-none"
              >
                <span>2. Schedule In-Person Inspection</span>
              </WhatsAppButton>

              <WhatsAppButton
                phoneNumber={application.whatsappNumber}
                message={msgApprovalNotice}
                size="sm"
                className="w-full text-xs font-semibold justify-start text-left bg-green-50 hover:bg-green-100 text-green-950 border border-green-300 shadow-none"
              >
                <span>3. Send Verified Approval Notice</span>
              </WhatsAppButton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}