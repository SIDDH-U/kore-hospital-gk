"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CtaBanner } from "@/components/CtaBanner";
import { ShieldCheckIcon, CheckCircleIcon, MapPinIcon } from "@/components/Icons";

export function AboutContent() {
  const { isMarathi } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#EAF6F2] text-[#0F2321]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Header Hero */}
        <section className="bg-[#064B40] text-white py-14 lg:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#F5A524] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">About Us</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#F5A524] border border-white/15 mb-3">
              {isMarathi ? "हॉस्पिटलविषयी माहिती" : "About Kore Hospital"}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              {isMarathi ? "विश्वासार्ह, सुरक्षित व खाजगी उपचार" : "Specialist Care for Piles, Fissure & Fistula"}
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed text-balance">
              {isMarathi
                ? "गंगाखेड (जि. परभणी) येथील अग्रगण्य मुळव्याध व क्षारसूत्र केंद्र. डॉ. अनंत कोरे व डॉ. किरण कोरे यांच्या मार्गदर्शनाखाली दर्जेदार वैद्यकीय सेवा."
                : "Dedicated to eliminating the discomfort and stigma of anorectal disorders through gentle, Ayurvedic Ksharsutra therapy and Ayurvedic care in Gangakhed."}
            </p>
          </div>
        </section>

        {/* Story & Philosophy Section */}
        <section className="py-14 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B7A68] block">
                  {isMarathi ? "आमचा दृष्टिकोन" : "OUR CLINICAL PHILOSOPHY"}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064B40] tracking-tight text-balance">
                  {isMarathi ? "रुग्णांची गोपनीयता आणि आदर हेच आमचे प्राधान्य" : "Restoring Dignity & Comfort in Proctology Care"}
                </h2>
                <p className="text-sm sm:text-base text-[#3F5652] leading-relaxed">
                  {siteConfig.brand.name} was established in Gangakhed to provide individuals suffering from piles, anal fissures, fistulas, and chronic constipation with a trustworthy, empathetic medical sanctuary.
                </p>
                <p className="text-sm sm:text-base text-[#3F5652] leading-relaxed">
                  Led by Dr. Anant Kamaji Kore (BAMS, Fellowship in Ksharsutra) and Dr. Kiran Anant Kore, the hospital adheres to traditional Ayurvedic surgical practices alongside modern clinical sanitation. We believe in conservative therapy first—recommending procedures only when strictly necessary after thorough diagnostic examination.
                </p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#D5E6E0] shadow-2xs flex items-start gap-3">
                    <ShieldCheckIcon className="w-5 h-5 text-[#0B7A68] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#064B40]">Ayurvedic Ksharsutra</h4>
                      <p className="text-xs text-[#3F5652] mt-0.5">Time-tested medicated thread therapy for safe fistula and piles care.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#D5E6E0] shadow-2xs flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-[#0B7A68] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#064B40]">Female Doctor Available</h4>
                      <p className="text-xs text-[#3F5652] mt-0.5">Discreet, comfortable care specifically provided for female patients.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Hospital Exterior Building Photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#D5E6E0] bg-white">
                  <Image
                    src="/images/hospital-front.jpg"
                    alt={`${siteConfig.brand.name} building in Gangakhed`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] text-center text-[#3F5652] mt-2">
                  Kore Hospital entrance & signboard on Dr. Lane, Gangakhed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location Strip */}
        <section className="py-10 bg-white border-y border-[#D5E6E0]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-xl">
            <MapPinIcon className="w-8 h-8 text-[#0B7A68] mx-auto mb-2" />
            <h3 className="font-serif text-lg font-bold text-[#064B40]">
              Visit Us in Gangakhed
            </h3>
            <p className="text-xs sm:text-sm text-[#3F5652] mt-1">
              {siteConfig.brand.fullAddress} (Next to Chandak Hospital)
            </p>
            <p className="text-xs font-bold text-[#0B7A68] mt-2">
              Phones: {siteConfig.contact.phone} / {siteConfig.contact.secondaryPhone}
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <CtaBanner />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
