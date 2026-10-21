import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AMX_BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | ${AMX_BRAND.shortName}`,
    default: `${AMX_BRAND.fullName} — Verified Local Tourism`,
  },
  description: AMX_BRAND.positioningStatement,
  keywords: [
    "Arba Minch",
    "Lake Chamo",
    "Dorze Village",
    "Nech Sar National Park",
    "Ethiopia Tourism",
    "Verified Local Guides",
    "Lake Abaya",
    "Forty Springs",
  ],
  authors: [{ name: "AMX Coordination Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#18372C", // Deep green
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-warmWhite text-charcoal flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}