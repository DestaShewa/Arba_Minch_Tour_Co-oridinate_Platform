"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton, PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { CheckCircle2, Clock, ShieldCheck, Phone, ArrowRight, UserCheck } from "lucide-react";

function ProviderSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "AMX-PROV-4819";
  const name = searchParams.get("name") || "Partner";
  const type = searchParams.get("type") || "Service Provider";

  const liaisonWhatsAppMessage = `Hello AMX Provider Liaison,
I have submitted my provider registration application:

• Application Ref: ${ref}
• Provider Name: ${name}
• Category: ${type.replace(/_/g, " ")}

I am ready for phone verification and in-person service inspection in Arba Minch.`;

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-16 flex-1 w-full space-y-8">
        <Card className="p-6 sm:p-10 border border-sand-300 shadow-md text-center space-y-8 bg-white">
          {/* Header Icon & Title */}
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Application Submitted
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Thank you, {name}. Your application has been received.
            </h1>
            <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
              AMX will contact you within <strong>2 working days</strong> to verify your information and inspect your service in Arba Minch.
            </p>
          </div>

          {/* Application Reference & SLA Badge */}
          <div className="p-5 rounded-xl bg-sand-50 border border-sand-300 space-y-3">
            <span className="text-xs uppercase font-semibold text-charcoal-muted block">
              Application Tracking Reference
            </span>
            <strong className="text-2xl font-mono font-bold text-primary tracking-wider">
              {ref}
            </strong>
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-secondary-800">
              <Clock className="w-4 h-4 text-accent shrink-0" />
              <span>Coordinator Review Commitment: Within 2 Working Days</span>
            </div>
          </div>

          {/* Direct WhatsApp Deep-Link to Provider Liaison */}
          <div className="space-y-3 pt-2">
            <p className="text-xs text-charcoal-muted">
              Want to expedite your in-person inspection? Message our Provider Liaison directly:
            </p>
            <WhatsAppButton
              size="lg"
              className="w-full font-bold"
              message={liaisonWhatsAppMessage}
            >
              Message Provider Liaison on WhatsApp ({ref})
            </WhatsAppButton>
          </div>

          {/* Operational Next Steps Roadmap */}
          <div className="text-left space-y-4 pt-6 border-t border-sand-200">
            <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> What Happens Next:
            </h2>
            <ol className="space-y-3 text-xs sm:text-sm text-charcoal-muted">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Coordinator Phone Call:</strong> We call to confirm your phone, WhatsApp, and service availability rules.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Document & Safety Inspection:</strong> In-person check of vehicle A/C, boat life jackets, or lodge rooms in Arba Minch.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Finalize Net Agreement:</strong> Confirm agreed net prices and settlement frequency (CBE, Telebirr, cash).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Profile Goes Live:</strong> Receive the "AMX Verified" badge and begin receiving assigned customer trips.
                </span>
              </li>
            </ol>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-sand-200 flex flex-col sm:flex-row gap-3">
            <Link href="/provider/login" className="flex-1">
              <PrimaryButton size="md" className="w-full text-xs font-bold">
                Access Provider Portal (Demo)
              </PrimaryButton>
            </Link>
            <Link href="/" className="flex-1">
              <SecondaryButton variant="outline" size="md" className="w-full text-xs font-semibold">
                Return to Homepage
              </SecondaryButton>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default function ProviderRegisterSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-charcoal-muted">Loading application status...</div>}>
      <ProviderSuccessContent />
    </Suspense>
  );
}