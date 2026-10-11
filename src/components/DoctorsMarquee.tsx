"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { ArrowRightIcon } from "./Icons";

export function DoctorsMarquee() {
  const doctors = siteConfig.doctors;
  // Seamless continuous loop
  const marqueeDoctors = [...doctors, ...doctors, ...doctors];

  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="py-12 sm:py-16 lg:py-20 bg-[#E9F7F5] overflow-hidden border-y border-[#26B5AC]/15"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#0B3B4A] border border-[#26B5AC]/30 mb-2.5 shadow-xs">
          CLINICAL SPECIALISTS
        </span>
        <h2
          id="doctors-heading"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight text-balance"
        >
          Meet your{" "}
          <span className="font-serif italic text-[#26B5AC]">reassuring</span> dental specialists
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#5B7480] max-w-lg mx-auto text-balance">
          Every procedure is performed by an MDS specialist doctor dedicated to gentle, anxiety-free care.
        </p>
      </div>

      {/* Auto-scrolling Row with Edge Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden doctors-marquee-container py-2">
        {/* Left Fade Mask */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 md:w-32 bg-gradient-to-r from-[#E9F7F5] via-[#E9F7F5]/80 to-transparent z-10"
          aria-hidden="true"
        />
        {/* Right Fade Mask */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 md:w-32 bg-gradient-to-l from-[#E9F7F5] via-[#E9F7F5]/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Continuous Scrolling Track (Pauses on hover/touch) */}
        <div
          className="doctors-marquee-track flex gap-4 sm:gap-5 px-4"
          style={{ "--doctors-scroll-duration": "30s" } as React.CSSProperties}
        >
          {marqueeDoctors.map((doc, idx) => (
            <Link
              key={`${doc.id}-${idx}`}
              href={`/doctors/${doc.slug}`}
              className="doctors-marquee-card group block w-[190px] sm:w-[220px] shrink-0 p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md card-press transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC]"
            >
              {/* Doctor Photo (4:5 compact) */}
              <div className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 mb-2.5">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  sizes="(max-width: 640px) 190px, 220px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {siteConfig.sampleMode && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/90 text-[#5B7480] shadow-xs backdrop-blur-xs">
                    Sample
                  </span>
                )}
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0B3B4A]/85 text-white backdrop-blur-sm">
                  {doc.experience}
                </span>
              </div>

              {/* Compact Details: Photo, Name, Specialisation, Years only */}
              <div className="text-left">
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#0B3B4A] truncate group-hover:text-[#26B5AC] transition-colors">
                  {doc.name}
                </h3>
                <p className="text-[11px] font-semibold text-[#26B5AC] truncate mt-0.5">
                  {doc.speciality}
                </p>
                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-[#0B3B4A]">
                  <span>View Profile</span>
                  <span className="text-[#26B5AC] group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Button: View All Doctors */}
      <div className="mt-6 sm:mt-8 text-center">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B3B4A] hover:text-[#26B5AC] transition-colors py-2 px-5 rounded-full bg-white border border-[#26B5AC]/30 shadow-xs"
        >
          <span>Meet all {doctors.length} MDS specialists</span>
          <ArrowRightIcon className="w-3.5 h-3.5 text-[#26B5AC]" />
        </Link>
      </div>
    </section>
  );
}
