"use client";

import React from "react";
import Link from "next/link";
import { AdminTable } from "@/components/layout/AdminTable";
import { BOOKINGS } from "@/data/bookings";
import { formatETB } from "@/lib/utils";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Confirmed Bookings</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">
          Active itineraries with verified provider assignments.
        </p>
      </div>

      <AdminTable
        headers={[
          "Booking #",
          "Lead Guest",
          "Package",
          "Pickup Time & Point",
          "Payment Status",
          "Total ETB",
          "Status",
          "Action",
        ]}
      >
        {BOOKINGS.map((bk) => (
          <tr key={bk.id} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 font-mono text-xs font-bold text-primary">
              {bk.bookingNumber}
            </td>
            <td className="py-3 px-4">
              <strong className="text-xs text-charcoal block">{bk.customerName}</strong>
              <span className="text-[11px] text-charcoal-muted">{bk.customerWhatsApp}</span>
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">{bk.packageName}</td>
            <td className="py-3 px-4 text-xs text-charcoal-muted max-w-[200px] truncate">
              {bk.pickupTime} — {bk.pickupPoint}
            </td>
            <td className="py-3 px-4 text-xs uppercase font-semibold text-charcoal">
              {bk.paymentStatus.replace("_", " ")}
            </td>
            <td className="py-3 px-4 text-xs font-bold text-primary">
              {formatETB(bk.totalPriceETB)}
            </td>
            <td className="py-3 px-4">
              <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                {bk.status}
              </span>
            </td>
            <td className="py-3 px-4">
              <Link
                href={`/admin/bookings/${bk.id}`}
                className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center"
              >
                Inspect →
              </Link>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}