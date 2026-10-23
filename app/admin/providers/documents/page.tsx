"use client";

import React from "react";
import Link from "next/link";
import { ProviderAdminSubNav } from "@/components/admin/ProviderAdminSubNav";
import { AdminTable } from "@/components/layout/AdminTable";
import { FileCheck, ShieldCheck } from "lucide-react";

export default function AdminDocumentsVaultPage() {
  const docs = [
    { provider: "Dawit Wolde", type: "Driver License", filename: "dawit-commercial-license.pdf", status: "Inspected", id: "app-prov-001" },
    { provider: "Kassaye Bancha", type: "Cooperative Certificate", filename: "dorze-coop-reg.pdf", status: "Verified", id: "app-prov-002" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Document Verification Vault</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Uploaded Kebele IDs, driving licenses, guide association cards, and certificates.</p>
      </div>

      <ProviderAdminSubNav />

      <AdminTable
        headers={["Provider", "Document Type", "File Name", "Status", "Action"]}
      >
        {docs.map((d, idx) => (
          <tr key={idx} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 font-bold text-xs text-charcoal">{d.provider}</td>
            <td className="py-3 px-4 text-xs text-charcoal">{d.type}</td>
            <td className="py-3 px-4 text-xs font-mono text-charcoal-muted">{d.filename}</td>
            <td className="py-3 px-4">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                {d.status}
              </span>
            </td>
            <td className="py-3 px-4">
              <Link href={`/admin/providers/${d.id}`} className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center">
                Review Dossier →
              </Link>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}