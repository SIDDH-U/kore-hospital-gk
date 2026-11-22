"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, UserCheck, HeartHandshake } from "lucide-react";

export function PrivacyComfort() {
  const { isMarathi } = useLanguage();

  const privacyRows = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#0B7A68]" strokeWidth={2} />,
      titleEn: "Private consultations",
      titleMr: "खाजगी सल्लामसलत",
      descEn: "Consultations take place behind closed doors with absolute patient confidentiality.",
      descMr: "शांत व स्वतंत्र तपासणी कक्षात संपूर्ण खाजगीपणा व गोपनीयतेचे पालन.",
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#B87108]" strokeWidth={2} />,
      titleEn: "Lady doctor available",
      titleMr: "लेडी डॉक्टर उपलब्ध",
      descEn: "Female patients can consult Dr. Kiran Kore with complete comfort and dignity.",
      descMr: "महिला रुग्णांसाठी डॉ. किरण कोरे यांच्याकडून आदरयुक्त व आरामदायक तपासणी.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#0B7A68]" strokeWidth={2} />,
      titleEn: "Careful, respectful care",
      titleMr: "काळजीपूर्वक व आदरयुक्त उपचार",
      descEn: "Elderly-friendly access, sanitized medical equipment, and gentle staff support.",
      descMr: "ज्येष्ठ नागरिकांसाठी सुलभ व्यवस्था, निर्जंतुक साधने व नम्र कर्मचारी सहकार्य.",
    },
  ];

  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
      className="py-8 sm:py-10 lg:py-14 bg-[#EAF6F2] border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <h2
            id="privacy-heading"
            className="text-[22px] sm:text-2xl lg:text-[26px] font-bold text-[#052F29] tracking-tight leading-snug"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "तुमची गोपनीयता व आदर" : "Your privacy and comfort"}
          </h2>
          <p
            className="mt-1 text-sm sm:text-[15px] text-[#3F5652] leading-relaxed"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "गुदभागाच्या विकारांवर संकोच न करता मोकळेपणाने चर्चा करण्यासाठी सुरक्षित वातावरण."
              : "A respectful, discreet medical environment for sensitive anorectal conditions."}
          </p>
        </div>

        {/* Three Short Icon Rows (No cards inside cards) */}
        <div className="max-w-2xl mx-auto space-y-3">
          {privacyRows.map((row, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-[14px] bg-white border border-[#D5E6E0] shadow-2xs tile-hover flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#EAF6F2] flex items-center justify-center shrink-0 mt-0.5">
                {row.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="font-bold text-sm sm:text-[15px] text-[#052F29] mb-0.5 leading-snug"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {isMarathi ? row.titleMr : row.titleEn}
                </h3>
                <p
                  className="text-xs sm:text-[13px] text-[#3F5652] leading-relaxed"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {isMarathi ? row.descMr : row.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
