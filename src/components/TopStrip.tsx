import React from "react";
import { siteConfig } from "@/config/site.config";
import { PhoneIcon, ClockIcon, MapPinIcon } from "./Icons";

export function TopStrip() {
  return (
    <div className="bg-[#0B3B4A] text-white text-xs border-b border-white/10 font-medium">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile View: High priority phone tap target */}
        <div className="lg:hidden flex items-center justify-between py-2">
          <div className="flex items-center gap-1.5 text-white/90 truncate text-[11px] sm:text-xs">
            <ClockIcon className="w-3.5 h-3.5 text-[#26B5AC] shrink-0" />
            <span className="truncate">{siteConfig.hours.display}</span>
          </div>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="inline-flex items-center gap-1.5 font-bold text-[#F2A65A] hover:text-[#e09244] transition-colors py-0.5 px-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] shrink-0 text-xs"
            aria-label={`Call Clinic: ${siteConfig.contact.phone}`}
          >
            <PhoneIcon className="w-3.5 h-3.5 text-[#F2A65A]" />
            <span>{siteConfig.contact.phone}</span>
          </a>
        </div>

        {/* Desktop View (1024px+): Address, Hours & Direct Contact */}
        <div className="hidden lg:flex items-center justify-between py-2">
          {/* Left Info: Address & Working Hours */}
          <div className="flex items-center gap-6 text-white/80">
            <span className="inline-flex items-center gap-2">
              <MapPinIcon className="w-3.5 h-3.5 text-[#26B5AC] shrink-0" />
              <span>{siteConfig.brand.fullAddress}</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="w-3.5 h-3.5 text-[#26B5AC] shrink-0" />
              <span>{siteConfig.hours.display}</span>
            </span>
          </div>

          {/* Right Info: Phone & Consultation Callout */}
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-white/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#26B5AC] animate-pulse"></span>
              Painless & 3D Digital Care
            </span>
            <span className="text-white/20">|</span>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 font-bold text-[#F2A65A] hover:text-[#e09244] transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#F2A65A]" />
              <span>{siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
