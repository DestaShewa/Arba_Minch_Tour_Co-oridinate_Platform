"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC<{ items: FAQItemProps[]; className?: string }> = ({
  items,
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-sand-300 rounded-lg bg-white overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full min-h-[44px] p-4 text-left font-semibold text-charcoal flex items-center justify-between gap-4 hover:bg-sand-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="text-base">{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-charcoal-muted shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180 text-primary"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-sm text-charcoal-muted leading-relaxed border-t border-sand-100 bg-sand-50/40">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};