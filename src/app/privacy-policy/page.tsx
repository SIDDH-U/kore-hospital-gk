import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { siteConfig, getSiteUrl } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.brand.name}`,
  description: `Privacy policy and health data confidentiality standards of ${siteConfig.brand.name}.`,
  alternates: {
    canonical: `${getSiteUrl()}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EAF6F2] text-[#0F2321]">
      <TopStrip />
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#0B7A68] mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#3F5652]">Privacy Policy</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#064B40] mb-6">
          Privacy Policy
        </h1>

        <div className="text-sm text-[#3F5652] space-y-4 leading-relaxed">
          <p>
            At {siteConfig.brand.name}, accessible from our website, one of our primary commitments is the confidentiality of our patients and visitors. This Privacy Policy outlines how your personal and medical health information is collected, safeguarded, and handled in compliance with medical data privacy guidelines.
          </p>
          <h2 className="font-serif text-lg font-bold text-[#064B40] pt-4">
            Patient Data & Confidentiality
          </h2>
          <p>
            Any medical history, contact details, or appointment requests provided through our website or WhatsApp concierge are used solely for scheduling clinical visits, preparing treatment consultations, and coordinating follow-up care.
          </p>
          <h2 className="font-serif text-lg font-bold text-[#064B40] pt-4">
            Direct Communications & WhatsApp
          </h2>
          <p>
            Communications submitted via our online appointment forms or WhatsApp links are handled directly by our clinic desk at {siteConfig.brand.fullAddress}.
          </p>
          <div className="pt-8">
            <Link
              href="/"
              className="text-[#0B7A68] font-bold hover:underline"
            >
              ← Return to {siteConfig.brand.name} Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
