"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BOOKINGS } from "@/data/bookings";
import { formatETB } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, ShieldCheck, Phone, ExternalLink } from "lucide-react";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const booking = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/bookings"
          className="tap-target p-2 text-charcoal-muted hover:text-primary rounded-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs font-mono font-bold text-primary block">
            {booking.bookingNumber}
          </span>
          <h1 className="text-2xl font-bold text-charcoal">
            Confirmed Booking: {booking.customerName}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-white border border-sand-300 space-y-4">
            <h3 className="text-base font-bold text-charcoal">Assigned Providers</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {booking.assignedProviders.map((prov, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-sand-50 border border-sand-200 space-y-1 text-xs">
                  <span className="font-bold uppercase text-secondary-800">{prov.role}</span>
                  <p className="text-sm font-bold text-charcoal">{prov.name}</p>
                  <p className="text-charcoal-muted">{prov.details}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white border border-sand-300 space-y-3">
            <h3 className="text-base font-bold text-charcoal">Pickup Schedule</h3>
            <p className="text-sm font-semibold text-primary">{booking.pickupTime}</p>
            <p className="text-xs text-charcoal-muted">{booking.pickupPoint}</p>
          </Card>
        </div>

        <div>
          <Card className="p-6 bg-white border border-sand-300 space-y-4 text-xs">
            <h4 className="font-bold text-charcoal text-sm">Voucher Link</h4>
            <p className="text-charcoal-muted">Public travel voucher for customer:</p>
            <Link
              href={`/booking/${booking.id}`}
              target="_blank"
              className="font-mono text-primary hover:underline flex items-center gap-1.5"
            >
              <span>/booking/{booking.id}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}