import React from "react";
import { VerificationStatus } from "@/types/provider-onboarding";
import {
  Clock,
  Search,
  AlertCircle,
  ShieldCheck,
  Award,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export const VerificationStatusBadge: React.FC<{
  status: VerificationStatus;
  className?: string;
}> = ({ status, className }) => {
  const config: Record<
    VerificationStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    pending: {
      label: "Pending",
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-300",
      icon: <Clock className="w-3 h-3 text-gray-700" />,
    },
    under_review: {
      label: "Under Review",
      bg: "bg-blue-50",
      text: "text-secondary-800",
      border: "border-secondary-300",
      icon: <Search className="w-3 h-3 text-secondary" />,
    },
    more_info_needed: {
      label: "More Info Needed",
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-300",
      icon: <AlertCircle className="w-3 h-3 text-accent" />,
    },
    verified: {
      label: "AMX Verified",
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-300",
      icon: <ShieldCheck className="w-3 h-3 text-green-600" />,
    },
    trusted: {
      label: "Trusted Partner",
      bg: "bg-primary-50",
      text: "text-primary-900",
      border: "border-primary-300",
      icon: <Award className="w-3 h-3 text-primary" />,
    },
    restricted: {
      label: "Restricted",
      bg: "bg-orange-50",
      text: "text-orange-900",
      border: "border-orange-300",
      icon: <AlertTriangle className="w-3 h-3 text-orange-600" />,
    },
    suspended: {
      label: "Suspended",
      bg: "bg-red-50",
      text: "text-red-900",
      border: "border-red-300",
      icon: <XCircle className="w-3 h-3 text-red-600" />,
    },
  };

  const current = config[status] || config.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg} ${current.text} ${current.border} ${className || ""}`}
    >
      {current.icon}
      <span>{current.label}</span>
    </span>
  );
};