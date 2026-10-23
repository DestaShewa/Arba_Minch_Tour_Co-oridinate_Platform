"use client";

import React from "react";
import { ProviderAdminSubNav } from "@/components/admin/ProviderAdminSubNav";
import { Card } from "@/components/ui/Card";
import { BarChart3, TrendingUp, CheckCircle2, Clock } from "lucide-react";

export default function AdminProviderReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Provider Reliability Reports</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Quality tracking, punctuality rates, and trip completion analytics across Arba Minch.</p>
      </div>

      <ProviderAdminSubNav />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white border border-sand-300 space-y-1">
          <span className="text-xs text-charcoal-muted font-medium">Average Punctuality</span>
          <strong className="text-2xl font-bold text-primary block">98.4%</strong>
          <span className="text-[11px] text-green-700 font-semibold">15-min advance arrival</span>
        </Card>

        <Card className="p-5 bg-white border border-sand-300 space-y-1">
          <span className="text-xs text-charcoal-muted font-medium">Partner Cancellations</span>
          <strong className="text-2xl font-bold text-charcoal block">0 Trips</strong>
          <span className="text-[11px] text-green-700 font-semibold">Past 30 days</span>
        </Card>

        <Card className="p-5 bg-white border border-sand-300 space-y-1">
          <span className="text-xs text-charcoal-muted font-medium">Inspection Pass Rate</span>
          <strong className="text-2xl font-bold text-accent block">100%</strong>
          <span className="text-[11px] text-charcoal-muted font-semibold">Safety checks passed</span>
        </Card>
      </div>
    </div>
  );
}