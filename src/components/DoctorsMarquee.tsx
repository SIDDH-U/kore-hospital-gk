"use client";

import React from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { DoctorMaleAvatar, DoctorFemaleAvatar } from "./Icons";
import { Button } from "./ui/Button";
import { Phone } from "lucide-react";

export function DoctorsMarquee() {
  const doctors = siteConfig.doctors;
  const { isMarathi } = useLanguage();

  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="py-10 sm:py-14 lg:py-16 bg-white border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-semibold text-[#0B7A68] block mb-1">
            {isMarathi ? "वैद्यकीय पथक" : "Specialist practitioners"}
          </span>
          <h2
            id="doctors-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064B40] tracking-tight leading-snug"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "आमचे तज्ज्ञ डॉक्टर्स" : "Our specialist doctors"}
          </h2>
          <p
            className="mt-2 text-xs sm:text-sm text-[#3F5652] leading-relaxed"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "गुदशल्य व आयुर्वेदिक क्षारसूत्र उपचारांमध्ये अनुभवी व सन्माननीय वैद्यकीय पथक."
              : "Dedicated proctology and Ayurvedic Ksharsutra practitioners providing respectful, confidential care."}
          </p>
        </div>

        {/* Two Compact Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {doctors.map((doc) => {
            const isFemale = doc.avatar === "female";
            const circleTint = isFemale
              ? "bg-[#FDF0D5] text-[#B87108] border-[#E8A33D]/30"
              : "bg-[#EAF6F2] text-[#0B7A68] border-[#0B7A68]/30";

            return (
              <div
                key={doc.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D5E6E0] shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 sm:gap-5"
              >
                {/* Larger 72px Avatar inside tinted circle (Mint for Dr. Anant, Amber for Dr. Kiran) */}
                <div
                  className={`w-[72px] h-[72px] rounded-full overflow-hidden shrink-0 border-2 ${circleTint} p-1.5 flex items-center justify-center shadow-xs`}
                >
                  {isFemale ? (
                    <DoctorFemaleAvatar className="w-full h-full" />
                  ) : (
                    <DoctorMaleAvatar className="w-full h-full" />
                  )}
                </div>

                {/* Right Info: Name, Qualification Chips, Specialty, Call Button */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-bold text-base sm:text-lg text-[#064B40] leading-snug truncate"
                      lang={isMarathi ? "mr" : "en"}
                    >
                      {isMarathi ? doc.nameMr : doc.name}
                    </h3>

                    {/* Qualification Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF6F2] text-[#064B40] border border-[#D5E6E0]">
                        {doc.qualification}
                      </span>
                    </div>

                    <p
                      className="text-xs text-[#3F5652] mt-1.5 leading-snug"
                      lang={isMarathi ? "mr" : "en"}
                    >
                      {isMarathi ? doc.specialtyMr : doc.specialty}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="secondary-light"
                      size="sm"
                      href={`tel:${doc.phoneRaw || siteConfig.contact.phoneRaw}`}
                      icon={<Phone className="w-3.5 h-3.5 text-[#064B40]" strokeWidth={2} />}
                      className="text-xs min-h-[40px] px-4"
                    >
                      {isMarathi ? "थेट फोन करा" : "Call now"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
