"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { StarIcon, CalendarIcon, PhoneIcon, ArrowRightIcon, WhatsAppIcon, ShieldCheckIcon } from "./Icons";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface HeroProps {
  onOpenBooking?: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const bookBtnRef = useRef<HTMLAnchorElement | null>(null);
  const callBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Ripple handlers for primary and secondary buttons
  const { ripples: bookRipples, createRipple: createBookRipple } = useRipple("teal");
  const { ripples: callRipples, createRipple: createCallRipple } = useRipple("mint");

  // Idle animation viewport observer
  useIdleAnimationObserver(bookBtnRef);
  useIdleAnimationObserver(callBtnRef);

  const [isHeroActive, setIsHeroActive] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroActive(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    const handleVisibility = () => {
      setIsHeroActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      className={`relative bg-[#0B3B4A] text-white rounded-b-[36px] sm:rounded-b-[48px] lg:rounded-b-[60px] overflow-hidden flex flex-col lg:block ${
        !isHeroActive ? "hero-paused" : ""
      }`}
    >
      {/* ========================================================
          RESPONSIVE HERO BACKGROUND PHOTO WITH GRADIENT MASK
          Mobile (< 1024px): Sits at bottom with vertical mask fade
          Desktop (1024px+): Covers right 58% with smooth horizontal gradient mask
         ======================================================== */}
      <div
        className="relative w-full aspect-[4/5] -mt-6 sm:-mt-8 overflow-hidden z-0 order-2 lg:order-none lg:mt-0 lg:aspect-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%] lg:pointer-events-none"
        aria-hidden="true"
      >
        {/* Soft aqua radial glow pulsing behind the patient */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(38,181,172,0.22)_0%,transparent_65%)] lg:bg-[radial-gradient(circle_at_60%_40%,rgba(38,181,172,0.28)_0%,transparent_70%)] pointer-events-none z-10"
        />

        {/* Masked photo container with responsive gradient mask */}
        <div className="relative w-full h-full hero-photo-mask">
          <picture className="w-full h-full">
            <source
              media="(min-width: 1024px)"
              srcSet="/images/hero-desktop.webp"
              width={1600}
              height={900}
            />
            <img
              src="/images/hero-mobile.webp"
              alt={`Happy smiling patient at ${siteConfig.brand.name}`}
              width={800}
              height={1000}
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover object-top lg:object-[60%_25%]"
            />
          </picture>

          {/* Deep ocean teal tint overlay for perfect text contrast */}
          <div
            className="absolute inset-0 bg-[#0B3B4A]/[0.22] pointer-events-none"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>

      {/* ========================================================
          HERO CONTENT CONTAINER
          Mobile: Top block in column layout
          Desktop: Left column over solid deep teal
         ======================================================== */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:py-24 order-1 lg:order-none">
        <div className="max-w-xl lg:max-w-2xl flex flex-col items-start">
          {/* 1. Rating & Trust Chip (Sequence 1) */}
          <div className="hero-seq-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold text-white mb-4 sm:mb-6 backdrop-blur-sm shadow-sm">
            <div className="flex items-center text-[#F2A65A]">
              <StarIcon className="w-4 h-4 fill-[#F2A65A] text-[#F2A65A]" />
            </div>
            <span className="font-bold text-white">{siteConfig.hero.badgeRating}</span>
            <span className="text-white/30">|</span>
            <span className="text-white/90">{siteConfig.hero.badgePatients}</span>
          </div>

          {/* 2 & 3. Headline with Serif Display (Sequence 2 & 3) */}
          <h1
            id="hero-heading"
            aria-label={`${siteConfig.hero.headingPrefix} ${siteConfig.hero.headingHighlight} ${siteConfig.hero.headingRest}`}
            className="hero-h1 font-bold text-white tracking-tight text-left max-w-xl drop-shadow-sm text-balance"
          >
            <span aria-hidden="true">
              <span className="hero-seq-2 block">
                <span className="smile-shimmer font-serif">{siteConfig.hero.headingPrefix}</span>
              </span>
              <span className="hero-seq-3 block font-serif font-medium text-white/95 mt-1 sm:mt-1.5">
                {siteConfig.hero.headingHighlight}{" "}
                <span className="text-[#F2A65A] italic">{siteConfig.hero.headingRest}</span>
              </span>
            </span>
          </h1>

          {/* 4. Subtext (Sequence 4) */}
          <p className="hero-seq-4 mt-4 sm:mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-lg text-left drop-shadow-sm text-balance font-normal">
            <span className="lg:hidden">{siteConfig.hero.subtext}</span>
            <span className="hidden lg:inline">{siteConfig.hero.desktopSubtext}</span>
          </p>

          {/* 5. Action Buttons (Sequence 5) */}
          <div
            id="hero-cta-buttons"
            className="hero-seq-5 mt-7 sm:mt-8 w-full flex flex-row max-[359px]:flex-col items-stretch sm:items-center gap-3 sm:gap-4"
          >
            {/* Primary CTA: Book Appointment */}
            <Link
              ref={bookBtnRef}
              href="/book"
              onClick={onOpenBooking}
              onPointerDown={createBookRipple}
              style={{ "--shine-delay": "0.4s" } as React.CSSProperties}
              className="btn-idle-shine btn-ripple-container flex-1 sm:flex-initial h-[50px] px-7 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-extrabold text-sm sm:text-base btn-press flex items-center justify-center gap-2.5 shadow-lg shadow-[#0B3B4A]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-all whitespace-nowrap"
            >
              <CalendarIcon className="w-5 h-5 text-[#07252F] shrink-0" />
              <span>{siteConfig.hero.ctaPrimary}</span>
              <ArrowRightIcon className="w-4 h-4 text-[#07252F]" />

              {/* Touch Ripples */}
              {bookRipples.map((r) => (
                <span
                  key={r.id}
                  className="btn-ripple-circle"
                  style={{
                    left: r.x,
                    top: r.y,
                    width: r.size,
                    height: r.size,
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </Link>

            {/* Secondary CTA: Call Clinic */}
            <a
              ref={callBtnRef}
              href={`tel:${siteConfig.contact.phoneRaw}`}
              onPointerDown={createCallRipple}
              className="btn-ripple-container shrink-0 h-[50px] px-6 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm sm:text-base btn-press flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-all backdrop-blur-sm whitespace-nowrap"
              aria-label={`Call ${siteConfig.brand.name} at ${siteConfig.contact.phone}`}
            >
              <span className="phone-ring-icon">
                <PhoneIcon className="w-4 h-4 text-[#26B5AC]" />
              </span>
              <span>{siteConfig.hero.ctaSecondary}</span>

              {/* Touch Ripples */}
              {callRipples.map((r) => (
                <span
                  key={r.id}
                  className="btn-ripple-circle"
                  style={{
                    left: r.x,
                    top: r.y,
                    width: r.size,
                    height: r.size,
                    backgroundColor: "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </a>
          </div>

          {/* Reassuring Dental Studio Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-white/15 w-full flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-[#26B5AC]" />
              <span className="font-semibold text-white/95">Hospital-Grade Sterilisation</span>
            </div>
            <span className="text-white/30 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#26B5AC]" />
              <span className="font-semibold text-white/95">Computer-Assisted Numbing</span>
            </div>
            <span className="text-white/30 hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F2A65A]" />
              <span className="font-semibold text-white/95">0% Interest EMI Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
