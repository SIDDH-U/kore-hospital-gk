"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export type ConditionType =
  | "piles"
  | "fissure"
  | "fistula"
  | "ksharsutra"
  | "perianal-abscess"
  | "skin-tags"
  | "pilonidal-sinus"
  | "constipation";

interface ConditionDiagramProps {
  type: ConditionType | string;
  className?: string;
  compact?: boolean;
}

export function ConditionDiagram({
  type,
  className = "",
  compact = false,
}: ConditionDiagramProps) {
  const { isMarathi } = useLanguage();

  // Normalize slug to ConditionType
  const normalizedType = ((): ConditionType => {
    const t = type.toLowerCase();
    if (t.includes("piles") || t.includes("hemorrhoid")) return "piles";
    if (t.includes("fissure")) return "fissure";
    if (t.includes("fistula")) return "fistula";
    if (t.includes("kshar") || t.includes("sutra")) return "ksharsutra";
    if (t.includes("abscess")) return "perianal-abscess";
    if (t.includes("tag") || t.includes("polyp")) return "skin-tags";
    if (t.includes("pilonidal") || t.includes("sinus")) return "pilonidal-sinus";
    if (t.includes("constip")) return "constipation";
    return "piles";
  })();

  const titleEn = {
    piles: "Schematic Cross-Section of Hemorrhoids / Piles",
    fissure: "Schematic Diagram of Anal Fissure",
    fistula: "Schematic Diagram of Anal Fistula Track",
    ksharsutra: "Schematic Diagram of Ksharsutra Medicated Thread Therapy",
    "perianal-abscess": "Schematic Diagram of Perianal Abscess",
    "skin-tags": "Schematic Diagram of Anal Skin Tag and Polyp",
    "pilonidal-sinus": "Schematic Diagram of Pilonidal Sinus in Natal Cleft",
    constipation: "Schematic Diagram of Anorectal Digestive Transit",
  }[normalizedType];

  const titleMr = {
    piles: "मुळव्याध (Hemorrhoids) चे रेखाचित्र",
    fissure: "गुदभागातील चीर (Anal Fissure) चे रेखाचित्र",
    fistula: "भगंदर (Anal Fistula) चे रेखाचित्र",
    ksharsutra: "क्षारसूत्र चिकित्सेचे रेखाचित्र",
    "perianal-abscess": "गुदभागातील गळू (Perianal Abscess) चे रेखाचित्र",
    "skin-tags": "स्किन टॅग व पॉलिपचे रेखाचित्र",
    "pilonidal-sinus": "पायलोनिडल सायनसचे रेखाचित्र",
    constipation: "बद्धकोष्ठता व पचनसंस्थेचे रेखाचित्र",
  }[normalizedType];

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className="w-full relative rounded-2xl bg-[#EAF6F2] border border-[#D5E6E0] overflow-hidden p-2 sm:p-4 shadow-xs">
        <svg
          viewBox="0 0 460 300"
          className="w-full h-auto max-h-[300px] select-none"
          role="img"
          aria-label={isMarathi ? titleMr : titleEn}
        >
          <title>{isMarathi ? titleMr : titleEn}</title>

          {/* Background Gradient & Card Base */}
          <rect width="460" height="300" rx="14" fill="#F4FAF8" />

          {/* Common Cross-Section Anatomy for anorectal conditions */}
          {normalizedType !== "pilonidal-sinus" && (
            <g id="base-anatomy">
              {/* Outer Tissue / Perianal Space */}
              <path
                d="M 60 40 Q 90 120 100 240 L 360 240 Q 370 120 400 40 Z"
                fill="#FBEAE7"
                stroke="#064B40"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Rectal Cavity & Anal Canal Lumen */}
              <path
                d="M 170 40 C 180 110 195 160 195 240 L 265 240 C 265 160 280 110 290 40 Z"
                fill="#FFFFFF"
                stroke="#064B40"
                strokeWidth="2"
              />

              {/* Internal Sphincter (Left & Right Muscle Bundles) */}
              <ellipse cx="180" cy="190" rx="14" ry="32" fill="#EAD4D0" stroke="#064B40" strokeWidth="1.5" />
              <ellipse cx="280" cy="190" rx="14" ry="32" fill="#EAD4D0" stroke="#064B40" strokeWidth="1.5" />

              {/* External Sphincter (Outer Muscle Bundles) */}
              <ellipse cx="152" cy="210" rx="12" ry="24" fill="#DDC0BA" stroke="#064B40" strokeWidth="1.5" />
              <ellipse cx="308" cy="210" rx="12" ry="24" fill="#DDC0BA" stroke="#064B40" strokeWidth="1.5" />

              {/* Dentate Line (Pectinate Line) - Dashed */}
              <path
                d="M 195 160 Q 215 165 230 160 Q 245 165 265 160"
                fill="none"
                stroke="#064B40"
                strokeWidth="1.75"
                strokeDasharray="3 3"
              />

              {/* Anatomical Baseline Labels (Subtle) */}
              <text x="230" y="26" textAnchor="middle" fill="#5A7370" fontSize="11" fontWeight="600">
                {isMarathi ? "मलाशय (Lower Rectum)" : "Lower Rectum"}
              </text>
              <text x="230" y="260" textAnchor="middle" fill="#5A7370" fontSize="11" fontWeight="600">
                {isMarathi ? "गुदद्वार (Anal Opening)" : "Anal Opening (Verge)"}
              </text>

              {/* Dentate Line Label */}
              <line x1="265" y1="160" x2="350" y2="150" stroke="#5A7370" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="265" cy="160" r="2.5" fill="#064B40" />
              <text x="355" y="153" fill="#0F2321" fontSize="10.5" fontWeight="600">
                {isMarathi ? "दंतुर रेषा (Dentate line)" : "Dentate line"}
              </text>

              {/* Sphincter Muscle Label */}
              <line x1="140" y1="210" x2="85" y2="210" stroke="#5A7370" strokeWidth="1" />
              <circle cx="140" cy="210" r="2.5" fill="#064B40" />
              <text x="80" y="213" textAnchor="end" fill="#0F2321" fontSize="10.5" fontWeight="600">
                {isMarathi ? "स्नायू (Sphincter muscle)" : "Sphincter muscle"}
              </text>
            </g>
          )}

          {/* ================= CONDITION OVERLAYS ================= */}

          {/* 1. PILES / HEMORRHOIDS */}
          {normalizedType === "piles" && (
            <g id="overlay-piles">
              {/* Internal Hemorrhoids (Above Dentate Line) */}
              <path
                d="M 195 125 Q 215 130 212 145 Q 200 155 195 145 Z"
                fill="#E5604D"
                stroke="#064B40"
                strokeWidth="2"
              />
              <path
                d="M 265 115 Q 248 120 250 135 Q 260 145 265 135 Z"
                fill="#E5604D"
                stroke="#064B40"
                strokeWidth="2"
              />

              {/* External Hemorrhoid (Below Dentate Line, Near Verge) */}
              <circle cx="268" cy="232" r="13" fill="#E5604D" stroke="#064B40" strokeWidth="2" />

              {/* Leader: Internal Piles */}
              <line x1="212" y1="140" x2="110" y2="120" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="212" cy="140" r="3" fill="#E5604D" />
              <rect x="8" y="105" width="102" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="59" y="122" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "अंतर्गत मुळव्याध" : "Internal piles"}
              </text>

              {/* Leader: External Piles */}
              <line x1="281" y1="232" x2="350" y2="232" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="281" cy="232" r="3" fill="#E5604D" />
              <rect x="350" y="218" width="102" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="401" y="235" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "बाह्य मुळव्याध" : "External piles"}
              </text>
            </g>
          )}

          {/* 2. ANAL FISSURE */}
          {normalizedType === "fissure" && (
            <g id="overlay-fissure">
              {/* Small linear tear in lining of lower canal */}
              <path
                d="M 230 215 L 230 242"
                stroke="#E5604D"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Irritation rays */}
              <line x1="225" y1="225" x2="218" y2="225" stroke="#E5604D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="235" y1="225" x2="242" y2="225" stroke="#E5604D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="225" y1="235" x2="217" y2="238" stroke="#E5604D" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="235" y1="235" x2="243" y2="238" stroke="#E5604D" strokeWidth="1.5" strokeLinecap="round" />

              {/* Leader: Fissure tear */}
              <line x1="230" y1="230" x2="330" y2="195" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="230" cy="230" r="3.5" fill="#E5604D" />
              <rect x="330" y="180" width="120" height="30" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="390" y="200" textAnchor="middle" fill="#064B40" fontSize="11.5" fontWeight="700">
                {isMarathi ? "गुदभागातील चीर (Fissure)" : "Anal fissure (tear)"}
              </text>
            </g>
          )}

          {/* 3. ANAL FISTULA */}
          {normalizedType === "fistula" && (
            <g id="overlay-fistula">
              {/* Tunnel from internal opening (dentate line) to external skin opening */}
              <path
                d="M 200 165 C 160 170 140 195 130 240"
                fill="none"
                stroke="#E5604D"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 200 165 C 160 170 140 195 130 240"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Internal Opening */}
              <circle cx="200" cy="165" r="4.5" fill="#E5604D" stroke="#064B40" strokeWidth="1.5" />

              {/* External Opening on Skin */}
              <circle cx="130" cy="240" r="5" fill="#E5604D" stroke="#064B40" strokeWidth="1.5" />

              {/* Leader: Internal opening */}
              <line x1="200" y1="165" x2="270" y2="110" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="200" cy="165" r="3" fill="#E5604D" />
              <rect x="270" y="95" width="130" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="335" y="112" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "अंतर्गत छिद्र (Internal)" : "Internal opening"}
              </text>

              {/* Leader: Fistula tunnel */}
              <line x1="155" y1="195" x2="60" y2="160" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="155" cy="195" r="3" fill="#E5604D" />
              <rect x="15" y="145" width="115" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="72" y="162" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "भगंदर मार्ग (Tunnel)" : "Fistula tract (tunnel)"}
              </text>

              {/* Leader: External opening */}
              <line x1="130" y1="240" x2="60" y2="250" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="130" cy="240" r="3" fill="#E5604D" />
              <rect x="8" y="238" width="115" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="65" y="255" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "त्वचेवरील बाह्य छिद्र" : "External opening"}
              </text>
            </g>
          )}

          {/* 4. KSHARSUTRA THERAPY */}
          {normalizedType === "ksharsutra" && (
            <g id="overlay-ksharsutra">
              {/* Fistula tract */}
              <path
                d="M 200 165 C 160 170 140 195 130 240"
                fill="none"
                stroke="#E5604D"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.3"
              />

              {/* Ksharsutra Medicated Thread (Amber Line) threaded through tract & tied outside */}
              <path
                d="M 230 150 Q 210 160 200 165 C 160 170 140 195 130 240 Q 125 265 145 265 Q 165 265 180 245 L 210 240 Q 225 210 230 150"
                fill="none"
                stroke="#F5A524"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Thread knot tied outside */}
              <circle cx="145" cy="265" r="5" fill="#F5A524" stroke="#064B40" strokeWidth="2" />

              {/* Leader: Medicated thread */}
              <line x1="150" y1="200" x2="60" y2="160" stroke="#F5A524" strokeWidth="1.5" />
              <circle cx="150" cy="200" r="3" fill="#F5A524" />
              <rect x="15" y="145" width="125" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="77" y="162" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "औषधी क्षारसूत्र धागा" : "Medicated Ksharsutra"}
              </text>

              {/* Leader: Tied ends outside */}
              <line x1="145" y1="265" x2="220" y2="280" stroke="#F5A524" strokeWidth="1.5" />
              <rect x="220" y="268" width="130" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="285" y="285" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "बाहेर बांधलेला धागा" : "Thread tied outside"}
              </text>
            </g>
          )}

          {/* 5. PERIANAL ABSCESS */}
          {normalizedType === "perianal-abscess" && (
            <g id="overlay-abscess">
              {/* Pus cavity beside canal near skin */}
              <ellipse cx="140" cy="225" rx="22" ry="18" fill="#E5604D" stroke="#064B40" strokeWidth="2" />
              <circle cx="136" cy="222" r="7" fill="#FCE8E6" opacity="0.8" />
              <circle cx="146" cy="227" r="5" fill="#FCE8E6" opacity="0.8" />

              {/* Swelling / redness ring */}
              <ellipse cx="140" cy="225" rx="30" ry="24" fill="none" stroke="#E5604D" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Leader */}
              <line x1="140" y1="225" x2="60" y2="175" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="140" cy="225" r="3" fill="#E5604D" />
              <rect x="15" y="160" width="120" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="75" y="177" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "गुदभागातील गळू (Pus)" : "Perianal abscess (pus)"}
              </text>
            </g>
          )}

          {/* 6. SKIN TAGS & POLYPS */}
          {normalizedType === "skin-tags" && (
            <g id="overlay-tags">
              {/* Small Sentinel Skin Tag at Anal Verge */}
              <path
                d="M 195 240 C 185 245 175 255 180 262 C 185 268 195 260 197 245 Z"
                fill="#E5604D"
                stroke="#064B40"
                strokeWidth="2"
              />

              {/* Small Mucosal Polyp Inside Canal */}
              <path
                d="M 265 140 Q 250 143 245 150 Q 240 156 248 162 Q 258 160 265 148 Z"
                fill="#E5604D"
                stroke="#064B40"
                strokeWidth="2"
              />

              {/* Leader: Polyp */}
              <line x1="248" y1="150" x2="330" y2="120" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="248" cy="150" r="3" fill="#E5604D" />
              <rect x="330" y="105" width="115" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="387" y="122" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "गुदभागातील पॉलिप" : "Internal mucosal polyp"}
              </text>

              {/* Leader: Skin Tag */}
              <line x1="180" y1="262" x2="80" y2="265" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="180" cy="262" r="3" fill="#E5604D" />
              <rect x="15" y="252" width="115" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="72" y="269" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "बाह्य स्किन टॅग" : "External skin tag"}
              </text>
            </g>
          )}

          {/* 7. PILONIDAL SINUS (Tailbone schematic) */}
          {normalizedType === "pilonidal-sinus" && (
            <g id="overlay-pilonidal">
              {/* Sacrum & Coccyx (Tailbone) Outline */}
              <path
                d="M 120 40 Q 150 120 180 200 L 210 220"
                fill="none"
                stroke="#5A7370"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Skin Surface & Natal Cleft */}
              <path
                d="M 320 40 Q 300 120 280 180 Q 260 220 280 270"
                fill="none"
                stroke="#064B40"
                strokeWidth="2"
              />

              {/* Subcutaneous tissue */}
              <path
                d="M 180 40 L 320 40 Q 300 120 280 180 Q 260 220 280 270 L 210 270 Q 150 120 180 40 Z"
                fill="#FBEAE7"
                stroke="none"
              />

              {/* Sinus pit & tract in natal cleft */}
              <ellipse cx="270" cy="170" rx="12" ry="16" fill="#E5604D" stroke="#064B40" strokeWidth="2" />
              <path
                d="M 280 160 Q 260 170 240 180"
                fill="none"
                stroke="#064B40"
                strokeWidth="2.5"
                strokeDasharray="3 2"
              />
              <circle cx="282" cy="160" r="3" fill="#064B40" />

              {/* Leader: Tailbone */}
              <line x1="160" y1="140" x2="70" y2="120" stroke="#5A7370" strokeWidth="1.5" />
              <rect x="15" y="105" width="115" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="72" y="122" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "माकडहाड (Tailbone)" : "Tailbone (Coccyx)"}
              </text>

              {/* Leader: Sinus cavity */}
              <line x1="270" y1="170" x2="360" y2="170" stroke="#E5604D" strokeWidth="1.5" />
              <circle cx="270" cy="170" r="3" fill="#E5604D" />
              <rect x="340" y="157" width="110" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="395" y="174" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "सायनस ट्रॅक्ट" : "Sinus tract & pit"}
              </text>
            </g>
          )}

          {/* 8. CONSTIPATION & ANORECTAL PAIN */}
          {normalizedType === "constipation" && (
            <g id="overlay-constipation">
              {/* Hard Stool Scybala in Lower Rectum */}
              <ellipse cx="230" cy="90" rx="18" ry="12" fill="#C49B71" stroke="#064B40" strokeWidth="2" />
              <ellipse cx="225" cy="120" rx="16" ry="14" fill="#B38657" stroke="#064B40" strokeWidth="2" />
              <ellipse cx="234" cy="150" rx="17" ry="13" fill="#9C6F42" stroke="#064B40" strokeWidth="2" />

              {/* Downward straining pressure arrows */}
              <path
                d="M 230 175 L 230 205 M 224 198 L 230 205 L 236 198"
                fill="none"
                stroke="#E5604D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Leader: Hard stool */}
              <line x1="230" y1="120" x2="330" y2="100" stroke="#5A7370" strokeWidth="1.5" />
              <circle cx="230" cy="120" r="3" fill="#B38657" />
              <rect x="330" y="87" width="115" height="26" rx="6" fill="#FFFFFF" stroke="#D5E6E0" />
              <text x="387" y="104" textAnchor="middle" fill="#064B40" fontSize="11" fontWeight="700">
                {isMarathi ? "कठीण मल (Hard stool)" : "Hard, dry stool"}
              </text>

              {/* Healthy Habit Icons Box at Bottom Left */}
              <g transform="translate(18, 222)">
                <rect width="130" height="42" rx="8" fill="#FFFFFF" stroke="#D5E6E0" />
                <text x="65" y="16" textAnchor="middle" fill="#064B40" fontSize="10" fontWeight="700">
                  {isMarathi ? "नियमित उपाय" : "Healthy Habits"}
                </text>
                <text x="65" y="32" textAnchor="middle" fill="#5A7370" fontSize="9.5">
                  {isMarathi ? "💧 पाणी · 🥗 फायबर · 🚶 चालणे" : "💧 Water · 🥗 Fibre · 🚶 Walk"}
                </text>
              </g>
            </g>
          )}
        </svg>

        {/* Grades of Piles Strip (Only for Piles) */}
        {normalizedType === "piles" && !compact && (
          <div className="mt-3 pt-3 border-t border-[#D5E6E0] bg-white rounded-xl p-3">
            <div className="text-[11px] font-bold text-[#064B40] uppercase tracking-wider mb-2 text-center">
              {isMarathi ? "मुळव्याधीचे ४ टप्पे (Grades of Piles)" : "Grades of Internal Piles (1 – 4)"}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
              <div className="p-2 rounded-lg bg-[#EAF6F2] border border-[#D5E6E0]">
                <div className="text-xs font-bold text-[#064B40]">Grade 1</div>
                <div className="text-[11px] text-[#3F5652] leading-tight mt-0.5">
                  {isMarathi ? "आत सूज, शौचावेळी रक्त येऊ शकते." : "Internal swelling, may bleed."}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#EAF6F2] border border-[#D5E6E0]">
                <div className="text-xs font-bold text-[#064B40]">Grade 2</div>
                <div className="text-[11px] text-[#3F5652] leading-tight mt-0.5">
                  {isMarathi ? "शौचावेळी बाहेर येते, आपोआप आत जाते." : "Prolapses, reduces on its own."}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#EAF6F2] border border-[#D5E6E0]">
                <div className="text-xs font-bold text-[#064B40]">Grade 3</div>
                <div className="text-[11px] text-[#3F5652] leading-tight mt-0.5">
                  {isMarathi ? "बाहेर येते, हाताने आत ढकलावे लागते." : "Needs to be pushed back."}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#EAF6F2] border border-[#D5E6E0]">
                <div className="text-xs font-bold text-[#064B40]">Grade 4</div>
                <div className="text-[11px] text-[#3F5652] leading-tight mt-0.5">
                  {isMarathi ? "कायम बाहेर राहते, आत जात नाही." : "Stays outside, irreducible."}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schematic Caption Required by Section 5 */}
      <p className="text-[11px] text-[#5A7370] mt-1.5 text-center italic">
        {isMarathi ? "साधे रेखाचित्र, मोजमापासाठी नाही." : "Simplified illustration, not to scale."}
      </p>
    </div>
  );
}
