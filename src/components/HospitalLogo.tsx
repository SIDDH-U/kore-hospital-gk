"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";

interface HospitalLogoProps {
  variant?: "dark" | "light";
  className?: string;
  showTagline?: boolean;
}

export function HospitalLogo({
  variant = "dark",
  className = "",
  showTagline = true,
}: HospitalLogoProps) {
  const isDark = variant === "dark";
  const brand = siteConfig.brand;
  const { isMarathi } = useLanguage();

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 sm:gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68] rounded-lg shrink-0 ${className}`}
      aria-label={`${brand.name} Home`}
    >
      {/* Medical Cross & Ayurvedic Ksharsutra Symbol */}
      <div
        className={`relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${isDark
          ? "bg-[#064B40] text-[#F5A524] shadow-xs border border-[#0B7A68]/30"
          : "bg-white/15 text-[#F5A524] border border-white/20 backdrop-blur-xs"
          }`}
      >
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Medical Cross Base */}
          <rect x="13.5" y="4" width="5" height="24" rx="2" fill="currentColor" fillOpacity="0.3" />
          <rect x="4" y="13.5" width="24" height="5" rx="2" fill="currentColor" fillOpacity="0.3" />
          {/* Staff Line */}
          <line x1="16" y1="5" x2="16" y2="27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          {/* Medicated Thread Motif */}
          <path
            d="M10 11C14 13 18 9 22 11"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 18C14 20 18 16 22 18"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="5" r="2.2" fill="currentColor" />
        </svg>
      </div>

      {/* Brand Text Lockup */}
      <div className="flex flex-col text-left leading-tight min-w-0">
        <div className="flex items-center gap-1.5 flex-nowrap">
          {/* Clear sans semi-bold so 'Kore' is never misread as 'Korc' */}
          <span
            className={`font-sans font-bold text-sm sm:text-base lg:text-lg tracking-normal whitespace-nowrap ${isDark ? "text-[#052F29]" : "text-white"
              }`}
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "कोरे हॉस्पिटल" : "Kore Hospital"}
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-semibold px-1.5 py-0.5 rounded-[6px] whitespace-nowrap hidden min-[440px]:inline-block ${isDark
              ? "bg-[#EAF6F2] text-[#064B40] border border-[#D5E6E0]"
              : "bg-white/15 text-[#F5A524] border border-white/20"
              }`}
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "मूळव्याध सेंटर" : "Piles Centre"}
          </span>
        </div>

        {showTagline && (
          <span
            className={`text-[11px] font-normal tracking-normal hidden xl:block mt-0.5 truncate max-w-[220px] ${isDark ? "text-[#3F5652]" : "text-[#CFE5DF]"
              }`}
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "गुदशल्य व स्त्रीरोग · गंगाखेड" : "Ano-rectal & Ksharsutra Care"}
          </span>
        )}
      </div>
    </Link>
  );
}
