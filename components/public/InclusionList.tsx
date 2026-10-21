import React from "react";
import { Check } from "lucide-react";

export const InclusionList: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className="bg-primary-50/50 border border-primary-100 rounded-lg p-5 space-y-3">
      <h4 className="font-bold text-primary text-base flex items-center gap-2">
        <Check className="w-5 h-5 text-primary" />
        What is included
      </h4>
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-charcoal flex items-start gap-2.5">
            <span className="w-4 h-4 rounded-full bg-primary-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};