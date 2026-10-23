import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FileText,
  Camera,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Compass,
  Car,
  Anchor,
  Building2,
  Utensils,
  Sparkles,
} from "lucide-react";

export default function ProviderHelpPage() {
  const minimumDocuments = [
    { role: "Tour Guides", icon: <Compass className="w-5 h-5 text-primary" />, docs: ["Kebele ID or Passport", "Guide license or Association membership card (if available)", "Clear profile photo"] },
    { role: "Drivers & Transport", icon: <Car className="w-5 h-5 text-secondary" />, docs: ["Kebele ID or Passport", "Valid Commercial Driving License", "Photo of vehicle showing license plate", "Vehicle insurance or inspection sticker"] },
    { role: "Boat Operators", icon: <Anchor className="w-5 h-5 text-secondary" />, docs: ["Kebele ID", "Photo of boat showing vessel name", "Photo verifying personal flotation life jackets", "Cooperative membership confirmation"] },
    { role: "Hotels & Lodges", icon: <Building2 className="w-5 h-5 text-accent" />, docs: ["Business registration or municipal license (if available)", "Photos of property and room types", "Contact manager identification"] },
    { role: "Restaurants", icon: <Utensils className="w-5 h-5 text-accent" />, docs: ["Business license (if available)", "Sample group menu", "Dining room photos"] },
    { role: "Cultural Cooperatives", icon: <Sparkles className="w-5 h-5 text-primary" />, docs: ["Community group confirmation", "Photos of craft/homestead demonstration", "Elder / Leader contact info"] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Provider Verification Help Hub"
        description="Everything you need to know about preparing your documents, photos, and physical inspection to become an AMX Verified partner."
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-12">
        {/* Document Requirements by Role */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Minimum Verification Documents
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted">
              We keep requirements simple at the start. You only need to provide what is strictly necessary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {minimumDocuments.map((item, idx) => (
              <Card key={idx} className="p-5 bg-white border border-sand-300 space-y-3">
                <div className="flex items-center gap-2.5 font-bold text-charcoal text-sm">
                  {item.icon}
                  <span>{item.role}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-charcoal-muted">
                  {item.docs.map((doc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Photo Guidelines */}
        <section className="bg-sand-50 border border-sand-300 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
            <Camera className="w-5 h-5 text-secondary" /> Photo Quality Guidelines
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-charcoal-muted">
            <div className="p-3 bg-white rounded-lg border border-sand-200 space-y-1">
              <strong className="text-charcoal block">Profile Photos</strong>
              <p>Clear portrait of the person who will meet the traveler. No sunglasses or blurry photos.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-sand-200 space-y-1">
              <strong className="text-charcoal block">Vehicle / Boat Photos</strong>
              <p>Show the entire vehicle or boat in good daytime light, clearly showing the license plate or vessel number.</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-sand-200 space-y-1">
              <strong className="text-charcoal block">Room & Food Photos</strong>
              <p>Clean, genuine photos of actual chalets or dining setups. Do not use generic internet photos.</p>
            </div>
          </div>
        </section>

        {/* What Happens During Inspection */}
        <section className="space-y-4">
          <h3 className="text-base font-bold text-primary flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> What the AMX Coordinator Checks
          </h3>
          <div className="p-5 bg-white border border-sand-300 rounded-xl space-y-3 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            <p>
              After you submit your application, your assigned coordinator will call you to verify your availability rules and location in Arba Minch.
            </p>
            <p>
              For drivers and boat captains, the coordinator will arrange a 10-minute in-person inspection in Sikela, Secha, or at the Lake Chamo dock to check life jackets, seat cleanliness, and vehicle air conditioning.
            </p>
          </div>
        </section>

        {/* Direct WhatsApp Assistance */}
        <section className="p-6 rounded-2xl bg-primary-900 text-warmWhite flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-md">
            <h4 className="font-bold text-white text-base">Need help with your application?</h4>
            <p className="text-xs text-sand-200">
              Our Provider Liaison in Arba Minch can assist you with document uploads or questions.
            </p>
          </div>
          <div className="shrink-0 flex gap-3">
            <WhatsAppButton
              size="md"
              message="Hello AMX, I need assistance registering as a local provider."
            >
              Ask on WhatsApp
            </WhatsAppButton>
            <Link href="/become-provider/register">
              <PrimaryButton size="md" className="font-bold bg-accent hover:bg-accent-600 text-white">
                Register Now
              </PrimaryButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}