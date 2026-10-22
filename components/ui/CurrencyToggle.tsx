"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { formatETB } from "@/lib/utils";
import { Info } from "lucide-react";

export type SupportedCurrency = "ETB" | "USD" | "EUR";

// Indicative rates for estimation
const EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  ETB: 1,
  USD: 0.0078, // ~ 1 USD ≈ 128 ETB
  EUR: 0.0072, // ~ 1 EUR ≈ 138 ETB
};

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  formatPrice: (amountETB: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<SupportedCurrency>("ETB");

  const formatPrice = (amountETB: number): string => {
    if (amountETB <= 0) return "Tailored Itinerary";
    if (currency === "ETB") return formatETB(amountETB);

    const converted = amountETB * EXCHANGE_RATES[currency];
    const symbol = currency === "USD" ? "$" : "€";
    return `~ ${symbol}${Math.round(converted).toLocaleString()} ${currency}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: "ETB" as SupportedCurrency,
      setCurrency: () => {},
      formatPrice: (val: number) => (val > 0 ? formatETB(val) : "Tailored Itinerary"),
    };
  }
  return context;
};

export const CurrencyToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className || ""}`}>
      <div className="inline-flex rounded-lg border border-sand-300 bg-sand-100 p-0.5 text-xs font-semibold">
        {(["ETB", "USD", "EUR"] as SupportedCurrency[]).map((cur) => (
          <button
            key={cur}
            type="button"
            onClick={() => setCurrency(cur)}
            className={`min-h-[36px] px-2.5 py-1 rounded-md transition-colors ${
              currency === cur
                ? "bg-white text-primary shadow-xs font-bold"
                : "text-charcoal-muted hover:text-charcoal"
            }`}
          >
            {cur}
          </button>
        ))}
      </div>
      {currency !== "ETB" && (
        <span className="text-[11px] text-charcoal-muted flex items-center gap-1">
          <Info className="w-3 h-3 text-accent shrink-0" />
          <span>Indicative only. Official quotes are settled strictly in ETB.</span>
        </span>
      )}
    </div>
  );
};