"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { CalendarIcon, WhatsAppIcon, ArrowRightIcon } from "./Icons";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface CtaBannerProps {
  onOpenBooking?: () => void;
}

export function CtaBanner({ onOpenBooking }: CtaBannerProps) {
  const bookBtnRef = useRef<HTMLAnchorElement | null>(null);
  useIdleAnimationObserver(bookBtnRef);
  const { ripples, createRipple } = useRipple("teal");

  const handleBook = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAFCFC]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#0B3B4A] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle background photo mask */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="/images/clinic-interior.webp"
              alt={`${siteConfig.brand.name} ambience`}
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          {/* Aqua radial glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#26B5AC]/20 blur-3xl pointer-events-none" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl text-center sm:text-left">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-4">
              START YOUR SMILE JOURNEY
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              {siteConfig.ctaBanner.title}
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-white/80 leading-relaxed text-balance">
              {siteConfig.ctaBanner.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              {/* Primary Book CTA */}
              <Link
                ref={bookBtnRef}
                href="/book"
                onClick={handleBook}
                onPointerDown={createRipple}
                style={{ "--shine-delay": "0.3s" } as React.CSSProperties}
                className="btn-idle-shine btn-ripple-container btn-press h-13 px-8 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#0B3B4A]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-all"
              >
                <CalendarIcon className="w-5 h-5 text-[#07252F] shrink-0" />
                <span>{siteConfig.ctaBanner.buttonText}</span>
                <ArrowRightIcon className="w-4 h-4 text-[#07252F]" />

                {ripples.map((r) => (
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

              {/* Secondary WhatsApp CTA */}
              <a
                href={buildWhatsAppLink(
                  `Hello ${siteConfig.brand.name}, I am ready to book a consultation.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press h-13 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>{siteConfig.ctaBanner.whatsAppText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
