import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PACKAGES } from "@/data/packages";
import { providerService } from "@/lib/services/providerService";
import { PackageSubNav } from "@/components/public/PackageSubNav";
import { ItineraryTimeline } from "@/components/public/ItineraryTimeline";
import { InclusionList } from "@/components/public/InclusionList";
import { ExclusionList } from "@/components/public/ExclusionList";
import { PriceTable } from "@/components/public/PriceTable";
import { ProviderCard } from "@/components/public/ProviderCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { TripPreparationWidget } from "@/components/public/TripPreparationWidget";
import { CurrencyProvider, CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/Badge";
import { Clock, Users, Calendar, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    return { title: "Experience Not Found | AMX" };
  }

  return {
    title: `${pkg.title} | Arba Minch Experiences`,
    description: `${pkg.shortDescription} Verified local drivers, boat captains, and certified guides coordinated by AMX.`,
    openGraph: {
      title: `${pkg.title} — Arba Minch Experiences`,
      description: pkg.shortDescription,
      images: [{ url: pkg.heroImage, width: 1200, height: 630, alt: pkg.title }],
    },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  // STRICT SECURITY GUARD: Ensure only verified providers appear on package detail
  const verifiedList = providerService.getPublicVerifiedProviders();
  const assignedProviders = verifiedList.filter((pr) =>
    pkg.featuredProviderIds.includes(pr.id)
  );

  const relatedPackages = PACKAGES.filter((p) =>
    pkg.relatedPackageSlugs.includes(p.slug)
  );

  return (
    <CurrencyProvider>
      <div className="min-h-screen flex flex-col bg-warmWhite pb-24 md:pb-0">
        <Navbar />

        {/* Above the Fold: Hero Header */}
        <div className="bg-white border-b border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-sand-200 shadow-md">
                <Image
                  src={pkg.heroImage}
                  alt={pkg.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="inline-block text-xs font-bold text-accent uppercase tracking-wider bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    Verified Itinerary
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                    {pkg.title}
                  </h1>
                  <p className="text-base text-charcoal-muted leading-relaxed">
                    {pkg.shortDescription}
                  </p>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-sand-50 rounded-xl border border-sand-200 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="text-charcoal-muted block text-[11px]">Duration</span>
                      <strong className="text-charcoal">{pkg.duration}</strong>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="text-charcoal-muted block text-[11px]">Group Size</span>
                      <strong className="text-charcoal">{pkg.groupSizeRange}</strong>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="text-charcoal-muted block text-[11px]">Coordination</span>
                      <strong className="text-charcoal">AMX Assigned</strong>
                    </div>
                  </div>
                </div>

                {/* Price & Currency Toggle */}
                <div className="pt-2 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <PriceTag
  amountETB={pkg.startingPriceETB}
  isCustom={pkg.priceType === "custom_quotation"}
/>
                    <CurrencyToggle />
                  </div>
                  <p className="text-xs text-charcoal-muted">{pkg.priceNote}</p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href={`/request?package=${pkg.slug}`} className="flex-1">
                      <PrimaryButton size="lg" className="w-full font-bold">
                        Request This Trip
                      </PrimaryButton>
                    </Link>
                    <WhatsAppButton
                      size="lg"
                      message={`Hello AMX, I would like to inquire about the ${pkg.title}.`}
                      className="flex-1 font-bold"
                    >
                      Ask on WhatsApp
                    </WhatsAppButton>
                  </div>
                  <p className="text-[11px] text-charcoal-muted text-center sm:text-left">
                    We will confirm availability. Response within 30 minutes during working hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Horizontal Sub-Navigation */}
        <PackageSubNav />

        {/* Main Content Layout with Section Anchors */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 space-y-16">
          {/* Overview & Highlights */}
          <section id="overview" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-primary">Overview</h2>
              <p className="text-base text-charcoal leading-relaxed whitespace-pre-line">
                {pkg.overview}
              </p>
            </div>
            <div id="highlights" className="scroll-mt-28 bg-sand-50 border border-sand-200 rounded-xl p-6 space-y-4 h-fit">
              <h3 className="text-base font-bold text-charcoal">Key Highlights</h3>
              <ul className="space-y-3">
                {pkg.keyHighlights.map((hl, i) => (
                  <li key={i} className="text-xs sm:text-sm text-charcoal flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      ✓
                    </span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Full Vertical Timeline Itinerary */}
          <section id="itinerary" className="scroll-mt-28 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-primary">Full Itinerary</h2>
              <p className="text-sm text-charcoal-muted">
                Structured timeline with activity milestones managed by your coordinator.
              </p>
            </div>
            <ItineraryTimeline items={pkg.itinerary} />
          </section>

          {/* Inclusions vs Exclusions */}
          <section id="inclusions" className="scroll-mt-28 space-y-6">
            <h2 className="text-2xl font-bold text-primary">Inclusions & Exclusions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InclusionList items={pkg.includedList} />
              <ExclusionList items={pkg.excludedList} />
            </div>
          </section>

          {/* Price Explanation Table */}
          <section id="pricing" className="scroll-mt-28 space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-primary">Price Explanation</h2>
              <p className="text-sm text-charcoal-muted">
                Clear itemization in Ethiopian Birr (ETB). No hidden commission markups.
              </p>
            </div>
            <PriceTable items={pkg.priceTable} lastUpdated={pkg.lastPriceUpdate} />
          </section>

          {/* Pre-Trip Preparation & Local Practicalities Widget */}
          <section id="preparation" className="scroll-mt-28">
            <TripPreparationWidget packageName={pkg.title} />
          </section>

          {/* Verified Providers For This Trip */}
          {assignedProviders.length > 0 && (
            <section className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-primary">Verified Providers For This Trip</h2>
                <p className="text-sm text-charcoal-muted">
                  AMX assigns verified local drivers, cultural guides, and boat captains.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {assignedProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </section>
          )}

          {/* Safety & Cancellation */}
          <section id="safety" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-sand-50 border border-sand-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Safety & Preparation
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-muted">
                {pkg.safetyAndPreparation.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-sand-50 border border-sand-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Cancellation Policy
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {pkg.cancellationPolicy}
              </p>
              <p className="text-xs text-charcoal font-semibold pt-2 border-t border-sand-300">
                One coordinator for your trip: All modifications are handled via direct phone or WhatsApp.
              </p>
            </div>
          </section>

          {/* Package FAQs */}
          {pkg.faqs.length > 0 && (
            <section id="faq" className="scroll-mt-28 max-w-3xl space-y-4">
              <h2 className="text-2xl font-bold text-primary">Experience Questions</h2>
              <FAQAccordion items={pkg.faqs} />
            </section>
          )}

          {/* Related Experiences */}
          {relatedPackages.length > 0 && (
            <section className="space-y-6 pt-8 border-t border-sand-200">
              <h2 className="text-2xl font-bold text-primary">Related Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPackages.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-5 rounded-xl border border-sand-300 bg-white flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-xs text-secondary-800 font-semibold">{rel.duration}</span>
                      <h4 className="font-bold text-charcoal text-lg">{rel.title}</h4>
                      <p className="text-xs text-charcoal-muted line-clamp-2">{rel.shortDescription}</p>
                    </div>
                    <Link href={`/experiences/${rel.slug}`}>
                      <span className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">
                        Explore this experience <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sticky Mobile CTA Bar with iOS gesture bar safe-area padding */}
        <aside
          aria-label="Quick booking"
          className="fixed bottom-0 left-0 right-0 p-3.5 safe-bottom-cta bg-white/95 backdrop-blur-md border-t border-sand-300 md:hidden z-30 flex items-center justify-between gap-3 shadow-lg"
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-charcoal-muted uppercase">Starting from</span>
            <span className="font-bold text-primary text-base">
              {pkg.startingPriceETB > 0 ? `${pkg.startingPriceETB.toLocaleString()} ETB` : "Custom"}
            </span>
          </div>
          <Link href={`/request?package=${pkg.slug}`} className="flex-1">
            <PrimaryButton size="sm" className="w-full font-bold">
              Request This Trip
            </PrimaryButton>
          </Link>
        </aside>

        <Footer />
      </div>
    </CurrencyProvider>
  );
}