"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ArrowRightIcon } from "./Icons";

export function SmileGallery() {
  const cases = siteConfig.smileGallery;
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ["All", "Aligners", "Implants", "Veneers", "Whitening"];

  const filteredCases = cases.filter((c) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Aligners") return c.category === "Aligners" || c.treatment.toLowerCase().includes("aligner");
    if (activeFilter === "Implants") return c.category === "Implants" || c.treatment.toLowerCase().includes("implant");
    if (activeFilter === "Veneers") return c.category === "Veneers" || c.treatment.toLowerCase().includes("veneer");
    if (activeFilter === "Whitening") return c.category === "Whitening" || c.treatment.toLowerCase().includes("whitening");
    return true;
  });

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  const activeCase = filteredCases[currentIndex] || filteredCases[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCases.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredCases.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#FAFCFC]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9F7F5] text-[#0B3B4A] border border-[#26B5AC]/30 mb-2.5">
            SMILE TRANSFORMATIONS
          </span>
          <h2
            id="gallery-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight text-balance"
          >
            Real smiles{" "}
            <span className="font-serif italic text-[#26B5AC]">transformed</span> with care
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5B7480] text-balance">
            Slide left and right to inspect authentic clinical cosmetic and restorative results.
          </p>

          {/* Filter Chips (Horizontally Scrollable Single Row) */}
          <div
            className="mt-5 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-1 px-1 whitespace-nowrap"
            role="tablist"
            aria-label="Filter gallery cases"
          >
            {categories.map((cat) => {
              const isSelected = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 btn-press focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] ${
                    isSelected
                      ? "bg-[#0B3B4A] text-white shadow-xs"
                      : "bg-white text-[#5B7480] hover:text-[#0B3B4A] border border-gray-200/80 shadow-2xs"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            SHOW ONE SLIDER CARD AT A TIME IN A CENTERED CAROUSEL
           ======================================================== */}
        <div className="max-w-[540px] mx-auto relative">
          {activeCase && (
            <div className="relative">
              <BeforeAfterSlider
                key={activeCase.id}
                beforeImage={activeCase.beforeImage}
                afterImage={activeCase.afterImage}
                title={activeCase.title}
                treatment={activeCase.treatment}
                duration={activeCase.duration}
                dentist={activeCase.dentist}
              />

              {/* Previous / Next Arrow Controls */}
              {filteredCases.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous case"
                    className="absolute -left-3 sm:-left-6 top-1/3 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#0B3B4A] border border-gray-200/80 shadow-md flex items-center justify-center hover:bg-[#FAFCFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] z-20 btn-press"
                  >
                    <ArrowRightIcon className="w-4 h-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next case"
                    className="absolute -right-3 sm:-right-6 top-1/3 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#0B3B4A] border border-gray-200/80 shadow-md flex items-center justify-center hover:bg-[#FAFCFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] z-20 btn-press"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Dots & Counter Indicator Below */}
          {filteredCases.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {filteredCases.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`View case ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "w-6 bg-[#0B3B4A]" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Small "results may vary" note (One Line) & Full Portfolio Link */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#5B7480] italic">
            * {siteConfig.galleryDisclaimer}
          </p>
          <div className="mt-3">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3B4A] hover:text-[#26B5AC] transition-colors"
            >
              <span>Explore all smile makeover cases</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#26B5AC]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
