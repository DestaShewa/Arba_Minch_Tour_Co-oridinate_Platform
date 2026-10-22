import React from "react";
import { ItineraryItem } from "@/types/package";
import { Clock, MapPin, Car, Anchor, Sparkles, Utensils, Eye } from "lucide-react";

function getTimelineIcon(title: string, description: string) {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("pickup") || text.includes("transfer") || text.includes("drive") || text.includes("drop-off") || text.includes("airport")) {
    return <Car className="w-3.5 h-3.5 text-white" />;
  }
  if (text.includes("boat") || text.includes("dock") || text.includes("cruise") || text.includes("shore") || text.includes("debarkation")) {
    return <Anchor className="w-3.5 h-3.5 text-white" />;
  }
  if (text.includes("crocodile") || text.includes("hippo") || text.includes("bird") || text.includes("wildlife")) {
    return <Eye className="w-3.5 h-3.5 text-white" />;
  }
  if (text.includes("dorze") || text.includes("weaving") || text.includes("kocho") || text.includes("cultural") || text.includes("bamboo")) {
    return <Sparkles className="w-3.5 h-3.5 text-white" />;
  }
  if (text.includes("lunch") || text.includes("dinner") || text.includes("meal") || text.includes("fish")) {
    return <Utensils className="w-3.5 h-3.5 text-white" />;
  }
  return <Clock className="w-3.5 h-3.5 text-white" />;
}

export const ItineraryTimeline: React.FC<{ items: ItineraryItem[] }> = ({ items }) => {
  return (
    <div className="relative pl-7 sm:pl-9 border-l-2 border-primary/30 space-y-8 my-6">
      {items.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Contextual Icon Node */}
          <div className="absolute -left-[43px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-4 ring-white shadow-xs">
            {getTimelineIcon(item.title, item.description)}
          </div>

          <div className="space-y-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary-800 bg-secondary-50 px-2 py-0.5 rounded border border-secondary-200">
                <Clock className="w-3 h-3" />
                {item.time}
              </span>
              {item.location && (
                <span className="text-xs text-charcoal-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-accent shrink-0" />
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