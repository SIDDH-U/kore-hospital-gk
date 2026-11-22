"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ConditionDiagram } from "./ConditionDiagram";
import { ArrowRight } from "lucide-react";

export function UnderstandCondition() {
  const { isMarathi } = useLanguage();

  const conditions = [
    {
      type: "piles",
      slug: "piles-hemorrhoids",
      titleEn: "Piles (Hemorrhoids)",
      titleMr: "मुळव्याध",
      descEn: "Swollen blood vessels in the anal canal, which may bleed or prolapse.",
      descMr: "गुदभागातील रक्तवाहिन्यांची सूज; शौचावेळी रक्तस्त्राव किंवा कोंब बाहेर येणे.",
    },
    {
      type: "fissure",
      slug: "anal-fissure",
      titleEn: "Anal Fissure",
      titleMr: "फिशर (चीर)",
      descEn: "A small cut or tear in the delicate anal lining, causing sharp burning pain.",
      descMr: "गुदभागातील त्वचेला पडलेली बारीक चीर; तीव्र आग व वेदना होणे.",
    },
    {
      type: "fistula",
      slug: "anal-fistula",
      titleEn: "Anal Fistula",
      titleMr: "भगंदर (फिस्टुला)",
      descEn: "An infected tunnel connecting an internal gland to the outer skin.",
      descMr: "गुदभागाच्या आतील ग्रंथीपासून बाहेरील त्वचेपर्यंत तयार झालेला पूचा मार्ग.",
    },
    {
      type: "perianal-abscess",
      slug: "perianal-abscess",
      titleEn: "Perianal Abscess",
      titleMr: "गुदभागातील गळू",
      descEn: "A painful collection of pus near the anus requiring timely clinical attention.",
      descMr: "गुदद्वाराजवळ पू भरून आलेली वेदनादायक गाठ; वेळेवर तपासणी आवश्यक.",
    },
  ];

  return (
    <section
      id="understand-condition"
      aria-labelledby="understand-heading"
      className="py-10 sm:py-14 lg:py-16 bg-white text-[#0F2321] border-b border-[#D5E6E0]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-semibold text-[#0B7A68] block mb-1.5">
            {isMarathi ? "स्पष्टीकरणात्मक रेखाचित्रे" : "Condition guide"}
          </span>
          <h2
            id="understand-heading"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064B40] tracking-tight"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi ? "तुमचा आजार समजून घ्या" : "Understand your condition"}
          </h2>
          <p
            className="text-xs sm:text-sm text-[#3F5652] mt-2 leading-relaxed"
            lang={isMarathi ? "mr" : "en"}
          >
            {isMarathi
              ? "गुदभागाशी संबंधित सामान्य आजारांचे सोपे, स्पष्ट व अनालार्मिंग रेखाचित्र."
              : "Clear, non-alarming schematic diagrams explaining how common anorectal conditions develop."}
          </p>
        </div>

        {/* 4 Cards: Swipeable on mobile (scroll-snap + peek), 4-col grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {conditions.map((item) => (
            <div
              key={item.slug}
              className="min-w-[270px] sm:min-w-0 flex-1 snap-start rounded-2xl bg-[#F4FAF8] border border-[#D5E6E0] p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <ConditionDiagram type={item.type} compact className="mb-3" />
                <h3
                  className="font-bold text-base text-[#064B40] leading-snug mb-1"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {isMarathi ? item.titleMr : item.titleEn}
                </h3>
                <p
                  className="text-xs text-[#3F5652] leading-relaxed line-clamp-3"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {isMarathi ? item.descMr : item.descEn}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-[#D5E6E0]/60">
                <Link
                  href={`/treatments/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B7A68] hover:text-[#064B40] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68] rounded-md py-1"
                >
                  <span>{isMarathi ? "सविस्तर माहिती" : "Learn more"}</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
