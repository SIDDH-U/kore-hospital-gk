import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

interface DentalLogoProps {
  variant?: "dark" | "light";
  className?: string;
  showTagline?: boolean;
}

export function DentalLogo({
  variant = "dark",
  className = "",
  showTagline = true,
}: DentalLogoProps) {
  const isDark = variant === "dark";
  const brand = siteConfig.brand;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg ${className}`}
      aria-label={`${brand.name} Home`}
    >
      {brand.logoImage ? (
        <div className="relative h-10 w-auto flex items-center">
          <Image
            src={brand.logoImage}
            alt={brand.name}
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>
      ) : (
        <>
          {/* Custom Thin-line Modern Dental Studio Icon */}
          <div
            className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
              isDark
                ? "bg-[var(--color-primary)] text-[var(--color-accent)] shadow-md shadow-[var(--color-primary)]/10"
                : "bg-white/15 text-[var(--color-accent)] border border-white/20 backdrop-blur-sm"
            }`}
          >
            <svg
              className="w-6 h-6 sm:w-6.5 sm:h-6.5"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stylized aesthetic tooth outline with gentle smile contour */}
              <path
                d="M16 6C11.5 6 9 9.5 9 14.5C9 18.5 10.5 22 13 26C14 27.5 15.2 27.5 15.7 25.5C16 24 16 22.5 16 21C16 22.5 16 24 16.3 25.5C16.8 27.5 18 27.5 19 26C21.5 22 23 18.5 23 14.5C23 9.5 20.5 6 16 6Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner sparkling star / smile curve in gold-coral CTA color */}
              <path
                d="M13.5 13C14.5 15 17.5 15 18.5 13"
                stroke="var(--color-cta)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="16" cy="9.5" r="1.2" fill="var(--color-cta)" />
            </svg>
          </div>

          {/* Auto Logo Brand Text */}
          <div className="flex flex-col">
            <span
              className={`font-display text-xl sm:text-2xl font-bold tracking-tight leading-none ${
                isDark ? "text-[var(--color-primary)]" : "text-white"
              }`}
            >
              {brand.shortName || brand.name}
            </span>
            {showTagline && (
              <span
                className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase mt-1 ${
                  isDark ? "text-[var(--color-charcoal-muted)]" : "text-[var(--color-accent)]"
                }`}
              >
                {brand.subtitle || "DENTAL STUDIO"}
              </span>
            )}
          </div>
        </>
      )}
    </Link>
  );
}

// Backwards compatibility alias
export const LifeCareLogo = DentalLogo;
