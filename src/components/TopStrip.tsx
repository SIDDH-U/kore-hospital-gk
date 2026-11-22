"use client";

import React from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Clock } from "lucide-react";

export function TopStrip() {
  const { language, setLanguage, isMarathi } = useLanguage();

  return (
    <div className="hidden lg:flex h-9 bg-[#052F29] text-white text-xs border-b border-white/10 font-normal select-none">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between whitespace-nowrap gap-4">
        {/* Left: Short Address */}
        <div className="flex items-center gap-1.5 text-[#CFE5DF] shrink-0">
          <MapPin className="w-3.5 h-3.5 text-[#F5A524] shrink-0" strokeWidth={2} />
          <span>
            {isMarathi
              ? "चांडक हॉस्पिटल शेजारी, डॉ. लेन, गंगाखेड"
              : "Near Chandak Hospital, Dr. Lane, Gangakhed"}
          </span>
        </div>

        {/* Middle: Hours */}
        <div className="flex items-center gap-1.5 text-[#CFE5DF] shrink-0">
          <Clock className="w-3.5 h-3.5 text-[#F5A524] shrink-0" strokeWidth={2} />
          <span>
            {isMarathi ? siteConfig.hours.displayMr : siteConfig.hours.display}
          </span>
        </div>

        {/* Right: Language Switcher Pill */}
        <div className="flex items-center shrink-0">
          <div className="inline-flex items-center rounded-full bg-white/10 p-0.5 border border-white/15 text-[11px]">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                language === "en"
                  ? "bg-[#F5A524] text-[#0F2321] font-semibold"
                  : "text-white/80 hover:text-white"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("mr")}
              className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                language === "mr"
                  ? "bg-[#F5A524] text-[#0F2321] font-semibold"
                  : "text-white/80 hover:text-white"
              }`}
              aria-label="मराठी मध्ये वाचा"
              lang="mr"
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
