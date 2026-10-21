import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PROVIDERS } from "@/data/providers";
import { PACKAGES } from "@/data/packages";
import { VerifiedBadge } from "@/components/ui/Badge";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { ShieldCheck, MapPin, Globe, Award, Car, Anchor, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return PROVIDERS.map((provider) => ({
    slug: provider.slug,
  }));
}

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = PROVIDERS.find((p) => p.slug === slug);

  if (!provider) {
    notFound();
  }

  const linkedPackages = PACKAGES.filter((pkg) =>
    provider.relatedPackageSlugs.includes(pkg.slug)
  );

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-12">
        {/* Profile Card Header */}
        <div className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/20 shadow-xs bg-sand-200">
              <Image
                src={provider.photo}
                alt={provider.name}
                fill
                priority
                sizes="(max-width: 640px) 112px, 144px"
                className="object-cover"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-bold text-secondary-800 bg-secondary-50 px-2.5 py-1 rounded">
                  {provider.role.replace("_", " ")}
                </span>
                <VerifiedBadge lastCheckedDate={provider.lastCheckedDate} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
                {provider.name}
              </h1>
              <p className="text-sm text-charcoal-muted flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>{provider.serviceArea}</span>
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-sand-50 border border-sand-200 text-xs sm:text-sm">
            <div>
              <span className="text-charcoal-muted text-[11px] block">Field Experience</span>
              <strong className="text-charcoal font-bold">{provider.experienceYears}+ Years</strong>
            </div>
            <div>
              <span className="text-charcoal-muted text-[11px] block">Languages</span>
              <strong className="text-charcoal font-bold">{provider.languages.join(", ")}</strong>
            </div>
            <div>
              <span className="text-charcoal-muted text-[11px] block">Standard Rate</span>
              <strong className="text-charcoal font-bold">{provider.priceRangeETB}</strong>
            </div>
            <div>
              <span className="text-charcoal-muted text-[11px] block">Contact Protocol</span>
              <strong className="text-charcoal font-bold">{provider.contactMethod}</strong>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-primary">Professional Profile</h2>
            <p className="text-base text-charcoal leading-relaxed whitespace-pre-line">
              {provider.shortBio}
            </p>
          </div>

          {/* Services Offered */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-primary">Services Provided</h2>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {provider.servicesOffered.map((srv, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-sand-50 border border-sand-200 text-sm text-charcoal flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle / Vessel Specifications if applicable */}
          {provider.vehicleDetails && (
            <div className="p-5 rounded-xl bg-sand-100 border border-sand-300 space-y-3">
              <h3 className="font-bold text-charcoal text-base flex items-center gap-2">
                <Car className="w-5 h-5 text-secondary" />
                Verified Vehicle Details
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-charcoal-muted block">Vehicle Model</span>
                  <strong>{provider.vehicleDetails.type}</strong>
                </div>
                <div>
                  <span className="text-charcoal-muted block">Passenger Capacity</span>
                  <strong>Up to {provider.vehicleDetails.capacity} Passengers</strong>
                </div>
                <div>
                  <span className="text-charcoal-muted block">Air Conditioning</span>
                  <strong>{provider.vehicleDetails.hasAirConditioning ? "Equipped" : "Natural ventilation"}</strong>
                </div>
              </div>
            </div>
          )}

          {provider.boatDetails && (
            <div className="p-5 rounded-xl bg-sand-100 border border-sand-300 space-y-3">
              <h3 className="font-bold text-charcoal text-base flex items-center gap-2">
                <Anchor className="w-5 h-5 text-secondary" />
                Verified Boat & Safety Equipment
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-charcoal-muted block">Vessel Type</span>
                  <strong>{provider.boatDetails.vesselType}</strong>
                </div>
                <div>
                  <span className="text-charcoal-muted block">Safety Flotation</span>
                  <strong>{provider.boatDetails.lifeJacketsProvided ? "Life Jackets Mandatory & Provided" : "Standard"}</strong>
                </div>
                <div>
                  <span className="text-charcoal-muted block">Max Seating</span>
                  <strong>{provider.boatDetails.maxPassengers} Travelers</strong>
                </div>
              </div>
            </div>
          )}

          {/* Transparent Verification Disclaimer (No reviews) */}
          <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-muted flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-charcoal block">Provider information verified by AMX</strong>
              <span>
                AMX does not host unverified third-party reviews. Provider identity, background credentials, equipment condition, and local community membership are personally reviewed by AMX coordinators on the ground.
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-sand-200">
            <Link href="/request" className="flex-1">
              <PrimaryButton size="lg" className="w-full font-bold">
                Request a Trip with {provider.name.split(" ")[0]}
              </PrimaryButton>
            </Link>
            <WhatsAppButton
              size="lg"
              message={`Hello AMX, I would like to check availability for ${provider.name}.`}
              className="flex-1"
            >
              Ask on WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        {/* Linked Experiences */}
        {linkedPackages.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-primary">
              Experiences Featuring {provider.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {linkedPackages.map((pkg) => (
                <Link
                  key={pkg.id}
                  href={`/experiences/${pkg.slug}`}
                  className="p-5 rounded-xl bg-white border border-sand-300 hover:border-primary transition-colors flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-xs text-secondary-800 font-semibold">{pkg.duration}</span>
                    <h4 className="font-bold text-charcoal">{pkg.title}</h4>
                    <span className="text-xs text-primary font-bold">
                      {pkg.startingPriceETB > 0 ? `From ${pkg.startingPriceETB.toLocaleString()} ETB` : "Custom"}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}