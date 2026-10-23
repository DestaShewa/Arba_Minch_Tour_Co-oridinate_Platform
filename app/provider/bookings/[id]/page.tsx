import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BOOKINGS } from "@/data/bookings";
import { formatETB } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/Button";
import { ArrowLeft, MapPin, Phone, Clock, Users, ShieldCheck } from "lucide-react";

export function generateStaticParams() {
  return BOOKINGS.map((b) => ({ id: b.id }));
}

export default async function ProviderBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  if (!booking) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/provider/bookings" className="tap-target p-2 text-charcoal-muted hover:text-primary rounded-md">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs font-mono font-bold text-primary block">{booking.bookingNumber}</span>
          <h1 className="text-2xl font-bold text-charcoal">Assignment: {booking.packageName}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-white border border-sand-300 space-y-6">
            <h3 className="text-base font-bold text-charcoal border-b border-sand-200 pb-3">
              Pickup & Operational Instructions
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-sand-50 rounded-lg space-y-1">
                <span className="text-charcoal-muted block">Scheduled Departure:</span>
                <strong className="text-sm font-bold text-primary">{booking.pickupTime}</strong>
              </div>
              <div className="p-3 bg-sand-50 rounded-lg space-y-1">
                <span className="text-charcoal-muted block">Pickup Address:</span>
                <strong className="text-sm font-bold text-charcoal flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" /> {booking.pickupPoint}
                </strong>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-charcoal">Step-by-Step Schedule:</h4>
              <ul className="space-y-2 border-l-2 border-primary/40 pl-4 py-1 text-xs">
                {booking.itinerarySummary.map((s, idx) => (
                  <li key={idx} className="space-y-0.5">
                    <strong className="text-primary">{s.time}:</strong> {s.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-sand-100 rounded-xl text-xs space-y-1 text-charcoal-muted">
              <strong className="text-charcoal block">Punctuality Rule:</strong>
              <p>Please arrive at the pickup point at least 15 minutes before {booking.pickupTime}. If delayed by road conditions, notify coordinator Samson immediately.</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-white border border-sand-300 space-y-4 text-xs">
            <h4 className="font-bold text-charcoal text-sm">Coordinator Contact</h4>
            <div className="p-3 bg-sand-50 rounded-lg space-y-1">
              <span className="text-charcoal-muted block">Assigned AMX Liaison:</span>
              <strong className="text-charcoal block">Samson Tefera</strong>
              <span className="text-charcoal-muted">{booking.emergencyContact.phone}</span>
            </div>

            <WhatsAppButton
              phoneNumber={booking.emergencyContact.phone}
              message={`Hello Samson, this is regarding assigned trip ${booking.bookingNumber}.`}
              size="sm"
              className="w-full text-xs font-semibold"
            >
              Contact AMX Duty Coordinator
            </WhatsAppButton>
          </Card>

          <Card className="p-6 bg-white border border-sand-300 space-y-2 text-xs">
            <h4 className="font-bold text-charcoal text-sm">Financial Settlement</h4>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-charcoal-muted">Your Net Payout:</span>
              <strong className="text-base font-bold text-primary">{formatETB(booking.totalPriceETB * 0.9)}</strong>
            </div>
            <p className="text-[11px] text-charcoal-muted">Settlement handled directly on day of service via Telebirr or cash.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}