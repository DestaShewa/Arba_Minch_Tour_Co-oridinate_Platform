"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionLink {
  id: string;
  label: string;
}

const SECTIONS: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "pricing", label: "Pricing" },
  { id: "preparation", label: "Prep & Cash" },
  { id: "safety", label: "Safety" },
  { id: "faq", label: "FAQ" },
];

export const PackageSubNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="Experience Sections"
      className="sticky top-18 z-30 bg-white/95 backdrop-blur-md border-b border-sand-300 py-2.5 px-4 sm:px-6 shadow-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            className={cn(
              "tap-target whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0",
              activeSection === sec.id
                ? "bg-primary text-warmWhite shadow-xs"
                : "bg-sand-100 text-charcoal hover:bg-sand-200"
            )}
          >
            {sec.label}
          </button>
        ))}
      </div>
    </nav>
  );
};