"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Clock, Phone } from "lucide-react";

export function Footer() {
  const { isMarathi } = useLanguage();

  const linksCol1 = [
    { name: isMarathi ? "मूळव्याध उपचार" : "Piles / Hemorrhoids", href: "/treatments/piles-hemorrhoids" },
    { name: isMarathi ? "फिशर उपचार" : "Anal Fissure", href: "/treatments/anal-fissure" },
    { name: isMarathi ? "भगंदर (फिस्टुला)" : "Anal Fistula", href: "/treatments/anal-fistula" },
    { name: isMarathi ? "क्षारसूत्र थेरपी" : "Ksharsutra Therapy", href: "/treatments/ksharsutra-therapy" },
  ];

  const linksCol2 = [
    { name: isMarathi ? "सर्व उपचार" : "All treatments", href: "/treatments" },
    { name: isMarathi ? "आमचे डॉक्टर्स" : "Our doctors", href: "/doctors" },
    { name: isMarathi ? "लक्षणे व सल्ला" : "When to consult", href: "/#when-to-see-doctor" },
    { name: isMarathi ? "गोपनीयता व आदर" : "Privacy & comfort", href: "/#privacy" },
    { name: isMarathi ? "प्रश्नोत्तरे" : "FAQ", href: "/#faq" },
  ];

  return (
    <footer className="bg-[#052F29] text-white pt-6 pb-20 lg:pt-8 lg:pb-8 border-t border-[#064B40] text-xs">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop 3-column / Mobile compact layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 pb-5 border-b border-white/10">
          {/* Col 1: Wordmark & One-Line Descriptor (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="font-sans font-bold text-base sm:text-lg text-white"
                lang={isMarathi ? "mr" : "en"}
              >
                {isMarathi ? "कोरे हॉस्पिटल" : "Kore Hospital"}
              </span>
              <span
                className="text-[11px] font-semibold px-1.5 py-0.5 rounded-[6px] bg-white/15 text-[#F5A524]"
                lang={isMarathi ? "mr" : "en"}
              >
                {isMarathi ? "मूळव्याध सेंटर" : "Piles Centre"}
              </span>
            </div>
            <p
              className="text-[#CFE5DF] text-xs leading-relaxed max-w-sm"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi
                ? "गंगाखेड येथील मुळव्याध, फिशर व भगंदरावर शास्त्रोक्त आयुर्वेदिक क्षारसूत्र उपचार केंद्र."
                : "Specialist centre in Gangakhed for piles, fissure, fistula, and Ayurvedic Ksharsutra care."}
            </p>
          </div>

          {/* Col 2: Compact 2-Column Links (4 cols) */}
          <div className="md:col-span-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-xs text-[#F5A524] mb-2">
                  {isMarathi ? "प्रमुख उपचार" : "Treatments"}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#CFE5DF]">
                  {linksCol1.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-white transition-colors truncate block">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-xs text-[#F5A524] mb-2">
                  {isMarathi ? "माहिती" : "Information"}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#CFE5DF]">
                  {linksCol2.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-white transition-colors truncate block">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Col 3: Contact Block ONCE with Exact Address & Two Phones (4 cols) */}
          <div className="md:col-span-4 space-y-2 text-[#CFE5DF]">
            <h4 className="font-semibold text-xs text-[#F5A524] mb-2">
              {isMarathi ? "रुग्णालय संपर्क" : "Hospital contact"}
            </h4>

            {/* Address */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#F5A524] shrink-0 mt-0.5" strokeWidth={2} />
              <span className="leading-snug" lang={isMarathi ? "mr" : "en"}>
                {isMarathi
                  ? "चांडक हॉस्पिटल शेजारी, डॉ. लेन, गंगाखेड जि. परभणी ४३१५१४"
                  : "Near Chandak Hospital, Dr. Lane, Gangakhed, Dist. Parbhani 431514"}
              </span>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F5A524] shrink-0" strokeWidth={2} />
              <span>{isMarathi ? siteConfig.hours.displayMr : siteConfig.hours.display}</span>
            </div>

            {/* Two Tappable Phone Rows */}
            <div className="pt-1 flex flex-col gap-1">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 text-white hover:text-[#F5A524] transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#F5A524]" strokeWidth={2} />
                <span className="font-semibold">{siteConfig.contact.phone}</span>
              </a>
              <a
                href={`tel:${siteConfig.contact.secondaryPhoneRaw}`}
                className="inline-flex items-center gap-2 text-white hover:text-[#F5A524] transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#F5A524]" strokeWidth={2} />
                <span className="font-semibold">{siteConfig.contact.secondaryPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line: Copyright + One-Line Disclaimer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-[#CFE5DF]/70 text-center sm:text-left">
          <p>
            © 2025 {siteConfig.brand.name}. {isMarathi ? "सर्व हक्क राखीव." : "All rights reserved."}
          </p>
          <p className="max-w-md">
            {isMarathi
              ? "या संकेतस्थळावरील माहिती केवळ जनजागृतीसाठी आहे आणि हा वैद्यकीय सल्ल्याचा पर्याय नाही."
              : "Information on this website is for awareness only and is not a substitute for a medical consultation."}
          </p>
          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              {isMarathi ? "गोपनीयता" : "Privacy"}
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {isMarathi ? "अटी" : "Terms"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
