import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, getSiteUrl, buildWhatsAppLink } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  CalendarIcon,
  WhatsAppIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

interface TreatmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.treatments.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = siteConfig.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: `${treatment.title} in ${siteConfig.brand.city} | ${siteConfig.brand.name}`,
    description: `${treatment.shortDesc} Painless, gentle treatment by senior dental specialists at ${siteConfig.brand.name}.`,
    alternates: {
      canonical: `${getSiteUrl()}/treatments/${treatment.slug}`,
    },
    openGraph: {
      title: `${treatment.title} | ${siteConfig.brand.name}`,
      description: treatment.shortDesc,
      images: [{ url: `${getSiteUrl()}${treatment.image}` }],
    },
  };
}

export default async function IndividualTreatmentPage({ params }: TreatmentPageProps) {
  const { slug } = await params;
  const treatment = siteConfig.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  const otherTreatments = siteConfig.treatments
    .filter((t) => t.slug !== slug)
    .slice(0, 3);

  const treatmentJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.title,
    description: treatment.shortDesc,
    procedureType: "NonSurgicalProcedure",
    bodyLocation: "Mouth",
    howPerformed: treatment.whatItIs,
    offers: {
      "@type": "Offer",
      price: treatment.costRange.starting.replace(/\D/g, ""),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(treatmentJsonLd) }}
      />

      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* ========================================================
            1. HERO SECTION
           ======================================================== */}
        <section className="bg-[#0B3B4A] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/treatments" className="hover:text-white transition-colors">
                    Treatments
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[#26B5AC] font-semibold">{treatment.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Heading & CTAs */}
              <div className="lg:col-span-7">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-4">
                  {treatment.badge}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
                  {treatment.title}
                </h1>
                <p className="text-base sm:text-lg text-[#F2A65A] font-semibold mt-2">
                  {treatment.tagline}
                </p>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-xl text-balance">
                  {treatment.shortDesc}
                </p>

                {/* Quick Info Badges */}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-white flex items-center gap-2">
                    <ClockIcon className="w-3.5 h-3.5 text-[#26B5AC]" />
                    <span>Duration: {treatment.duration}</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-white flex items-center gap-2">
                    <span>Visits: {treatment.sessions}</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-[#E9F7F5] text-[#0B3B4A] font-bold">
                    From {treatment.startingPrice}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link
                    href={`/book?treatment=${encodeURIComponent(treatment.title)}`}
                    className="btn-idle-shine btn-press h-12 px-7 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0B3B4A]/50"
                  >
                    <CalendarIcon className="w-4 h-4 text-[#07252F]" />
                    <span>Book {treatment.title} Consultation</span>
                  </Link>

                  <a
                    href={buildWhatsAppLink(
                      `Hello ${siteConfig.brand.name}, I would like to inquire about ${treatment.title}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press h-12 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#26B5AC]" />
                    <span>Ask Questions on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Treatment Photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3B4A]/50 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. WHAT IT IS & WHO IT'S FOR
           ======================================================== */}
        <section className="py-16 sm:py-20 border-b border-gray-100">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* What It Is (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#26B5AC]">
                  CLINICAL OVERVIEW
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3B4A]">
                  What is {treatment.title}?
                </h2>
                <p className="text-sm sm:text-base text-[#5B7480] leading-relaxed">
                  {treatment.whatItIs}
                </p>
                <div className="p-5 rounded-2xl bg-[#E9F7F5] border border-[#26B5AC]/20 flex items-start gap-3 mt-4">
                  <ShieldCheckIcon className="w-5 h-5 text-[#26B5AC] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#0B3B4A] leading-relaxed">
                    <strong>Painless Protocol:</strong> Performed under gentle computer-assisted numbing with low-dose digital diagnostics and Class-B autoclave sterilisation.
                  </p>
                </div>
              </div>

              {/* Who It's For (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <h3 className="font-display text-lg font-bold text-[#0B3B4A] mb-4">
                  Who is this treatment for?
                </h3>
                <ul className="space-y-3">
                  {treatment.whoItsFor.map((candidacy, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#12303A]">
                      <CheckCircleIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
                      <span>{candidacy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. STEP-BY-STEP PROCESS
           ======================================================== */}
        <section className="py-16 sm:py-20 bg-[#E9F7F5]/40 border-b border-gray-100">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#26B5AC]">
                STEP-BY-STEP PROCEDURE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3B4A] mt-1">
                How We Perform {treatment.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#5B7480] mt-2">
                A structured, predictable approach designed for maximum patient comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {treatment.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0B3B4A] text-[#F2A65A] font-display font-bold text-lg flex items-center justify-center shrink-0 mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0B3B4A] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#5B7480] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            4. AFTERCARE & COST RANGE
           ======================================================== */}
        <section className="py-16 sm:py-20 border-b border-gray-100">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Aftercare (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B4A] mb-4">
                  Post-Treatment Care & Maintenance
                </h3>
                <ul className="space-y-3">
                  {treatment.aftercare.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#5B7480]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#26B5AC] shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Included, Cost Range & EMI (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0B3B4A] text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#26B5AC]">
                    WHAT'S INCLUDED & PRICING
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E9F7F5] text-[#0B3B4A] font-bold">
                    From {treatment.startingPrice}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Transparent Package & Care Plan
                </h3>

                {/* Duration & Visits */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs text-white">
                  <div>
                    <span className="text-white/60 block text-[11px]">Appointment Duration</span>
                    <strong className="text-[#F2A65A] font-semibold">{treatment.duration}</strong>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[11px]">Typical Visits</span>
                    <strong className="text-white font-semibold">{treatment.sessions}</strong>
                  </div>
                </div>

                {/* What's Included Checklist */}
                <div>
                  <h4 className="text-xs font-bold text-[#26B5AC] uppercase tracking-wider mb-2.5">
                    What's Included in your package:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/90">
                    <li className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
                      <span>Comprehensive 3D intraoral scan & smile design simulation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
                      <span>Treatment delivered exclusively by Senior MDS Specialists</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
                      <span>Computerized painless anesthesia & soothing comfort protocol</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
                      <span>Individually sealed Class-B sterilised kits & premium materials</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
                      <span>Post-treatment clinical follow-up & maintenance guarantee</span>
                    </li>
                  </ul>
                </div>

                {/* EMI & Price Note */}
                <div className="pt-2 border-t border-white/15 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/80">Average clinical cost:</span>
                    <span className="font-bold text-white">{treatment.costRange.average}</span>
                  </div>
                  {siteConfig.sections.showEmi && treatment.emiMonthly && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F2A65A] font-semibold">0% Interest EMI from:</span>
                      <span className="font-bold text-[#F2A65A]">{treatment.emiMonthly}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-white/60 pt-1">{treatment.costRange.note}</p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/book?treatment=${encodeURIComponent(treatment.title)}`}
                    className="btn-press btn-idle-shine w-full py-3.5 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-[#0B3B4A]/50"
                  >
                    <span>Request Exact Quote & Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. FREQUENTLY ASKED QUESTIONS
           ======================================================== */}
        {treatment.faqs.length > 0 && (
          <section className="py-16 sm:py-20 bg-[#FAFCFC] border-b border-gray-100">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#26B5AC]">
                  COMMON QUESTIONS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3B4A] mt-1">
                  Questions About {treatment.title}
                </h2>
              </div>

              <div className="space-y-4">
                {treatment.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm"
                  >
                    <h3 className="font-display text-base font-bold text-[#0B3B4A] mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B7480] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            6. RELATED TREATMENTS ROW
           ======================================================== */}
        <section className="py-16 sm:py-20 bg-[#E9F7F5]/30">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B3B4A] mb-8 text-center sm:text-left">
              Other Dental Treatments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherTreatments.map((ot) => (
                <Link
                  key={ot.id}
                  href={`/treatments/${ot.slug}`}
                  className="p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-[#26B5AC]/40 transition-all card-press flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-base font-bold text-[#0B3B4A]">
                      {ot.title}
                    </h3>
                    <p className="text-xs text-[#5B7480] mt-1.5 line-clamp-2">
                      {ot.shortDesc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#26B5AC]">
                    <span>From {ot.startingPrice}</span>
                    <span>Learn more →</span>
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
