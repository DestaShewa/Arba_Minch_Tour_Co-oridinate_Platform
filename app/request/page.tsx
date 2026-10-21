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
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/Feedback";
import { PACKAGES } from "@/data/packages";
import { isValidWhatsAppNumber } from "@/lib/utils";
import { AMX_BRAND } from "@/lib/constants";
import { TripInquiry } from "@/types/inquiry";
import { Clock, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

function RequestFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "lake-chamo-experience";

  // Form State
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState("2");
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);

  // Optional Fields (Progressive Disclosure)
  const [showOptional, setShowOptional] = useState(false);
  const [email, setEmail] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("1");
  const [budgetRangeETB, setBudgetRangeETB] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [hotelNeeded, setHotelNeeded] = useState(false);
  const [transportNeeded, setTransportNeeded] = useState(true);
  const [specialRequirements, setSpecialRequirements] = useState("");

  // UX & Validation State
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

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    if (!whatsappNumber.trim()) {
      errs.whatsappNumber = "Please enter your WhatsApp number.";
    } else if (!isValidWhatsAppNumber(whatsappNumber)) {
      errs.whatsappNumber =
        "Please enter a valid WhatsApp number (e.g., +251 911 234567 or 0911234567).";
    }

    if (!travelDate) {
      errs.travelDate = "Please select your planned travel date.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate rapid local mock latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      const randomRefNumber = `AMX-REQ-${Math.floor(1000 + Math.random() * 9000)}`;

      const newInquiry: TripInquiry = {
        id: `inq-${Date.now()}`,
        referenceNumber: randomRefNumber,
        createdAt: new Date().toISOString(),
        status: "new",
        fullName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        travelDate,
        numberOfTravelers: parseInt(numberOfTravelers, 10),
        packageSlug: selectedPackage,
        email: email.trim() || undefined,
        numberOfDays: parseInt(numberOfDays, 10),
        budgetRangeETB: budgetRangeETB.trim() || undefined,
        arrivalLocation: arrivalLocation.trim() || undefined,
        hotelNeeded,
        transportNeeded,
        specialRequirements: specialRequirements.trim() || undefined,
        lastActivity: "Submitted via website request form",
        nextAction: "Assign coordinator & check provider availability",
      };

      // Persist in localStorage for coordinator portal demo
      if (typeof window !== "undefined") {
        const existing = JSON.parse(
          localStorage.getItem("amx_inquiries") || "[]"
        );
        localStorage.setItem(
          "amx_inquiries",
          JSON.stringify([newInquiry, ...existing])
        );
      }

      router.push(
        `/request/success?ref=${randomRefNumber}&name=${encodeURIComponent(
          fullName
        )}&pkg=${selectedPackage}`
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex-1 w-full space-y-8">
        {/* SLA Notice Banner */}
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

        {formError && (
          <ErrorMessage
            title="Submission Error"
            message={formError}
          />
        )}

        {/* The Inquiry Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8"
          noValidate
        >
          {/* Section 1: Initial 4-5 Essential Fields */}
          <div className="space-y-6">
            <div className="border-b border-sand-200 pb-3">
              <h2 className="text-xl font-bold text-primary">
                1. Trip Details
              </h2>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Required to verify provider schedules.
              </p>
            </div>

            <FormField
              label="Selected Experience"
              htmlFor="selectedPackage"
              required
            >
              <SelectInput
                id="selectedPackage"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
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
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  hasError={!!errors.fullName}
                />
              </FormField>

              <FormField
                label="WhatsApp Phone Number"
                htmlFor="whatsappNumber"
                required
                helperText="For quick itinerary delivery"
                error={errors.whatsappNumber}
              >
                <TextInput
                  id="whatsappNumber"
                  type="tel"
                  placeholder="+251 911 000 000"
                  value={whatsappNumber}
                  onChange={(e) => {
                    setWhatsappNumber(e.target.value);
                    if (errors.whatsappNumber)
                      setErrors({ ...errors, whatsappNumber: "" });
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
                  value={travelDate}
                  onChange={(e) => {
                    setTravelDate(e.target.value);
                    if (errors.travelDate)
                      setErrors({ ...errors, travelDate: "" });
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
                  value={numberOfTravelers}
                  onChange={(e) => setNumberOfTravelers(e.target.value)}
                  options={travelerOptions}
                />
              </FormField>
            </div>
          </div>

          {/* Section 2: Progressive Disclosure - Optional Details */}
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
                  >
                    <TextInput
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormField>

                  <FormField
                    label="Number of Days in Arba Minch"
                    htmlFor="numberOfDays"
                  >
                    <SelectInput
                      id="numberOfDays"
                      value={numberOfDays}
                      onChange={(e) => setNumberOfDays(e.target.value)}
                      options={daysOptions}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Estimated Budget Range (ETB)"
                    htmlFor="budgetRangeETB"
                    helperText="Helps us select matching lodge options"
                  >
                    <TextInput
                      id="budgetRangeETB"
                      placeholder="e.g. 15,000 - 20,000 ETB"
                      value={budgetRangeETB}
                      onChange={(e) => setBudgetRangeETB(e.target.value)}
                    />
                  </FormField>

                  <FormField
                    label="Arrival Location in Arba Minch"
                    htmlFor="arrivalLocation"
                    helperText="Airport, Bus terminal, or Hotel name"
                  >
                    <TextInput
                      id="arrivalLocation"
                      placeholder="e.g. Arba Minch Airport (AMH)"
                      value={arrivalLocation}
                      onChange={(e) => setArrivalLocation(e.target.value)}
                    />
                  </FormField>
                </div>

                {/* Logistics Checkboxes */}
                <div className="space-y-3 pt-2">
                  <span className="block text-sm font-semibold text-charcoal">
                    Logistics Coordination Needed
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="tap-target flex items-center gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={transportNeeded}
                        onChange={(e) => setTransportNeeded(e.target.checked)}
                        className="w-5 h-5 text-primary rounded accent-primary cursor-pointer"
                      />
                      <span className="text-sm font-medium text-charcoal">
                        Transport needed (4WD or car)
                      </span>
                    </label>

                    <label className="tap-target flex items-center gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={hotelNeeded}
                        onChange={(e) => setHotelNeeded(e.target.checked)}
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
                    placeholder="Tell us about specific interests (e.g., crocodile market, Dorze hand-loom weaving, bird species)..."
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Honest Submission Guarantee & Action Button */}
          <div className="pt-6 border-t border-sand-200 space-y-4">
            <div className="flex items-start gap-2.5 text-xs text-charcoal-muted">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Zero upfront payment:</strong> Submitting this request
                does not charge you. An AMX coordinator will verify provider
                availability and send you a clear, written quotation in ETB.
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