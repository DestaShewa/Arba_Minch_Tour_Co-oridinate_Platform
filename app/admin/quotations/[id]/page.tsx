"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { QUOTATIONS } from "@/data/quotations";
import { formatETB } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function AdminQuotationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const quote = QUOTATIONS.find((q) => q.id === id) || QUOTATIONS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/quotations"
          className="tap-target p-2 text-charcoal-muted hover:text-primary rounded-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs font-mono font-bold text-primary block">
            {quote.quotationNumber}
          </span>
          <h1 className="text-2xl font-bold text-charcoal">
            Quotation for {quote.customerName}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 bg-white border border-sand-300 space-y-6">
            <h3 className="text-base font-bold text-charcoal">Itemized Breakdown</h3>
            <div className="border border-sand-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-sand-100 text-charcoal border-b border-sand-200">
                  <tr>
                    <th className="p-3">Service Line</th>
                    <th className="p-3">Provider Assigned</th>
                    <th className="p-3 text-right">Cost (ETB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {quote.lineItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-medium">{item.item}</td>
                      <td className="p-3 text-xs text-charcoal-muted">{item.providerName}</td>
                      <td className="p-3 text-right font-bold">{formatETB(item.amountETB)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-primary-50 rounded-lg flex justify-between items-center border border-primary-200">
              <span className="font-bold text-primary">Prominent Total</span>
              <span className="text-2xl font-extrabold text-primary">{formatETB(quote.totalAmountETB)}</span>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 bg-white border border-sand-300 space-y-3 text-xs">
            <h4 className="font-bold text-charcoal text-sm">Public Document Link</h4>
            <p className="text-charcoal-muted">Share this link directly with the customer:</p>
            <Link
              href={`/quotation/${quote.id}`}
              target="_blank"
              className="font-mono text-primary hover:underline flex items-center gap-1.5 pt-1"
            >
              <span>/quotation/{quote.id}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}