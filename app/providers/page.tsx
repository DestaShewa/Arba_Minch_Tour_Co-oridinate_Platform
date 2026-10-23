import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { ProviderCard } from "@/components/public/ProviderCard";
import { providerService } from "@/lib/services/providerService";
import { PrimaryButton } from "@/components/ui/Button";
import { ShieldCheck, Compass, Car, Anchor, Building2, Briefcase, ArrowRight } from "lucide-react";

export default function ProvidersPage() {
  // STRICT GUARD: Retrieve only actively verified, non-suspended providers
  const verifiedProviders = providerService.getPublicVerifiedProviders();

  const guides = verifiedProviders.filter((p) => p.role === "guide");
  const drivers = verifiedProviders.filter((p) => p.role === "driver");
  const boatOperators = verifiedProviders.filter((p) => p.role === "boat_operator");
  const accommodations = verifiedProviders.filter((p) => p.role === "hotel");
  const culturalAndOthers = verifiedProviders.filter(
    (p) => p.role === "cultural_provider" || p.role === "restaurant" || p.role === "tour_operator"
  );

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Verified Local Providers"
        description="Every guide, driver, boat captain, and partner lodge is personally verified in Arba Minch. No unverified third-party listings."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-16">
        {/* Verification Guarantee Notice */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
          <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-primary">AMX Verification Standard</h4>
            <p className="text-charcoal-muted leading-relaxed">
              We do not publish unverified public review ratings. Instead, every provider displayed below has undergone a 14-point audit in Arba Minch—including physical vehicle mechanical roadworthiness, boat life-jacket provisions, license validation, and agreed transparent pricing.
            </p>
          </div>
        </div>

        {/* Section 1: Certified Guides */}
        {guides.length > 0 && (
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
        )}

        {/* Section 2: Verified Drivers */}
        {drivers.length > 0 && (
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
        )}

        {/* Section 3: Boat Operators & Partner Lodges */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {boatOperators.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-sand-300 pb-3">
                <Anchor className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-bold text-primary">Lake Chamo Boat Operators</h2>
              </div>
              <div className="space-y-4">
                {boatOperators.map((p) => (
                  <ProviderCard key={p.id} provider={p} />
                ))}
              </div>
            </div>
          )}

          {accommodations.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-sand-300 pb-3">
                <Building2 className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-bold text-primary">Partner Lodges & Accommodations</h2>
              </div>
              <div className="space-y-4">
                {accommodations.map((p) => (
                  <ProviderCard key={p.id} provider={p} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Cultural Artisans & Other Verified Partners */}
        {culturalAndOthers.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-sand-300 pb-3">
              <h2 className="text-xl font-bold text-primary">Verified Cultural Artisans & Dining</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {culturalAndOthers.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </section>
        )}

        {/* Recruitment Callout Banner */}
        <section className="p-8 sm:p-10 rounded-2xl bg-sand-100 border border-sand-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-accent" /> Work With AMX
            </span>
            <h3 className="text-2xl font-bold text-primary">
              Are you a local guide, driver, boat captain, or lodge in Arba Minch?
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              We connect verified local tourism professionals with clear, well-coordinated travelers. No upfront listing fees. Fair net earnings with dedicated coordinator support.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/become-provider" className="w-full sm:w-auto">
              <PrimaryButton size="md" className="w-full font-bold">
                Become an AMX Provider <ArrowRight className="w-4 h-4 ml-1.5" />
              </PrimaryButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}