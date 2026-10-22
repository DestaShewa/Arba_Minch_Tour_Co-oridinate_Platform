import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { BookingSummaryCard } from "@/components/public/BookingSummaryCard";
import { BOOKINGS } from "@/data/bookings";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return BOOKINGS.map((b) => ({
    id: b.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const booking = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  return {
    title: `Confirmed Voucher ${booking.bookingNumber} | ${booking.packageName}`,
    description: `Official AMX Travel Voucher for ${booking.customerName}. Pickup: ${booking.pickupTime} at ${booking.pickupPoint}.`,
    openGraph: {
      title: `AMX Travel Voucher: ${booking.packageName}`,
      description: `Confirmed trip for ${booking.customerName} on ${booking.travelDates}. Coordinated by AMX Arba Minch.`,
    },
  };
}

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  if (!booking) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title={`Confirmed Booking ${booking.bookingNumber}`}
        description="Official AMX travel confirmation voucher. Present this digital document or reference number upon arrival."
        breadcrumb={
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Voucher {booking.bookingNumber}</span>
          </div>
        }
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex-1 w-full space-y-8">
        <div className="p-4 rounded-xl bg-primary-50 border border-primary-200 flex items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <span>All local providers confirmed for this trip schedule.</span>
          </div>
          <span className="text-xs text-charcoal-muted">
            Emergency Desk: {booking.emergencyContact.phone}
          </span>
        </div>

        <BookingSummaryCard booking={booking} />

        <div className="no-print text-center pt-4">
          <Link
            href="/"
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Return to homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}