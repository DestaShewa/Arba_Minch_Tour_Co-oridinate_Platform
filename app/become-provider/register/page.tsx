"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextArea } from "@/components/forms/TextArea";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { PrimaryButton, SecondaryButton, WhatsAppButton } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/Feedback";
import { Card } from "@/components/ui/Card";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderType, ProviderServicePayload } from "@/types/provider-onboarding";
import {
  Compass,
  Car,
  Anchor,
  Building2,
  Utensils,
  Sparkles,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  Upload,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  FileText,
} from "lucide-react";

const CATEGORIES: { type: ProviderType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: "guide", label: "Tour Guide", icon: <Compass className="w-5 h-5 text-primary" />, desc: "Certified wildlife, cultural, or trekking guide" },
  { type: "driver", label: "Driver / Transport", icon: <Car className="w-5 h-5 text-secondary" />, desc: "Licensed 4WD, Prado, or minibus vehicle owner" },
  { type: "boat_operator", label: "Boat Operator", icon: <Anchor className="w-5 h-5 text-secondary" />, desc: "Lake Chamo licensed vessel & captain" },
  { type: "hotel", label: "Hotel or Lodge", icon: <Building2 className="w-5 h-5 text-accent" />, desc: "Ridge lodge, eco-resort, or town accommodation" },
  { type: "restaurant", label: "Restaurant", icon: <Utensils className="w-5 h-5 text-accent" />, desc: "Fresh fish kitchen or group dining establishment" },
  { type: "cultural_provider", label: "Cultural Artisan", icon: <Sparkles className="w-5 h-5 text-primary" />, desc: "Dorze weaving homestead or heritage cooperative" },
  { type: "tour_operator", label: "Tour Operator", icon: <Briefcase className="w-5 h-5 text-secondary" />, desc: "Local operator with package coordination" },
  { type: "other", label: "Other Tourism Service", icon: <HelpCircle className="w-5 h-5 text-charcoal-muted" />, desc: "Equipment rental, photography, or specialty" },
];

const WORKING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ProviderRegisterWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Step 1: Category
  const [providerType, setProviderType] = useState<ProviderType>("guide");

  // Step 2: Contact
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+251");
  const [whatsappNumber, setWhatsappNumber] = useState("+251");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cityArea, setCityArea] = useState("Arba Minch - Sikela");
  const [preferredLanguage, setPreferredLanguage] = useState("Amharic");

  // Step 3: Business & Emergency
  const [businessName, setBusinessName] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("+251");
  const [emergencyRelationship, setEmergencyRelationship] = useState("Spouse");

  // Step 4: Dynamic Specifics
  // Guide specifics
  const [guideLicense, setGuideLicense] = useState("");
  const [guideSpecialties, setGuideSpecialties] = useState<string[]>(["wildlife", "culture"]);
  const [guideLanguages, setGuideLanguages] = useState("English, Amharic");
  const [guideExpYears, setGuideExpYears] = useState("5");
  const [guideDailyRate, setGuideDailyRate] = useState("1,800 ETB");
  const [guideServiceAreas, setGuideServiceAreas] = useState("Lake Chamo, Dorze, Nech Sar");

  // Driver specifics
  const [driverVehicleType, setDriverVehicleType] = useState("Toyota Land Cruiser 4WD (Hardtop)");
  const [driverSeats, setDriverSeats] = useState("6");
  const [driverPlateNumber, setDriverPlateNumber] = useState("");
  const [driverAC, setDriverAC] = useState(true);
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
  const [driverPriceBasis, setDriverPriceBasis] = useState<"per_day" | "per_trip">("per_day");

  // Boat specifics
  const [boatName, setBoatName] = useState("");
  const [boatCapacity, setBoatCapacity] = useState("8");
  const [boatLifeJackets, setBoatLifeJackets] = useState(true);
  const [boatCaptainName, setBoatCaptainName] = useState("");
  const [boatDock, setBoatDock] = useState("Lake Chamo Main Dock");

  // Hotel specifics
  const [hotelPropertyType, setHotelPropertyType] = useState<"lodge" | "hotel">("lodge");
  const [hotelTotalRooms, setHotelTotalRooms] = useState("12");
  const [hotelPriceRange, setHotelPriceRange] = useState("3,500 - 5,500 ETB / night");
  const [hotelCheckIn, setHotelCheckIn] = useState("12:00 PM");
  const [hotelCheckOut, setHotelCheckOut] = useState("10:00 AM");

  // Restaurant / Cultural / Other
  const [culturalExperienceName, setCulturalExperienceName] = useState("");
  const [restaurantCuisine, setRestaurantCuisine] = useState("Fresh Chamo Fish, Traditional Ethiopian");

  // Step 5: Document Upload Simulation
  const [idUploaded, setIdUploaded] = useState(false);
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [vehicleBoatPhotoUploaded, setVehicleBoatPhotoUploaded] = useState(false);

  // Step 6: Pricing & Commission
  const [customerPriceETB, setCustomerPriceETB] = useState("2,500 ETB");
  const [netPriceETB, setNetPriceETB] = useState("2,200 ETB");
  const [commissionModel, setCommissionModel] = useState<"percentage" | "fixed_referral_fee">("percentage");
  const [commissionRateOrAmount, setCommissionRateOrAmount] = useState("10");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
  const [cancellationPolicy, setCancellationPolicy] = useState("Free cancellation up to 24 hours prior to trip");

  // Step 7: Agreement
  const [agreeAccurate, setAgreeAccurate] = useState(false);
  const [agreeSafety, setAgreeSafety] = useState(false);
  const [agreeCommission, setAgreeCommission] = useState(false);
  const [agreeSuspension, setAgreeSuspension] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const validateStep = (): boolean => {
    setErrorMsg("");
    if (currentStep === 2) {
      if (!fullName.trim() || fullName.trim().length < 2) {
        setErrorMsg("Please enter your full name.");
        return false;
      }
      if (phoneNumber.length < 9) {
        setErrorMsg("Please enter a valid phone number.");
        return false;
      }
      if (!email.includes("@")) {
        setErrorMsg("Please enter a valid email address.");
        return false;
      }
      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters.");
        return false;
      }
    }
    if (currentStep === 3) {
      if (!emergencyName.trim() || emergencyPhone.length < 9) {
        setErrorMsg("A reachable 24/7 emergency contact name and phone are required.");
        return false;
      }
    }
    if (currentStep === 4) {
      if (providerType === "driver" && !driverPlateNumber.trim()) {
        setErrorMsg("Vehicle plate number is required for drivers.");
        return false;
      }
      if (providerType === "boat_operator" && (!boatName.trim() || !boatLifeJackets)) {
        setErrorMsg("Boat vessel name and life jacket confirmation are required.");
        return false;
      }
    }
    if (currentStep === 6) {
      if (!netPriceETB.trim()) {
        setErrorMsg("Please specify your net earning rate in ETB.");
        return false;
      }
    }
    if (currentStep === 7) {
      if (!agreeAccurate || !agreeSafety || !agreeCommission || !agreeSuspension) {
        setErrorMsg("You must accept all required provider standards and agreement terms.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setErrorMsg("");
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await new Promise(r => setTimeout(r, 600));

      // Build category-specific service profile payload
      let servicePayload: ProviderServicePayload;
      if (providerType === "guide") {
        servicePayload = {
          type: "guide",
          details: {
            licenseNumber: guideLicense,
            specializations: guideSpecialties as ("wildlife" | "culture")[],
            languages: guideLanguages.split(",").map(l => l.trim()),
            experienceYears: parseInt(guideExpYears, 10) || 5,
            serviceAreas: guideServiceAreas.split(",").map(s => s.trim()),
            dailyRateETB: guideDailyRate,
          },
        };
      } else if (providerType === "driver") {
        servicePayload = {
          type: "driver",
          details: {
            vehicleType: driverVehicleType,
            seatCapacity: parseInt(driverSeats, 10) || 6,
            plateNumber: driverPlateNumber,
            hasAirConditioning: driverAC,
            driverLicenseNumber: driverLicenseNumber || "Verified",
            priceBasis: driverPriceBasis,
            serviceAreas: ["Arba Minch Town", "Dorze Route", "Lake Chamo Dock"],
          },
        };
      } else if (providerType === "boat_operator") {
        servicePayload = {
          type: "boat_operator",
          details: {
            boatName,
            capacityPassengers: parseInt(boatCapacity, 10) || 8,
            lifeJacketsAvailable: boatLifeJackets,
            captainName: boatCaptainName || fullName,
            departureDock: boatDock,
            tripDurationHours: "2.5 Hours",
            safetyRulesSummary: "Mandatory life jacket usage. 15m safe distance from hippos.",
            weatherCancellationPolicy: "Immediate return on lake chop or adverse wind.",
          },
        };
      } else if (providerType === "hotel") {
        servicePayload = {
          type: "hotel",
          details: {
            propertyType: hotelPropertyType,
            totalRooms: parseInt(hotelTotalRooms, 10) || 12,
            roomCategories: [{ categoryName: "Standard Chalet / Room", count: 12, priceRangeETB: hotelPriceRange }],
            facilities: ["Wi-Fi", "Restaurant", "Lake View"],
            checkInTime: hotelCheckIn,
            checkOutTime: hotelCheckOut,
            cancellationPolicy,
            contactPersonName: fullName,
          },
        };
      } else if (providerType === "cultural_provider") {
        servicePayload = {
          type: "cultural_provider",
          details: {
            experienceName: culturalExperienceName || "Dorze Village Cultural Immersion",
            communityName: businessName || "Dorze Community Group",
            durationHours: "2 Hours",
            maxGroupSize: 12,
            languages: ["Amharic", "Dorze"],
            culturalGuidelines: "Respectful photography inside homes. Fair artisan support.",
          },
        };
      } else {
        servicePayload = {
          type: "restaurant",
          details: {
            cuisineTypes: restaurantCuisine.split(",").map(c => c.trim()),
            seatingCapacity: 30,
            hasGroupMenu: true,
            openingHours: "07:00 AM - 09:30 PM",
            averageMealPriceETB: "350 - 650 ETB",
          },
        };
      }

      const app = providerOnboardingService.createApplication({
        fullName,
        phoneNumber,
        whatsappNumber,
        email,
        cityArea,
        preferredLanguage,
        businessName: businessName || undefined,
        tinNumber: tinNumber || undefined,
        emergencyContact: {
          name: emergencyName,
          phone: emergencyPhone,
          relationship: emergencyRelationship,
        },
        providerType,
        serviceProfile: servicePayload,
        customerPriceETB,
        netPriceETB,
        commissionModel,
        commissionRateOrAmount,
        settlementTerms: "Settled on trip completion or weekly invoice",
        cancellationPolicy,
      });

      router.push(
        `/become-provider/register/success?ref=${app.applicationNumber}&name=${encodeURIComponent(
          fullName
        )}&type=${providerType}`
      );
    } catch {
      setErrorMsg("We could not process your application. Please check fields or contact WhatsApp support.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="AMX Provider Registration Wizard"
        description="Register your service in Arba Minch. Complete the 7 short steps to begin coordinator verification."
        breadcrumb={
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/become-provider" className="hover:underline">For Providers</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Registration</span>
          </div>
        }
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex-1 w-full space-y-8">
        {/* Step Progress Bar */}
        <div className="p-4 bg-white rounded-xl border border-sand-300 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-charcoal">
            <span>Step {currentStep} of 7: {
              currentStep === 1 ? "Service Category" :
              currentStep === 2 ? "Contact & Account" :
              currentStep === 3 ? "Business & Emergency" :
              currentStep === 4 ? `${CATEGORIES.find(c => c.type === providerType)?.label} Details` :
              currentStep === 5 ? "Documents & Photos" :
              currentStep === 6 ? "Pricing & Availability" : "Agreement & Sign-off"
            }</span>
            <span className="text-primary">{Math.round((currentStep / 7) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>
        </div>

        {errorMsg && <ErrorMessage title="Validation Note" message={errorMsg} />}

        {/* Wizard Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* STEP 1: Provider Category Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-sand-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Step 1</span>
                <h2 className="text-xl font-bold text-primary mt-1">What service do you provide in Arba Minch?</h2>
                <p className="text-xs text-charcoal-muted mt-0.5">Select the primary service you wish to offer on AMX.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = providerType === cat.type;
                  return (
                    <button
                      key={cat.type}
                      type="button"
                      onClick={() => setProviderType(cat.type)}
                      className={`tap-target p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                        isSelected
                          ? "bg-primary-50/70 border-primary ring-2 ring-primary/20 shadow-xs"
                          : "bg-white border-sand-300 hover:bg-sand-50"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-white border border-sand-200 shrink-0 mt-0.5">
                        {cat.icon}
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-sm font-bold text-charcoal block">{cat.label}</strong>
                        <p className="text-xs text-charcoal-muted leading-relaxed">{cat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Contact Information & Account */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-sand-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Step 2</span>
                <h2 className="text-xl font-bold text-primary mt-1">Contact Information & Login</h2>
                <p className="text-xs text-charcoal-muted mt-0.5">Used by the AMX coordinator for verification calls.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Full Name (Legal)" htmlFor="fullName" required>
                  <TextInput
                    id="fullName"
                    placeholder="e.g. Dawit Wolde"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormField>

                <FormField label="Preferred Language" htmlFor="preferredLanguage" required>
                  <SelectInput
                    id="preferredLanguage"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    options={[
                      { value: "Amharic", label: "Amharic" },
                      { value: "English", label: "English" },
                      { value: "Gamo", label: "Gamo" },
                      { value: "Dorze", label: "Dorze" },
                    ]}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Direct Phone Number" htmlFor="phoneNumber" required helperText="For coordinator verification call">
                  <PhoneInput
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </FormField>

                <FormField label="WhatsApp Number" htmlFor="whatsappNumber" required helperText="For receiving booking briefs">
                  <PhoneInput
                    id="whatsappNumber"
                    value={whatsappNumber}
                    onChange={setWhatsappNumber}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Email Address" htmlFor="email" required>
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="dawit@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormField>

                <FormField label="Create Portal Password" htmlFor="password" required helperText="Minimum 6 characters">
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="City / Service Area Base" htmlFor="cityArea" required helperText="Where in Arba Minch do you operate?">
                <TextInput
                  id="cityArea"
                  placeholder="e.g. Arba Minch - Sikela or Dorze Chencha"
                  value={cityArea}
                  onChange={(e) => setCityArea(e.target.value)}
                />
              </FormField>
            </div>
          )}

          {/* STEP 3: Business & Emergency Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-sand-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Step 3</span>
                <h2 className="text-xl font-bold text-primary mt-1">Business & Emergency Contact</h2>
                <p className="text-xs text-charcoal-muted mt-0.5">Optional business registration plus mandatory emergency contact.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Business / Trade Name (Optional)" htmlFor="businessName" helperText="If operating under registered trade name">
                  <TextInput
                    id="businessName"
                    placeholder="e.g. Dawit Rift Valley Transport"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </FormField>

                <FormField label="TIN Number (Optional)" htmlFor="tinNumber">
                  <TextInput
                    id="tinNumber"
                    placeholder="e.g. 001928374"
                    value={tinNumber}
                    onChange={(e) => setTinNumber(e.target.value)}
                  />
                </FormField>
              </div>

              <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 space-y-4">
                <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Mandatory 24/7 Emergency Contact
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Someone reachable if you are out of range while guiding or driving.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Emergency Contact Name" htmlFor="emergencyName" required>
                    <TextInput
                      id="emergencyName"
                      placeholder="e.g. Tirhas Wolde"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                    />
                  </FormField>

                  <FormField label="Emergency Phone" htmlFor="emergencyPhone" required>
                    <PhoneInput
                      id="emergencyPhone"
                      value={emergencyPhone}
                      onChange={setEmergencyPhone}
                    />
                  </FormField>

                  <FormField label="Relationship" htmlFor="emergencyRelationship" required>
                    <SelectInput
                      id="emergencyRelationship"
                      value={emergencyRelationship}
                      onChange={(e) => setEmergencyRelationship(e.target.value)}
                      options={[
                        { value: "Spouse", label: "Spouse" },
                        { value: "Family Member", label: "Family Member" },
                        { value: "Business Manager", label: "Business Manager" },
                        { value: "Colleague", label: "Colleague / Association" },
                      ]}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Dynamic Specifics (Changes according to Step 1 choice) */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-sand-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Step 4</span>
                <h2 className="text-xl font-bold text-primary mt-1">
                  {providerType === "guide" && "Tour Guide Service Details"}
                  {providerType === "driver" && "Vehicle & Driver Specifications"}
                  {providerType === "boat_operator" && "Boat Vessel & Safety Rules"}
                  {providerType === "hotel" && "Lodge / Hotel Room Inventory"}
                  {providerType === "restaurant" && "Restaurant & Cuisine Details"}
                  {providerType === "cultural_provider" && "Cultural Experience Guidelines"}
                  {(providerType === "tour_operator" || providerType === "other") && "Service Description"}
                </h2>
                <p className="text-xs text-charcoal-muted mt-0.5">Detailed parameters needed to calculate accurate itineraries.</p>
              </div>

              {/* Guide Form */}
              {providerType === "guide" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Guide License or Association #" htmlFor="guideLicense" helperText="Association badge number if available">
                      <TextInput
                        id="guideLicense"
                        placeholder="e.g. GAMO-GUIDE-104"
                        value={guideLicense}
                        onChange={(e) => setGuideLicense(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Years of Guiding Experience" htmlFor="guideExpYears" required>
                      <TextInput
                        id="guideExpYears"
                        type="number"
                        value={guideExpYears}
                        onChange={(e) => setGuideExpYears(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <FormField label="Guiding Languages" htmlFor="guideLanguages" required helperText="Comma separated">
                    <TextInput
                      id="guideLanguages"
                      value={guideLanguages}
                      onChange={(e) => setGuideLanguages(e.target.value)}
                    />
                  </FormField>

                  <FormField label="Guiding Specialties" htmlFor="guideSpecialties" required>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {["wildlife", "culture", "birdwatching", "hiking", "photography"].map((spec) => (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => setGuideSpecialties(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec])}
                          className={`tap-target px-3 py-1.5 rounded-full text-xs font-semibold capitalize border ${
                            guideSpecialties.includes(spec) ? "bg-primary text-warmWhite border-primary" : "bg-sand-100 text-charcoal border-sand-300"
                          }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>
                  </FormField>

                  <FormField label="Primary Service Areas" htmlFor="guideServiceAreas" required>
                    <TextInput
                      id="guideServiceAreas"
                      value={guideServiceAreas}
                      onChange={(e) => setGuideServiceAreas(e.target.value)}
                    />
                  </FormField>
                </div>
              )}

              {/* Driver Form */}
              {providerType === "driver" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Vehicle Model / Type" htmlFor="driverVehicleType" required>
                      <SelectInput
                        id="driverVehicleType"
                        value={driverVehicleType}
                        onChange={(e) => setDriverVehicleType(e.target.value)}
                        options={[
                          { value: "Toyota Land Cruiser 4WD (Hardtop)", label: "Toyota Land Cruiser 4WD (Hardtop)" },
                          { value: "Toyota Land Cruiser Prado 4WD", label: "Toyota Land Cruiser Prado 4WD" },
                          { value: "Toyota HiAce Minibus (12 Seater)", label: "Toyota HiAce Minibus (12 Seater)" },
                          { value: "Standard Town Car / Sedan", label: "Standard Town Car / Sedan" },
                        ]}
                      />
                    </FormField>

                    <FormField label="Passenger Seat Capacity" htmlFor="driverSeats" required>
                      <TextInput
                        id="driverSeats"
                        type="number"
                        value={driverSeats}
                        onChange={(e) => setDriverSeats(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Vehicle License Plate #" htmlFor="driverPlateNumber" required helperText="e.g. ET-3-81290">
                      <TextInput
                        id="driverPlateNumber"
                        placeholder="ET-3-81290"
                        value={driverPlateNumber}
                        onChange={(e) => setDriverPlateNumber(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Commercial Driver License #" htmlFor="driverLicenseNumber" required>
                      <TextInput
                        id="driverLicenseNumber"
                        placeholder="DL-GAMO-8821"
                        value={driverLicenseNumber}
                        onChange={(e) => setDriverLicenseNumber(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <label className="tap-target flex items-center gap-3 p-3 rounded-xl border border-sand-300 bg-sand-50 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={driverAC}
                      onChange={(e) => setDriverAC(e.target.checked)}
                      className="w-5 h-5 text-primary rounded accent-primary"
                    />
                    <span className="text-xs font-semibold text-charcoal">Vehicle has functional Air Conditioning (A/C)</span>
                  </label>
                </div>
              )}

              {/* Boat Operator Form */}
              {providerType === "boat_operator" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Vessel / Boat Name" htmlFor="boatName" required helperText="e.g. Chamo Star 02">
                      <TextInput
                        id="boatName"
                        placeholder="e.g. Chamo Star 02"
                        value={boatName}
                        onChange={(e) => setBoatName(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Maximum Passenger Capacity" htmlFor="boatCapacity" required>
                      <TextInput
                        id="boatCapacity"
                        type="number"
                        value={boatCapacity}
                        onChange={(e) => setBoatCapacity(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <label className="tap-target flex items-center gap-3 p-3.5 rounded-xl border border-sand-300 bg-amber-50/50 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={boatLifeJackets}
                      onChange={(e) => setBoatLifeJackets(e.target.checked)}
                      className="w-5 h-5 text-primary rounded accent-primary"
                    />
                    <span className="text-xs font-bold text-charcoal">I confirm that fitted life jackets are provided for every passenger on every trip.</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Captain Name" htmlFor="boatCaptainName">
                      <TextInput
                        id="boatCaptainName"
                        placeholder="e.g. Berhanu Girma"
                        value={boatCaptainName}
                        onChange={(e) => setBoatCaptainName(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Primary Departure Dock" htmlFor="boatDock">
                      <TextInput
                        id="boatDock"
                        value={boatDock}
                        onChange={(e) => setBoatDock(e.target.value)}
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* Hotel / Lodge Form */}
              {providerType === "hotel" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Property Category" htmlFor="hotelPropertyType" required>
                      <SelectInput
                        id="hotelPropertyType"
                        value={hotelPropertyType}
                        onChange={(e) => setHotelPropertyType(e.target.value as "lodge" | "hotel")}
                        options={[
                          { value: "lodge", label: "Scenic Ridge / Eco Lodge" },
                          { value: "hotel", label: "Town Hotel / Guesthouse" },
                        ]}
                      />
                    </FormField>

                    <FormField label="Total Guest Rooms Available" htmlFor="hotelTotalRooms" required>
                      <TextInput
                        id="hotelTotalRooms"
                        type="number"
                        value={hotelTotalRooms}
                        onChange={(e) => setHotelTotalRooms(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Check-in Time" htmlFor="hotelCheckIn">
                      <TextInput
                        id="hotelCheckIn"
                        value={hotelCheckIn}
                        onChange={(e) => setHotelCheckIn(e.target.value)}
                      />
                    </FormField>

                    <FormField label="Check-out Time" htmlFor="hotelCheckOut">
                      <TextInput
                        id="hotelCheckOut"
                        value={hotelCheckOut}
                        onChange={(e) => setHotelCheckOut(e.target.value)}
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* Fallback for other / cultural / restaurant */}
              {(providerType === "cultural_provider" || providerType === "restaurant" || providerType === "tour_operator" || providerType === "other") && (
                <div className="space-y-5">
                  <FormField label="Service / Experience Description" htmlFor="culturalExperienceName" required>
                    <TextArea
                      id="culturalExperienceName"
                      rows={4}
                      placeholder="Describe what your service provides to travelers visiting Arba Minch..."
                      value={culturalExperienceName}
                      onChange={(e) => setCulturalExperienceName(e.target.value)}
                    />
                  </FormField>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Document & Photo Upload Simulator */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-sand-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Step 5</span>
                <h2 className="text-xl font-bold text-primary mt-1">Minimum Verification Documents & Photos</h2>
                <p className="text-xs text-charcoal-muted mt-0.5">Upload clear photos for AMX manual verification.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setIdUploaded(!idUploaded)}
                  className={`tap-target p-5 rounded-xl border text-center space-y-2 cursor-pointer transition-colors ${
                    idUploaded ? "bg-green-50/70 border-green-300" : "bg-sand-50 border-sand-300 hover:bg-sand-100"
                  }`}
                >
                  <Upload className={`w-6 h-6 mx-auto ${idUploaded ? "text-green-600" : "text-charcoal-muted"}`} />
                  <strong className="text-xs font-bold text-charcoal block">Kebele ID / Passport</strong>
                  <span className={`text-[11px] font-semibold block ${idUploaded ? "text-green-700" : "text-charcoal-muted"}`}>
                    {idUploaded ? "✓ Uploaded (dawit-id.jpg)" : "Click to select file"}
                  </span>
                </div>

                <div
                  onClick={() => setLicenseUploaded(!licenseUploaded)}
                  className={`tap-target p-5 rounded-xl border text-center space-y-2 cursor-pointer transition-colors ${
                    licenseUploaded ? "bg-green-50/70 border-green-300" : "bg-sand-50 border-sand-300 hover:bg-sand-100"
                  }`}
                >
                  <FileText className={`w-6 h-6 mx-auto ${licenseUploaded ? "text-green-600" : "text-charcoal-muted"}`} />
                  <strong className="text-xs font-bold text-charcoal block">License / Association Card</strong>
                  <span className={`text-[11px] font-semibold block ${licenseUploaded ? "text-green-700" : "text-charcoal-muted"}`}>
                    {licenseUploaded ? "✓ Uploaded (license.pdf)" : "Click to select file"}
                  </span>
                </div>

                <div
                  onClick={() => setVehicleBoatPhotoUploaded(!vehicleBoatPhotoUploaded)}
                  className={`tap-target p-5 rounded-xl border text-center space-y-2 cursor-pointer transition-colors ${
                    vehicleBoatPhotoUploaded ? "bg-green-50/70 border-green-300" : "bg-sand-50 border-sand-300 hover:bg-sand-100"
                  }`}
                >
                  <ShieldCheck className={`w-6 h-6 mx-auto ${vehicleBoatPhotoUploaded ? "text-green-600" : "text-charcoal-muted"}`} />
                  <strong className="text-xs font-bold text-charcoal block">Vehicle / Boat / Service Photo</strong>
                  <span className={`text-[11px] font-semibold block ${vehicleBoatPhotoUploaded ? "text-green-700" : "text-charcoal-muted"}`}>
                    {vehicleBoatPhotoUploaded ? "✓ Uploaded (service-photo.jpg)" : "Click to select file"}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-sand-100 rounded-xl text-xs text-charcoal-muted space-y-1">
                <strong className="text-charcoal block">Photo & Document Rules:</strong>
                <p>• Make sure driver license and vehicle plate numbers are legible.</p>
                <p>• Boat operators should provide a photo showing vessel seating and life jackets.</p>
                <p>• Need upload assistance? Your coordinator can also receive photos on WhatsApp during verification.</p>
              </div>
            </div>
          )}

          {/* STEP 6: Pricing, Net Earnings & Commission Preference */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="border-b border-sand-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Step 6</span>
                <h2 className="text-xl font-bold text-primary mt-1">Pricing & Commercial Agreement</h2>
                <p className="text-xs text-charcoal-muted mt-0.5">Define your true net earnings and preferred AMX commission rate.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Your True Net Earning Rate (ETB)" htmlFor="netPriceETB" required helperText="What you receive per service / day">
                  <TextInput
                    id="netPriceETB"
                    placeholder="e.g. 5,000 ETB / day"
                    value={netPriceETB}
                    onChange={(e) => setNetPriceETB(e.target.value)}
                  />
                </FormField>

                <FormField label="Estimated Customer Retail Price (ETB)" htmlFor="customerPriceETB" required helperText="Published on quotation">
                  <TextInput
                    id="customerPriceETB"
                    placeholder="e.g. 5,500 - 6,500 ETB"
                    value={customerPriceETB}
                    onChange={(e) => setCustomerPriceETB(e.target.value)}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Preferred Commission Model" htmlFor="commissionModel">
                  <SelectInput
                    id="commissionModel"
                    value={commissionModel}
                    onChange={(e) => setCommissionModel(e.target.value as "percentage" | "fixed_referral_fee")}
                    options={[
                      { value: "percentage", label: "Percentage Commission (5% - 15%)" },
                      { value: "fixed_referral_fee", label: "Fixed Referral Fee per Trip" },
                    ]}
                  />
                </FormField>

                <FormField
                  label={commissionModel === "percentage" ? "Commission Percentage (%)" : "Fixed Referral Fee (ETB)"}
                  htmlFor="commissionRateOrAmount"
                  required
                >
                  <TextInput
                    id="commissionRateOrAmount"
                    placeholder={commissionModel === "percentage" ? "10" : "500"}
                    value={commissionRateOrAmount}
                    onChange={(e) => setCommissionRateOrAmount(e.target.value)}
                  />
                </FormField>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-charcoal block">Available Operating Days:</span>
                <div className="flex flex-wrap gap-2">
                  {WORKING_DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`tap-target px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        selectedDays.includes(day)
                          ? "bg-primary text-warmWhite border-primary"
                          : "bg-sand-100 text-charcoal-muted border-sand-300"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Provider Agreement Consent & Submission */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="border-b border-sand-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Step 7</span>
                <h2 className="text-xl font-bold text-primary mt-1">Provider Agreement & Sign-Off</h2>
                <p className="text-xs text-charcoal-muted mt-0.5">Please review and consent to AMX operational terms before submitting.</p>
              </div>

              <div className="p-4 bg-sand-50 rounded-xl border border-sand-200 space-y-3 text-xs leading-relaxed">
                <p className="font-bold text-charcoal">Summary of Obligations:</p>
                <p>• You confirm you hold valid permits, licenses, and maintain roadworthy vehicles or lake-safe boats.</p>
                <p>• You agree to 15-minute advance arrival for scheduled pickups and strict passenger safety rules.</p>
                <p>• You agree that agreed net rates remain binding once quoted to travelers.</p>
                <p>• Read full 15 clauses on our <Link href="/provider-agreement" target="_blank" className="font-bold text-primary underline">Provider Agreement page</Link>.</p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="tap-target flex items-start gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeAccurate}
                    onChange={(e) => setAgreeAccurate(e.target.checked)}
                    className="w-5 h-5 text-primary rounded accent-primary mt-0.5 shrink-0"
                  />
                  <span className="text-xs font-medium text-charcoal">I certify that all personal, vehicle, license, and pricing details submitted are truthful.</span>
                </label>

                <label className="tap-target flex items-start gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeSafety}
                    onChange={(e) => setAgreeSafety(e.target.checked)}
                    className="w-5 h-5 text-primary rounded accent-primary mt-0.5 shrink-0"
                  />
                  <span className="text-xs font-medium text-charcoal">I accept legal responsibility for customer safety, equipment roadworthiness, and life jackets.</span>
                </label>

                <label className="tap-target flex items-start gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeCommission}
                    onChange={(e) => setAgreeCommission(e.target.checked)}
                    className="w-5 h-5 text-primary rounded accent-primary mt-0.5 shrink-0"
                  />
                  <span className="text-xs font-medium text-charcoal">I agree to the commission structure ({commissionRateOrAmount}{commissionModel === "percentage" ? "%" : " ETB"}) and settlement terms.</span>
                </label>

                <label className="tap-target flex items-start gap-3 p-3 rounded-lg border border-sand-300 bg-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeSuspension}
                    onChange={(e) => setAgreeSuspension(e.target.checked)}
                    className="w-5 h-5 text-primary rounded accent-primary mt-0.5 shrink-0"
                  />
                  <span className="text-xs font-medium text-charcoal">I accept AMX’s right to suspend unverified or non-compliant providers for safety violations.</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-sand-200 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <SecondaryButton
                type="button"
                variant="outline"
                size="md"
                onClick={prevStep}
                disabled={isSubmitting}
                className="font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </SecondaryButton>
            ) : <div />}

            {currentStep < 7 ? (
              <PrimaryButton
                type="button"
                size="md"
                onClick={nextStep}
                className="font-bold"
              >
                Continue to Step {currentStep + 1} <ArrowRight className="w-4 h-4 ml-1.5" />
              </PrimaryButton>
            ) : (
              <PrimaryButton
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="font-bold bg-accent hover:bg-accent-600 text-white"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application for Verification"}
              </PrimaryButton>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}