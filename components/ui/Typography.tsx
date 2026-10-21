import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = false,
  className,
}) => {
  return (
    <div className={cn("space-y-2 mb-8 md:mb-12", centered && "text-center max-w-2xl mx-auto", className)}>
      {badge && (
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">{title}</h2>
      {subtitle && <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">{subtitle}</p>}
    </div>
  );
};

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, breadcrumb, actions, className }) => {
  return (
    <header className={cn("border-b border-sand-200 bg-white py-8 px-4 sm:px-6 md:px-8", className)}>
      <div className="max-w-7xl mx-auto space-y-3">
        {breadcrumb && <nav aria-label="Breadcrumb" className="text-xs text-charcoal-muted">{breadcrumb}</nav>}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-primary tracking-tight">{title}</h1>
            {description && <p className="text-base text-charcoal-muted max-w-3xl">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
        </div>
      </div>
    </header>
  );
};