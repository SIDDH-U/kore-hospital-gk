"use client";

import React, { useRef, useState, useEffect } from "react";
import { siteConfig } from "@/config/site.config";
import {
  FeatherIcon,
  Scanner3DIcon,
  DoctorBadgeIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "./Icons";

export function WhyChooseUs() {
  const content = siteConfig.whyChooseUs;

  const [hasCounted, setHasCounted] = useState(false);
  const [counts, setCounts] = useState({ pain: 0, scan: 0, pricing: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCounts({ pain: 0, scan: 3, pricing: 100 });
      setHasCounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
          const duration = 1200;
          const start = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              pain: 0,
              scan: Math.round(3 * ease),
              pricing: Math.round(100 * ease),
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasCounted]);

  const getTileIcon = (iconName?: string) => {
    switch (iconName) {
      case "feather":
        return <FeatherIcon className="w-5 h-5 text-[#26B5AC]" />;
      case "scan":
        return <Scanner3DIcon className="w-5 h-5 text-[#26B5AC]" />;
      case "doctor":
        return <DoctorBadgeIcon className="w-5 h-5 text-[#26B5AC]" />;
      case "receipt":
        return <ReceiptIcon className="w-5 h-5 text-[#26B5AC]" />;
      case "shield":
        return <ShieldCheckIcon className="w-5 h-5 text-[#26B5AC]" />;
      case "clock":
      default:
        return <ClockIcon className="w-5 h-5 text-[#26B5AC]" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-us"
      aria-labelledby="why-us-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#0B3B4A] text-white relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#26B5AC]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-2.5">
            {content.badge}
          </span>
          <h2
            id="why-us-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance"
          >
            {content.titleStart}
            <span className="font-serif italic text-[#26B5AC]">{content.titleHighlight}</span>
            {content.titleEnd || " look forward to"}
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-white/75 leading-relaxed max-w-lg mx-auto text-balance">
            {content.description}
          </p>
        </div>

        {/* Count-Up Big Number Strip Above Tiles */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xs">
          <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
            <div className="px-2 sm:px-4">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F2A65A]">
                {counts.pain}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5">
                Pain Procedure
              </div>
              <div className="text-[11px] text-white/60 hidden sm:block">
                Computerized numbing
              </div>
            </div>

            <div className="px-2 sm:px-4">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#26B5AC]">
                {counts.scan}D
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5">
                Digital Scans
              </div>
              <div className="text-[11px] text-white/60 hidden sm:block">
                Zero impression goop
              </div>
            </div>

            <div className="px-2 sm:px-4">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F2A65A]">
                {counts.pricing}%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5">
                Upfront Pricing
              </div>
              <div className="text-[11px] text-white/60 hidden sm:block">
                Zero surprise bills
              </div>
            </div>
          </div>
        </div>

        {/* 2x3 Compact Grid of Tiles (Max ~1.3 screens total mobile height) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {content.points.map((pt, idx) => (
            <div
              key={idx}
              style={{
                transitionDelay: `${idx * 60}ms`,
              }}
              className="p-3.5 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#26B5AC]/15 flex items-center justify-center shrink-0 mb-3">
                  {getTileIcon(pt.icon)}
                </div>
                <h3 className="font-serif text-xs sm:text-base font-bold text-white leading-snug">
                  {pt.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/70 mt-1.5 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
