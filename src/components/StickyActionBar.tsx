"use client";

import React from "react";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircle, Calendar } from "lucide-react";

interface StickyActionBarProps {
  onOpenBooking?: () => void;
}

export function StickyActionBar({ onOpenBooking }: StickyActionBarProps) {
  const { isMarathi } = useLanguage();

  const whatsAppLink = buildWhatsAppLink(
    isMarathi
      ? "नमस्कार डॉ. कोरे, मला मुळव्याध/फिशर तपासणीसाठी सल्ला हवा आहे."
      : "Hello Dr. Kore, I would like to consult regarding piles/fissure evaluation."
  );

  return (
    <aside
      aria-label="Quick Actions"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/98 backdrop-blur-md border-t border-[#D5E6E0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
        {/* Button 1: Call now */}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="h-11 px-2 rounded-[12px] border-2 border-[#0B7A68] text-[#0B7A68] hover:bg-[#EAF6F2] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-xs font-semibold whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68]"
          aria-label={`Call Hospital at ${siteConfig.contact.phone}`}
        >
          <Phone className="w-4 h-4 shrink-0 text-[#0B7A68]" strokeWidth={2} />
          <span>{isMarathi ? "कॉल करा" : "Call now"}</span>
        </a>

        {/* Button 2: WhatsApp */}
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-2 rounded-[12px] bg-[#1B8755] hover:bg-[#167046] text-white active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-xs font-semibold whitespace-nowrap shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8755]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 shrink-0 text-white" strokeWidth={2} />
          <span>{isMarathi ? "व्हॉट्सॲप" : "WhatsApp"}</span>
        </a>

        {/* Button 3: Book appointment */}
        {onOpenBooking ? (
          <button
            type="button"
            onClick={onOpenBooking}
            className="h-11 px-2 rounded-[12px] bg-[#F5A524] hover:bg-[#E09419] text-[#0F2321] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-xs font-bold whitespace-nowrap shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68]"
            aria-label="Book appointment"
          >
            <Calendar className="w-4 h-4 shrink-0 text-[#0F2321]" strokeWidth={2} />
            <span>{isMarathi ? "अपॉइंटमेंट" : "Book"}</span>
          </button>
        ) : (
          <a
            href="/book"
            className="h-11 px-2 rounded-[12px] bg-[#F5A524] hover:bg-[#E09419] text-[#0F2321] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-xs font-bold whitespace-nowrap shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68]"
            aria-label="Book appointment"
          >
            <Calendar className="w-4 h-4 shrink-0 text-[#0F2321]" strokeWidth={2} />
            <span>{isMarathi ? "अपॉइंटमेंट" : "Book"}</span>
          </a>
        )}
      </div>
    </aside>
  );
}
