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

export const AdminTable: React.FC<{
  headers: string[];
  children: React.ReactNode;
  className?: string;
}> = ({ headers, children, className }) => {
  return (
    <div className={cn("border border-sand-300 rounded-lg overflow-x-auto bg-white shadow-sm", className)}>
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-sand-100 border-b border-sand-300 text-charcoal font-semibold">
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} className="py-3 px-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-sand-200">{children}</tbody>
      </table>
    </div>
  );
};