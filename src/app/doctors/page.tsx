import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ArrowRightIcon, CalendarIcon, SparklesIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Our Dental Specialists | ${siteConfig.brand.name}`,
  description: `Meet our senior dental specialists: Orthodontists, Implantologists, Endodontists, and Pediatric dentists at ${siteConfig.brand.name}.`,
  alternates: {
    canonical: `${getSiteUrl()}/doctors`,
  },
};

export default function DoctorsPage() {
  const doctors = siteConfig.doctors;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Page Hero */}
        <section className="bg-[#0B3B4A] text-white py-14 sm:py-20 text-center">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              SPECIALIST CLINICAL TEAM
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Meet Our Specialist Dentists
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Every procedure is delivered by a master degree holder (MDS) specializing exclusively in their field with gentle hands and reassuring care.
            </p>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col rounded-3xl bg-white border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all card-press"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top hover-img-zoom"
                    />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0B3B4A]/85 text-white backdrop-blur-sm">
                      {doc.experience}
                    </span>
                    {siteConfig.sampleMode && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50/90 text-amber-800 border border-amber-300 backdrop-blur-sm">
                        Sample
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-display text-lg sm:text-xl font-bold text-[#0B3B4A]">
                        {doc.name}
                      </h2>
                      <p className="text-xs font-semibold text-[#26B5AC] mt-0.5">
                        {doc.role}
                      </p>
                      <p className="text-[11px] text-[#5B7480] mt-1">
                        {doc.degrees}
                      </p>
                      <p className="text-xs text-[#5B7480] mt-3 leading-relaxed line-clamp-3">
                        {doc.shortBio}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                      <Link
                        href={`/doctors/${doc.slug}`}
                        className="btn-press w-full py-2.5 rounded-full text-xs font-bold text-[#0B3B4A] bg-[#E9F7F5] hover:bg-[#D4EFEA] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>View Profile</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 text-[#0B3B4A]" />
                      </Link>

                      <Link
                        href={`/book?doctor=${encodeURIComponent(doc.name)}`}
                        className="btn-press w-full py-2.5 rounded-full text-xs font-bold text-[#07252F] bg-[#F2A65A] hover:bg-[#E09244] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <CalendarIcon className="w-3.5 h-3.5 text-[#07252F]" />
                        <span>Book Visit</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
