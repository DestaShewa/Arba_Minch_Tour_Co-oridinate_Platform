"use client";

import React from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AMX_BRAND } from "@/lib/constants";
import { Clock, ShieldCheck, UserCheck, ExternalLink } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-sand-50">
      {/* Persistent Left Sidebar */}
      <AdminSidebar />

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-sand-300 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Duty Desk: Active (07:00 - 20:00 EAT)
            </span>
            <span className="hidden md:inline-block text-xs text-charcoal-muted">
              {AMX_BRAND.slaNotice}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-charcoal-muted hover:text-primary flex items-center gap-1 min-h-[44px]"
            >
              <span>View Live Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-sand-200">
              <div className="w-8 h-8 rounded-full bg-primary text-warmWhite flex items-center justify-center font-bold text-xs">
                ST
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-charcoal block leading-none">
                  Samson Tefera
                </span>
                <span className="text-[10px] text-charcoal-muted">
                  Senior Coordinator
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}