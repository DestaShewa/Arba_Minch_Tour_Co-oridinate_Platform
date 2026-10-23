"use client";

import React from "react";
import Link from "next/link";
import { ProviderAdminSubNav } from "@/components/admin/ProviderAdminSubNav";
import { AdminTable } from "@/components/layout/AdminTable";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, MapPin, Calendar } from "lucide-react";

export default function AdminInspectionQueuePage() {
  const queue = [
    { name: "Dawit Wolde", role: "Driver", location: "Sikela Taxi Stand", scheduledDate: "Oct 24, 2026 (10:00 AM)", itemToCheck: "Toyota Land Cruiser A/C & Seatbelts", id: "app-prov-001" },
    { name: "Kassaye Bancha", role: "Cultural Artisan", location: "Dorze Village Chencha", scheduledDate: "Oct 25, 2026 (02:00 PM)", itemToCheck: "Homestead safety & demonstration area", id: "app-prov-002" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Physical Inspection Queue</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Scheduled in-person vehicle checks, boat inspections, and lodge audits in Arba Minch.</p>
      </div>

      <ProviderAdminSubNav />

      <AdminTable
        headers={[
          "Provider",
          "Role",
          "Inspection Location",
          "Scheduled Date",
          "Check Scope",
          "Action",
        ]}
      >
        {queue.map((q, idx) => (
          <tr key={idx} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 font-bold text-xs text-charcoal">{q.name}</td>
            <td className="py-3 px-4 text-xs text-charcoal-muted uppercase">{q.role}</td>
            <td className="py-3 px-4 text-xs text-charcoal flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" /> {q.location}
            </td>
            <td className="py-3 px-4 text-xs text-primary font-semibold">{q.scheduledDate}</td>
            <td className="py-3 px-4 text-xs text-charcoal-muted">{q.itemToCheck}</td>
            <td className="py-3 px-4">
              <Link href={`/admin/providers/${q.id}`} className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center">
                Execute Audit →
              </Link>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}