"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication } from "@/types/provider-onboarding";
import { FileCheck, ShieldCheck, Clock } from "lucide-react";

export default function ProviderDocumentsPage() {
  const [session, setSession] = useState<ProviderApplication | null>(null);

  useEffect(() => {
    setSession(providerOnboardingService.getActiveProviderSession());
  }, []);

  if (!session) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Documents Vault</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Your identification, commercial driving license, and safety verification files.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white border border-sand-300 space-y-3">
          <FileCheck className="w-6 h-6 text-primary" />
          <div>
            <strong className="text-xs font-bold text-charcoal block">Kebele ID / Passport</strong>
            <span className="text-[11px] text-green-700 flex items-center gap-1 font-semibold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified by Coordinator
            </span>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-sand-300 space-y-3">
          <FileCheck className="w-6 h-6 text-secondary" />
          <div>
            <strong className="text-xs font-bold text-charcoal block">Commercial License / Permit</strong>
            <span className="text-[11px] text-green-700 flex items-center gap-1 font-semibold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Inspected & Current
            </span>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-sand-300 space-y-3">
          <FileCheck className="w-6 h-6 text-accent" />
          <div>
            <strong className="text-xs font-bold text-charcoal block">Safety Equipment Inspection</strong>
            <span className="text-[11px] text-green-700 flex items-center gap-1 font-semibold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Passed In-Person Check
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}