"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BookingSheet } from "@/components/BookingSheet";
import { ConditionDiagram } from "@/components/ConditionDiagram";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

interface TreatmentDetailClientProps {
  slug: string;
}

export function TreatmentDetailClient({ slug }: TreatmentDetailClientProps) {
  const { isMarathi } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const treatments = siteConfig.treatments;
  const currentIndex = treatments.findIndex((t) => t.slug === slug);
  const treatment = treatments[currentIndex] || treatments[0];

  const prevTreatment = currentIndex > 0 ? treatments[currentIndex - 1] : treatments[treatments.length - 1];
  const nextTreatment = currentIndex < treatments.length - 1 ? treatments[currentIndex + 1] : treatments[0];

  const title = isMarathi ? treatment.titleMr : treatment.title;
  const summary = isMarathi ? treatment.shortDescMr : treatment.shortDesc;
  const symptoms = isMarathi ? (treatment.symptomsMr || treatment.symptoms) : treatment.symptoms;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F2321] selection:bg-[#EAF6F2] selection:text-[#0B7A68]">
      <TopStrip />
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* 1. LIGHT HERO (Same light hero pattern as home page, but compact) */}
        <section className="bg-gradient-to-b from-[#EAF6F2] via-[#F4FAF8] to-white py-8 sm:py-12 lg:py-14 border-b border-[#D5E6E0]">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
              <ol className="flex items-center gap-1.5 text-xs text-[#5A7370] flex-wrap">
                <li>
                  <Link href="/" className="hover:text-[#064B40] transition-colors">
                    {isMarathi ? "मुख्यपृष्ठ" : "Home"}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/treatments" className="hover:text-[#064B40] transition-colors">
                    {isMarathi ? "उपचार" : "Treatments"}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[#064B40] font-bold">{title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column (Desktop 7 cols): Title, Summary, Primary CTA */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF6F2] text-[#064B40] border border-[#D5E6E0]">
                  {isMarathi ? (treatment.badgeMr || "शास्त्रोक्त उपचार") : (treatment.badge || "Clinical care")}
                </span>

                <h1
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064B40] tracking-tight leading-[1.15] text-balance"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {title}
                </h1>

                <p
                  className="text-sm sm:text-base text-[#3F5652] leading-relaxed max-w-xl text-balance"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {summary}
                </p>

                {/* Mobile: Diagram directly below title at ~220px height */}
                <div className="lg:hidden my-4">
                  <ConditionDiagram type={treatment.id} />
                </div>

                {/* One Primary "Book appointment" button (WhatsApp button removed here per prompt) */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setIsBookingOpen(true)}
                    icon={<Calendar className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
                  >
                    {isMarathi ? "अपॉइंटमेंट बुक करा" : "Book appointment"}
                  </Button>
                </div>
              </div>

              {/* Right Column (Desktop 5 cols): Diagram Card */}
              <div className="hidden lg:block lg:col-span-5">
                <ConditionDiagram type={treatment.id} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT IS IT? & CLINICAL NOTE (Mint Background) */}
        <section className="py-8 sm:py-12 bg-[#EAF6F2] border-b border-[#D5E6E0]">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4 text-left">
              <span className="text-xs font-bold text-[#0B7A68] uppercase tracking-wider block">
                {isMarathi ? "आजार समजून घ्या" : "Condition details"}
              </span>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-[#064B40] tracking-tight"
                lang={isMarathi ? "mr" : "en"}
              >
                {isMarathi ? `${title} म्हणजे काय?` : `What is ${treatment.title}?`}
              </h2>

              <p className="text-sm sm:text-base text-[#3F5652] leading-relaxed" lang={isMarathi ? "mr" : "en"}>
                {isMarathi ? treatment.oneLineDescMr : treatment.oneLineDesc}
              </p>

              <p className="text-sm sm:text-base text-[#3F5652] leading-relaxed" lang={isMarathi ? "mr" : "en"}>
                {isMarathi
                  ? "हा त्रास गुदभागातील रक्तवाहिन्या, नाजूक त्वचा किंवा ग्रंथी यांच्याशी संबंधित असतो. वेळीच तपासणी केल्यास सुरुवातीला आहारातील बदल व औषधोपचारांनी चांगला आराम मिळू शकतो."
                  : "Anorectal conditions affect the lower rectum and anal verge. When examined early, gentle dietary adjustments and conservative Ayurvedic medications often provide significant relief."}
              </p>

              {/* Medical Notice */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5E6E0] shadow-2xs flex items-start gap-3 mt-4">
                <ShieldCheck className="w-5 h-5 text-[#0B7A68] shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-xs sm:text-sm text-[#064B40] leading-relaxed">
                  <strong>{isMarathi ? "वैद्यकीय सूचना:" : "Medical note:"}</strong>{" "}
                  {isMarathi
                    ? "उपचार पद्धती रुग्णाच्या अचूक स्थितीवर व डॉक्टरांच्या प्रत्यक्ष तपासणीवर अवलंबून असते. कोणतीही स्व-औषधोपचार टाळा."
                    : `${treatment.clinicalNote} Definitive care depends on careful physical examination and staging by Dr. Anant Kore or Dr. Kiran Kore.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMMON SYMPTOMS (White Background, 2-Column Icon Checklist) */}
        <section className="py-8 sm:py-12 bg-white border-b border-[#D5E6E0]">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-2xl mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#0B7A68] uppercase tracking-wider block mb-1">
                {isMarathi ? "लक्षणे" : "Symptoms"}
              </span>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-[#064B40] tracking-tight"
                lang={isMarathi ? "mr" : "en"}
              >
                {isMarathi ? "सामान्य लक्षणे" : "Common symptoms"}
              </h2>
              <p className="text-xs sm:text-sm text-[#3F5652] mt-1.5 leading-relaxed">
                {isMarathi
                  ? "खालीलपैकी कोणतीही लक्षणे आढळल्यास वेळीच डॉक्टरांचा सल्ला घ्या."
                  : "Notice any of these indicators? Timely clinical advice prevents progression."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-3xl">
              {symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#F4FAF8] border border-[#D5E6E0] flex items-start gap-3 text-left shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0B7A68] shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-xs sm:text-sm text-[#0F2321] font-medium leading-snug">
                    {symptom}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HOW WE TREAT IT (Mint Background, Short List of Approaches) */}
        <section className="py-8 sm:py-12 bg-[#EAF6F2] border-b border-[#D5E6E0]">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-2xl mb-6 sm:mb-8">
              <span className="text-xs font-bold text-[#0B7A68] uppercase tracking-wider block mb-1">
                {isMarathi ? "उपचार पद्धती" : "Management approach"}
              </span>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-[#064B40] tracking-tight"
                lang={isMarathi ? "mr" : "en"}
              >
                {isMarathi ? "आम्ही उपचार कसे करतो?" : `How we manage ${treatment.title}`}
              </h2>
              <p className="text-xs sm:text-sm text-[#3F5652] mt-1.5 leading-relaxed">
                {isMarathi
                  ? "रुग्णाची स्थिती लक्षात घेऊन सुरुवातीला सौम्य उपचार आणि गरज भासल्यास क्षारसूत्र चिकित्सा."
                  : "Patient-centered care focusing on comfort, dignity, and natural healing principles."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
              {treatment.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-white border border-[#D5E6E0] shadow-xs flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#EAF6F2] text-[#064B40] font-bold text-sm flex items-center justify-center mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-[#064B40] mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#3F5652] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WHEN TO SEE A DOCTOR (White Background) */}
        <section className="py-8 sm:py-12 bg-white border-b border-[#D5E6E0]">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl rounded-2xl bg-[#FDF0D5]/50 border border-[#E8A33D]/30 p-5 sm:p-7 text-left space-y-3">
              <div className="flex items-center gap-2 text-[#B87108] font-bold text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" strokeWidth={2} />
                <span>{isMarathi ? "डॉक्टरांना कधी दाखवावे?" : "When should you see a doctor?"}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#3F5652] leading-relaxed">
                {isMarathi
                  ? "शौचावेळी रक्तस्त्राव होत असल्यास, गुदभागात सतत असह्य वेदना किंवा गाठ जाणवल्यास घरगुती उपचारात वेळ न घालवता तातडीने तज्ज्ञ डॉक्टरांकडून तपासणी करून घेणे आवश्यक आहे."
                  : "If you observe fresh bleeding during defecation, severe persistent pain, fever, or an irreducible lump, do not delay. A confidential clinical examination provides clarity and peace of mind."}
              </p>
              <div className="pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsBookingOpen(true)}
                >
                  {isMarathi ? "तपासणीसाठी वेळ घ्या" : "Schedule examination"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ ACCORDION */}
        {treatment.faqs && treatment.faqs.length > 0 && (
          <section className="py-8 sm:py-12 bg-[#EAF6F2] border-b border-[#D5E6E0]">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-xs font-bold text-[#0B7A68] uppercase tracking-wider block mb-1">
                  FAQ
                </span>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold text-[#064B40] tracking-tight"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {isMarathi ? "सतत विचारले जाणारे प्रश्न" : "Frequently asked questions"}
                </h2>
              </div>

              <div className="space-y-3">
                {treatment.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-white border border-[#D5E6E0] overflow-hidden shadow-2xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#064B40] hover:bg-[#F4FAF8] transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#5A7370] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#064B40]" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#3F5652] leading-relaxed border-t border-[#D5E6E0]/60">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 7. PREVIOUS / NEXT TREATMENT NAVIGATION */}
        <section className="py-8 bg-white border-b border-[#D5E6E0]">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link
                href={`/treatments/${prevTreatment.slug}`}
                className="inline-flex items-center gap-2 p-2 sm:px-4 sm:py-2.5 rounded-xl border border-[#D5E6E0] hover:bg-[#EAF6F2] text-xs sm:text-sm font-semibold text-[#064B40] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#0B7A68]" />
                <span className="hidden sm:inline">{prevTreatment.title}</span>
                <span className="sm:hidden">{isMarathi ? "मागील" : "Previous"}</span>
              </Link>

              <Link
                href="/treatments"
                className="text-xs sm:text-sm font-bold text-[#0B7A68] hover:underline"
              >
                {isMarathi ? "सर्व उपचार सूची" : "All treatments"}
              </Link>

              <Link
                href={`/treatments/${nextTreatment.slug}`}
                className="inline-flex items-center gap-2 p-2 sm:px-4 sm:py-2.5 rounded-xl border border-[#D5E6E0] hover:bg-[#EAF6F2] text-xs sm:text-sm font-semibold text-[#064B40] transition-colors"
              >
                <span className="hidden sm:inline">{nextTreatment.title}</span>
                <span className="sm:hidden">{isMarathi ? "पुढील" : "Next"}</span>
                <ArrowRight className="w-4 h-4 text-[#0B7A68]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar onOpenBooking={() => setIsBookingOpen(true)} />
      <BookingSheet isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
