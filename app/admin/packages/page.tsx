"use client";

import React from "react";
import Link from "next/link";
import { AdminTable } from "@/components/layout/AdminTable";
import { PACKAGES } from "@/data/packages";
import { formatETB } from "@/lib/utils";

export default function AdminPackagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Experience Packages</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">
          Curated itineraries, durations, and base pricing structures.
        </p>
      </div>

      <AdminTable
        headers={[
          "Package Title",
          "Duration",
          "Starting Price (ETB)",
          "Group Size",
          "Last Update",
          "Action",
        ]}
      >
        {PACKAGES.map((pkg) => (
          <tr key={pkg.id} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 font-bold text-charcoal text-xs">
              {pkg.title}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal-muted">
              {pkg.duration}
            </td>
            <td className="py-3 px-4 text-xs font-bold text-primary">
              {pkg.startingPriceETB > 0
                ? formatETB(pkg.startingPriceETB)
                : "Custom Quotation"}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">
              {pkg.groupSizeRange}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal-muted">
              {pkg.lastPriceUpdate}
            </td>
            <td className="py-3 px-4">
              <Link
                href={`/experiences/${pkg.slug}`}
                target="_blank"
                className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center"
              >
                View Public Page →
              </Link>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}