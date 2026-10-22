import React from "react";
import { cn } from "@/lib/utils";
import { PackagePriceItem } from "@/types/package";
import { AlertCircle, Check, X, HelpCircle, Plus } from "lucide-react";

export const PriceTable: React.FC<{
  items: PackagePriceItem[];
  lastUpdated?: string;
}> = ({ items, lastUpdated }) => {
  const statusConfig = {
    included: {
      label: "Included",
      bg: "bg-green-100 text-green-800 border-green-200",
      icon: <Check className="w-3.5 h-3.5 text-green-700" />,
    },
    optional: {
      label: "Optional",
      bg: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Plus className="w-3.5 h-3.5 text-blue-700" />,
    },
    excluded: {
      label: "Not included",
      bg: "bg-gray-100 text-gray-700 border-gray-300",
      icon: <X className="w-3.5 h-3.5 text-gray-600" />,
    },
    to_be_confirmed: {
      label: "To be confirmed",
      bg: "bg-amber-100 text-amber-900 border-amber-300",
      icon: <HelpCircle className="w-3.5 h-3.5 text-amber-800" />,
    },
  };

  return (
    <div className="space-y-3">
      <div className="border border-sand-300 rounded-lg overflow-hidden bg-white shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand-100 text-charcoal font-semibold border-b border-sand-300">
            <tr>
              <th scope="col" className="py-3 px-4">Item</th>
              <th scope="col" className="py-3 px-4 text-center">Status</th>
              <th scope="col" className="py-3 px-4 hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200">
            {items.map((row, idx) => {
              const conf = statusConfig[row.status];
              return (
                <tr key={idx} className="hover:bg-sand-50/60 transition-colors">
                  <td className="py-3 px-4 font-medium text-charcoal">{row.item}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                        conf.bg
                      )}
                    >
                      {conf.icon}
                      <span>{conf.label}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-charcoal-muted hidden sm:table-cell">
                    {row.note || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-charcoal-muted gap-2 pt-1 px-1">
        <p className="flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-accent shrink-0" />
          <span>Final price depends on travel dates, group size, and provider availability.</span>
        </p>
        {lastUpdated && <span>Price last checked: {lastUpdated}</span>}
      </div>
    </div>
  );
};