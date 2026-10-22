"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface CountryCode {
  country: string;
  code: string;
  flag: string;
}

const POPULAR_COUNTRIES: CountryCode[] = [
  { country: "Ethiopia", code: "+251", flag: "🇪🇹" },
  { country: "United States / Canada", code: "+1", flag: "🇺🇸" },
  { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { country: "Germany", code: "+49", flag: "🇩🇪" },
  { country: "France", code: "+33", flag: "🇫🇷" },
  { country: "Italy", code: "+39", flag: "🇮🇹" },
  { country: "Kenya", code: "+254", flag: "🇰🇪" },
  { country: "Netherlands", code: "+31", flag: "🇳🇱" },
  { country: "Other / International", code: "+", flag: "🌐" },
];

export interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (fullPhoneNumber: string) => void;
  hasError?: boolean;
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  id = "whatsappNumber",
  value,
  onChange,
  hasError,
  className,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(POPULAR_COUNTRIES[0]);
  const [localNumber, setLocalNumber] = useState("");

  // Parse incoming value if prefilled
  useEffect(() => {
    if (!value) return;
    const matched = POPULAR_COUNTRIES.find((c) => value.startsWith(c.code));
    if (matched && matched.code !== "+") {
      setSelectedCountry(matched);
      setLocalNumber(value.replace(matched.code, "").trim());
    } else {
      setLocalNumber(value.replace("+251", "").trim());
    }
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const found = POPULAR_COUNTRIES.find((c) => c.code === code) || POPULAR_COUNTRIES[0];
    setSelectedCountry(found);
    const cleanedNumber = localNumber.replace(/^0+/, "").trim();
    onChange(`${found.code} ${cleanedNumber}`.trim());
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setLocalNumber(raw);
    const cleanedNumber = raw.replace(/^0+/, "").trim();
    onChange(`${selectedCountry.code} ${cleanedNumber}`.trim());
  };

  return (
    <div className={cn("relative flex rounded-md shadow-xs", className)}>
      {/* Country Prefix Selector */}
      <div className="relative flex items-center bg-sand-100 border border-r-0 border-sand-300 rounded-l-md px-3 hover:bg-sand-200 transition-colors">
        <span className="text-base mr-1.5 select-none" aria-hidden="true">
          {selectedCountry.flag}
        </span>
        <span className="text-xs font-bold text-charcoal select-none mr-1">
          {selectedCountry.code}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted pointer-events-none" />

        <select
          aria-label="Select Country Dialing Code"
          value={selectedCountry.code}
          onChange={handleCountryChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        >
          {POPULAR_COUNTRIES.map((c) => (
            <option key={c.country} value={c.code}>
              {c.flag} {c.country} ({c.code})
            </option>
          ))}
        </select>
      </div>

      {/* Local Phone Number Input */}
      <input
        type="tel"
        id={id}
        value={localNumber}
        onChange={handleNumberChange}
        placeholder={selectedCountry.code === "+251" ? "911 234567" : "Phone number"}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={cn(
          "flex-1 min-h-[44px] px-3.5 py-2.5 bg-white border rounded-r-md text-base text-charcoal placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-sand-100 disabled:cursor-not-allowed transition-colors",
          hasError ? "border-red-500 ring-1 ring-red-500" : "border-sand-300"
        )}
      />
    </div>
  );
};