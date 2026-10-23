"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Inbox,
  ShieldCheck,
  FileCheck,
  AlertOctagon,
  BarChart3,
} from "lucide-react";

export const ProviderAdminSubNav: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { href: "/admin/providers", label: "Directory", icon: <Users className="w-4 h-4" /> },
    { href: "/admin/providers/applications", label: "Applications Queue", icon: <Inbox className="w-4 h-4" /> },
    { href: "/admin/providers/verification", label: "Inspection Queue", icon: <ShieldCheck className="w-4 h-4" /> },
    { href: "/admin/providers/documents", label: "Documents", icon: <FileCheck className="w-4 h-4" /> },
    { href: "/admin/providers/suspended", label: "Suspended", icon: <AlertOctagon className="w-4 h-4" /> },
    { href: "/admin/providers/reports", label: "Quality Reports", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <nav
      aria-label="Provider Administration Sections"
      className="flex items-center gap-2 border-b border-sand-300 pb-2 overflow-x-auto"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "tap-target px-3.5 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0",
              isActive
                ? "bg-primary text-warmWhite shadow-xs"
                : "bg-white text-charcoal hover:bg-sand-100 border border-sand-300"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};