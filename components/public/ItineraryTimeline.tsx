import React from "react";
import { cn, formatETB } from "@/lib/utils";
import { ItineraryItem, PackagePriceItem } from "@/types/package";
import { Check, X, Clock, MapPin, AlertCircle } from "lucide-react";

// Vertical Itinerary Timeline
export const ItineraryTimeline: React.FC<{ items: ItineraryItem[] }> = ({ items }) => {
  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/30 space-y-8 my-6">
      {items.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Timeline node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-white" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary-800 bg-secondary-50 px-2 py-0.5 rounded border border-secondary-200">
                <Clock className="w-3 h-3" />
                {item.time}
              </span>
              {item.location && (
                <span className="text-xs text-charcoal-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-accent" />
                  {item.location}
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-charcoal">{item.title}</h4>
            <p className="text-sm text-charcoal-muted leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
