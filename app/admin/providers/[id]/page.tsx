"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PROVIDERS } from "@/data/providers";
import { Card } from "@/components/ui/Card";
import { VerifiedBadge } from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";

export default function AdminProviderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const provider = PROVIDERS.find((p) => p.id === id) || PROVIDERS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/providers"
          className="tap-target p-2 text-charcoal-muted hover:text-primary rounded-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs uppercase font-bold text-charcoal-muted block">
            {provider.role.replace("_", " ")}
          </span>
          <h1 className="text-2xl font-bold text-charcoal">{provider.name}</h1>
        </div>
      </div>

      <Card className="p-6 bg-white border border-sand-300 space-y-4 max-w-2xl">
        <VerifiedBadge lastCheckedDate={provider.lastCheckedDate} />
        <p className="text-sm text-charcoal leading-relaxed">{provider.shortBio}</p>
        <div className="p-3 bg-sand-50 rounded-lg text-xs space-y-1">
          <div>Languages: <strong>{provider.languages.join(", ")}</strong></div>
          <div>Service Area: <strong>{provider.serviceArea}</strong></div>
          <div>Standard Rate: <strong>{provider.priceRangeETB}</strong></div>
        </div>
      </Card>
    </div>
  );
}