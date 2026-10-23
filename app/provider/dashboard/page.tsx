"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication } from "@/types/provider-onboarding";
import { BOOKINGS } from "@/data/bookings";
import { formatETB } from "@/lib/utils";
import {
  CalendarCheck,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ProviderDashboardPage() {
  const [session, setSession] = useState<ProviderApplication | null>(null);

  useEffect(() => {
    setSession(providerOnboardingService.getActiveProviderSession());
  }, []);

  if (!session) return null;

  const isVerified = session.status === "verified" || session.status === "trusted";
  const upcomingBooking = BOOKINGS[0];

  return (
    <div className="space-y-6">
      {/* 1. Verification Status Banner */}
      {!isVerified ? (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-sm font-bold block">
                Application Status: {session.status.replace(/_/g, " ").toUpperCase()}
              </strong>
              <p className="text-xs text-amber-900 leading-relaxed max-w-2xl">
                Your application reference is <strong>{session.applicationNumber}</strong>. AMX coordinators are currently checking your phone, WhatsApp, and service details. You will be contacted for an in-person check.
              </p>
            </div>
          </div>
          <Link href="/provider/documents" className="shrink-0">
            <button className="tap-target px-3.5 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-bold text-accent hover:bg-amber-100/50">
              View Documents Status →
            </button>
          </Link>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-green-50 border border-green-300 text-green-950 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-green-800">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <span>AMX Verified Partner — Your service profile is live and accepting trip assignments.</span>
          </div>
          <span className="font-mono text-charcoal-muted">Partner Ref: {session.applicationNumber}</span>
        </div>
      )}

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-primary bg-white">
          <span className="text-xs text-charcoal-muted font-medium block">Assigned Trips</span>
          <strong className="text-2xl font-bold text-charcoal mt-1 block">2 Upcoming</strong>
          <span className="text-[11px] text-primary font-semibold">Active this week</span>
        </Card>

        <Card className="p-5 border-l-4 border-l-secondary bg-white">
          <span className="text-xs text-charcoal-muted font-medium block">Trips Completed</span>
          <strong className="text-2xl font-bold text-charcoal mt-1 block">14 Total</strong>
          <span className="text-[11px] text-secondary font-semibold">Past 30 days</span>
        </Card>

        <Card className="p-5 border-l-4 border-l-accent bg-white">
          <span className="text-xs text-charcoal-muted font-medium block">Earned Net This Month</span>
          <strong className="text-2xl font-bold text-charcoal mt-1 block">{formatETB(48000)}</strong>
          <span className="text-[11px] text-accent font-semibold">After 10% commission</span>
        </Card>

        <Card className="p-5 border-l-4 border-l-green-600 bg-white">
          <span className="text-xs text-charcoal-muted font-medium block">Punctuality Score</span>
          <strong className="text-2xl font-bold text-charcoal mt-1 block">100%</strong>
          <span className="text-[11px] text-green-700 font-semibold">On-time pickups</span>
        </Card>
      </div>

      {/* 3. Next Assigned Customer Assignment Dossier */}
      <Card className="p-6 bg-white border border-sand-300 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-sand-200 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-primary" /> Next Confirmed Assignment
            </span>
            <h2 className="text-xl font-bold text-charcoal">{upcomingBooking.packageName}</h2>
          </div>
          <span className="text-xs font-mono font-bold text-charcoal bg-sand-100 px-3 py-1 rounded-md">
            Trip Ref: {upcomingBooking.bookingNumber}
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-sand-50 rounded-lg space-y-1">
            <span className="text-charcoal-muted block">Scheduled Pickup Time:</span>
            <strong className="text-sm font-bold text-primary">{upcomingBooking.pickupTime}</strong>
          </div>
          <div className="p-3 bg-sand-50 rounded-lg space-y-1">
            <span className="text-charcoal-muted block">Pickup Location:</span>
            <strong className="text-sm font-bold text-charcoal flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" /> {upcomingBooking.pickupPoint}
            </strong>
          </div>
          <div className="p-3 bg-sand-50 rounded-lg space-y-1">
            <span className="text-charcoal-muted block">Lead Guest:</span>
            <strong className="text-sm font-bold text-charcoal">{upcomingBooking.customerName}</strong>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-sand-100 text-xs text-charcoal space-y-1">
          <strong className="block">Itinerary Schedule:</strong>
          <ul className="space-y-1 list-disc pl-4 text-charcoal-muted">
            {upcomingBooking.itinerarySummary.map((step, idx) => (
              <li key={idx}><strong>{step.time}:</strong> {step.description}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
          <span className="text-xs text-charcoal-muted">
            Assigned AMX Coordinator: <strong>Samson Tefera</strong> (+251 911 000 000)
          </span>
          <Link href="/provider/bookings">
            <button className="tap-target text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
              <span>View all assigned trips</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}