import React from "react";
import { cn, formatETB } from "@/lib/utils";
import { STATUS_CONFIG } from "@/lib/constants";
import { InquiryStatus } from "@/types/inquiry";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary" | "accent";
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", children, ...props }) => {
  const variantStyles = {
    default: "bg-sand-200 text-charcoal border-sand-300",
    outline: "bg-transparent text-charcoal border-sand-300",
    secondary: "bg-secondary-50 text-secondary-800 border-secondary-200",
    accent: "bg-amber-50 text-accent-800 border-amber-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: InquiryStatus; className?: string }> = ({ status, className }) => {
  const conf = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border",
        conf.bg,
        conf.text,
        conf.border,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {conf.label}
    </span>
  );
};

export const VerifiedBadge: React.FC<{ lastCheckedDate?: string; className?: string }> = ({
  lastCheckedDate,
  className,
}) => {
  return (
    <div className={cn("inline-flex flex-col items-start gap-0.5", className)}>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-primary-50 text-primary-800 border border-primary-200">
        <ShieldCheck className="w-3.5 h-3.5 text-primary-700" />
        AMX Verified
      </span>
      {lastCheckedDate && (
        <span className="text-[11px] text-charcoal-muted font-normal pl-1">
          Last checked: {lastCheckedDate}
        </span>
      )}
    </div>
  );
};

export const PriceTag: React.FC<{ amountETB: number; label?: string; isCustom?: boolean; className?: string }> = ({
  amountETB,
  label = "From",
  isCustom = false,
  className,
}) => {
  return (
    <div className={cn("inline-flex items-baseline gap-1.5", className)}>
      {!isCustom && <span className="text-xs text-charcoal-muted uppercase tracking-wider">{label}</span>}
      <span className="text-xl font-bold text-primary">
        {isCustom ? "Custom Quotation" : formatETB(amountETB)}
      </span>
    </div>
  );
};