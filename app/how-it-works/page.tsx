import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader, SectionHeading } from "@/components/ui/Typography";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { PROCESS_STEPS, WHY_AMX_POINTS, AMX_BRAND } from "@/lib/constants";
import { CheckCircle2, Clock, ShieldCheck, FileCheck, Users } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="How AMX Coordinates Your Trip"
        description="One clear itinerary. Verified local providers. One responsible coordinator. Local support during your trip."
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-16">
        {/* Step-by-Step Narrative */}
        <section className="space-y-8">
          <SectionHeading
            badge="Coordination Steps"
            title="From Your Inquiry to Travel Day"
            subtitle="How we eliminate uncertainty, price changes, and unverified service providers."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROCESS_STEPS.map((s) => (
              <div key={s.step} className="p-6 rounded-xl bg-white border border-sand-300 space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-warmWhite font-bold flex items-center justify-center text-sm">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-lg text-charcoal">{s.title}</h3>
                </div>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* The 30-Minute SLA Promise */}
        <section className="p-8 rounded-2xl bg-primary-900 text-warmWhite space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold text-white">Our Coordination SLA</h3>
          </div>
          <p className="text-sand-200 text-sm sm:text-base leading-relaxed">
            During working hours (07:00 AM – 08:00 PM EAT), an AMX coordinator reviews your dates, group size, and special requirements within <strong>30 minutes</strong>. We confirm boat captain availability, guide schedules, and vehicle condition before issuing a binding written quotation in ETB.
          </p>
        </section>

        {/* Why Not an Instant Booking Platform? */}
        <section className="space-y-6">
          <SectionHeading
            badge="Honest Architecture"
            title="Why We Do Not Offer 'Instant Booking'"
            subtitle="Ground conditions in southern Ethiopia require real humans checking real schedules."
          />
          <div className="space-y-4 text-base text-charcoal leading-relaxed">
            <p>
              Many platforms display 'instant booking' buttons that create false expectations. In reality, lake weather, national park trail road conditions, and certified guide availability vary day by day.
            </p>
            <p>
              By having one coordinator directly verify driver readiness and boat permits prior to payment, we guarantee you never arrive in Arba Minch to find a cancelled tour or unexpected price inflation.
            </p>
          </div>
        </section>

        {/* Action CTA */}
        <section className="pt-8 border-t border-sand-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/request">
            <PrimaryButton size="lg" className="w-full sm:w-auto font-bold">
              Submit a Trip Request
            </PrimaryButton>
          </Link>
          <WhatsAppButton size="lg" className="w-full sm:w-auto" />
        </section>
      </main>

      <Footer />
    </div>
  );
}