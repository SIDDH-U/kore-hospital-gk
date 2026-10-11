"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  title: string;
  treatment: string;
  duration?: string;
  dentist?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before dental treatment",
  afterAlt = "After dental treatment",
  title,
  treatment,
  duration,
  dentist,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasNudged, setHasNudged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteractedRef = useRef(false);

  // Auto-nudge handle left and right once on first scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasNudged) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setHasNudged(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasNudged && !isInteractedRef.current) {
          setHasNudged(true);
          const startTime = performance.now();
          const durationMs = 1200;

          const animateNudge = (now: number) => {
            if (isInteractedRef.current) return;
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            // Sine wave nudge: 50% -> 38% -> 62% -> 50%
            const offset = Math.sin(progress * Math.PI * 2) * 14;
            setSliderPos(50 + offset);

            if (progress < 1) {
              requestAnimationFrame(animateNudge);
            } else {
              setSliderPos(50);
            }
          };

          const timeout = setTimeout(() => {
            requestAnimationFrame(animateNudge);
          }, 350);

          return () => clearTimeout(timeout);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNudged]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    isInteractedRef.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    // Allows vertical scroll to continue if swipe isn't strictly horizontal
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="flex flex-col rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 overflow-hidden shadow-[0_8px_30px_rgba(11,59,74,0.08)]">
      {/* Interactive Drag Image Comparison */}
      <div
        ref={containerRef}
        onMouseDown={() => {
          isInteractedRef.current = true;
          setIsDragging(true);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => {
          isInteractedRef.current = true;
        }}
        onTouchMove={handleTouchMove}
        style={{ touchAction: "pan-y" }}
        className="ba-slider-container relative w-full aspect-[4/3] bg-gray-100 cursor-ew-resize select-none overflow-hidden"
      >
        {/* AFTER Image (Full background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 550px"
            className="object-cover"
            loading="lazy"
          />
          {/* AFTER badge */}
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0B3B4A]/85 text-white backdrop-blur-sm z-10 shadow-xs pointer-events-none">
            After
          </span>
        </div>

        {/* BEFORE Image (Clipped to slider position) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="relative w-full h-full"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%" }}
          >
            <Image
              src={beforeImage}
              alt={beforeAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 550px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          {/* BEFORE badge */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm z-10 shadow-xs pointer-events-none">
            Before
          </span>
        </div>

        {/* Draggable Divider Handle Line */}
        <div
          className="ba-slider-handle"
          style={{ left: `${sliderPos}%` }}
          aria-hidden="true"
        >
          <div className="ba-slider-button">
            <svg
              className="w-4 h-4 text-[#0B3B4A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8 9l-3 3 3 3m8-6l3 3-3 3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Case Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold text-[#26B5AC] uppercase tracking-wider">
              {treatment}
            </span>
            {duration && (
              <span className="text-[11px] font-semibold text-[#5B7480] bg-[#E9F7F5] px-2 py-0.5 rounded-full">
                {duration}
              </span>
            )}
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#0B3B4A] leading-snug">
            {title}
          </h3>
          {dentist && (
            <p className="text-xs text-[#5B7480] mt-0.5">
              Treated by: <span className="font-semibold text-[#0B3B4A]">{dentist}</span>
            </p>
          )}
        </div>

        <div className="mt-3.5 pt-3 border-t border-gray-100 text-[11px] text-[#5B7480] flex items-center justify-between">
          <span className="italic text-[#5B7480]/80">Drag handle to compare</span>
          {siteConfig.sampleMode && (
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px] tracking-wide">
              Sample
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
