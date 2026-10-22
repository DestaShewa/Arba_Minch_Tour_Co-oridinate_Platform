"use client";

import React from "react";
import { formatETB } from "@/lib/utils";
import { Booking } from "@/types/booking";
import { Card } from "@/components/ui/Card";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import { ShieldCheck, MapPin, Phone, Printer, WifiOff, Award } from "lucide-react";

export const BookingSummaryCard: React.FC<{ booking: Booking }> = ({
  booking,
}) => {
  return (
    <Card className="print-card max-w-3xl mx-auto p-6 sm:p-8 space-y-8 bg-white border border-sand-300 shadow-md">
      {/* Offline Recommendation Alert (Screen Only) */}
      <div className="no-print p-3 rounded-lg bg-sand-100 border border-sand-300 text-xs text-charcoal-muted flex items-start gap-2.5">
        <WifiOff className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <span>
          <strong>Recommended:</strong> Mobile reception on Lake Chamo water and high Dorze peaks can be intermittent. Take a screenshot or click <strong>Print / Save PDF</strong> to store this voucher offline.
        </span>
      </div>

      {/* Travel Voucher Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-sand-200">
        <div>
          <span className="text-xs uppercase font-bold text-primary tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" /> Confirmed Travel Voucher
          </span>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {booking.packageName}
          </h2>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Booking Ref:{" "}
            <strong className="text-charcoal font-mono">{booking.bookingNumber}</strong>
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-300 uppercase">
            {booking.status}
          </span>
          <span className="text-[11px] text-charcoal-muted font-mono">
            Issued by AMX Arba Minch Desk
          </span>
        </div>
      </div>

      {/* Guest & Pickup Details */}
      <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-lg bg-sand-50 border border-sand-200 text-sm">
        <div className="space-y-1">
          <span className="text-xs text-charcoal-muted">Lead Traveler:</span>
          <p className="font-bold text-charcoal">{booking.customerName}</p>
          <p className="text-xs text-charcoal-muted">
            WhatsApp: {booking.customerWhatsApp}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-charcoal-muted">Scheduled Pickup:</span>
          <p className="font-bold text-charcoal">{booking.pickupTime}</p>
          <p className="text-xs text-charcoal-muted flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
            {booking.pickupPoint}
          </p>
        </div>
      </div>

      {/* Assigned Providers */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-charcoal">
          Assigned Verified Providers
        </h4>
        <div className="grid sm:grid-cols-3 gap-3">
          {booking.assignedProviders.map((prov, idx) => (
            <div
              key={idx}
              className="p-3 rounded border border-sand-200 bg-white space-y-1"
            >
              <span className="text-xs uppercase font-semibold text-secondary-700 block">
                {prov.role}
              </span>
              <p className="text-sm font-bold text-charcoal">{prov.name}</p>
              {prov.details && (
                <p className="text-xs text-charcoal-muted">{prov.details}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hour-by-Hour Timeline */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-charcoal">Schedule Summary</h4>
        <ul className="space-y-2 border-l-2 border-primary/40 pl-4 py-1 text-sm">
          {booking.itinerarySummary.map((step, idx) => (
            <li key={idx} className="space-y-0.5">
              <span className="text-xs font-bold text-primary">{step.time}</span>
              <p className="text-charcoal-muted">{step.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Official AMX Seal & Duty Desk Box */}
      <div className="p-4 rounded-lg bg-primary-50 border border-primary-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
            <Award className="w-4 h-4 text-accent" />
            <span>Official AMX Verified Voucher</span>
          </div>
          <p className="text-xs text-charcoal-muted">
            Emergency 24/7 Coordinator Desk: <strong className="text-charcoal">{booking.emergencyContact.phone}</strong>
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-charcoal-muted block">Payment Settlement:</span>
          <p className="font-bold text-charcoal uppercase text-xs">
            {booking.paymentStatus.replace("_", " ")} ({formatETB(booking.totalPriceETB)})
          </p>
        </div>
      </div>

      {/* Action Buttons (Excluded from Print) */}
      <div className="no-print flex flex-wrap gap-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="flex-1 sm:flex-none font-semibold"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print / Save PDF
        </Button>
        <WhatsAppButton
          phoneNumber={booking.emergencyContact.phone}
          message={`Hello, I have an inquiry about my confirmed AMX booking ${booking.bookingNumber}.`}
          size="sm"
          className="flex-1 sm:flex-none font-semibold"
        >
          WhatsApp Support
        </WhatsAppButton>
      </div>
    </Card>
  );
};