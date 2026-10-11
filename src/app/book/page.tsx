import React, { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BookAppointmentForm, BookFormSkeleton } from "./BookForm";

export const metadata: Metadata = {
  title: `Book a Consultation | ${siteConfig.brand.name}`,
  description: `Schedule a consultation with our specialist dentists at ${siteConfig.brand.name}. ${siteConfig.brand.callbackNotice}`,
  alternates: {
    canonical: `${getSiteUrl()}/book`,
  },
  openGraph: {
    title: `Book an Appointment | ${siteConfig.brand.name}`,
    description: `Book your dental consultation online at ${siteConfig.brand.name}. Experience gentle, anxiety-free dental care.`,
    url: `${getSiteUrl()}/book`,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1600,
        height: 900,
        alt: `Book a Consultation at ${siteConfig.brand.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function BookPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC] text-[#12303A]">
      <TopStrip />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-12">
        <h1 className="sr-only">Book a Consultation | {siteConfig.brand.name}</h1>

        <noscript>
          <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-[#E9F7F5] border border-[#26B5AC]/30 text-center text-sm text-[#0B3B4A] font-medium">
            Please call{" "}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="font-bold underline text-[#0B3B4A]"
            >
              {siteConfig.contact.phone}
            </a>{" "}
            to schedule a consultation.
          </div>
        </noscript>

        <Suspense fallback={<BookFormSkeleton />}>
          <BookAppointmentForm />
        </Suspense>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
