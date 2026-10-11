"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { ArrowRightIcon } from "./Icons";

interface TreatmentsGridProps {
  onOpenBooking?: (treatmentName?: string) => void;
}

export function TreatmentsGrid({ onOpenBooking }: TreatmentsGridProps) {
  // Top 5 treatments for the homepage carousel
  const topTreatments = siteConfig.treatments.slice(0, 5);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const index = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.min(Math.max(index, 0), topTreatments.length - 1));
  };

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    el.scrollTo({
      left: index * (cardWidth + 16),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="treatments"
      aria-labelledby="treatments-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#E9F7F5] border-y border-[#26B5AC]/15"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#0B3B4A] border border-[#26B5AC]/30 mb-2.5 shadow-xs">
              POPULAR SPECIALTIES
            </span>
            <h2
              id="treatments-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight"
            >
              Expert dental treatments,{" "}
              <span className="font-serif italic text-[#26B5AC]">crafted</span> for you
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#5B7480] max-w-xl text-balance">
              Precision dentistry delivered with computer-assisted numbing and transparent pricing.
            </p>
          </div>

          {/* Desktop/Tablet Carousel Nav Buttons */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              disabled={activeIndex === 0}
              aria-label="Previous treatments"
              className="w-10 h-10 rounded-full bg-white border border-gray-200/80 text-[#0B3B4A] flex items-center justify-center hover:bg-[#FAFCFC] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
            >
              <ArrowRightIcon className="w-4 h-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(activeIndex + 1, topTreatments.length - 1))}
              disabled={activeIndex === topTreatments.length - 1}
              aria-label="Next treatments"
              className="w-10 h-10 rounded-full bg-white border border-gray-200/80 text-[#0B3B4A] flex items-center justify-center hover:bg-[#FAFCFC] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================
            HORIZONTAL SWIPE CAROUSEL (Top 5 Treatments)
            Compact cards (~270px), peek of next card, scroll-snap
           ======================================================== */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="snap-carousel flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {topTreatments.map((t, idx) => (
            <div
              key={t.id}
              id={`treatment-card-${t.slug}`}
              className="snap-card group flex flex-col w-[265px] sm:w-[285px] shrink-0 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 overflow-hidden shadow-[0_4px_20px_rgba(11,59,74,0.05)] hover:shadow-[0_10px_30px_rgba(11,59,74,0.1)] transition-all duration-300 relative focus-within:ring-2 focus-within:ring-[#26B5AC]"
            >
              {/* 4:3 Aspect Ratio Photo */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  sizes="285px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badge Overlay */}
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-sm shadow-xs ${
                      t.slug === "dental-implants"
                        ? "bg-[#F2A65A] text-[#07252F]"
                        : "bg-[#0B3B4A]/90 text-white"
                    }`}
                  >
                    {t.slug === "dental-implants" ? "Most requested" : t.badge}
                  </span>
                </div>
              </div>

              {/* Card Body (Short One-Line Copy) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B3B4A] group-hover:text-[#26B5AC] transition-colors leading-snug">
                    <Link href={`/treatments/${t.slug}`} className="focus:outline-none">
                      {t.title}
                    </Link>
                  </h3>
                  {/* ONE Short Line (Max ~10 Words) */}
                  <p className="mt-1.5 text-xs text-[#5B7480] line-clamp-2 leading-relaxed">
                    {t.oneLineDesc || t.shortDesc}
                  </p>
                </div>

                {/* Pricing & Booking Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#E9F7F5] text-[#0B3B4A] text-xs font-bold w-fit">
                      From {t.startingPrice}
                    </span>
                    {siteConfig.sections.showEmi && t.emiMonthly && (
                      <span className="text-[10px] font-medium text-[#26B5AC] mt-0.5">
                        0% EMI: {t.emiMonthly}
                      </span>
                    )}
                  </div>

                  {/* Single "Book" Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onOpenBooking?.(t.title);
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("select-treatment", { detail: t.title }));
                      }
                    }}
                    className="btn-press h-8 px-3 rounded-full bg-[#0B3B4A] hover:bg-[#26B5AC] text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                    aria-label={`Book appointment for ${t.title}`}
                  >
                    <span>Book</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Progress Dots & "View All Treatments" CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5 sm:hidden" aria-hidden="true">
            {topTreatments.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-[#0B3B4A]" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* View All Treatments Link */}
          <div className="w-full sm:w-auto text-center sm:text-right">
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0B3B4A] hover:text-[#26B5AC] transition-colors py-2 px-4 rounded-full bg-white border border-[#26B5AC]/30 shadow-xs hover:border-[#26B5AC]"
            >
              <span>View all 9 treatments</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#26B5AC]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
