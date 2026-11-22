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
  title: `Terms of Service | ${siteConfig.brand.name}`,
  description: `Terms of service and patient consultation guidelines for ${siteConfig.brand.name}.`,
  alternates: {
    canonical: `${getSiteUrl()}/terms`,
  },
};

export default function TermsPage() {
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
          <span className="text-[#3F5652]">Terms of Service</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#064B40] mb-6">
          Terms of Service
        </h1>

        <div className="text-sm text-[#3F5652] space-y-4 leading-relaxed">
          <p>
            Welcome to {siteConfig.brand.legalName}. By browsing this website or scheduling consultations through our online booking desk and WhatsApp concierge, you agree to comply with the terms and guidelines detailed below.
          </p>
          <h2 className="font-serif text-lg font-bold text-[#064B40] pt-4">
            Medical Consultation Disclaimer
          </h2>
          <p>
            Content on this website is provided for informational and appointment coordination purposes only. Detailed clinical diagnosis and treatment plans are finalized solely following an in-person clinical evaluation by our doctors. For urgent concerns, please call our direct helpline at {siteConfig.contact.phone}.
          </p>
          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#064B40] text-white font-bold text-sm btn-press shadow"
            >
              ← Back to Homepage
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
