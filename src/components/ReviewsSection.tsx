"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { StarIcon, CheckIcon, ArrowRightIcon } from "./Icons";

export function ReviewsSection() {
  const reviews = siteConfig.reviews;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const index = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveIndex(Math.min(Math.max(index, 0), reviews.length - 1));
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

  // Helper to get initials from patient name
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#FAFCFC]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9F7F5] text-[#0B3B4A] border border-[#26B5AC]/30 mb-2.5">
              PATIENT EXPERIENCES
            </span>
            <h2
              id="reviews-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight text-balance"
            >
              Stories from patients who{" "}
              <span className="font-serif italic text-[#26B5AC]">love</span> to smile
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center text-[#F2A65A]">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3.5 h-3.5 fill-[#F2A65A]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#0B3B4A]">{siteConfig.stats.rating.display} / 5.0</span>
              <span className="text-xs text-[#5B7480]">({siteConfig.stats.reviewCount}+ Google reviews)</span>
              {siteConfig.sampleMode && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                  Sample
                </span>
              )}
            </div>
          </div>

          {/* Desktop/Tablet Arrow Nav */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              disabled={activeIndex === 0}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full bg-white border border-gray-200/80 text-[#0B3B4A] flex items-center justify-center hover:bg-[#FAFCFC] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
            >
              <ArrowRightIcon className="w-4 h-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(activeIndex + 1, reviews.length - 1))}
              disabled={activeIndex === reviews.length - 1}
              aria-label="Next review"
              className="w-10 h-10 rounded-full bg-white border border-gray-200/80 text-[#0B3B4A] flex items-center justify-center hover:bg-[#FAFCFC] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================
            SWIPEABLE REVIEWS CAROUSEL
            Cards with avatar initials, 5 stars, max 2-line quote,
            and Verified Patient tick
           ======================================================== */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="snap-carousel flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="snap-card group flex flex-col justify-between w-[270px] sm:w-[320px] shrink-0 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 shadow-[0_4px_20px_rgba(11,59,74,0.05)] hover:shadow-md transition-all"
            >
              <div>
                {/* Header: Avatar Initials + Patient Name + Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar Initials Circle */}
                    <div className="w-9 h-9 rounded-full bg-[#E9F7F5] text-[#0B3B4A] font-bold text-xs flex items-center justify-center shrink-0 border border-[#26B5AC]/20">
                      {getInitials(rev.name)}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#0B3B4A] leading-tight">
                        {rev.name}
                      </h3>
                      <span className="text-[10px] text-[#5B7480]">{rev.treatment}</span>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center text-[#F2A65A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-3 h-3 fill-[#F2A65A]" />
                    ))}
                  </div>
                </div>

                {/* Review Text (Max 2 Short Lines) */}
                <p className="text-xs text-[#12303A] line-clamp-2 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Footer: Verified Patient Tick + Date */}
              <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-[#26B5AC] font-semibold">
                  <CheckIcon className="w-3 h-3 text-[#26B5AC]" />
                  <span>Verified patient</span>
                  {siteConfig.sampleMode && (
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded">
                      Sample
                    </span>
                  )}
                </div>
                <span className="text-[#5B7480] text-[10px]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Progress Dots & Link */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 sm:hidden" aria-hidden="true">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-[#0B3B4A]" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="w-full sm:w-auto text-center sm:text-right">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3B4A] hover:text-[#26B5AC] transition-colors"
            >
              <span>Read all verified reviews</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#26B5AC]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
