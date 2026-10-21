"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminTable } from "@/components/layout/AdminTable";
import { PROVIDERS } from "@/data/providers";
import { VerifiedBadge } from "@/components/ui/Badge";
import { Provider } from "@/types/provider";

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>(PROVIDERS);

  const toggleAvailability = (id: string) => {
    setProviders(
      providers.map((p) =>
        p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Provider Management</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">
          Vetted local guides, drivers, boat operators, and accommodations.
        </p>
      </div>

      <AdminTable
        headers={[
          "Provider",
          "Role",
          "Verification Status",
          "Languages",
          "Service Area",
          "Availability Toggle",
          "Action",
        ]}
      >
        {providers.map((prov) => (
          <tr key={prov.id} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 font-bold text-charcoal text-xs">
              {prov.name}
            </td>
            <td className="py-3 px-4 text-xs uppercase text-charcoal-muted">
              {prov.role.replace("_", " ")}
            </td>
            <td className="py-3 px-4">
              <VerifiedBadge lastCheckedDate={prov.lastCheckedDate} />
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">
              {prov.languages.join(", ")}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal-muted max-w-[180px] truncate">
              {prov.serviceArea}
            </td>
            <td className="py-3 px-4">
              <button
                type="button"
                onClick={() => toggleAvailability(prov.id)}
                className={`tap-target px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  prov.isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {prov.isAvailable ? "Available" : "Unavailable"}
              </button>
            </td>
            <td className="py-3 px-4">
              <Link
                href={`/admin/providers/${prov.id}`}
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