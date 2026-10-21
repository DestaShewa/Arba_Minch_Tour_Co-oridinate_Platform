import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExperiencePackage } from "@/types/package";
import { Provider } from "@/types/provider";
import { Card } from "@/components/ui/Card";
import { VerifiedBadge, PriceTag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, CheckCircle2, ChevronRight, Car, Anchor, Compass } from "lucide-react";

export const PackageCard: React.FC<{ pkg: ExperiencePackage; priority?: boolean }> = ({ pkg, priority = false }) => {
  return (
    <Card className="flex flex-col h-full hover:border-sand-400 transition-all duration-200 group">
      <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-sand-200">
        <Image
          src={pkg.heroImage}
          alt={pkg.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded">
          {pkg.duration}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-primary group-hover:text-primary-700 transition-colors">
            {pkg.title}
          </h3>
          <p className="text-sm text-charcoal-muted line-clamp-2 leading-relaxed">
            {pkg.shortDescription}
          </p>
          <ul className="space-y-1.5 pt-1">
            {pkg.keyHighlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="text-xs text-charcoal flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-sand-200 flex items-center justify-between gap-3">
          <PriceTag
            amountETB={pkg.startingPriceETB}
            isCustom={pkg.priceType === "custom_quotation"}
          />
          <Link href={`/experiences/${pkg.slug}`}>
            <Button variant="outline" size="sm" className="font-semibold group-hover:border-primary">
              View Experience
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};