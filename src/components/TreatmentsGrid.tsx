"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import {
  ChevronRight,
  Sparkles,
  Stethoscope,
  Activity,
  ShieldCheck,
  Bandage,
  Layers,
  HeartPulse,
  Workflow,
} from "lucide-react";

export function TreatmentsGrid() {
  const { isMarathi } = useLanguage();
  const treatments = siteConfig.treatments;

  // Soft hue tint variants for icons
  const tintStyles = [
    { bg: "bg-[#EAF6F2]", text: "text-[#0B7A68]", icon: <Activity className="w-5 h-5" strokeWidth={2} /> },
    { bg: "bg-[#FDF0D5]", text: "text-[#B87108]", icon: <Sparkles className="w-5 h-5" strokeWidth={2} /> },
    { bg: "bg-[#E3F0FA]", text: "text-[#1D70B8]", icon: <Stethoscope className="w-5 h-5" strokeWidth={2} /> },
    { bg: "bg-[#FBE7E4]", text: "text-[#C93B2B]", icon: <Bandage className="w-5 h-5" strokeWidth={2} /> },
    { bg: "bg-[#EAF6F2]", text: "text-[#0B7A68]", icon: <ShieldCheck className="w-5 h-5" strokeWidth={2} /> },
    { bg: "bg-[#FDF0D5]", text: "text-[#B87108]", icon: <Layers className="w-5 h-5" strokeWidth={2} /> },
    { bg: "bg-[#E3F0FA]", text: "text-[#1D70B8]", icon: <HeartPulse className="w-5 h-5" strokeWidth={2} /> },
    { bg: "bg-[#FBE7E4]", text: "text-[#C93B2B]", icon: <Workflow className="w-5 h-5" strokeWidth={2} /> },
  ];

  return (
    <section
      id="treatments"
      aria-labelledby="treatments-heading"
      className="py-8 sm:py-10 lg:py-14 bg-white border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-semibold text-[#0B7A68] block mb-1">
              {isMarathi ? "उपचार पद्धती" : "Clinical services"}
            </span>
            <h2
              id="treatments-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064B40] tracking-tight leading-snug"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi ? "उपचार सेवा" : "Specialist treatments"}
            </h2>
            <p
              className="mt-1.5 text-xs sm:text-sm text-[#3F5652] leading-relaxed max-w-xl"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi
                ? "मूळव्याध, फिशर व फिस्टुला विकारांवर शास्त्रोक्त निदान व वैयक्तिक काळजी."
                : "Careful clinical evaluation and specialized care for anorectal conditions."}
            </p>
          </div>

          <Link
            href="/treatments"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#0B7A68] hover:underline whitespace-nowrap"
            lang={isMarathi ? "mr" : "en"}
          >
            <span>{isMarathi ? "सर्व तपशील पहा" : "View all treatments"}</span>
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>

        {/* Compact 2-Column Grid (Mobile: 2 cols, Desktop: 4 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {treatments.map((treatment, idx) => {
            const tint = tintStyles[idx % tintStyles.length];

            return (
              <Link
                key={treatment.id}
                href={`/treatments/${treatment.slug}`}
                className="group p-3.5 sm:p-4 rounded-[14px] bg-white border border-[#D5E6E0] shadow-2xs tile-hover flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68]"
              >
                <div>
                  {/* Tinted icon tile */}
                  <div
                    className={`w-9 h-9 rounded-[10px] ${tint.bg} ${tint.text} flex items-center justify-center mb-2.5 shrink-0 transition-transform group-hover:scale-105`}
                  >
                    {tint.icon}
                  </div>

                  <h3
                    className="font-semibold text-xs sm:text-sm text-[#052F29] group-hover:text-[#0B7A68] transition-colors leading-snug line-clamp-2"
                    lang={isMarathi ? "mr" : "en"}
                  >
                    {isMarathi ? treatment.titleMr : treatment.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-[#D5E6E0]/60 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#0B7A68]">
                  <span>{isMarathi ? "तपशील" : "Details"}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
