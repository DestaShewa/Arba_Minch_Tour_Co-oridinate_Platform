import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Privacy Policy"
        description="How AMX handles your trip inquiry details and WhatsApp contact information."
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-8 text-sm sm:text-base text-charcoal leading-relaxed">
        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-sand-300">
          <h2 className="text-xl font-bold text-primary">1. Information We Collect</h2>
          <p>
            When you submit a trip request with AMX, we collect only the necessary details to plan your itinerary: your name, WhatsApp phone number, planned travel dates, traveler count, and trip preferences.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-sand-300">
          <h2 className="text-xl font-bold text-primary">2. How We Use Your Information</h2>
          <p>
            Your contact information is used strictly by your assigned AMX trip coordinator to prepare your written quotation, verify availability with local providers, and assist you during your stay in Arba Minch.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-sand-300">
          <h2 className="text-xl font-bold text-primary">3. No Third-Party Marketing</h2>
          <p>
            We do not sell, rent, or distribute your WhatsApp number or travel details to third-party marketing companies. Only assigned drivers or guides receive your pickup location details on the day of service.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}