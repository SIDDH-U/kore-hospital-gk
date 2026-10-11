"use client";

import React, { useRef, useState, useEffect } from "react";
import { siteConfig } from "@/config/site.config";

export function HowItWorks() {
  const content = siteConfig.howItWorks;
  const steps = content.steps;

  const sectionRef = useRef<HTMLElement>(null);
  const [lineWidth, setLineWidth] = useState("0%");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setLineWidth("100%");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate line drawing
          setTimeout(() => {
            setLineWidth("100%");
          }, 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#E9F7F5] border-y border-[#26B5AC]/15"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#0B3B4A] border border-[#26B5AC]/30 mb-2.5 shadow-xs">
            {content.badge}
          </span>
          <h2
            id="how-it-works-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight text-balance"
          >
            {content.titleStart}
            <span className="font-serif italic text-[#26B5AC]">{content.titleHighlight}</span>
            {content.titleEnd || " in four steps"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5B7480] max-w-lg mx-auto text-balance">
            {content.subtitle}
          </p>
        </div>

        {/* ========================================================
            COMPACT 4-STEP STEPPER
            Desktop: Connected numbered circles with animated progress line
            Mobile: Horizontal snap-scroll with step title and ONE line each
           ======================================================== */}
        <div className="relative">
          {/* Animated Connecting Line on Desktop (Tablet+) */}
          <div
            className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-gray-200 z-0"
            aria-hidden="true"
          >
            <div
              className="h-full bg-[#26B5AC] transition-all duration-1000 ease-out"
              style={{ width: lineWidth }}
            />
          </div>

          {/* Steps Track: Grid on Desktop, Horizontal Snap on Mobile */}
          <div className="snap-carousel flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
            {steps.map((st) => (
              <div
                key={st.step}
                className="snap-card group flex flex-col w-[220px] sm:w-[260px] lg:w-auto shrink-0 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 shadow-xs relative z-10 transition-all hover:shadow-md"
              >
                {/* Numbered Step Circle */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B3B4A] text-white font-serif font-bold text-base sm:text-lg flex items-center justify-center shrink-0 mb-3.5 shadow-xs border-2 border-white group-hover:bg-[#26B5AC] transition-colors">
                  0{st.step}
                </div>

                <h3 className="font-serif text-sm sm:text-base font-bold text-[#0B3B4A] mb-1">
                  {st.title}
                </h3>
                {/* ONE Line Short Description */}
                <p className="text-xs text-[#5B7480] leading-relaxed line-clamp-2">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
