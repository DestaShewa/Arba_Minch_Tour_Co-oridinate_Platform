"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  DollarSign,
  User,
  Wrench,
  FileCheck,
  Settings,
  LogOut,
  ShieldCheck,
  Clock,
  Compass,
} from "lucide-react";

export const ProviderSidebar: React.FC<{
  providerName: string;
  providerType: string;
  isVerified: boolean;
}> = ({ providerName, providerType, isVerified }) => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/provider/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/provider/bookings", label: "Assigned Trips", icon: <CalendarCheck className="w-5 h-5" /> },
    { href: "/provider/availability", label: "My Availability", icon: <CalendarDays className="w-5 h-5" /> },
    { href: "/provider/earnings", label: "Earnings & Payouts", icon: <DollarSign className="w-5 h-5" /> },
    { href: "/provider/profile", label: "Provider Profile", icon: <User className="w-5 h-5" /> },
    { href: "/provider/services", label: "My Service Details", icon: <Wrench className="w-5 h-5" /> },
    { href: "/provider/documents", label: "Documents Vault", icon: <FileCheck className="w-5 h-5" /> },
    { href: "/provider/settings", label: "Settings & Agreement", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-charcoal text-warmWhite flex flex-col shrink-0 min-h-screen border-r border-charcoal-light">
      {/* Provider Portal Brand Header */}
      <div className="p-5 border-b border-charcoal-light space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-primary text-warmWhite font-extrabold flex items-center justify-center text-sm">
            A
          </div>
          <span className="font-bold text-sm tracking-tight text-warmWhite">AMX Partner Portal</span>
        </div>

        <div className="pt-2">
          <h2 className="text-base font-bold text-white truncate">{providerName}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs uppercase font-semibold text-sand-300">
              {providerType.replace(/_/g, " ")}
            </span>
            {isVerified ? (
              <span className="text-[10px] font-bold text-green-400 bg-green-950/60 px-1.5 py-0.5 rounded border border-green-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-400" /> Verified
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> In Review
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Nav Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "min-h-[44px] flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "text-sand-300 hover:bg-charcoal-light hover:text-white"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Switcher / Logout */}
      <div className="p-4 border-t border-charcoal-light space-y-2">
        <Link
          href="/provider/login"
          className="min-h-[44px] flex items-center gap-2 px-3 py-2 text-xs text-sand-300 hover:text-white rounded hover:bg-charcoal-light"
        >
          <LogOut className="w-4 h-4" />
          <span>Switch Demo Account</span>
        </Link>
      </div>
    </aside>
  );
};