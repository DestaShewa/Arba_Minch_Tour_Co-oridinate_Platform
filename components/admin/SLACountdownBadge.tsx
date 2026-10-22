"use client";

import React from "react";
import { InquiryStatus } from "@/types/inquiry";
import { Timer, AlertTriangle, CheckCircle2 } from "lucide-react";

export const SLACountdownBadge: React.FC<{
  createdAt: string;
  status: InquiryStatus;
  className?: string;
}> = ({ createdAt, status, className }) => {
  // If already processed beyond new/contacted, SLA requirement is satisfied
  if (status !== "new" && status !== "contacted") {
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200 ${className || ""}`}>
        <CheckCircle2 className="w-3 h-3 text-green-600" />
        <span>SLA Met</span>
      </span>
    );
  }

  // Calculate elapsed time in minutes
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60));
  const remainingMinutes = 30 - diffMinutes;

  if (remainingMinutes <= 0) {
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-300 animate-pulse ${className || ""}`}>
        <AlertTriangle className="w-3 h-3 text-red-600" />
        <span>SLA Exceeded (+{Math.abs(remainingMinutes)}m)</span>
      </span>
    );
  }

  if (remainingMinutes <= 12) {
    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 ${className || ""}`}>
        <Timer className="w-3 h-3 text-amber-700" />
        <span>{remainingMinutes}m SLA left</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold text-primary-800 bg-primary-50 px-2 py-0.5 rounded border border-primary-200 ${className || ""}`}>
      <Timer className="w-3 h-3 text-primary-700" />
      <span>{remainingMinutes}m SLA left</span>
    </span>
  );
};