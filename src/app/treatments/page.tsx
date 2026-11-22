"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ConditionDiagram } from "@/components/ConditionDiagram";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TreatmentsPage() {
  const { isMarathi } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F2321]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-[#EAF6F2] via-[#F4FAF8] to-white py-10 sm:py-14 border-b border-[#D5E6E0]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF6F2] text-[#064B40] border border-[#D5E6E0] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B7A68]" />
              <span>{isMarathi ? "सर्वसमावेशक मार्गदर्शक" : "Specialist proctology directory"}</span>
            </span>

            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064B40] tracking-tight text-balance"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi ? "मुळव्याध, फिशर व फिस्टुला उपचार सेवा" : "Specialist anorectal treatments"}
            </h1>

            <p
              className="mt-3 text-xs sm:text-sm text-[#3F5652] max-w-xl mx-auto leading-relaxed text-balance"
              lang={isMarathi ? "mr" : "en"}
            >
              {isMarathi
                ? "गंगाखेड येथे शास्त्रोक्त क्षारसूत्र चिकित्सा, मुळव्याध नियंत्रण, फिशर आणि बद्धकोष्ठतेवर सुरक्षित व खाजगी उपचार."
                : "Specialized Ayurvedic surgical and conservative proctology care in Gangakhed, Dist. Parbhani."}
            </p>

            <div className="mt-4 inline-block bg-[#EAF6F2] px-4 py-1.5 rounded-full text-xs text-[#064B40] border border-[#D5E6E0]">
              <span>
                {isMarathi
                  ? "टीप: उपचारांची अचूक दिशा प्रत्यक्ष क्लिनिकल तपासणीनंतर ठरते."
                  : "Notice: Individual treatment depends strictly on proper clinical examination by the doctor."}
              </span>
            </div>
          </div>
        </section>

        {/* Treatments Grid with Inline Schematic SVG Diagrams (Zero Broken Images) */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteConfig.treatments.map((t) => (
                <div
                  key={t.id}
                  className="group flex flex-col rounded-2xl bg-[#F4FAF8] border border-[#D5E6E0] overflow-hidden shadow-2xs hover:shadow-xs transition-all"
                >
                  {/* Schematic Diagram Thumbnail */}
                  <div className="p-3 bg-white border-b border-[#D5E6E0]/70">
                    <ConditionDiagram type={t.id} compact />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EAF6F2] text-[#064B40] border border-[#D5E6E0] inline-block mb-2">
                        {isMarathi ? t.badgeMr : t.badge}
                      </span>

                      <h2
                        className="font-bold text-base sm:text-lg text-[#064B40] group-hover:text-[#0B7A68] transition-colors leading-snug"
                        lang={isMarathi ? "mr" : "en"}
                      >
                        <Link href={`/treatments/${t.slug}`}>
                          {isMarathi ? t.titleMr : t.title}
                        </Link>
                      </h2>

                      <p
                        className="text-xs text-[#3F5652] mt-1.5 line-clamp-2 leading-relaxed"
                        lang={isMarathi ? "mr" : "en"}
                      >
                        {isMarathi ? (t.oneLineDescMr || t.shortDescMr) : (t.oneLineDesc || t.shortDesc)}
                      </p>

                      {/* Common Symptoms preview */}
                      <div className="mt-3 pt-2.5 border-t border-[#D5E6E0]/60">
                        <span className="text-[11px] font-bold text-[#064B40] block mb-1">
                          {isMarathi ? "प्रमुख लक्षणे:" : "Common symptoms:"}
                        </span>
                        <ul className="text-xs text-[#3F5652] space-y-1">
                          {(isMarathi ? (t.symptomsMr || t.symptoms) : t.symptoms).slice(0, 2).map((s, i) => (
                            <li key={i} className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0B7A68] shrink-0" />
                              <span className="truncate">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#D5E6E0]/60 flex items-center justify-between gap-2">
                      <Link
                        href={`/treatments/${t.slug}`}
                        className="text-xs font-bold text-[#0B7A68] hover:text-[#064B40] inline-flex items-center gap-1"
                      >
                        <span>{isMarathi ? "सविस्तर माहिती" : "Learn more"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Button
                        variant="primary"
                        size="sm"
                        href={`/book?treatment=${encodeURIComponent(t.title)}`}
                      >
                        {isMarathi ? "तपासणी" : "Consult now"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer notice */}
            <div className="mt-12 p-4 rounded-2xl bg-[#EAF6F2] border border-[#D5E6E0] text-xs text-[#3F5652] text-center max-w-2xl mx-auto leading-relaxed">
              <p className="font-bold text-[#064B40] mb-0.5">
                {isMarathi ? "वैद्यकीय पारदर्शकता सूचना" : "Clinical transparency notice"}
              </p>
              <p>
                {isMarathi
                  ? "येथील माहिती केवळ जनजागृतीसाठी आहे. कोणताही उपचार डॉक्टरांच्या प्रत्यक्ष तपासणी व सल्ल्यानंतरच निश्चित केला जातो."
                  : "All procedures are recommended only after in-person clinical assessment by Dr. Anant Kore or Dr. Kiran Kore."}
              </p>
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
