"use client";

import React from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import {
  Droplet,
  AlertCircle,
  HelpCircle,
  Activity,
  Flame,
  ShieldAlert,
} from "lucide-react";

export function WhenToSeeDoctor() {
  const content = siteConfig.whenToSeeDoctor;
  const { isMarathi } = useLanguage();

  const symptomIcons = [
    { icon: Droplet, tint: "bg-[#FBE7E4] text-[#C93B2B]" }, // bleeding (rose)
    { icon: Flame, tint: "bg-[#FDF0D5] text-[#B87108]" },   // burning/pain (amber)
    { icon: AlertCircle, tint: "bg-[#EAF6F2] text-[#0B7A68]" }, // lump/swelling (mint)
    { icon: Activity, tint: "bg-[#E3F0FA] text-[#1D70B8]" },  // itching (sky)
    { icon: ShieldAlert, tint: "bg-[#FDF0D5] text-[#B87108]" }, // constipation (amber)
    { icon: HelpCircle, tint: "bg-[#FBE7E4] text-[#C93B2B]" }, // discharge/pus (rose)
  ];

  return (
    <section
      id="when-to-see-doctor"
      aria-labelledby="when-to-see-doctor-heading"
      className="py-10 sm:py-14 lg:py-16 bg-[#EAF6F2] border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-semibold text-[#0B7A68] block mb-1">
            {isMarathi ? "लक्षणे ओळखणे" : "Symptom check"}
          </span>
          <h2
            id="when-to-see-doctor-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064B40] tracking-tight leading-snug"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? content.titleMr : content.title}
          </h2>
          <p
            className="mt-2 text-xs sm:text-sm text-[#3F5652] leading-relaxed"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? content.subtitleMr : content.subtitle}
          </p>
        </div>

        {/* Symptoms 2-Column Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
          {content.symptoms.map((item, idx) => {
            const style = symptomIcons[idx % symptomIcons.length];
            const IconComponent = style.icon;

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5E6E0] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between text-left"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${style.tint} flex items-center justify-center mb-3 shrink-0`}>
                    <IconComponent className="w-5 h-5" strokeWidth={2} />
                  </div>

                  <h3
                    className="font-bold text-sm sm:text-base text-[#064B40] leading-snug mb-1"
                    lang={isMarathi ? "mr" : "en"}
                  >
                    {isMarathi ? item.titleMr : item.title}
                  </h3>
                  <p
                    className="text-xs text-[#3F5652] leading-relaxed line-clamp-3"
                    lang={isMarathi ? "mr" : "en"}
                  >
                    {isMarathi ? item.descriptionMr : item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
