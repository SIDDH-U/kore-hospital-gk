"use client";

import React from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/Button";
import { Calendar, Phone } from "lucide-react";

interface CtaBannerProps {
  onOpenBooking?: () => void;
}

export function CtaBanner({ onOpenBooking }: CtaBannerProps) {
  const { isMarathi } = useLanguage();

  return (
    <section
      aria-label="Consultation Booking CTA"
      className="bg-[#052F29] text-white py-10 sm:py-14 border-t border-[#064B40] relative overflow-hidden"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2
          className="text-[22px] sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto"
          lang={isMarathi ? "mr" : "en"}
        >
          {isMarathi
            ? "खाजगी व आदरयुक्त सल्लामसलत बुक करा"
            : "Book a private consultation"}
        </h2>

        <p
          className="mt-2.5 text-sm sm:text-base text-[#CFE5DF] max-w-xl mx-auto leading-relaxed"
          lang={isMarathi ? "mr" : "en"}
        >
          {isMarathi
            ? "डॉ. अनंत कोरे व डॉ. किरण कोरे यांच्याकडून गंगाखेड येथे अचूक निदान व आयुर्वेदिक क्षारसूत्र उपचार."
            : "Consult Dr. Anant Kore and Dr. Kiran Kore at Gangakhed. Careful, respectful care with complete patient privacy."}
        </p>

        <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <div className="w-full sm:w-auto">
            {onOpenBooking ? (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onOpenBooking}
                icon={<Calendar className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "अपॉइंटमेंट बुक करा" : "Book appointment"}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                href="/book"
                icon={<Calendar className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "अपॉइंटमेंट बुक करा" : "Book appointment"}
              </Button>
            )}
          </div>

          <div className="w-full sm:w-auto">
            <Button
              variant="secondary-dark"
              size="lg"
              fullWidth
              href={`tel:${siteConfig.contact.phoneRaw}`}
              icon={<Phone className="w-5 h-5 text-white" strokeWidth={2} />}
            >
              {isMarathi ? "कॉल करा" : "Call now"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
