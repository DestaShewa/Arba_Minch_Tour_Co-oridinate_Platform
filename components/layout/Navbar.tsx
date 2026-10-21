"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AMX_BRAND } from "@/lib/constants";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Modal";
import { Menu, ShieldCheck } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/experiences", label: "Experiences" },
    { href: "/providers", label: "Verified Providers" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group py-2">
          <div className="w-9 h-9 rounded bg-primary text-warmWhite font-bold flex items-center justify-center text-lg tracking-wider group-hover:bg-primary-700 transition-colors">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-primary text-lg leading-tight tracking-tight">
              AMX
            </span>
            <span className="text-[10px] text-charcoal-muted uppercase tracking-wider font-semibold">
              Arba Minch Experiences
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors min-h-[44px] inline-flex items-center ${
                pathname === link.href ? "text-primary" : "text-charcoal hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <WhatsAppButton size="sm" className="hidden lg:inline-flex" />
            <Link href="/request">
              <PrimaryButton size="sm">Request a Trip</PrimaryButton>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile navigation"
            className="md:hidden tap-target p-2 text-charcoal hover:text-primary rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="Menu"
        position="right"
      >
        <div className="flex flex-col justify-between h-full space-y-6">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`min-h-[44px] px-3 py-2 rounded-md text-base font-semibold flex items-center ${
                  pathname === link.href
                    ? "bg-primary-50 text-primary"
                    : "text-charcoal hover:bg-sand-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-6 border-t border-sand-200">
            <Link href="/request" onClick={() => setIsMobileOpen(false)} className="block">
              <PrimaryButton className="w-full">Request a Trip</PrimaryButton>
            </Link>
            <WhatsAppButton className="w-full" />
            <div className="pt-2 text-center text-xs text-charcoal-muted">
              {AMX_BRAND.slaNotice}
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};