import React from "react";
import type { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SmileGallery } from "@/components/SmileGallery";

export const metadata: Metadata = {
  title: `Smile Gallery: Before & After | ${siteConfig.brand.name}`,
  description: `Browse actual before-and-after smile transformations from ${siteConfig.brand.name}. Clear aligners, dental implants, porcelain veneers, and whitening.`,
  alternates: {
    canonical: `${getSiteUrl()}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        <SmileGallery />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
