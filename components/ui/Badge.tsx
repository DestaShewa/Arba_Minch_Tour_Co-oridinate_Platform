import React from "react";
import { cn, formatETB } from "@/lib/utils";
import { STATUS_CONFIG } from "@/lib/constants";
import { InquiryStatus } from "@/types/inquiry";
import {
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  XCircle,
  CheckCheck,
} from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary" | "accent";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
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

/**
 * Accessible Status Badge: Combines 7 color tokens with distinct operational icons
 */
export const StatusBadge: React.FC<{
  status: InquiryStatus;
  className?: string;
}> = ({ status, className }) => {
  const conf = STATUS_CONFIG[status] || STATUS_CONFIG.new;

  const statusIcons: Record<InquiryStatus, React.ReactNode> = {
    new: <Sparkles className="w-3 h-3 mr-1 text-gray-700" />,
    contacted: <MessageSquare className="w-3 h-3 mr-1 text-secondary-700" />,
    awaiting_provider: <Clock className="w-3 h-3 mr-1 text-amber-700" />,
    quotation_sent: <Send className="w-3 h-3 mr-1 text-purple-700" />,
    confirmed: <CheckCircle2 className="w-3 h-3 mr-1 text-green-700" />,
    cancelled: <XCircle className="w-3 h-3 mr-1 text-red-700" />,
    completed: <CheckCheck className="w-3 h-3 mr-1 text-primary-800" />,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border select-none",
        conf.bg,
        conf.text,
        conf.border,
        className
      )}
    >
      {statusIcons[status]}
      <span>{conf.label}</span>
    </span>
  );
};

export const VerifiedBadge: React.FC<{
  lastCheckedDate?: string;
  className?: string;
}> = ({ lastCheckedDate, className }) => {
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

export const PriceTag: React.FC<{
  amountETB: number;
  label?: string;
  isCustom?: boolean;
  className?: string;
}> = ({ amountETB, label = "From", isCustom = false, className }) => {
  return (
    <div className={cn("inline-flex items-baseline gap-1.5", className)}>
      {!isCustom && (
        <span className="text-xs text-charcoal-muted uppercase tracking-wider">
          {label}
        </span>
      )}
      <span className="text-xl font-bold text-primary">
        {isCustom || amountETB <= 0 ? "Tailored Itinerary" : formatETB(amountETB)}
      </span>
    </div>
  );
};