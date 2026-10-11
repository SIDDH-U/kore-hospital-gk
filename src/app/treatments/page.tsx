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
import { ArrowRightIcon, SparkleIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Treatments & Services | ${siteConfig.brand.name}`,
  description: "Explore our comprehensive suite of gentle, modern dental treatments. From clear aligners to titanium implants and pain-free root canals.",
  alternates: {
    canonical: `${getSiteUrl()}/treatments`,
  },
};

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Page Hero */}
        <section className="bg-[#0B3B4A] text-white py-12 sm:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-3">
              <SparkleIcon className="w-3.5 h-3.5" />
              SPECIALIST CLINICAL DIRECTORY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Comprehensive Dental Treatments
            </h1>
            <p className="mt-2.5 text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed text-balance">
              State-of-the-art procedures designed with gentle hands, 3D digital imaging, and 100% transparent pricing.
            </p>
          </div>
        </section>

        {/* 2-Column Compact Grid on Mobile, 3-Column on Desktop */}
        <section className="py-10 sm:py-16">
          <div className="max-w-[1240px] mx-auto px-3.5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {siteConfig.treatments.map((t) => (
                <Link
                  key={t.id}
                  href={`/treatments/${t.slug}`}
                  className="group flex flex-col rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all card-press focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC]"
                >
                  {/* Image 4:3 */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#0B3B4A]/90 text-white backdrop-blur-sm">
                      {t.badge}
                    </span>
                  </div>

                  {/* Content: Compact info */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-serif text-sm sm:text-lg font-bold text-[#0B3B4A] group-hover:text-[#26B5AC] transition-colors leading-snug line-clamp-2">
                        {t.title}
                      </h2>
                      <p className="hidden sm:block text-xs text-[#5B7480] mt-1.5 line-clamp-2 leading-relaxed">
                        {t.oneLineDesc || t.shortDesc}
                      </p>
                    </div>

                    <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100 flex items-center justify-between gap-1">
                      <span className="text-[11px] sm:text-xs font-bold text-[#0B3B4A] bg-[#E9F7F5] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                        From {t.startingPrice}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-[#26B5AC] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                        <span className="hidden sm:inline">Details</span>
                        <ArrowRightIcon className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
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
