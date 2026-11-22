"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactSection } from "@/components/ContactSection";

export function ContactContent() {
  const { isMarathi } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#EAF6F2] text-[#0F2321]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Header Hero */}
        <section className="bg-[#064B40] text-white py-12 lg:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#F5A524] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">Contact</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#F5A524] border border-white/15 mb-3">
              {isMarathi ? "संपर्क व पत्ता" : "Direct hospital contact"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight text-balance">
              {isMarathi ? "कोरे हॉस्पिटलशी संपर्क साधा" : `Contact ${siteConfig.brand.name}`}
            </h1>
            <p className="mt-3.5 text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              {isMarathi
                ? "गंगाखेड येथील डॉ. लेन, चांडक हॉस्पिटलच्या शेजारी. प्रत्यक्ष तपासणी किंवा सल्ल्यासाठी आजच संपर्क करा."
                : `Located in Gangakhed, Dist. Parbhani. Reach out directly for consultation appointments or driving directions.`}
            </p>
          </div>
        </section>

        {/* Embedded Contact Section */}
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
