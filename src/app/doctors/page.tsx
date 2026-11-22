import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  DoctorMaleAvatar,
  DoctorFemaleAvatar,
  PhoneIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: `Our Doctors | ${siteConfig.brand.name}`,
  description: `Meet Dr. Anant Kamaji Kore and Dr. Kiran Anant Kore at ${siteConfig.brand.name}, Gangakhed. Specialists in ano-rectal care and Ksharsutra therapy.`,
  alternates: {
    canonical: `${getSiteUrl()}/doctors`,
  },
};

export default function DoctorsPage() {
  const doctors = siteConfig.doctors;

  return (
    <div className="min-h-screen flex flex-col bg-[#EAF6F2]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Page Hero */}
        <section className="bg-[#052F29] text-white py-12 sm:py-16 text-center">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#F5A524] border border-white/15 mb-3">
              <ShieldCheckIcon className="w-3.5 h-3.5" />
              <span>Specialist medical faculty</span>
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Our Specialist Doctors
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
              Consult with Dr. Anant Kamaji Kore and Dr. Kiran Anant Kore for ethical, confidential, and time-tested anorectal care in Gangakhed.
            </p>
          </div>
        </section>

        {/* Doctors Grid - Exactly 2 Doctors */}
        <section className="py-14 sm:py-20">
          <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {doctors.map((doc) => {
                const isFemale = doc.avatar === "female";

                return (
                  <div
                    key={doc.id}
                    className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-[#D5E6E0] shadow-xs hover:shadow-md transition-all card-press"
                  >
                    {/* Clean Generic Person SVG Avatar (Zero Photos Used) */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-5 bg-[#EAF6F2] p-2 border-2 border-[#D5E6E0] shadow-sm">
                      {isFemale ? (
                        <DoctorFemaleAvatar className="w-full h-full" />
                      ) : (
                        <DoctorMaleAvatar className="w-full h-full" />
                      )}
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-[#064B40]">
                      {doc.name}
                    </h2>

                    <p className="text-sm font-semibold text-[#0B7A68] mt-1">
                      {doc.qualification}
                    </p>

                    <div className="mt-3 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#EAF6F2] text-[#064B40] border border-[#D5E6E0]">
                      {doc.specialty}
                    </div>

                    {isFemale && (
                      <p className="text-xs text-[#3F5652] mt-3">
                        Lady doctor available for female patients ensuring comfort and complete privacy.
                      </p>
                    )}

                    {/* Action CTAs */}
                    <div className="mt-7 pt-5 border-t border-gray-100 w-full flex flex-col sm:flex-row items-center gap-3">
                      <a
                        href={`tel:${doc.phoneRaw || siteConfig.contact.phoneRaw}`}
                        className="btn-press w-full py-2.5 rounded-full text-xs font-bold text-[#064B40] bg-[#EAF6F2] hover:bg-[#E1EFEA] border border-[#D5E6E0] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <PhoneIcon className="w-3.5 h-3.5 text-[#0B7A68]" />
                        <span>Call Doctor</span>
                      </a>

                      <Link
                        href={`/book?doctor=${encodeURIComponent(doc.name)}`}
                        className="btn-press w-full py-2.5 rounded-full text-xs font-extrabold text-[#064B40] bg-[#F5A524] hover:bg-[#E09419] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                      >
                        <CalendarIcon className="w-3.5 h-3.5 text-[#064B40]" />
                        <span>Book appointment</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note on Medical Consultation */}
            <div className="mt-12 p-5 rounded-2xl bg-white border border-[#D5E6E0] text-xs text-[#3F5652] text-center max-w-xl mx-auto leading-relaxed">
              <p className="font-bold text-[#064B40] mb-1">Dignified, Respectful Consultations</p>
              <p>Both male and female doctors are available to ensure that all patients—including women and elderly family members—feel entirely comfortable during examination and treatment.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
