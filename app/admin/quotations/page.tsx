"use client";

import React from "react";
import Link from "next/link";
import { AdminTable } from "@/components/layout/AdminTable";
import { QUOTATIONS } from "@/data/quotations";
import { formatETB } from "@/lib/utils";

export default function AdminQuotationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Quotations Management</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">
          Itemized proposals issued to prospective travelers.
        </p>
      </div>

      <AdminTable
        headers={[
          "Quotation #",
          "Customer",
          "Package",
          "Dates",
          "Total ETB",
          "Status",
          "Coordinator",
          "Action",
        ]}
      >
        {QUOTATIONS.map((qt) => (
          <tr key={qt.id} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 font-mono text-xs font-bold text-primary">
              {qt.quotationNumber}
            </td>
            <td className="py-3 px-4 text-xs font-semibold text-charcoal">
              {qt.customerName}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">{qt.packageName}</td>
            <td className="py-3 px-4 text-xs text-charcoal-muted">{qt.travelDates}</td>
            <td className="py-3 px-4 text-xs font-bold text-primary">
              {formatETB(qt.totalAmountETB)}
            </td>
            <td className="py-3 px-4">
              <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                {qt.status.replace("_", " ")}
              </span>
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">{qt.coordinatorName}</td>
            <td className="py-3 px-4">
              <Link
                href={`/admin/quotations/${qt.id}`}
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