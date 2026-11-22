import sharp from "sharp";

async function createHeroArt() {
  const desktopSvg = `
  <svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroTeal" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#0A4A40"/>
        <stop offset="60%" stop-color="#0F6B5C"/>
        <stop offset="100%" stop-color="#07332C"/>
      </linearGradient>
      <radialGradient id="sunGlow" cx="65%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#E8A33D" stop-opacity="0.35"/>
        <stop offset="50%" stop-color="#0F6B5C" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#0A4A40" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="lotusGlow" cx="72%" cy="45%" r="35%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#0A4A40" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="1600" height="900" fill="url(#heroTeal)"/>
    <circle cx="1040" cy="360" r="500" fill="url(#sunGlow)"/>
    <circle cx="1150" cy="400" r="350" fill="url(#lotusGlow)"/>

    <!-- Concentric Decorative Ayurvedic Harmony Rings -->
    <g transform="translate(1150, 420)" stroke="#E8A33D" stroke-opacity="0.25" fill="none">
      <circle r="360" stroke-width="1.5" stroke-dasharray="12 12"/>
      <circle r="300" stroke-width="2"/>
      <circle r="240" stroke-width="1.5" stroke-dasharray="8 8"/>
      <circle r="180" stroke-width="2"/>
      <circle r="120" stroke-width="1.5"/>
    </g>

    <!-- Stylized Healing Caduceus & Leaf Mandala Silhouette -->
    <g transform="translate(1150, 420)">
      <!-- Central Pillar -->
      <line x1="0" y1="-180" x2="0" y2="180" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round"/>
      
      <!-- Intertwining Golden Strands (Representing Ksharsutra & Healing) -->
      <path d="M-60 -120 C60 -60, -60 60, 60 120" stroke="#E8A33D" stroke-opacity="0.8" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M60 -120 C-60 -60, 60 60, -60 120" stroke="#E8A33D" stroke-opacity="0.8" stroke-width="6" fill="none" stroke-linecap="round"/>

      <!-- Healing Lotus Petals -->
      <path d="M0 -180 C-40 -140, -40 -90, 0 -80 C40 -90, 40 -140, 0 -180 Z" fill="#E8A33D" fill-opacity="0.4"/>
      <circle cx="0" cy="-195" r="14" fill="#E8A33D"/>
      <circle cx="0" cy="-195" r="7" fill="#FFFFFF"/>
    </g>

    <!-- Subtle Organic Texture Waves at Bottom -->
    <path d="M600 900 C800 760, 1100 820, 1600 680 L1600 900 Z" fill="#062822" fill-opacity="0.4"/>
    <path d="M750 900 C950 810, 1250 840, 1600 780 L1600 900 Z" fill="#E8A33D" fill-opacity="0.08"/>
  </svg>
  `;

  const mobileSvg = `
  <svg width="800" height="1000" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroTealMob" x1="0" y1="0" x2="800" y2="1000" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#0A4A40"/>
        <stop offset="60%" stop-color="#0F6B5C"/>
        <stop offset="100%" stop-color="#062822"/>
      </linearGradient>
      <radialGradient id="sunGlowMob" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#E8A33D" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="#0A4A40" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="800" height="1000" fill="url(#heroTealMob)"/>
    <circle cx="400" cy="420" r="380" fill="url(#sunGlowMob)"/>

    <!-- Concentric Decorative Harmony Rings -->
    <g transform="translate(400, 420)" stroke="#E8A33D" stroke-opacity="0.25" fill="none">
      <circle r="260" stroke-width="1.5" stroke-dasharray="10 10"/>
      <circle r="200" stroke-width="2"/>
      <circle r="140" stroke-width="1.5" stroke-dasharray="6 6"/>
      <circle r="80" stroke-width="1.5"/>
    </g>

    <!-- Stylized Healing Caduceus & Thread Emblem -->
    <g transform="translate(400, 420)">
      <line x1="0" y1="-140" x2="0" y2="140" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="4" stroke-linecap="round"/>
      <path d="M-45 -90 C45 -45, -45 45, 45 90" stroke="#E8A33D" stroke-opacity="0.8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M45 -90 C-45 -45, 45 45, -45 90" stroke="#E8A33D" stroke-opacity="0.8" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M0 -140 C-30 -110, -30 -70, 0 -60 C30 -70, 30 -110, 0 -140 Z" fill="#E8A33D" fill-opacity="0.4"/>
      <circle cx="0" cy="-150" r="10" fill="#E8A33D"/>
      <circle cx="0" cy="-150" r="5" fill="#FFFFFF"/>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(desktopSvg))
    .webp({ quality: 90 })
    .toFile("public/images/hero-desktop.webp");

  await sharp(Buffer.from(mobileSvg))
    .webp({ quality: 90 })
    .toFile("public/images/hero-mobile.webp");

  // Also replace any old clinic-interior.webp with exterior/calm medical artwork
  await sharp("public/images/clinic-exterior.jpg")
    .resize(1000, 750, { fit: "cover" })
    .webp({ quality: 85 })
    .toFile("public/images/clinic-interior.webp");

  console.log("Hero and interior webp assets created successfully!");
}

createHeroArt().catch(console.error);
