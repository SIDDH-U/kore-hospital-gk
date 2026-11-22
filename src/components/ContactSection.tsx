"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig, clinicConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/Button";
import {
  Phone,
  Navigation,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
  const { isMarathi } = useLanguage();
  const [mobileTab, setMobileTab] = useState<"map" | "building">("map");
  const [imgError, setImgError] = useState(false);

  const mapUrl = siteConfig.brand.mapUrl || clinicConfig.mapsLink;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-10 sm:py-14 lg:py-16 bg-[#EAF6F2] border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-semibold text-[#0B7A68] block mb-1">
            {isMarathi ? "रुग्णालय स्थान व संपर्क" : "Find & reach us"}
          </span>
          <h2
            id="contact-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064B40] tracking-tight"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "रुग्णालय संपर्क व पत्ता" : "Location & contact"}
          </h2>
          <p
            className="text-xs sm:text-sm text-[#3F5652] mt-2 leading-relaxed"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "गंगाखेड येथील कोरे हॉस्पिटलला भेट द्या किंवा थेट फोन अथवा व्हॉट्सॲपवर संपर्क करा."
              : "Easily located in Gangakhed. Reach us directly by phone, WhatsApp, or Google Maps directions."}
          </p>
        </div>

        {/* DESKTOP LAYOUT (12 Columns, Equal Height) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: Google Map Card (~420px tall) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[430px] rounded-[20px] overflow-hidden border border-[#D5E6E0] shadow-sm bg-white">
              <iframe
                title="Kore Hospital Gangakhed Google Map"
                src="https://maps.google.com/maps?q=18.9698392,76.7479928&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Get Directions Overlaid Chip (Bottom-Left) */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-sm border border-[#D5E6E0] text-xs font-bold text-[#064B40] hover:bg-[#EAF6F2] transition-colors shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#F5A524]" strokeWidth={2.5} />
                <span>{isMarathi ? "गूगल मॅपवर दिशा पहा" : "Get directions"}</span>
                <ExternalLink className="w-3 h-3 text-[#5A7370]" />
              </a>
            </div>
          </div>

          {/* Right 5 Columns, Stacked: (a) Building Photo Card, (b) Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* (a) Building Photo Card */}
            {!imgError && (
              <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden border border-[#D5E6E0] shadow-sm bg-[#D5E6E0]/40 shrink-0">
                <Image
                  src="/images/hospital-front.jpg"
                  alt="Kore Hospital Exterior in Gangakhed"
                  fill
                  sizes="(max-width: 1280px) 40vw, 480px"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  onError={() => setImgError(true)}
                  className="w-full h-full"
                />
                <div className="absolute bottom-3 inset-x-3 z-10 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-xs text-[11px] font-medium text-white text-center">
                  {isMarathi
                    ? "चांडक हॉस्पिटल शेजारील निळा कोरे हॉस्पिटल फलक पहा"
                    : "Look for the blue Kore Hospital signboard, near Chandak Hospital"}
                </div>
              </div>
            )}

            {/* (b) Info Card with 3 Aligned Rows + Get Directions Button */}
            <div className="p-5 rounded-[20px] bg-white border border-[#D5E6E0] shadow-sm flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3 text-left">
                {/* Row 1: Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF6F2] text-[#0B7A68] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#064B40]">
                      {isMarathi ? "पत्ता" : "Address"}
                    </div>
                    <div className="text-xs text-[#3F5652] leading-snug mt-0.5">
                      {isMarathi
                        ? "चांडक हॉस्पिटलच्या शेजारी, डॉ. लेन, गंगाखेड, जि. परभणी ४३१५१४"
                        : "Near Chandak Hospital, Dr. Lane, Gangakhed, Dist. Parbhani 431514"}
                    </div>
                  </div>
                </div>

                {/* Row 2: Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FDF0D5] text-[#B87108] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#064B40]">
                      {isMarathi ? "वेळ" : "Hours"}
                    </div>
                    <div className="text-xs text-[#3F5652] leading-snug mt-0.5">
                      {isMarathi
                        ? "सोम – शनि: स. ९:०० – रा. ८:०० · रवि: स. ९:०० – दु. २:००"
                        : "Mon – Sat: 9:00 AM – 8:00 PM · Sun: 9:00 AM – 2:00 PM"}
                    </div>
                  </div>
                </div>

                {/* Row 3: Phones */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E3F0FA] text-[#1D70B8] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#064B40]">
                      {isMarathi ? "फोन संपर्क" : "Direct Phone"}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="text-xs font-bold text-[#0B7A68] hover:underline"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <span className="text-gray-300">·</span>
                      <a
                        href={`tel:${siteConfig.contact.secondaryPhoneRaw}`}
                        className="text-xs font-bold text-[#0B7A68] hover:underline"
                      >
                        {siteConfig.contact.secondaryPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions Button */}
              <Button
                variant="primary"
                size="default"
                fullWidth
                href={mapUrl}
                icon={<Navigation className="w-4 h-4 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "गूगल मॅपवर दिशा मिळवा" : "Get directions"}
              </Button>
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT (Segmented Control [Map | Building] + ~220px Panel) */}
        <div className="lg:hidden space-y-4">
          {/* Segmented Control */}
          {!imgError && (
            <div className="flex justify-center">
              <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#D5E6E0] shadow-2xs">
                <button
                  type="button"
                  onClick={() => setMobileTab("map")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    mobileTab === "map"
                      ? "bg-[#064B40] text-white shadow-xs"
                      : "text-[#5A7370] hover:text-[#064B40]"
                  }`}
                >
                  {isMarathi ? "नकाशा (Map)" : "Google Map"}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("building")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    mobileTab === "building"
                      ? "bg-[#064B40] text-white shadow-xs"
                      : "text-[#5A7370] hover:text-[#064B40]"
                  }`}
                >
                  {isMarathi ? "इमारत फोटो (Building)" : "Building Photo"}
                </button>
              </div>
            </div>
          )}

          {/* ~220px Panel with both mounted to preserve map state */}
          <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-[#D5E6E0] bg-white shadow-xs">
            {/* Map Frame */}
            <div className={`w-full h-full ${mobileTab === "map" ? "block" : "hidden"}`}>
              <iframe
                title="Kore Hospital Gangakhed Map Mobile"
                src="https://maps.google.com/maps?q=18.9698392,76.7479928&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Building Frame */}
            {!imgError && (
              <div className={`relative w-full h-full ${mobileTab === "building" ? "block" : "hidden"}`}>
                <Image
                  src="/images/hospital-front.jpg"
                  alt="Kore Hospital Building in Gangakhed"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  onError={() => setImgError(true)}
                  className="w-full h-full"
                />
                <div className="absolute bottom-2 inset-x-2 z-10 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-[10.5px] font-medium text-white text-center">
                  {isMarathi
                    ? "चांडक हॉस्पिटल शेजारील निळा कोरे हॉस्पिटल फलक पहा"
                    : "Look for the blue Kore Hospital signboard, near Chandak Hospital"}
                </div>
              </div>
            )}
          </div>

          {/* Compact Info Rows on Mobile */}
          <div className="p-4 rounded-2xl bg-white border border-[#D5E6E0] shadow-xs space-y-3 text-left">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#0B7A68] shrink-0 mt-0.5" strokeWidth={2} />
              <div className="text-xs text-[#3F5652] leading-tight">
                {isMarathi
                  ? "चांडक हॉस्पिटल शेजारी, डॉ. लेन, गंगाखेड जि. परभणी ४३१५१४"
                  : "Near Chandak Hospital, Dr. Lane, Gangakhed, Dist. Parbhani 431514"}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#F5A524] shrink-0" strokeWidth={2} />
              <div className="text-xs text-[#3F5652] leading-tight">
                {isMarathi
                  ? "सोम–शनि स. ९:००–रा. ८:०० · रवि स. ९:००–दु. २:००"
                  : "Mon–Sat 9:00 AM–8:00 PM · Sun 9:00 AM–2:00 PM"}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#1D70B8] shrink-0" strokeWidth={2} />
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B7A68]">
                <a href={`tel:${siteConfig.contact.phoneRaw}`}>{siteConfig.contact.phone}</a>
                <span>·</span>
                <a href={`tel:${siteConfig.contact.secondaryPhoneRaw}`}>{siteConfig.contact.secondaryPhone}</a>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="default"
                fullWidth
                href={mapUrl}
                icon={<Navigation className="w-4 h-4 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "गूगल मॅपवर दिशा मिळवा" : "Get directions"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
