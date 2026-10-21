"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  Users,
  Compass,
  FileText,
  CalendarCheck,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/inquiries", label: "Inquiries", icon: <Inbox className="w-5 h-5" /> },
    { href: "/admin/quotations", label: "Quotations", icon: <FileText className="w-5 h-5" /> },
    { href: "/admin/bookings", label: "Bookings", icon: <CalendarCheck className="w-5 h-5" /> },
    { href: "/admin/providers", label: "Providers", icon: <Users className="w-5 h-5" /> },
    { href: "/admin/packages", label: "Packages", icon: <Compass className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-primary-900 text-warmWhite flex flex-col shrink-0 min-h-screen">
      <div className="p-6 border-b border-primary-800">
        <span className="text-xs font-bold text-accent uppercase tracking-wider block">Coordinator Desk</span>
        <h2 className="text-xl font-extrabold text-white">AMX Operations</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "min-h-[44px] flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary-700 text-white shadow-sm"
                  : "text-sand-200 hover:bg-primary-800 hover:text-white"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-800 space-y-2">
        <div className="px-3 py-2 text-xs text-sand-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-accent" />
          <span>Internal Mock Session</span>
        </div>
        <Link
          href="/admin/login"
          className="min-h-[44px] flex items-center gap-2 px-3 py-2 text-sm text-sand-200 hover:text-white rounded hover:bg-primary-800"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Mock</span>
        </Link>
      </div>
    </aside>
  );
};
