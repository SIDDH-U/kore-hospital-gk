"use client";

import React from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/Button";
import { AppointmentForm } from "./AppointmentForm";
import { Calendar, Phone, ShieldCheck, UserCheck, Lock } from "lucide-react";

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
      descEn: "Authentic therapy",
      descMr: "शास्त्रोक्त पद्धत",
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
      descEn: "Discreet chambers",
      descMr: "स्वतंत्र तपासणी",
    },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-gradient-to-b from-[#EAF6F2] via-[#F4FAF8] to-white text-[#0F2321] overflow-hidden py-6 sm:py-8 lg:py-12 border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP LAYOUT (12 Columns) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* Left 7 Columns: Headline, Subcopy, Buttons, Trust Row */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1
              id="hero-heading"
              className="font-display text-[44px] xl:text-[54px] font-bold text-[#064B40] leading-[1.12] tracking-tight text-balance"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi
                ? "मुळव्याध, फिशर व फिस्टुलावर सुरक्षित व खाजगी उपचार"
                : "Specialist Care for Piles, Fissure & Fistula in Gangakhed"}
            </h1>

            <p
              className="text-base xl:text-lg text-[#3F5652] leading-relaxed max-w-xl text-balance"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi
                ? "डॉ. अनंत कोरे आणि डॉ. किरण कोरे यांच्याकडून पूर्ण गोपनीयता, आदरयुक्त तपासणी व शास्त्रोक्त क्षारसूत्र चिकित्सा."
                : "Private, careful examination and authentic Ayurvedic Ksharsutra care from Dr. Anant Kore and Dr. Kiran Kore."}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-1">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenBooking}
                icon={<Calendar className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "अपॉइंटमेंट बुक करा" : "Book appointment"}
              </Button>

              <Button
                variant="secondary-light"
                size="lg"
                href={`tel:${siteConfig.contact.phoneRaw}`}
                icon={<Phone className="w-5 h-5 text-[#064B40]" strokeWidth={2} />}
              >
                {isMarathi ? "थेट फोन करा" : "Call now"}
              </Button>
            </div>

            {/* Desktop Trust Row */}
            <div className="pt-4 border-t border-[#D5E6E0] grid grid-cols-3 gap-3">
              {trustItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#D5E6E0] shadow-2xs"
                  >
                    <div className={`w-9 h-9 rounded-lg ${item.tint} flex items-center justify-center shrink-0`}>
                      <IconComponent className="w-5 h-5" strokeWidth={2} />
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
            {/* Deep-green rounded panel (radius 28px) offset ~16px down/right */}
            <div
              className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-[28px] bg-[#064B40] shadow-lg"
              aria-hidden="true"
            />

            {/* Foreground Card */}
            <div className="relative rounded-[26px] bg-white border border-[#D5E6E0] p-6 shadow-xl">
              <AppointmentForm />
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT (< 1024px) */}
        <div className="lg:hidden space-y-4 text-center">
          <h1
            id="hero-heading-mobile"
            className="font-display text-[clamp(1.75rem,7.2vw,2.25rem)] font-bold text-[#064B40] leading-[1.18] tracking-tight px-1"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "मुळव्याध, फिशर व फिस्टुलावर खाजगी व सुरक्षित उपचार"
              : "Specialist Care for Piles, Fissure & Fistula"}
          </h1>

          <p
            className="text-xs sm:text-sm text-[#3F5652] leading-relaxed max-w-sm mx-auto px-2"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "डॉ. अनंत कोरे व डॉ. किरण कोरे यांच्याकडून पूर्ण गोपनीयता व क्षारसूत्र चिकित्सा."
              : "Private examination & Ayurvedic Ksharsutra care by Dr. Anant Kore & Dr. Kiran Kore."}
          </p>

          {/* Single Full-Width Primary Button (Opens Booking Sheet) */}
          <div className="pt-1">
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
          <div className="pt-3 grid grid-cols-3 gap-2 px-1">
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
