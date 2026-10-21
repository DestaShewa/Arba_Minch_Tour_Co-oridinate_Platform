import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/public/Hero";
import { PackageCard } from "@/components/public/PackageCard";
import { ProviderCard } from "@/components/public/ProviderCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { SectionHeading } from "@/components/ui/Typography";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { TRUST_SIGNALS, PROCESS_STEPS, WHY_AMX_POINTS, AMX_BRAND } from "@/lib/constants";
import { PACKAGES } from "@/data/packages";
import { PROVIDERS } from "@/data/providers";
import { FAQS } from "@/data/faqs";
import { ShieldCheck, CheckCircle2, ArrowRight, Clock, Users, DollarSign, Headphones } from "lucide-react";

export default function HomePage() {
  const trustIcons = [
    <ShieldCheck key="1" className="w-6 h-6 text-primary" />,
    <DollarSign key="2" className="w-6 h-6 text-primary" />,
    <Users key="3" className="w-6 h-6 text-primary" />,
    <Headphones key="4" className="w-6 h-6 text-primary" />,
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Bar (4 signals) */}
      <section className="bg-sand-100 border-y border-sand-300 py-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_SIGNALS.map((signal, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-white border border-sand-300 shadow-xs shrink-0">
                {trustIcons[idx]}
              </div>
              <div>
                <h4 className="font-bold text-charcoal text-sm">{signal.title}</h4>
                <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
                  {signal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 space-y-20 sm:space-y-28">
        {/* 3. Featured Experiences (3 packages) */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <SectionHeading
              badge="Curated Packages"
              title="Featured Arba Minch Experiences"
              subtitle="Clear itineraries with verified drivers, certified guides, and boat captains."
              className="mb-0"
            />
            <Link
              href="/experiences"
              className="text-primary font-bold text-sm inline-flex items-center gap-1 hover:underline min-h-[44px]"
            >
              View all experiences <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PACKAGES.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={pkg} priority={idx === 0} />
            ))}
          </div>
        </section>

        {/* 4. How It Works (4 steps) */}
        <section className="bg-sand-50 border border-sand-200 rounded-2xl p-6 sm:p-10 md:p-12">
          <SectionHeading
            centered
            badge="Simple Process"
            title="How AMX Coordinates Your Trip"
            subtitle="No upfront payment required to request an itinerary and check availability."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="space-y-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-warmWhite font-bold flex items-center justify-center text-base shadow-sm">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-charcoal">{step.title}</h4>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Why AMX vs Directory */}
        <section className="space-y-8">
          <SectionHeading
            badge="The AMX Difference"
            title="Why AMX Is Not a Regular Travel Directory"
            subtitle="Directories leave you to negotiate unverified services on your own. AMX takes full coordination responsibility."
          />
          <div className="border border-sand-300 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-normal">
                <thead className="bg-sand-100 border-b border-sand-300 text-charcoal">
                  <tr>
                    <th className="py-4 px-5 font-bold">Standard Feature</th>
                    <th className="py-4 px-5 font-bold text-charcoal-muted">Normal Travel Directory</th>
                    <th className="py-4 px-5 font-bold text-primary bg-primary-50/50">AMX Experience Coordination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {WHY_AMX_POINTS.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-sand-50/30">
                      <td className="py-4 px-5 font-semibold text-charcoal">{pt.feature}</td>
                      <td className="py-4 px-5 text-charcoal-muted text-xs sm:text-sm">{pt.directory}</td>
                      <td className="py-4 px-5 text-primary font-semibold text-xs sm:text-sm bg-primary-50/30 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{pt.amx}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6. Featured Providers */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeading
              badge="Local Network"
              title="Meet Our Verified Local Providers"
              subtitle="Guides, drivers, boat operators, and lodges personally checked by AMX."
              className="mb-0"
            />
            <Link
              href="/providers"
              className="text-primary font-bold text-sm inline-flex items-center gap-1 hover:underline min-h-[44px]"
            >
              View all providers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {PROVIDERS.slice(0, 3).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>

        {/* 7. FAQ Preview */}
        <section className="max-w-3xl mx-auto space-y-8">
          <SectionHeading
            centered
            badge="Frequently Asked"
            title="Common Questions Before Traveling"
            subtitle="Transparent answers regarding payments, cancellations, and ground coordination."
          />
          <FAQAccordion items={FAQS.slice(0, 5)} />
          <div className="text-center pt-2">
            <Link href="/faq" className="text-sm font-semibold text-primary hover:underline min-h-[44px] inline-flex items-center">
              View all frequently asked questions →
            </Link>
          </div>
        </section>

        {/* 8. Final CTA Section */}
        <section className="bg-primary-900 text-warmWhite rounded-2xl p-8 sm:p-12 md:p-16 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/20 px-3 py-1 rounded-full border border-accent/30 inline-block">
              Start Your Itinerary
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Tell us your dates, group size, and budget. We will organize your Arba Minch experience.
            </h2>
            <p className="text-sand-200 text-sm sm:text-base leading-relaxed">
              One clear itinerary. Verified local providers. Response within 30 minutes during working hours (07:00 AM – 08:00 PM EAT).
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/request" className="w-full sm:w-auto">
                <PrimaryButton size="lg" className="w-full bg-accent hover:bg-accent-600 text-white font-bold">
                  Request a Trip
                </PrimaryButton>
              </Link>
              <WhatsAppButton
                size="lg"
                message="Hello AMX, I would like to request an itinerary for Arba Minch."
                className="w-full sm:w-auto"
              >
                WhatsApp Us
              </WhatsAppButton>
            </div>
            <p className="text-[11px] text-sand-300 pt-2">
              No instant booking charge. Provider availability is confirmed before you commit.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}