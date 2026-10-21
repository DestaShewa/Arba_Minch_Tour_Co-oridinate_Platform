import React from "react";
import { cn } from "@/lib/utils";
import { PackagePriceItem } from "@/types/package";
import { AlertCircle } from "lucide-react";

export const PriceTable: React.FC<{
  items: PackagePriceItem[];
  lastUpdated?: string;
}> = ({ items, lastUpdated }) => {
  const statusLabels = {
    included: { label: "Yes", bg: "bg-green-100 text-green-800" },
    optional: { label: "Optional", bg: "bg-blue-100 text-blue-800" },
    excluded: { label: "Not included", bg: "bg-gray-100 text-gray-700" },
    to_be_confirmed: { label: "To be confirmed", bg: "bg-amber-100 text-amber-800" },
  };

  return (
    <div className="space-y-3">
      <div className="border border-sand-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand-100 text-charcoal font-semibold border-b border-sand-200">
            <tr>
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4 text-center">Included?</th>
              <th className="py-3 px-4 hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200">
            {items.map((row, idx) => (
              <tr key={idx} className="hover:bg-sand-50/50">
                <td className="py-3 px-4 font-medium text-charcoal">{row.item}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded text-xs font-semibold inline-block",
                      statusLabels[row.status].bg
                    )}
                  >
                    {statusLabels[row.status].label}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-charcoal-muted hidden sm:table-cell">
                  {row.note || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-charcoal-muted gap-2 pt-1 px-1">
        <p className="flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-accent shrink-0" />
          <span>Final price depends on travel dates, group size, and provider availability.</span>
        </p>
        {lastUpdated && <span>Price last updated: {lastUpdated}</span>}
      </div>
    </div>
  );
};