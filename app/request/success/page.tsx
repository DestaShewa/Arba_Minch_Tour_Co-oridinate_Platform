"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton, SecondaryButton } from "@/components/ui/Button";
import { AMX_BRAND } from "@/lib/constants";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, MessageSquare, FileText } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "AMX-REQ-8492";
  const name = searchParams.get("name") || "Traveler";

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-16 flex-1 w-full space-y-8">
        <Card className="p-6 sm:p-10 border border-sand-300 shadow-md text-center space-y-8 bg-white">
          {/* Header Icon & Message */}
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Request Received
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Thank you, {name}. Your request has been received.
            </h1>
            <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
              We are checking real provider schedules in Arba Minch for your trip.
            </p>
          </div>

          {/* Reference Number & SLA Badge */}
          <div className="p-5 rounded-xl bg-sand-50 border border-sand-300 space-y-3">
            <span className="text-xs uppercase font-semibold text-charcoal-muted block">
              Inquiry Reference Number
            </span>
            <strong className="text-2xl font-mono font-bold text-primary tracking-wider">
              {ref}
            </strong>
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-secondary-800">
              <Clock className="w-4 h-4 text-accent shrink-0" />
              <span>{AMX_BRAND.slaNotice}</span>
            </div>
          </div>

          {/* Pre-filled WhatsApp Action */}
          <div className="space-y-3 pt-2">
            <p className="text-xs text-charcoal-muted">
              Want immediate confirmation? Connect directly with our on-duty coordinator:
            </p>
            <WhatsAppButton
              size="lg"
              className="w-full"
              message={`Hello AMX, I submitted request ${ref} for ${name}. I would like to check on my quotation.`}
            >
              Open WhatsApp with Reference {ref}
            </WhatsAppButton>
          </div>

          {/* What Happens Next Section */}
          <div className="text-left space-y-4 pt-6 border-t border-sand-200">
            <h2 className="text-base font-bold text-charcoal flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              What happens next:
            </h2>
            <ol className="space-y-3 text-xs sm:text-sm text-charcoal-muted">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Availability check:</strong> Your coordinator contacts verified drivers and certified boat captains to confirm schedules.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Written quotation:</strong> You receive an itemized breakdown in ETB on WhatsApp (or email) with zero hidden fees.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Review & Confirm:</strong> You can accept the quotation or ask your coordinator to modify times and activities.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Travel Voucher:</strong> Upon confirmation, you receive your confirmed itinerary voucher with driver details and emergency contacts.
                </span>
              </li>
            </ol>
          </div>

          {/* Sample Links for Demo */}
          <div className="pt-6 border-t border-sand-200 space-y-2">
            <span className="text-xs text-charcoal-muted block">
              Demonstration previews:
            </span>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quotation/qt-001" className="flex-1">
                <SecondaryButton variant="outline" size="sm" className="w-full text-xs">
                  View Sample Quotation
                </SecondaryButton>
              </Link>
              <Link href="/booking/bk-7319" className="flex-1">
                <SecondaryButton variant="outline" size="sm" className="w-full text-xs">
                  View Sample Booking
                </SecondaryButton>
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/experiences"
              className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Browse more experiences <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default function RequestSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}