"use client";

import React from "react";
import { AdminTable } from "@/components/layout/AdminTable";
import { Card } from "@/components/ui/Card";
import { formatETB } from "@/lib/utils";
import { DollarSign, TrendingUp, CheckCircle2 } from "lucide-react";

export default function ProviderEarningsPage() {
  const earningsLedger = [
    { date: "Oct 16, 2026", tripRef: "AMX-BK-7298", customer: "David O'Connor", grossETB: 6800, commissionETB: 680, netPayoutETB: 6120, method: "Telebirr Transfer", status: "Settled" },
    { date: "Oct 12, 2026", tripRef: "AMX-BK-7281", customer: "Sarah Jenkins", grossETB: 5500, commissionETB: 550, netPayoutETB: 4950, method: "Cash at Dock", status: "Settled" },
    { date: "Oct 08, 2026", tripRef: "AMX-BK-7264", customer: "Alain Dupont", grossETB: 12000, commissionETB: 1200, netPayoutETB: 10800, method: "CBE Bank Transfer", status: "Settled" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Earnings & Financial Settlements</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Transparent record of all customer trips, agreed commission, and net payouts in ETB.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white border border-sand-300">
          <span className="text-xs text-charcoal-muted font-medium block">Total Net Paid (This Month)</span>
          <strong className="text-2xl font-bold text-primary mt-1 block">{formatETB(21870)}</strong>
          <span className="text-[11px] text-green-700 font-semibold">100% settled</span>
        </Card>

        <Card className="p-5 bg-white border border-sand-300">
          <span className="text-xs text-charcoal-muted font-medium block">Pending Settlements</span>
          <strong className="text-2xl font-bold text-charcoal mt-1 block">{formatETB(6300)}</strong>
          <span className="text-[11px] text-secondary font-semibold">Scheduled for Oct 24</span>
        </Card>

        <Card className="p-5 bg-white border border-sand-300">
          <span className="text-xs text-charcoal-muted font-medium block">Agreed Commission Rate</span>
          <strong className="text-2xl font-bold text-charcoal mt-1 block">10%</strong>
          <span className="text-[11px] text-charcoal-muted font-semibold">Coordination & marketing</span>
        </Card>
      </div>

      <AdminTable
        headers={[
          "Trip Date",
          "Booking Ref",
          "Customer",
          "Customer Price",
          "AMX Commission (10%)",
          "Your Net Payout",
          "Payment Method",
          "Settlement Status",
        ]}
      >
        {earningsLedger.map((row, idx) => (
          <tr key={idx} className="hover:bg-sand-50/50">
            <td className="py-3 px-4 text-xs text-charcoal">{row.date}</td>
            <td className="py-3 px-4 font-mono text-xs font-bold text-primary">{row.tripRef}</td>
            <td className="py-3 px-4 text-xs font-semibold text-charcoal">{row.customer}</td>
            <td className="py-3 px-4 text-xs text-charcoal">{formatETB(row.grossETB)}</td>
            <td className="py-3 px-4 text-xs text-red-600 font-medium">-{formatETB(row.commissionETB)}</td>
            <td className="py-3 px-4 text-xs font-bold text-primary">{formatETB(row.netPayoutETB)}</td>
            <td className="py-3 px-4 text-xs text-charcoal-muted">{row.method}</td>
            <td className="py-3 px-4">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}