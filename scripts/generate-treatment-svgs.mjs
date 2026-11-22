import fs from "fs";
import path from "path";

const targetDir = "public/images/treatments";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const svgs = [
  {
    file: "piles-treatment.svg",
    title: "Piles / Hemorrhoids Care",
    subtitle: "Internal & External Care · Ksharsutra Assessment",
    icon: `
      <!-- Medical Shield with Healing Leaf -->
      <path d="M200 130 C200 130, 260 150, 260 210 C260 280, 200 320, 200 320 C200 320, 140 280, 140 210 C140 150, 200 130, 200 130 Z" fill="#0F6B5C" opacity="0.12" stroke="#0F6B5C" stroke-width="4"/>
      <path d="M200 160 C200 160, 235 180, 235 220 C235 260, 200 290, 200 290 C200 290, 165 260, 165 220 C165 180, 200 160, 200 160 Z" fill="#E8A33D" opacity="0.25"/>
      <circle cx="200" cy="225" r="24" fill="#0F6B5C"/>
      <path d="M200 210 V240 M185 225 H215" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    `
  },
  {
    file: "anal-fissure.svg",
    title: "Anal Fissure Management",
    subtitle: "Gentle Sphincter Relief & Rapid Tissue Healing",
    icon: `
      <!-- Soothing Care Lotus / Gentle Droplet -->
      <circle cx="200" cy="225" r="75" fill="#0F6B5C" opacity="0.1" stroke="#0F6B5C" stroke-width="3" stroke-dasharray="8 6"/>
      <path d="M200 155 C200 155 245 205 245 240 C245 265 225 285 200 285 C175 285 155 265 155 240 C155 205 200 155 200 155 Z" fill="#0F6B5C" opacity="0.15" stroke="#0F6B5C" stroke-width="4"/>
      <circle cx="200" cy="245" r="22" fill="#E8A33D"/>
      <path d="M192 245 L198 251 L210 238" stroke="#0A4A40" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  {
    file: "anal-fistula.svg",
    title: "Anal Fistula Care",
    subtitle: "Ksharsutra Specialist Tract Healing",
    icon: `
      <!-- Interlinked Healing Pathways -->
      <circle cx="175" cy="225" r="45" fill="none" stroke="#0F6B5C" stroke-width="5" stroke-linecap="round"/>
      <circle cx="225" cy="225" r="45" fill="none" stroke="#E8A33D" stroke-width="5" stroke-linecap="round"/>
      <circle cx="200" cy="225" r="18" fill="#0F6B5C"/>
      <path d="M195 225 L205 225" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    `
  },
  {
    file: "ksharsutra-therapy.svg",
    title: "Ksharsutra Therapy",
    subtitle: "Ayurvedic Medicated Thread Procedure",
    icon: `
      <!-- Traditional Medicated Thread Spindle / Caduceus Blend -->
      <circle cx="200" cy="225" r="72" fill="#0A4A40" opacity="0.08"/>
      <path d="M165 180 C190 200, 210 250, 235 270" stroke="#E8A33D" stroke-width="6" stroke-linecap="round"/>
      <path d="M235 180 C210 200, 190 250, 165 270" stroke="#0F6B5C" stroke-width="6" stroke-linecap="round"/>
      <circle cx="200" cy="225" r="16" fill="#E8A33D"/>
      <circle cx="200" cy="180" r="10" fill="#0F6B5C"/>
      <circle cx="200" cy="270" r="10" fill="#0F6B5C"/>
    `
  },
  {
    file: "perianal-abscess.svg",
    title: "Perianal Abscess Care",
    subtitle: "Timely Clinical Drainage & Antiseptic Care",
    icon: `
      <!-- Protective Shield with Antiseptic Cross -->
      <polygon points="200,145 255,175 255,250 200,295 145,250 145,175" fill="#0F6B5C" opacity="0.12" stroke="#0F6B5C" stroke-width="4"/>
      <circle cx="200" cy="225" r="30" fill="#FFFFFF" stroke="#E8A33D" stroke-width="4"/>
      <path d="M200 210 V240 M185 225 H215" stroke="#0F6B5C" stroke-width="4" stroke-linecap="round"/>
    `
  },
  {
    file: "pilonidal-sinus.svg",
    title: "Pilonidal Sinus",
    subtitle: "Tract Eradication & Recurrence Prevention",
    icon: `
      <!-- Precision Target with Healing Rays -->
      <circle cx="200" cy="225" r="68" fill="none" stroke="#0F6B5C" stroke-width="3" stroke-dasharray="6 6"/>
      <circle cx="200" cy="225" r="42" fill="#E8A33D" opacity="0.2"/>
      <circle cx="200" cy="225" r="20" fill="#0F6B5C"/>
      <circle cx="200" cy="225" r="8" fill="#FFFFFF"/>
    `
  },
  {
    file: "skin-tags.svg",
    title: "Anal Skin Tags & Polyps",
    subtitle: "Careful Differential Exam & Gentle Removal",
    icon: `
      <!-- Delicate Organic Leaves Motif -->
      <circle cx="200" cy="225" r="70" fill="#F2F8F6" stroke="#D6E5E1" stroke-width="4"/>
      <path d="M200 170 C220 195 235 225 210 255 C190 270 170 250 175 220 C180 190 200 170 200 170 Z" fill="#0F6B5C" opacity="0.25"/>
      <path d="M200 170 C180 195 165 225 190 255 C210 270 230 250 225 220 C220 190 200 170 200 170 Z" fill="#E8A33D" opacity="0.3"/>
      <circle cx="200" cy="225" r="14" fill="#0A4A40"/>
    `
  },
  {
    file: "constipation-care.svg",
    title: "Constipation & Pain Relief",
    subtitle: "Ayurvedic Digestive Balance & Stool Regulation",
    icon: `
      <!-- Gentle Harmony Waves and Botanical Bud -->
      <circle cx="200" cy="225" r="72" fill="#0F6B5C" opacity="0.08"/>
      <path d="M150 235 Q175 205 200 235 T250 235" fill="none" stroke="#0F6B5C" stroke-width="5" stroke-linecap="round"/>
      <path d="M155 255 Q175 230 200 255 T245 255" fill="none" stroke="#E8A33D" stroke-width="4" stroke-linecap="round"/>
      <circle cx="200" cy="190" r="16" fill="#0F6B5C"/>
      <path d="M200 180 V200 M190 190 H210" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    `
  }
];

for (const s of svgs) {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F2F8F6"/>
      <stop offset="100%" stop-color="#E1EFEA"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="45%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#F2F8F6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#bgGrad)"/>
  <circle cx="400" cy="225" r="260" fill="url(#glow)"/>

  <!-- Decorative Pattern Grid -->
  <g opacity="0.15" stroke="#0F6B5C" stroke-width="1">
    <line x1="80" y1="0" x2="80" y2="600" stroke-dasharray="4 8"/>
    <line x1="720" y1="0" x2="720" y2="600" stroke-dasharray="4 8"/>
    <line x1="0" y1="80" x2="800" y2="80" stroke-dasharray="4 8"/>
    <line x1="0" y1="520" x2="800" y2="520" stroke-dasharray="4 8"/>
  </g>

  <!-- Card Border -->
  <rect x="24" y="24" width="752" height="552" rx="32" stroke="#D6E5E1" stroke-width="2" fill="none"/>

  <!-- Center Artwork Scaled -->
  <g transform="translate(200, 0)">
    ${s.icon}
  </g>

  <!-- Top Badge -->
  <g transform="translate(400, 370)">
    <rect x="-140" y="0" width="280" height="36" rx="18" fill="#0A4A40"/>
    <text x="0" y="23" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="1">KORE HOSPITAL SPECIALTY</text>
  </g>

  <!-- Title -->
  <text x="400" y="455" text-anchor="middle" fill="#0A4A40" font-family="Georgia, serif" font-size="34" font-weight="700">${s.title}</text>

  <!-- Subtitle -->
  <text x="400" y="495" text-anchor="middle" fill="#5B6F70" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500">${s.subtitle}</text>

  <!-- Bottom Accent Line -->
  <rect x="360" y="525" width="80" height="4" rx="2" fill="#E8A33D"/>
</svg>`;

  fs.writeFileSync(path.join(targetDir, s.file), content, "utf8");
  console.log(`Saved ${s.file}`);
}
