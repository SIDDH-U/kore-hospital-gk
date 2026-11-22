"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

export function FaqAccordion() {
  const faqs = siteConfig.faqs;
  const { isMarathi } = useLanguage();
  // All collapsed by default as requested
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-8 sm:py-10 lg:py-14 bg-white border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2
            id="faq-heading"
            className="text-[22px] sm:text-2xl lg:text-[26px] font-bold text-[#052F29] tracking-tight leading-snug"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "वारंवार विचारले जाणारे प्रश्न" : "Frequently asked questions"}
          </h2>
          <p
            className="mt-1 text-sm sm:text-[15px] text-[#3F5652] leading-relaxed max-w-lg mx-auto"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "मुळव्याध, फिशर व क्षारसूत्र उपचारांबद्दल सामान्य प्रश्नांची उत्तरे."
              : "Clear answers regarding piles, fistula, recovery, and Ksharsutra therapy."}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-[14px] bg-white border border-[#D5E6E0] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 text-sm sm:text-base font-semibold text-[#052F29] hover:bg-[#EAF6F2]/50 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68]"
                  aria-expanded={isOpen}
                  lang={isMarathi ? "mr" : "en"}
                >
                  <span className="leading-snug">{isMarathi ? faq.qMr : faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#0B7A68] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                  />
                </button>

                {isOpen && (
                  <div
                    className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs sm:text-[14px] text-[#3F5652] leading-relaxed border-t border-[#D5E6E0]/60 pt-3"
                    lang={isMarathi ? "mr" : "en"}
                  >
                    <p>{isMarathi ? faq.aMr : faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
