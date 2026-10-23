"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminTable } from "@/components/layout/AdminTable";
import { BOOKINGS } from "@/data/bookings";
import { formatETB } from "@/lib/utils";
import { CalendarCheck, MapPin } from "lucide-react";

export default function ProviderBookingsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Assigned Customer Trips</h1>
          <p className="text-xs text-charcoal-muted mt-0.5">Trips coordinated and assigned to your service schedule by AMX.</p>
        </div>
      </div>

      <AdminTable
        headers={[
          "Booking Ref",
          "Experience Package",
          "Date & Pickup Time",
          "Pickup Location",
          "Guest Name",
          "Your Net Payout",
          "Status",
          "Action",
        ]}
      >
        {BOOKINGS.map((bk) => (
          <tr key={bk.id} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 font-mono text-xs font-bold text-primary">
              {bk.bookingNumber}
            </td>
            <td className="py-3 px-4 text-xs font-bold text-charcoal">
              {bk.packageName}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">
              {bk.travelDates} ({bk.pickupTime})
            </td>
            <td className="py-3 px-4 text-xs text-charcoal-muted max-w-[200px] truncate">
              {bk.pickupPoint}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal font-medium">
              {bk.customerName}
            </td>
            <td className="py-3 px-4 text-xs font-bold text-primary">
              {formatETB(bk.totalPriceETB * 0.9)} {/* Net after ~10% commission */}
            </td>
            <td className="py-3 px-4">
              <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                {bk.status}
              </span>
            </td>
            <td className="py-3 px-4">
              <Link
                href={`/provider/bookings/${bk.id}`}
                className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center"
              >
                Inspect Dossier →
              </Link>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}