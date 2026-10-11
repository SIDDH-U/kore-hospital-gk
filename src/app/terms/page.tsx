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
    <div className="min-h-screen flex flex-col bg-[#FAFCFC] text-[#12303A]">
      <TopStrip />
      <Header />

      <main className="flex-1 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#26B5AC] mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#5B7480]">Terms of Service</span>
        </nav>

        <h1 className="font-display text-3xl font-bold text-[#0B3B4A] mb-6">
          Terms of Service
        </h1>

        <div className="text-sm text-[#5B7480] space-y-4 leading-relaxed">
          <p>
            Welcome to {siteConfig.brand.legalName}. By browsing this website or scheduling consultations through our online booking desk and WhatsApp concierge, you agree to comply with the terms and guidelines detailed below.
          </p>
          <h2 className="font-display text-lg font-bold text-[#0B3B4A] pt-4">
            Dental Consultation Disclaimer
          </h2>
          <p>
            Content on this website is provided for informational and appointment coordination purposes. Detailed clinical diagnosis and treatment plans are finalized following an in-person 3D scan and clinical evaluation by our specialist dentists. For acute dental emergencies, please call our direct hotline at {siteConfig.contact.phone}.
          </p>
          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0B3B4A] text-white font-bold text-sm btn-press shadow"
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
