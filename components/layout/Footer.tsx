import React from "react";
import Link from "next/link";
import { AMX_BRAND } from "@/lib/constants";
import { Briefcase } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-warmWhite border-t border-primary-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent text-white font-bold flex items-center justify-center text-base">
                A
              </div>
              <span className="font-bold text-xl tracking-tight">{AMX_BRAND.fullName}</span>
            </div>
            <p className="text-sm text-sand-200 max-w-sm leading-relaxed">
              {AMX_BRAND.tagline}
            </p>
            <p className="text-xs text-sand-300">
              AMX connects visitors with verified local tourism providers and organizes clear, reliable Arba Minch experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent">Experiences</h4>
            <ul className="space-y-2 text-sm text-sand-200">
              <li><Link href="/experiences/lake-chamo-experience" className="hover:text-white">Lake Chamo Safari</Link></li>
              <li><Link href="/experiences/dorze-and-lake-chamo" className="hover:text-white">Dorze & Lake Chamo</Link></li>
              <li><Link href="/experiences/custom-arba-minch-experience" className="hover:text-white">Custom Itineraries</Link></li>
              <li><Link href="/providers" className="hover:text-white">Verified Local Providers</Link></li>
            </ul>
          </div>

          {/* For Local Providers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> For Local Providers
            </h4>
            <ul className="space-y-2 text-sm text-sand-200">
              <li><Link href="/become-provider" className="hover:text-white font-semibold text-white">Become an AMX Provider</Link></li>
              <li><Link href="/become-provider/register" className="hover:text-white">Provider Registration</Link></li>
              <li><Link href="/provider-agreement" className="hover:text-white">Provider Agreement</Link></li>
              <li><Link href="/provider-help" className="hover:text-white">Verification Help Hub</Link></li>
              <li><Link href="/provider/login" className="hover:text-white text-xs opacity-70">Provider Portal Login</Link></li>
            </ul>
          </div>

          {/* Operations & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent">Operations</h4>
            <ul className="space-y-2 text-sm text-sand-200">
              <li><Link href="/how-it-works" className="hover:text-white">Coordination Workflow</Link></li>
              <li><Link href="/contact" className="hover:text-white">Arba Minch Desk</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/admin/login" className="hover:text-white text-xs opacity-60">Coordinator Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sand-300">
          <p>© {new Date().getFullYear()} {AMX_BRAND.fullName}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Provider availability is confirmed before quotation. Final prices depend on dates and group size.
          </p>
        </div>
      </div>
    </footer>
  );
};