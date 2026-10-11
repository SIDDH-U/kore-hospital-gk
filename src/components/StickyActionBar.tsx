"use client";

import React, { useEffect, useState, useRef } from "react";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { PhoneIcon, WhatsAppIcon, CalendarIcon } from "./Icons";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface StickyActionBarProps {
  onOpenBooking?: () => void;
}

export function StickyActionBar({ onOpenBooking }: StickyActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  const { ripples: callRipples, createRipple: createCallRipple } = useRipple("mint");
  const { ripples: bookRipples, createRipple: createBookRipple } = useRipple("teal");

  const bookBtnRef = useRef<HTMLButtonElement | null>(null);
  useIdleAnimationObserver(bookBtnRef);

  useEffect(() => {
    const heroButtons = document.getElementById("hero-cta-buttons");

    if (!heroButtons) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(heroButtons);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      id="sticky-bottom-bar"
      aria-label="Mobile Quick Actions"
      className={`fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(11,59,74,0.08)] px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] transition-all duration-300 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-md mx-auto flex items-center gap-2.5">
        {/* Left Action: Call Now */}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          onPointerDown={createCallRipple}
          className="btn-ripple-container flex-1 h-[44px] px-3 rounded-full bg-[#E9F7F5] hover:bg-[#D4EFEA] text-[#0B3B4A] font-bold text-xs sm:text-sm btn-press flex items-center justify-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-all whitespace-nowrap"
          aria-label={`Call ${siteConfig.brand.name} at ${siteConfig.contact.phone}`}
        >
          <PhoneIcon className="w-4 h-4 text-[#0B3B4A] shrink-0 phone-ring-icon" />
          <span>Call Now</span>

          {callRipples.map((r) => (
            <span
              key={r.id}
              className="btn-ripple-circle"
              style={{
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
                backgroundColor: "rgba(11, 59, 74, 0.15)",
              }}
            />
          ))}
        </a>

        {/* Right Action: Book on WhatsApp / Modal */}
        <button
          ref={bookBtnRef}
          type="button"
          onClick={onOpenBooking}
          onPointerDown={createBookRipple}
          style={{ "--shine-delay": "0.3s" } as React.CSSProperties}
          className={`btn-ripple-container btn-idle-shine ${
            !isVisible ? "anim-idle-disabled" : ""
          } flex-[1.35] h-[44px] px-3.5 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-extrabold text-xs sm:text-sm btn-press flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-all whitespace-nowrap`}
          aria-label="Book a Dental Consultation"
        >
          <CalendarIcon className="w-4 h-4 text-[#07252F] shrink-0" />
          <span className="hidden min-[360px]:inline">Book on WhatsApp</span>
          <span className="inline min-[360px]:hidden">Book Visit</span>

          {bookRipples.map((r) => (
            <span
              key={r.id}
              className="btn-ripple-circle"
              style={{
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
                backgroundColor: "rgba(255, 255, 255, 0.35)",
              }}
            />
          ))}
        </button>
      </div>
    </aside>
  );
}
