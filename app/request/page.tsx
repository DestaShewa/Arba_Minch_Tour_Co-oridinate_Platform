"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextArea } from "@/components/forms/TextArea";
import { DatePicker } from "@/components/forms/DatePicker";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { SelectedPackageSummary } from "@/components/public/SelectedPackageSummary";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/Feedback";
import { PACKAGES } from "@/data/packages";
import { AMX_BRAND } from "@/lib/constants";
import { InquirySchema } from "@/lib/validations/inquiry";
import { inquiryService } from "@/lib/services/inquiryService";
import { Clock, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

function RequestFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "lake-chamo-experience";

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "+251",
    travelDate: "",
    numberOfTravelers: 2,
    packageSlug: initialPackage,
    email: "",
    numberOfDays: 1,
    budgetRangeETB: "",
    arrivalLocation: "",
    hotelNeeded: false,
    transportNeeded: true,
    specialRequirements: "",
  });

  const [showOptional, setShowOptional] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const packageOptions = [
    ...PACKAGES.map((p) => ({ value: p.slug, label: p.title })),
    { value: "custom", label: "Custom Arba Minch Itinerary" },
  ];

  const travelerOptions = [
    { value: "1", label: "1 Traveler (Solo)" },
    { value: "2", label: "2 Travelers" },
    { value: "3", label: "3 Travelers" },
    { value: "4", label: "4 Travelers" },
    { value: "5", label: "5 - 7 Travelers (Small Group)" },
    { value: "8", label: "8+ Travelers (Large Group)" },
  ];

  const daysOptions = [
    { value: "1", label: "1 Day (Half or Full Day)" },
    { value: "2", label: "2 Days / 1 Night" },
    { value: "3", label: "3 Days / 2 Nights" },
    { value: "4", label: "4+ Days Extended" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validate with Zod
    const result = InquirySchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (typeof fieldName === "string" && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const createdInquiry = inquiryService.create(result.data);

      router.push(
        `/request/success?ref=${createdInquiry.referenceNumber}&name=${encodeURIComponent(
          createdInquiry.fullName
        )}&pkg=${createdInquiry.packageSlug}&transport=${formData.transportNeeded ? "yes" : "no"}&hotel=${formData.hotelNeeded ? "yes" : "no"}`
      );
    } catch {
      setFormError(
        "We could not send your request. Please try again or contact us on WhatsApp."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Request an Arba Minch Trip"
        description="Tell us your dates and group size. We check real availability with verified local guides, drivers, and boat operators before sending you a clear quotation in ETB."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex-1 w-full space-y-8">
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-primary">
            <Clock className="w-5 h-5 text-accent shrink-0" />
            <span>
              <strong>Coordination Promise:</strong> {AMX_BRAND.slaNotice}
            </span>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold bg-white text-primary px-2.5 py-1 rounded border border-primary-200">
            No Upfront Payment
          </span>
        </div>

        {formError && <ErrorMessage title="Submission Error" message={formError} />}

        {/* 2-Column Desktop Grid: Form + Sticky Context Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Inquiry Form Column */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8"
              noValidate
            >
              {/* Section 1: Initial Essential Fields */}
              <div className="space-y-6">
                <div className="border-b border-sand-200 pb-3">
                  <h2 className="text-xl font-bold text-primary">1. Trip Details</h2>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Required to verify provider schedules.
                  </p>
                </div>

                <FormField label="Selected Experience" htmlFor="packageSlug" required>
                  <SelectInput
                    id="packageSlug"
                    value={formData.packageSlug}
                    onChange={(e) => setFormData({ ...formData, packageSlug: e.target.value })}
                    options={packageOptions}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name"
                    htmlFor="fullName"
                    required
                    error={errors.fullName}
                  >
                    <TextInput
                      id="fullName"
                      placeholder="e.g. Martha Kebede"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: "" });
                      }}
                      hasError={!!errors.fullName}
                    />
                  </FormField>

                  <FormField
                    label="WhatsApp Phone Number"
                    htmlFor="whatsappNumber"
                    required
                    helperText="For instant quotation delivery"
                    error={errors.whatsappNumber}
                  >
                    <PhoneInput
                      id="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={(fullPhone) => {
                        setFormData({ ...formData, whatsappNumber: fullPhone });
                        if (errors.whatsappNumber) setErrors({ ...errors, whatsappNumber: "" });
                      }}
                      hasError={!!errors.whatsappNumber}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Planned Travel Date"
                    htmlFor="travelDate"
                    required
                    error={errors.travelDate}
                  >
                    <DatePicker
                      id="travelDate"
                      value={formData.travelDate}
                      onChange={(e) => {
                        setFormData({ ...formData, travelDate: e.target.value });
                        if (errors.travelDate) setErrors({ ...errors, travelDate: "" });
                      }}
                      hasError={!!errors.travelDate}
                    />
                  </FormField>

                  <FormField
                    label="Number of Travelers"
                    htmlFor="numberOfTravelers"
                    required
                  >
                    <SelectInput
                      id="numberOfTravelers"
                      value={String(formData.numberOfTravelers)}
                      onChange={(e) =>
                        setFormData({ ...formData, numberOfTravelers: parseInt(e.target.value, 10) })
                      }
                      options={travelerOptions}
                    />
                  </FormField>
                </div>
              </div>

              {/* Section 2: Progressive Preferences */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="tap-target w-full flex items-center justify-between p-4 rounded-xl bg-sand-50 hover:bg-sand-100 border border-sand-300 text-charcoal font-semibold text-sm transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>
                      {showOptional
                        ? "Hide additional preferences"
                        : "Add optional preferences (hotel, duration, budget)"}
                    </span>
                  </span>
                  {showOptional ? (
                    <ChevronUp className="w-5 h-5 text-charcoal-muted" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-charcoal-muted" />
                  )}
                </button>

                {showOptional && (
                  <div className="mt-6 space-y-6 p-5 rounded-xl border border-sand-200 bg-sand-50/50 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Email Address (Optional)"
                        htmlFor="email"
                        helperText="For PDF copy of quotation"
                        error={errors.email}
                      >
                        <TextInput
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          hasError={!!errors.email}
                        />
                      </FormField>

                      <FormField
                        label="Number of Days in Arba Minch"
                        htmlFor="numberOfDays"
                      >
                        <SelectInput
                          id="numberOfDays"
                          value={String(formData.numberOfDays)}
                          onChange={(e) =>
                            setFormData({ ...formData, numberOfDays: parseInt(e.target.value, 10) })
                          }
                          options={daysOptions}
                        />
                      </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Estimated Budget Range (ETB)"
                        htmlFor="budgetRangeETB"
                        helperText="Helps select matching lodges"
                      >
                        <TextInput
                          id="budgetRangeETB"
                          placeholder="e.g. 15,000 - 20,000 ETB"
                          value={formData.budgetRangeETB}
                          onChange={(e) => setFormData({ ...formData, budgetRangeETB: e.target.value })}
                        />
                      </FormField>

                      <FormField
                        label="Arrival Location in Arba Minch"
                        htmlFor="arrivalLocation"
                        helperText="Airport or Hotel name"
                      >
                        <TextInput
                          id="arrivalLocation"
                          placeholder="e.g. Arba Minch Airport (AMH)"
                          value={formData.arrivalLocation}
                          onChange={(e) =>
                            setFormData({ ...formData, arrivalLocation: e.target.value })
                          }
                        />
                      </FormField>
                    </div>

                    <div className="space-y-3 pt-2">
                      <span className="block text-sm font-semibold text-charcoal">
                        Logistics Coordination Needed
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="tap-target flex items-center gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={formData.transportNeeded}
                            onChange={(e) =>
                              setFormData({ ...formData, transportNeeded: e.target.checked })
                            }
                            className="w-5 h-5 text-primary rounded accent-primary cursor-pointer"
                          />
                          <span className="text-sm font-medium text-charcoal">
                            Transport needed (4WD or car)
                          </span>
                        </label>

                        <label className="tap-target flex items-center gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={formData.hotelNeeded}
                            onChange={(e) =>
                              setFormData({ ...formData, hotelNeeded: e.target.checked })
                            }
                            className="w-5 h-5 text-primary rounded accent-primary cursor-pointer"
                          />
                          <span className="text-sm font-medium text-charcoal">
                            Hotel / Lodge booking needed
                          </span>
                        </label>
                      </div>
                    </div>

                    <FormField
                      label="Special Requirements or Interests"
                      htmlFor="specialRequirements"
                      helperText="Dietary needs, mobility notes, photography focus, etc."
                    >
                      <TextArea
                        id="specialRequirements"
                        rows={3}
                        placeholder="Tell us about specific interests..."
                        value={formData.specialRequirements}
                        onChange={(e) =>
                          setFormData({ ...formData, specialRequirements: e.target.value })
                        }
                      />
                    </FormField>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-sand-200 space-y-4">
                <div className="flex items-start gap-2.5 text-xs text-charcoal-muted">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero upfront payment:</strong> Submitting this request does not charge you. An AMX coordinator will verify provider availability and send an itemized quotation in ETB.
                  </span>
                </div>

                <PrimaryButton
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full font-bold text-base bg-accent hover:bg-accent-600 text-white"
                >
                  {isSubmitting ? "Checking Provider Schedules..." : "Request This Trip"}
                </PrimaryButton>

                <div className="text-center">
                  <span className="text-xs text-charcoal-muted">
                    Prefer to talk directly right now?{" "}
                  </span>
                  <WhatsAppButton
                    size="sm"
                    className="inline-flex mt-1"
                    message="Hello AMX, I would like to plan a trip to Arba Minch directly on WhatsApp."
                  >
                    WhatsApp Us Directly
                  </WhatsAppButton>
                </div>
              </div>
            </form>
          </div>

          {/* Sticky Package Summary Context Column */}
          <div className="hidden lg:block lg:col-span-4">
            <SelectedPackageSummary packageSlug={formData.packageSlug} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RequestPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading request form...</div>}>
      <RequestFormContent />
    </Suspense>
  );
}