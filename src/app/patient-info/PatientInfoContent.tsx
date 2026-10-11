"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CtaBanner } from "@/components/CtaBanner";
import { CalendarIcon, ClockIcon, CheckCircleIcon, ShieldCheckIcon } from "@/components/Icons";

const dentalFaqs = [
  {
    q: "What should I bring to my first dental appointment?",
    a: "Just your smile and any previous dental records or X-rays if available. We provide digital 3D scans and computerized low-radiation X-rays right here at our studio.",
  },
  {
    q: "Do you offer zero-interest EMI financing on clear aligners and implants?",
    a: "Yes! We offer 0% interest monthly installment plans for up to 12 months with instant digital approval via credit/debit card or Bajaj Finserv.",
  },
  {
    q: "I have high dental anxiety. How do you help nervous patients?",
    a: "Zero judgment and zero rush. We use needle-free computerized local numbing, soothing ambient noise-canceling headphones, and gentle step-by-step explanations so you stay completely in control.",
  },
  {
    q: "What sterilisation protocols do you follow?",
    a: "We follow a strict 6-step Class-B autoclave sterilisation cycle. Handpieces and instruments are vacuum-sterilized and sealed in individual pouches opened exclusively in front of you.",
  },
];

export function PatientInfoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
              <span className="text-white/60">Patient Info</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-3">
              HELPFUL VISITOR GUIDE
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Patient Care & Studio Guide
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed text-balance">
              Everything you need to know before your visit to {siteConfig.brand.name}—from arrival tips to cashless 0% EMI financing.
            </p>
          </div>
        </section>

        {/* Studio Guide Content */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <ClockIcon className="w-8 h-8 text-[#26B5AC] mb-4" />
                <h3 className="font-display text-lg font-bold text-[#0B3B4A]">
                  Arrival & Registration
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7480] mt-2 leading-relaxed">
                  Please arrive 10 minutes prior to your scheduled consultation. Relax in our quiet studio lounge with herbal tea or water.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <ShieldCheckIcon className="w-8 h-8 text-[#26B5AC] mb-4" />
                <h3 className="font-display text-lg font-bold text-[#0B3B4A]">
                  Anxiety-Free Dentistry
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7480] mt-2 leading-relaxed">
                  Computerized numbing, calming music, and gentle communication ensure that fear never gets in the way of your oral health.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <CheckCircleIcon className="w-8 h-8 text-[#26B5AC] mb-4" />
                <h3 className="font-display text-lg font-bold text-[#0B3B4A]">
                  0% EMI & Insurances
                </h3>
                <p className="text-xs sm:text-sm text-[#5B7480] mt-2 leading-relaxed">
                  We support dental insurance reimbursement papers and 0% interest monthly installment plans up to 12 months.
                </p>
              </div>
            </div>

            {/* Patient FAQs */}
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-[#0B3B4A] text-center mb-8">
                Patient Questions Answered
              </h2>
              <div className="space-y-3.5">
                {dentalFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm"
                  >
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#0B3B4A]">
                      {faq.q}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5B7480] mt-2 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
