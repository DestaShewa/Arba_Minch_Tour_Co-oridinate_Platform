"use client";

import React from "react";
import { ProviderAdminSubNav } from "@/components/admin/ProviderAdminSubNav";
import { Card } from "@/components/ui/Card";
import { AlertOctagon, CheckCircle2 } from "lucide-react";

export default function AdminSuspendedProvidersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Restricted & Suspended Partners</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Partners temporarily or permanently excluded from receiving trip assignments.</p>
      </div>

      <ProviderAdminSubNav />

      <Card className="p-8 text-center bg-white border border-sand-300 space-y-3">
        <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
        <h2 className="text-base font-bold text-charcoal">No Partners Currently Suspended</h2>
        <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
          All verified local providers in Arba Minch currently maintain active safety, punctuality, and licensing compliance.
        </p>
      </Card>
    </div>
  );
}