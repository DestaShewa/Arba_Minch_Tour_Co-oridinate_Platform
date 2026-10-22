"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

export interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
  fallbackText = "Arba Minch Experiences",
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "w-full h-full min-h-[140px] bg-sand-200 text-charcoal-muted flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden",
          className
        )}
        role="img"
        aria-label={alt}
      >
        {/* Subtle decorative mountain/lake SVG backdrop */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 text-primary pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 L30 40 L60 80 L80 50 L100 100 Z" fill="currentColor" />
        </svg>

        <ImageOff className="w-8 h-8 text-sand-400 mb-2 relative z-10" />
        <span className="text-xs font-semibold text-charcoal relative z-10">
          {alt || fallbackText}
        </span>
        <span className="text-[10px] text-charcoal-muted mt-0.5 relative z-10">
          AMX Verified Location
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};