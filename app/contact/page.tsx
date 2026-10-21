import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { WhatsAppButton } from "@/components/ui/Button";
import { AMX_BRAND } from "@/lib/constants";
import { Phone, Clock, MapPin, Mail, MessageCircle, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Contact AMX Coordination Desk"
        description="Speak with our local coordinator in Arba Minch for trip planning, availability checks, or current traveler support."
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary">Direct Contact</h2>

            <div className="space-y-4 text-sm text-charcoal">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-charcoal-muted block">Direct Phone</span>
                  <a href={`tel:${AMX_BRAND.whatsappNumber}`} className="font-bold hover:underline">
                    {AMX_BRAND.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-charcoal-muted block">WhatsApp Support</span>
                  <span className="font-bold">{AMX_BRAND.whatsappDisplay}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-charcoal-muted block">Desk Working Hours</span>
                  <span className="font-bold">{AMX_BRAND.workingHours}</span>
                  <span className="text-xs text-charcoal-muted block mt-0.5">{AMX_BRAND.slaNotice}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-charcoal-muted block">Coordination Office</span>
                  <span className="font-bold">Sikela / Secha, Arba Minch, Ethiopia</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand-200">
              <WhatsAppButton
                size="md"
                message="Hello AMX, I need assistance with travel in Arba Minch."
                className="w-full"
              >
                Chat on WhatsApp Now
              </WhatsAppButton>
            </div>
          </div>

          {/* Operational Support Reassurance */}
          <div className="space-y-6">
            <div className="bg-sand-50 border border-sand-300 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                During Your Trip
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                If you are currently traveling on an AMX itinerary, your designated coordinator is available on direct call 24/7 for any urgent adjustments, vehicle delays, or flight timing shifts.
              </p>
              <div className="p-3 rounded-lg bg-white border border-sand-200 text-xs font-semibold text-charcoal">
                Emergency desk phone number is also printed at the top of your digital booking voucher.
              </div>
            </div>

            <div className="bg-sand-50 border border-sand-300 rounded-2xl p-6 sm:p-8 space-y-2 text-xs sm:text-sm text-charcoal-muted">
              <h4 className="font-bold text-charcoal">Need a Quotation?</h4>
              <p>
                To request availability for specific dates, please submit our short request form so we have your traveler count and arrival point.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}