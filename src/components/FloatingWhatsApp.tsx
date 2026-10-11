import React from "react";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { WhatsAppIcon } from "./Icons";

export function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp Concierge" className="hidden lg:block">
      <a
        href={buildWhatsAppLink(
          `Hello ${siteConfig.brand.name}, I would like to enquire about dental treatments.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pulse fixed bottom-7 right-7 z-40 h-13 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-xl flex items-center gap-2.5 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
        aria-label={`Chat with ${siteConfig.brand.name} Concierge on WhatsApp`}
      >
        <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
        <span className="tracking-wide">Chat with Clinic</span>
      </a>
    </aside>
  );
}
