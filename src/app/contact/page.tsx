import React from "react";
import type { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: `Contact Us & Directions | ${siteConfig.brand.name}`,
  description: `Contact ${siteConfig.brand.name}. Schedule a consultation via WhatsApp or phone. Located at ${siteConfig.brand.fullAddress}.`,
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
