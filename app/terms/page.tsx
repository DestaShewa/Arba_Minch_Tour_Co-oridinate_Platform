import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Terms of Service & Responsibility"
        description="Clear, honest terms regarding AMX coordination, quotations, and partner responsibilities."
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-8 text-sm sm:text-base text-charcoal leading-relaxed">
        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-sand-300">
          <h2 className="text-xl font-bold text-primary">1. Our Role as Coordinator</h2>
          <p>
            AMX (Arba Minch Experiences) operates as a trusted local coordination service. AMX is not an impersonal directory or a multi-city marketplace. We coordinate verified independent local guides, licensed drivers, community boat operators, and partner lodges to deliver reliable itineraries.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-sand-300">
          <h2 className="text-xl font-bold text-primary">2. Pricing Transparency in Ethiopian Birr (ETB)</h2>
          <p>
            All quotations issued by AMX are in Ethiopian Birr (ETB) with clear itemized breakdowns. The quotation outlines vehicle coordination, guiding, boat charter, accommodation, and the transparent AMX coordination fee. Once a quotation is confirmed, AMX guarantees no hidden fees or surprise on-ground markups.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-sand-300">
          <h2 className="text-xl font-bold text-primary">3. Provider Verification & Safety</h2>
          <p>
            AMX personally inspects provider equipment (such as boat life-jacket provisions and vehicle roadworthiness) and verifies regional guiding accreditation. However, participants acknowledge that outdoor wildlife boat expeditions (such as hippo and crocodile viewing on Lake Chamo) involve inherent natural environments.
          </p>
        </section>

        <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-sand-300">
          <h2 className="text-xl font-bold text-primary">4. Cancellation & Changes</h2>
          <p>
            Half-day and one-day experiences may be cancelled or rescheduled up to 24 hours prior to scheduled departure. Multi-day packages involving partner lodge bookings require 48 hours notice. Detailed terms are provided on each written quotation document.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}