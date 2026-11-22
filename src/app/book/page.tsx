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
  description: `Schedule a consultation with our specialist doctors at ${siteConfig.brand.name}, Gangakhed. Confidential care for piles, fissure & fistula.`,
  alternates: {
    canonical: `${getSiteUrl()}/book`,
  },
  openGraph: {
    title: `Book an Appointment | ${siteConfig.brand.name}`,
    description: `Book your proctology consultation at ${siteConfig.brand.name}. Respectful, discreet anorectal care.`,
    url: `${getSiteUrl()}/book`,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: `${getSiteUrl()}/images/clinic-exterior.jpg`,
        width: 1200,
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
    <div className="min-h-screen flex flex-col bg-[#F2F8F6] text-[#14282A]">
      <TopStrip />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-12">
        <h1 className="sr-only">Book a Consultation | {siteConfig.brand.name}</h1>

        <noscript>
          <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-[#E1EFEA] border border-[#0F6B5C]/30 text-center text-sm text-[#0A4A40] font-medium">
            Please call{" "}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="font-bold underline text-[#0A4A40]"
            >
              {siteConfig.contact.phone}
            </a>{" "}
            or message us directly on WhatsApp to book your consultation.
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
