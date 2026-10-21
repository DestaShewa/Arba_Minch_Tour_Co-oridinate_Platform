import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { FAQS } from "@/data/faqs";
import { WhatsAppButton } from "@/components/ui/Button";

export default function FAQPage() {
  const bookingFaqs = FAQS.filter((f) => f.category === "booking" || f.category === "pricing");
  const safetyFaqs = FAQS.filter((f) => f.category === "safety" || f.category === "cancellation");

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Frequently Asked Questions"
        description="Clear, honest answers regarding pricing in ETB, provider verification, and our trip coordination policies."
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-12">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-primary">Booking & Pricing</h2>
          <FAQAccordion items={bookingFaqs} />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-primary">Safety, Cancellation & Support</h2>
          <FAQAccordion items={safetyFaqs} />
        </section>

        <section className="p-6 rounded-xl bg-sand-100 border border-sand-300 text-center space-y-4">
          <h3 className="text-base font-bold text-charcoal">Still have questions?</h3>
          <p className="text-sm text-charcoal-muted max-w-md mx-auto">
            Our local coordinator is available on WhatsApp to answer specific questions regarding your Arba Minch schedule.
          </p>
          <div className="flex justify-center">
            <WhatsAppButton message="Hello AMX, I have a question about your services." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}