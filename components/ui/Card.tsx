import React from "react";
import { cn } from "@/lib/utils";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={cn("bg-white border border-sand-200 rounded-lg shadow-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
};

export interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({ title, value, subtitle, icon, trend, className }) => {
  return (
    <Card className={cn("p-5 border-l-4 border-l-primary", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-charcoal-muted">{title}</span>
        {icon && <div className="text-secondary-600 bg-secondary-50 p-2 rounded-md">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-charcoal">{value}</span>
        {trend && <span className="text-xs text-accent font-medium">{trend}</span>}
      </div>
      {subtitle && <p className="text-xs text-charcoal-muted mt-1.5">{subtitle}</p>}
    </Card>
  );
};