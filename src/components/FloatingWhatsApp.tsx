"use client";

import React from "react";
import { buildWhatsAppLink } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const { isMarathi } = useLanguage();

  const whatsAppLink = buildWhatsAppLink(
    isMarathi
      ? "नमस्कार डॉ. कोरे, मला मुळव्याध/फिशर तपासणीसाठी माहिती हवी आहे."
      : "Hello Dr. Kore, I would like to consult regarding piles/fissure care."
  );

  return (
    <a
      href={whatsAppLink}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-[#1B8755] hover:bg-[#167046] text-white shadow-xl items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8755] focus-visible:ring-offset-2"
      aria-label="Chat on WhatsApp with Kore Hospital"
    >
      <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
    </a>
  );
}
