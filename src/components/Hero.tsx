"use client";

import React from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/Button";
import { AppointmentForm } from "./AppointmentForm";
import { Calendar, Phone, ShieldCheck, UserCheck, Lock, ChevronRight } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const { isMarathi } = useLanguage();

  const trustItems = [
    {
      icon: ShieldCheck,
      tint: "bg-[#EAF6F2] text-[#0B7A68]",
      labelEn: "Ksharsutra Care",
      labelMr: "क्षारसूत्र उपचार",
      descEn: "Ayurvedic therapy",
      descMr: "आयुर्वेदिक पद्धत",
    },
    {
      icon: UserCheck,
      tint: "bg-[#FDF0D5] text-[#B87108]",
      labelEn: "Lady Doctor",
      labelMr: "महिला डॉक्टर",
      descEn: "Dr. Kiran Kore",
      descMr: "डॉ. किरण कोरे",
    },
    {
      icon: Lock,
      tint: "bg-[#E3F0FA] text-[#1D70B8]",
      labelEn: "Private Care",
      labelMr: "पूर्ण गोपनीयता",
      descEn: "Discreet, respectful consultations",
      descMr: "गोपनीय व आदरपूर्वक सल्लामसलत",
    },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-gradient-to-b from-[#EAF6F2] via-[#F4FAF8] to-white text-[#0F2321] overflow-hidden py-6 sm:py-8 lg:py-10 border-b border-[#D5E6E0]"
    >
      {/* Ksharsutra thread line (decorative thin amber path, aria-hidden, pointer-events: none) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden hidden min-[360px]:block select-none"
        aria-hidden="true"
      >
        {/* Desktop Thread Line */}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full"
          viewBox="0 0 1240 500"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -20 310 C 260 375, 460 170, 720 215 C 880 240, 960 205, 1015 235"
            stroke="#F5A524"
            strokeWidth="1.75"
            strokeLinecap="round"
            style={{
              opacity: 0.42,
              strokeDasharray: 1400,
              strokeDashoffset: 1400,
              animation: "heroThreadDraw 1600ms ease-in-out 200ms forwards",
            }}
          />
          <circle
            cx="1015"
            cy="235"
            r="3.5"
            fill="#F5A524"
            style={{
              transformOrigin: "1015px 235px",
              animation: "heroDotFade 300ms ease-out 1800ms both",
            }}
          />
        </svg>

        {/* Mobile Thread Line */}
        <svg
          className="block lg:hidden absolute inset-0 w-full h-full"
          viewBox="0 0 400 360"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M -10 215 C 90 265, 220 160, 380 195"
            stroke="#F5A524"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              opacity: 0.38,
              strokeDasharray: 800,
              strokeDashoffset: 800,
              animation: "heroThreadDraw 1500ms ease-in-out 200ms forwards",
            }}
          />
          <circle
            cx="380"
            cy="195"
            r="3"
            fill="#F5A524"
            style={{
              transformOrigin: "380px 195px",
              animation: "heroDotFade 300ms ease-out 1700ms both",
            }}
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP LAYOUT (12 Columns) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* Left 7 Columns: Headline, Subcopy, Buttons, Trust Row */}
          <div className="lg:col-span-7 space-y-5 xl:space-y-6 text-left">
            <h1
              id="hero-heading"
              className="font-display text-[42px] xl:text-[52px] font-bold text-[#064B40] leading-[1.14] tracking-tight text-balance hero-anim-h1"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi
                ? "गंगाखेडमध्ये मुळव्याध, फिशर व फिस्टुलावर खाजगी उपचार"
                : "Specialist care for piles, fissure & fistula in Gangakhed"}
            </h1>

            <p
              className="text-base xl:text-lg text-[#3F5652] leading-relaxed max-w-xl text-balance hero-anim-sub"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi
                ? "डॉ. अनंत कोरे आणि डॉ. किरण कोरे यांच्याकडून पूर्ण गोपनीयता, आदरयुक्त तपासणी व शास्त्रोक्त क्षारसूत्र चिकित्सा."
                : "Private, careful examination and Ayurvedic Ksharsutra care from Dr. Anant Kore and Dr. Kiran Kore."}
            </p>

            {/* CTAs: Left buttons replaced with "Call now" (primary amber) and "View treatments" (secondary outline) */}
            <div className="flex items-center gap-3.5 pt-1 hero-anim-btn">
              <Button
                variant="primary"
                size="lg"
                href={`tel:${siteConfig.contact.phoneRaw}`}
                icon={<Phone className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "कॉल करा" : "Call now"}
              </Button>

              <Button
                variant="secondary-light"
                size="lg"
                href="#treatments"
                icon={<ChevronRight className="w-5 h-5 text-[#0B7A68]" strokeWidth={2} />}
                iconPosition="right"
              >
                {isMarathi ? "उपचार पहा" : "View treatments"}
              </Button>
            </div>

            {/* Desktop Trust Row */}
            <div className="pt-4 border-t border-[#D5E6E0] grid grid-cols-3 gap-3 hero-anim-trust">
              {trustItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#D5E6E0] shadow-2xs tile-hover transition-transform duration-150"
                  >
                    <div className={`w-8.5 h-8.5 rounded-lg ${item.tint} flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5`}>
                      <IconComponent className="w-4.5 h-4.5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#064B40] leading-tight truncate">
                        {isMarathi ? item.labelMr : item.labelEn}
                      </div>
                      <div className="text-[11px] text-[#5A7370] leading-tight truncate">
                        {isMarathi ? item.descMr : item.descEn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 Columns: Appointment Request Card with Deep Green Backdrop */}
          <div className="lg:col-span-5 relative">
            {/* Deep-green rounded panel (radius 28px) offset ~14px down/right */}
            <div
              className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-[26px] bg-[#064B40] shadow-lg animate-hero-panel pointer-events-none"
              aria-hidden="true"
            />

            {/* Foreground Card (Tightened under ~600px tall to fit at 1366x768 without scrolling) */}
            <div className="relative rounded-[24px] bg-white border border-[#D5E6E0] p-4 sm:p-5 shadow-xl transition-all duration-200 lg:hover:-translate-y-1 lg:hover:shadow-2xl animate-hero-card hero-card-hover">
              <AppointmentForm />
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT (< 1024px) */}
        <div className="lg:hidden space-y-4 text-center">
          <h1
            id="hero-heading-mobile"
            className="font-display text-[clamp(1.75rem,7.2vw,2.25rem)] font-bold text-[#064B40] leading-[1.18] tracking-tight px-1 hero-anim-h1-mobile"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "गंगाखेडमध्ये मुळव्याध, फिशर व फिस्टुलावर खाजगी उपचार"
              : "Specialist care for piles, fissure & fistula in Gangakhed"}
          </h1>

          <p
            className="text-xs sm:text-sm text-[#3F5652] leading-relaxed max-w-sm mx-auto px-2 hero-anim-sub-mobile"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "डॉ. अनंत कोरे व डॉ. किरण कोरे यांच्याकडून पूर्ण गोपनीयता व क्षारसूत्र चिकित्सा."
              : "Private examination & Ayurvedic Ksharsutra care by Dr. Anant Kore & Dr. Kiran Kore."}
          </p>

          {/* Single Full-Width Primary Button (Opens Booking Sheet) */}
          <div className="pt-1 hero-anim-btn-mobile">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onOpenBooking}
              icon={<Calendar className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
            >
              {isMarathi ? "अपॉइंटमेंट बुक करा" : "Book appointment"}
            </Button>
          </div>

          {/* Mobile 3-Column Trust Grid (Centered, short label, nothing touching edges) */}
          <div className="pt-2 grid grid-cols-3 gap-2 px-1 hero-anim-trust-mobile">
            {trustItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 border border-[#D5E6E0] shadow-2xs text-center"
                >
                  <div className={`w-8 h-8 rounded-lg ${item.tint} flex items-center justify-center mb-1 shrink-0`}>
                    <IconComponent className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="text-[11.5px] font-bold text-[#064B40] leading-tight text-center line-clamp-2">
                    {isMarathi ? item.labelMr : item.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
