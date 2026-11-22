"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CtaBanner } from "@/components/CtaBanner";
import { ClockIcon, CheckCircleIcon, ShieldCheckIcon } from "@/components/Icons";

const anorectalFaqs = [
  {
    q: "Is an anorectal clinical examination painful?",
    a: "Our doctors conduct every examination with utmost gentleness, sensitivity, and clinical care. We explain each step beforehand to ensure you remain relaxed and completely comfortable.",
  },
  {
    q: "Can female patients consult a lady doctor?",
    a: "Yes. Dr. Kiran Anant Kore is available for female patients seeking discreet, respectful consultations for piles, fissures, and other anorectal conditions.",
  },
  {
    q: "What should I bring to my first consultation?",
    a: "Please bring any previous medical prescriptions, surgical history, or recent lab reports if available. A detailed clinical history helps in planning the most effective treatment.",
  },
  {
    q: "What hygiene and sanitisation standards are followed?",
    a: "We adhere strictly to medical hygiene protocols. All examination areas, surgical threads, and medical instruments are thoroughly sterilized and prepared according to standardized clinical safety norms.",
  },
];

export function PatientInfoContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EAF6F2] text-[#0F2321]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Header Hero */}
        <section className="bg-[#064B40] text-white py-14 lg:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-semibold text-[#F5A524] mb-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/60">Patient Info</span>
            </nav>

            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#F5A524] border border-white/15 mb-3">
              Helpful visitor guide
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Patient Care & Hospital Visitor Guide
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed text-balance">
              Everything you need to know before your visit to {siteConfig.brand.name} in Gangakhed—from arrival tips to complete privacy assurance.
            </p>
          </div>
        </section>

        {/* Hospital Guide Content */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <ClockIcon className="w-8 h-8 text-[#0B7A68] mb-4" />
                <h3 className="font-serif text-lg font-bold text-[#064B40]">
                  Arrival & Registration
                </h3>
                <p className="text-xs sm:text-sm text-[#3F5652] mt-2 leading-relaxed">
                  Please arrive 10-15 minutes prior to your appointment time. Our reception team will register your details in a calm, discreet environment.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <ShieldCheckIcon className="w-8 h-8 text-[#0B7A68] mb-4" />
                <h3 className="font-serif text-lg font-bold text-[#064B40]">
                  Confidential & Dignified Care
                </h3>
                <p className="text-xs sm:text-sm text-[#3F5652] mt-2 leading-relaxed">
                  We understand the sensitive nature of anorectal conditions. Consultations take place behind closed doors with absolute patient confidentiality.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                <CheckCircleIcon className="w-8 h-8 text-[#0B7A68] mb-4" />
                <h3 className="font-serif text-lg font-bold text-[#064B40]">
                  Pre-Consultation Advice
                </h3>
                <p className="text-xs sm:text-sm text-[#3F5652] mt-2 leading-relaxed">
                  No special fasting is required for general consultations. Wear comfortable loose clothing and drink sufficient water before traveling.
                </p>
              </div>
            </div>

            {/* Patient FAQs */}
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-[#064B40] text-center mb-8">
                Frequently Asked Patient Questions
              </h2>
              <div className="space-y-3.5">
                {anorectalFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm"
                  >
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#064B40]">
                      {faq.q}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#3F5652] mt-2 leading-relaxed">
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
