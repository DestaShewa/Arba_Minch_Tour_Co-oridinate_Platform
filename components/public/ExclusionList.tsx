import React from "react";
import { X } from "lucide-react";

export const ExclusionList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className="bg-sand-50 border border-sand-200 rounded-lg p-5 space-y-3">
      <h4 className="font-bold text-charcoal text-base flex items-center gap-2">
        <X className="w-5 h-5 text-red-500" />
        What is not included
      </h4>
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-charcoal-muted flex items-start gap-2.5">
            <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
              <X className="w-3 h-3" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};