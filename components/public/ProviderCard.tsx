import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Provider, ProviderRole } from "@/types/provider";
import { Card } from "@/components/ui/Card";
import { VerifiedBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  Car,
  Anchor,
  Building2,
  Utensils,
  Sparkles,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export const ProviderCard: React.FC<{ provider: Provider }> = ({ provider }) => {
  // Explicitly map all 8 provider categories
  const roleIcons: Record<ProviderRole, React.ReactNode> = {
    guide: <Compass className="w-3.5 h-3.5 text-primary" />,
    driver: <Car className="w-3.5 h-3.5 text-secondary" />,
    boat_operator: <Anchor className="w-3.5 h-3.5 text-secondary" />,
    hotel: <Building2 className="w-3.5 h-3.5 text-accent" />,
    restaurant: <Utensils className="w-3.5 h-3.5 text-accent" />,
    cultural_provider: <Sparkles className="w-3.5 h-3.5 text-primary" />,
    tour_operator: <Briefcase className="w-3.5 h-3.5 text-secondary" />,
    other: <HelpCircle className="w-3.5 h-3.5 text-charcoal-muted" />,
  };

  return (
    <Card className="flex flex-col h-full hover:border-sand-400 transition-all p-5 space-y-4 bg-white">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-sand-200 border-2 border-primary/20">
          <Image
            src={provider.photo}
            alt={provider.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
            {roleIcons[provider.role] || <HelpCircle className="w-3.5 h-3.5" />}
            <span className="truncate">{provider.role.replace(/_/g, " ")}</span>
          </div>
          <h3 className="font-bold text-lg text-charcoal truncate">{provider.name}</h3>
          <VerifiedBadge lastCheckedDate={provider.lastCheckedDate} />
        </div>
      </div>

      <p className="text-sm text-charcoal-muted line-clamp-3 leading-relaxed">
        {provider.shortBio}
      </p>

      <div className="pt-3 border-t border-sand-200 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-charcoal-muted">Languages:</span>
          <span className="font-medium text-charcoal">{provider.languages.join(", ")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-muted">Area:</span>
          <span className="font-medium text-charcoal truncate max-w-[180px] text-right">
            {provider.serviceArea}
          </span>
        </div>
      </div>

      <div className="pt-2">
        <Link href={`/providers/${provider.slug}`} className="block">
          <Button variant="outline" size="sm" className="w-full font-semibold">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
};