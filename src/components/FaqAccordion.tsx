"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { ChevronDownIcon } from "./Icons";

export function FaqAccordion() {
  const faqs = siteConfig.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [showAll, setShowAll] = useState(false);

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#FAFCFC]"
    >
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9F7F5] text-[#0B3B4A] border border-[#26B5AC]/30 mb-2.5">
            QUESTIONS ANSWERED
          </span>
          <h2
            id="faq-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight text-balance"
          >
            Everything you need to{" "}
            <span className="font-serif italic text-[#26B5AC]">know</span> before visiting
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5B7480] max-w-lg mx-auto text-balance">
            Clear, honest answers to help you feel completely comfortable and prepared.
          </p>
        </div>

        {/* Accordion List (Only One Open at a Time) */}
        <div className="space-y-3">
          {displayedFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#26B5AC]/40 shadow-xs"
                    : "bg-white/80 border-gray-200/80 hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-colors"
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-[#0B3B4A]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-250 ease-out ${
                      isOpen
                        ? "bg-[#0B3B4A] text-white rotate-180"
                        : "bg-[#E9F7F5] text-[#0B3B4A]"
                    }`}
                  >
                    <ChevronDownIcon className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Smooth Height Reveal */}
                <div
                  className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#5B7480] leading-relaxed border-t border-gray-100">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* "More questions" Expand Button */}
        {!showAll && faqs.length > 4 && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="btn-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#26B5AC]/30 hover:border-[#26B5AC] text-[#0B3B4A] font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              <span>Show {faqs.length - 4} more questions</span>
              <ChevronDownIcon className="w-3.5 h-3.5 text-[#26B5AC]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
