import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { ProviderCard } from "@/components/public/ProviderCard";
import { PROVIDERS } from "@/data/providers";
import { ShieldCheck, Compass, Car, Anchor, Building2 } from "lucide-react";

export default function ProvidersPage() {
  const guides = PROVIDERS.filter((p) => p.role === "guide");
  const drivers = PROVIDERS.filter((p) => p.role === "driver");
  const boatOperators = PROVIDERS.filter((p) => p.role === "boat_operator");
  const accommodations = PROVIDERS.filter((p) => p.role === "hotel");

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Verified Local Providers"
        description="AMX works with local guides, drivers, boat captains, and lodges. Every provider is verified in person. No unverified third-party listings."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-16">
        {/* Verification Guarantee Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-primary">How AMX Verifies Local Providers</h4>
            <p className="text-charcoal-muted">
              We do not use unverified public review ratings. Instead, the AMX coordinator team verifies driver vehicle mechanical checks, boat life-jacket safety provisions, regional guiding accreditation, and official community cooperative standing in person.
            </p>
          </div>
        </div>

        {/* Section 1: Certified Guides */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-sand-300 pb-3">
            <Compass className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Certified Local Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {guides.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </section>

        {/* Section 2: Verified Drivers */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-sand-300 pb-3">
            <Car className="w-5 h-5 text-secondary" />
            <h2 className="text-2xl font-bold text-primary">Verified Drivers & 4WD Transport</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {drivers.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </section>

        {/* Section 3: Lake Boat Operators & Partner Lodges */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-sand-300 pb-3">
              <Anchor className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold text-primary">Lake Chamo Boat Operators</h2>
            </div>
            {boatOperators.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-sand-300 pb-3">
              <Building2 className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold text-primary">Partner Lodges & Accommodations</h2>
            </div>
            {accommodations.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}