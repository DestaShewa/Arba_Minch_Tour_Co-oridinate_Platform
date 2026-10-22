"use client";

import React from "react";
import { formatETB } from "@/lib/utils";
import { Quotation } from "@/types/quotation";
import { Card } from "@/components/ui/Card";
import { AMX_BRAND } from "@/lib/constants";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export const QuotationCard: React.FC<{
  quotation: Quotation;
  onAccept?: () => void;
  onRequestChanges?: () => void;
}> = ({ quotation, onAccept, onRequestChanges }) => {
  return (
    <Card className="print-card max-w-3xl mx-auto p-6 sm:p-8 space-y-8 bg-white border border-sand-300 shadow-md">
      {/* Document Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-sand-200">
        <div>
          <span className="text-xs uppercase font-bold text-accent tracking-wider">
            Official Quotation
          </span>
          <h2 className="text-2xl font-bold text-primary mt-1">
            {AMX_BRAND.fullName}
          </h2>
          <p className="text-xs text-charcoal-muted mt-0.5">{AMX_BRAND.location}</p>
        </div>
        <div className="text-left sm:text-right space-y-1.5">
          <span className="text-sm font-bold text-charcoal font-mono block">
            {quotation.quotationNumber}
          </span>

          {/* Validity Countdown Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-accent border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>Rate Protected: {quotation.validityDate}</span>
          </div>

          <div>
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 uppercase">
              {quotation.status.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Guest & Trip Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-sand-50 border border-sand-200 text-sm">
        <div>
          <span className="text-xs text-charcoal-muted block">Customer</span>
          <span className="font-bold text-charcoal">{quotation.customerName}</span>
        </div>
        <div>
          <span className="text-xs text-charcoal-muted block">Dates</span>
          <span className="font-bold text-charcoal">{quotation.travelDates}</span>
        </div>
        <div>
          <span className="text-xs text-charcoal-muted block">Guests</span>
          <span className="font-bold text-charcoal">{quotation.numberOfGuests} Travelers</span>
        </div>
        <div>
          <span className="text-xs text-charcoal-muted block">Package</span>
          <span className="font-bold text-charcoal truncate block">{quotation.packageName}</span>
        </div>
      </div>

      {/* Itemized Price Breakdown Table */}
      <div className="space-y-2">
        <h3 className="text-base font-bold text-charcoal">Itemized Cost Breakdown</h3>
        <div className="border border-sand-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-sand-100 text-charcoal font-semibold border-b border-sand-200">
              <tr>
                <th scope="col" className="py-2.5 px-4">Service Line</th>
                <th scope="col" className="py-2.5 px-4 hidden sm:table-cell">Verified Provider Assigned</th>
                <th scope="col" className="py-2.5 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {quotation.lineItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-sand-50">
                  <td className="py-2.5 px-4 font-medium">{item.item}</td>
                  <td className="py-2.5 px-4 text-xs text-charcoal-muted hidden sm:table-cell">
                    {item.providerName || "Verified Partner"}
                  </td>
                  <td className="py-2.5 px-4 text-right font-semibold text-charcoal">
                    {formatETB(item.amountETB)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Prominent Grand Total */}
        <div className="p-4 bg-primary-50 rounded-lg flex justify-between items-center border border-primary-200">
          <div>
            <span className="text-sm font-bold text-primary block">
              Total Quotation Amount
            </span>
            <span className="text-xs text-charcoal-muted">
              All taxes and AMX ground coordination included
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-primary">
            {formatETB(quotation.totalAmountETB)}
          </span>
        </div>
      </div>

      {/* Cancellation Terms & Coordinator Notice */}
      <div className="p-4 rounded-lg bg-sand-50 border border-sand-200 text-xs space-y-1.5 text-charcoal-muted">
        <p className="font-semibold text-charcoal">Cancellation Policy:</p>
        <p>{quotation.cancellationPolicy}</p>
        <p className="pt-1">
          Your coordinator: <strong className="text-charcoal">{quotation.coordinatorName}</strong> ({quotation.coordinatorWhatsApp})
        </p>
      </div>

      {/* Interactive Actions (Excluded from Print) */}
      <div className="no-print flex flex-col sm:flex-row gap-3 pt-4 border-t border-sand-200">
        <PrimaryButton onClick={onAccept} className="flex-1 font-bold">
          Accept Quotation
        </PrimaryButton>
        <SecondaryButton onClick={onRequestChanges} variant="outline" className="flex-1 font-semibold">
          Request Specific Changes
        </SecondaryButton>
      </div>
    </Card>
  );
};