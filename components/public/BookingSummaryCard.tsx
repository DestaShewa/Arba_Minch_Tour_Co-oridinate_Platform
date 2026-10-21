"use client";

import React from "react";
import { formatETB } from "@/lib/utils";
import { Booking } from "@/types/booking";
import { Card } from "@/components/ui/Card";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import { ShieldCheck, MapPin, Phone, Printer } from "lucide-react";

export const BookingSummaryCard: React.FC<{ booking: Booking }> = ({
  booking,
}) => {
  return (
    <Card className="max-w-3xl mx-auto p-6 sm:p-8 space-y-8 bg-white border border-sand-300 shadow-md">
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
            <strong className="text-charcoal">{booking.bookingNumber}</strong>
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-300 uppercase">
          {booking.status}
        </span>
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
            <MapPin className="w-3.5 h-3.5 text-accent" />
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

      {/* Emergency & Payment Footer */}
      <div className="p-4 rounded-lg bg-primary-50 border border-primary-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
        <div>
          <span className="text-xs text-charcoal-muted">
            Emergency Local Contact:
          </span>
          <p className="font-bold text-primary flex items-center gap-1.5 mt-0.5">
            <Phone className="w-4 h-4 text-accent" />
            {booking.emergencyContact.phone} ({booking.emergencyContact.title})
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs text-charcoal-muted">Payment Status:</span>
          <p className="font-bold text-charcoal uppercase text-xs">
            {booking.paymentStatus.replace("_", " ")} ({formatETB(booking.totalPriceETB)})
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="flex-1 sm:flex-none"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print / Save PDF
        </Button>
        <WhatsAppButton
          phoneNumber={booking.emergencyContact.phone}
          message={`Hello, I have an inquiry about my confirmed AMX booking ${booking.bookingNumber}.`}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          WhatsApp Support
        </WhatsAppButton>
      </div>
    </Card>
  );
};