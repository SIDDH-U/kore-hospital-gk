"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageSquare, Stethoscope, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const { isMarathi } = useLanguage();

  const steps = [
    {
      step: "01",
      icon: <MessageSquare className="w-5 h-5 text-[#F5A524]" strokeWidth={2} />,
      titleEn: "Consultation",
      titleMr: "सल्लामसलत",
      descEn: "Private discussion of symptoms and clinical history in complete comfort.",
      descMr: "शांत व खाजगी वातावरणात लक्षणांची सविस्तर माहिती व प्राथमिक चर्चा.",
    },
    {
      step: "02",
      icon: <Stethoscope className="w-5 h-5 text-[#F5A524]" strokeWidth={2} />,
      titleEn: "Examination & diagnosis",
      titleMr: "तपासणी व निदान",
      descEn: "Gentle physical evaluation to determine condition grade and staging.",
      descMr: "तज्ज्ञ डॉक्टरांकडून सौम्य तपासणी व अचूक स्थितीचे निदान.",
    },
    {
      step: "03",
      icon: <CheckCircle2 className="w-5 h-5 text-[#F5A524]" strokeWidth={2} />,
      titleEn: "Treatment & follow-up",
      titleMr: "उपचार व पाठपुरावा",
      descEn: "Personalized Ksharsutra or Ayurvedic care with scheduled follow-ups.",
      descMr: "क्षारसूत्र किंवा वैयक्तिक औषधोपचार व नियमित पाठपुरावा सल्ला.",
    },
  ];

  return (
    <section
      id="how-a-visit-works"
      aria-labelledby="how-visit-works-heading"
      className="py-10 sm:py-14 lg:py-16 bg-[#064B40] text-white border-b border-[#0A4A40]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-semibold text-[#F5A524] block mb-1">
            {isMarathi ? "उपचार टप्पे" : "Simple pathway"}
          </span>
          <h2
            id="how-visit-works-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "उपचार पद्धती कशी चालते?" : "How a visit works"}
          </h2>
          <p
            className="mt-2 text-xs sm:text-sm text-[#CFE5DF] leading-relaxed"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "पहिल्या भेटीपासून पूर्ण बरे होईपर्यंत ३ सोपे व पारदर्शक टप्पे."
              : "A simple, transparent 3-step path to diagnosis, treatment, and long-term relief."}
          </p>
        </div>

        {/* 3-Step Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-[#F5A524] bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Step {item.step}
                  </span>
                </div>

                <h3
                  className="font-bold text-base sm:text-lg text-white mb-2"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {isMarathi ? item.titleMr : item.titleEn}
                </h3>
                <p
                  className="text-xs sm:text-sm text-[#CFE5DF] leading-relaxed"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {isMarathi ? item.descMr : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
