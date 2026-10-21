import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { PackageCard } from "@/components/public/PackageCard";
import { PACKAGES } from "@/data/packages";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Arba Minch Experience Packages"
        description="Every package includes verified local drivers, certified guides, boat charters, and an assigned AMX coordinator on the ground."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PACKAGES.map((pkg, idx) => (
            <PackageCard key={pkg.id} pkg={pkg} priority={idx === 0} />
          ))}
        </div>

        {/* Transparent Booking Disclaimer */}
        <div className="p-6 bg-sand-100 border border-sand-300 rounded-xl space-y-2 text-xs sm:text-sm text-charcoal-muted">
          <h4 className="font-bold text-charcoal">About AMX Package Pricing:</h4>
          <p>
            Starting prices in ETB are calculated based on small group minimums. Your exact written quotation depends on actual travel dates, requested vehicle type (4WD or minibus), and lodge categories. Availability is manually checked with local providers prior to confirming your quotation.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}