import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PACKAGES } from "@/data/packages";
import { Card } from "@/components/ui/Card";
import { formatETB } from "@/lib/utils";
import { Clock, ShieldCheck, Check, Sparkles, ArrowRight } from "lucide-react";

export const SelectedPackageSummary: React.FC<{ packageSlug: string }> = ({ packageSlug }) => {
  const pkg = PACKAGES.find((p) => p.slug === packageSlug) || PACKAGES[0];
  const isCustom = packageSlug === "custom" || pkg.priceType === "custom_quotation";

  return (
    <Card className="sticky top-24 bg-white border border-sand-300 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
      <div className="space-y-1 pb-3 border-b border-sand-200">
        <span className="text-[10px] uppercase font-bold text-accent tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-accent" /> Selected Experience
        </span>
        <h3 className="text-xl font-bold text-primary">{pkg.title}</h3>
      </div>

      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-sand-200">
        <Image
          src={pkg.heroImage}
          alt={pkg.title}
          fill
          sizes="(max-width: 1024px) 100vw, 350px"
          className="object-cover"
        />
        <div className="absolute top-2.5 right-2.5 bg-charcoal/85 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded">
          {pkg.duration}
        </div>
      </div>

      <div className="space-y-2 text-xs text-charcoal">
        <div className="flex justify-between items-baseline pt-1">
          <span className="text-charcoal-muted">Estimated Starting:</span>
          <strong className="text-base font-bold text-primary">
            {isCustom ? "Tailored Quotation" : formatETB(pkg.startingPriceETB)}
          </strong>
        </div>
        <div className="flex justify-between text-charcoal-muted">
          <span>Target Group:</span>
          <span className="font-medium text-charcoal">{pkg.groupSizeRange}</span>
        </div>
      </div>

      {/* Key Inclusions Preview */}
      <div className="space-y-2 pt-3 border-t border-sand-200">
        <span className="text-xs font-bold text-charcoal block">Key Inclusions:</span>
        <ul className="space-y-1.5 text-xs text-charcoal-muted">
          {pkg.includedList.slice(0, 3).map((inc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 rounded-lg bg-sand-50 border border-sand-200 text-xs text-charcoal-muted space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-primary">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>AMX Ground Coordination</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          No upfront reservation fee. You receive a written ETB quote with confirmed local providers.
        </p>
      </div>

      <div className="pt-1">
        <Link
          href={`/experiences/${pkg.slug}`}
          target="_blank"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
        >
          <span>View full package itinerary</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  );
};