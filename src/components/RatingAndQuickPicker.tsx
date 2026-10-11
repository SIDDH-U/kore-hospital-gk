"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { ZapIcon, SparkleIcon, SunIcon, ShieldCheckIcon, SmileIcon, CheckIcon } from "./Icons";

interface RatingAndQuickPickerProps {
  onSelectTreatment?: (treatmentName: string) => void;
}

function CountUpItem({
  value,
  display,
  suffix,
  label,
  subtext,
}: {
  value: number;
  display: string;
  suffix: string;
  label: string;
  subtext: string;
}) {
  const [currentVal, setCurrentVal] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCurrentVal(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const start = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            setCurrentVal(value * ease);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrentVal(value);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formattedValue = () => {
    if (!hasAnimated) return "0";
    if (value === 4.9) {
      return currentVal >= 4.85 ? "4.9" : currentVal.toFixed(1);
    }
    if (value >= 1000) {
      const rounded = Math.floor(currentVal / 100) * 100;
      return `${Math.min(rounded, value).toLocaleString("en-IN")}+`;
    }
    return `${Math.floor(currentVal)}+`;
  };

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-3 sm:px-6">
      <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B3B4A] tracking-tight">
        <span>{formattedValue()}</span>
        <span className="text-[#26B5AC] ml-0.5">{suffix}</span>
      </div>
      <span className="text-xs sm:text-sm font-semibold text-[#12303A] mt-0.5">
        {label}
      </span>
      <span className="text-[11px] sm:text-xs text-[#5B7480] hidden sm:block">
        {subtext}
      </span>
    </div>
  );
}

export function RatingAndQuickPicker({ onSelectTreatment }: RatingAndQuickPickerProps) {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const getChipIcon = (iconName: string) => {
    switch (iconName) {
      case "zap":
        return <ZapIcon className="w-3.5 h-3.5 text-[#F2A65A]" />;
      case "sparkle":
        return <SparkleIcon className="w-3.5 h-3.5 text-[#26B5AC]" />;
      case "sun":
        return <SunIcon className="w-3.5 h-3.5 text-[#F2A65A]" />;
      case "shield":
        return <ShieldCheckIcon className="w-3.5 h-3.5 text-[#26B5AC]" />;
      case "smile":
        return <SmileIcon className="w-3.5 h-3.5 text-[#26B5AC]" />;
      case "check":
      default:
        return <CheckIcon className="w-3.5 h-3.5 text-[#26B5AC]" />;
    }
  };

  const handleChipClick = (item: (typeof siteConfig.quickPicker.items)[0]) => {
    setActiveChip(item.id);
    onSelectTreatment?.(item.treatmentName);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("select-treatment", { detail: item.treatmentName }));
    }

    // Smooth scroll to targeted treatment card
    const targetEl = document.getElementById(`treatment-card-${item.treatmentSlug}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });

      // Trigger short visual highlight pulse
      targetEl.classList.add("treatment-pulse");
      setTimeout(() => {
        targetEl.classList.remove("treatment-pulse");
      }, 1600);
    } else {
      // Fallback: scroll to treatments section
      const section = document.getElementById("treatments");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-20 -mt-3 sm:-mt-5 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Slim Rating Strip: Horizontal Row of 3 Count-up Stats (Conditional on showStats) */}
      {siteConfig.sections.showStats && siteConfig.ratingStrip.length > 0 && (
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(11,59,74,0.08)] border border-[#E9F7F5] p-3.5 sm:p-5 mb-4 relative">
          {siteConfig.sampleMode && (
            <span className="absolute top-2 right-3 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
              Sample Metrics
            </span>
          )}
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {siteConfig.ratingStrip.map((stat, i) => (
              <CountUpItem
                key={i}
                value={stat.value}
                display={stat.display}
                suffix={stat.suffix}
                label={stat.label}
                subtext={stat.subtext}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. "What do you need today?" Quick Picker */}
      <div className="bg-[#E9F7F5]/70 backdrop-blur-sm rounded-2xl border border-[#26B5AC]/20 p-2.5 sm:p-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="shrink-0 flex items-center gap-1.5 px-2">
            <span className="w-2 h-2 rounded-full bg-[#26B5AC] animate-pulse" />
            <span className="text-xs font-bold text-[#0B3B4A] uppercase tracking-wider whitespace-nowrap">
              {siteConfig.quickPicker.title}
            </span>
          </div>

          {/* Horizontally scrollable row of tappable chips */}
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 px-1 whitespace-nowrap"
            role="toolbar"
            aria-label="Quick treatment picker"
          >
            {siteConfig.quickPicker.items.map((item) => {
              const isSelected = activeChip === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleChipClick(item)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 btn-press focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] ${
                    isSelected
                      ? "bg-[#0B3B4A] text-white shadow-sm scale-[1.02]"
                      : "bg-white text-[#12303A] hover:bg-[#FAFCFC] hover:border-[#26B5AC]/40 border border-gray-200/80 shadow-[0_2px_8px_rgba(11,59,74,0.04)]"
                  }`}
                >
                  <span className="shrink-0">{getChipIcon(item.icon)}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
