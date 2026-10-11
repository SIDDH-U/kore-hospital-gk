import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { StarIcon, CalendarIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Patient Reviews & Testimonials | ${siteConfig.brand.name}`,
  description: `Read verified 5-star Google reviews from patients who experienced gentle, painless dentistry at ${siteConfig.brand.name}.`,
  alternates: {
    canonical: `${getSiteUrl()}/reviews`,
  },
};

export default function ReviewsPage() {
  const reviews = siteConfig.reviews;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="bg-[#0B3B4A] text-white py-14 sm:py-20 text-center">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-3">
              VERIFIED FEEDBACK
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Patient Stories & Reviews
            </h1>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex items-center text-[#F2A65A]">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 fill-[#F2A65A]" />
                ))}
              </div>
              <span className="font-bold text-white text-base">{siteConfig.stats.rating.display} / 5.0 Rating</span>
              <span className="text-white/70 text-sm">({siteConfig.stats.reviewCount}+ Google Reviews)</span>
              {siteConfig.sampleMode && (
                <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Sample
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-[#F2A65A]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 fill-[#F2A65A]" />
                        ))}
                      </div>
                      <span className="text-xs text-[#5B7480]">{rev.date}</span>
                    </div>

                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9F7F5] text-[#0B3B4A] mb-3">
                      {rev.treatment}
                    </span>

                    <p className="text-sm text-[#12303A] leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={rev.avatar}
                        alt={rev.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0B3B4A]">
                        {rev.name}
                      </h4>
                      <span className="text-[11px] text-[#26B5AC] font-semibold">
                        ✓ Verified Google Patient
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Booking Box */}
            <div className="mt-16 p-8 rounded-3xl bg-[#E9F7F5] text-center max-w-xl mx-auto border border-[#26B5AC]/20">
              <h3 className="font-display text-2xl font-bold text-[#0B3B4A]">
                Ready for your best dental experience?
              </h3>
              <p className="text-xs sm:text-sm text-[#5B7480] mt-2 mb-6">
                Join thousands of smiling patients who discovered anxiety-free dentistry.
              </p>
              <Link
                href="/book"
                className="btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B3B4A] text-white font-bold text-sm shadow-md"
              >
                <CalendarIcon className="w-4 h-4 text-[#F2A65A]" />
                <span>Book Your Appointment</span>
              </Link>
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
