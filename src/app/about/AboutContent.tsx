"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowRightIcon, CheckCircleIcon, ShieldCheckIcon, Scanner3DIcon } from "@/components/Icons";
import { useScrollAnimation } from "@/components/useScrollAnimation";

export function AboutContent() {
  useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC] text-[#12303A]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Header Hero */}
        <section className="bg-[#0B3B4A] text-white py-14 lg:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#26B5AC] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">About Us</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-3">
              ABOUT SMILORA DENTAL STUDIO
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Painless Dentistry. A Smile You’ll Love.
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed text-balance">
              Designed from the ground up to eliminate the fear of dental care. Serene studio interiors, 3D optical scanning, and compassionate specialists.
            </p>
          </div>
        </section>

        {/* Story and Mission Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#26B5AC] block">
                  OUR PHILOSOPHY
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight text-balance">
                  Redefining the Private Dental Experience
                </h2>
                <p className="text-sm sm:text-base text-[#5B7480] leading-relaxed">
                  {siteConfig.brand.name} was founded with a singular conviction: visiting the dentist should be an anxiety-free, reassuring experience. We rejected cold fluorescent clinical rooms in favor of natural daylight, calming Scandinavian aesthetics, and gentle human care.
                </p>
                <p className="text-sm sm:text-base text-[#5B7480] leading-relaxed">
                  Our studio brings together leading post-graduate MDS specialists—orthodontists, implantologists, endodontists, and pediatric dentists—supported by computer-guided local anesthesia and Class-B hospital autoclave sterilisation.
                </p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
                    <Scanner3DIcon className="w-5 h-5 text-[#26B5AC] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0B3B4A]">3D Digital Imaging</h4>
                      <p className="text-xs text-[#5B7480] mt-0.5">High-definition scans with zero uncomfortable putty trays.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
                    <ShieldCheckIcon className="w-5 h-5 text-[#26B5AC] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0B3B4A]">Class-B Sterilisation</h4>
                      <p className="text-xs text-[#5B7480] mt-0.5">Single-use sealed patient kits opened in front of you.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <Image
                    src="/images/clinic-interior.webp"
                    alt={`${siteConfig.brand.name} lounge`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Big CTA */}
        <CtaBanner />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
