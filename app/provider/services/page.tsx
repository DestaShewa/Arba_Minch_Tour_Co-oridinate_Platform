"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication } from "@/types/provider-onboarding";
import { Wrench } from "lucide-react";

export default function ProviderServicesPage() {
  const [session, setSession] = useState<ProviderApplication | null>(null);

  useEffect(() => {
    setSession(providerOnboardingService.getActiveProviderSession());
  }, []);

  if (!session) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">My Service Specifications</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Parameters used by coordinators when assigning you to traveler itineraries.</p>
      </div>

      <Card className="p-6 bg-white border border-sand-300 space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
          <Wrench className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-charcoal capitalize">{session.providerType.replace(/_/g, " ")} Specs</h2>
        </div>

        <div className="p-4 bg-sand-50 rounded-xl space-y-2 text-xs">
          <span className="font-bold text-charcoal block">Active Service Attributes:</span>
          {session.providerType === "driver" && "details" in session.serviceProfile && (
            <div className="space-y-1 text-charcoal-muted">
              <p>Vehicle: <strong>{(session.serviceProfile.details as any).vehicleType}</strong></p>
              <p>Plate Number: <strong>{(session.serviceProfile.details as any).plateNumber}</strong></p>
              <p>Seat Capacity: <strong>{(session.serviceProfile.details as any).seatCapacity} Passengers</strong></p>
              <p>A/C: <strong>{(session.serviceProfile.details as any).hasAirConditioning ? "Equipped" : "Natural"}</strong></p>
            </div>
          )}
          {session.providerType !== "driver" && (
            <p className="text-charcoal-muted">Standard certified service parameters logged under application {session.applicationNumber}.</p>
          )}
        </div>
      </Card>
    </div>
  );
}