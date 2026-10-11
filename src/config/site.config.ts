import { clinicConfig, ClinicConfig } from "../../config/clinic.config";
import { specialtyDentalConfig, SpecialtyConfig, Doctor, Treatment, SmileGalleryCase, ReviewItem, FAQItem, QuickPickerItem } from "../../config/specialty.dental.config";
import { themes, getTheme, ThemeColors } from "../../config/theme.config";

export { clinicConfig };
export { specialtyDentalConfig };
export { themes, getTheme };
export type { ClinicConfig, SpecialtyConfig, Doctor, Treatment, SmileGalleryCase, ReviewItem, FAQItem, QuickPickerItem, ThemeColors };

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://smilora-dental-studio.vercel.app";
}

/**
 * Builds an official WhatsApp link using the clinic's configured WhatsApp number.
 */
export function buildWhatsAppLink(message: string): string {
  const number = clinicConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Active theme colors
const activeTheme = getTheme(clinicConfig.theme);

/**
 * Dynamically generated rating strip from clinicConfig.stats
 */
export const ratingStrip = [
  {
    value: clinicConfig.stats.rating.value,
    display: clinicConfig.stats.rating.display,
    suffix: clinicConfig.stats.rating.suffix || " ★",
    label: clinicConfig.stats.rating.label,
    subtext: clinicConfig.stats.rating.subtext || `${clinicConfig.stats.reviewCount}+ verified reviews`,
    show: clinicConfig.stats.rating.show !== false,
  },
  {
    value: clinicConfig.stats.patientsServed.value,
    display: clinicConfig.stats.patientsServed.display,
    suffix: clinicConfig.stats.patientsServed.suffix || "",
    label: clinicConfig.stats.patientsServed.label,
    subtext: clinicConfig.stats.patientsServed.subtext || "Painless & calm",
    show: clinicConfig.stats.patientsServed.show !== false,
  },
  {
    value: clinicConfig.stats.yearsExperience.value,
    display: clinicConfig.stats.yearsExperience.display,
    suffix: clinicConfig.stats.yearsExperience.suffix || "",
    label: clinicConfig.stats.yearsExperience.label,
    subtext: clinicConfig.stats.yearsExperience.subtext || "Specialist team",
    show: clinicConfig.stats.yearsExperience.show !== false,
  },
].filter((s) => s.show);

/**
 * Filtered navigation links respecting clinicConfig.sections flags
 */
const dynamicNavLinks = [
  { name: "Treatments", href: "/treatments" },
  ...(clinicConfig.sections.showGallery ? [{ name: "Smile Gallery", href: "/#gallery" }] : []),
  ...(clinicConfig.sections.showDoctors ? [{ name: "Our Dentists", href: "/#doctors" }] : []),
  ...(clinicConfig.sections.showReviews ? [{ name: "Reviews", href: "/#reviews" }] : []),
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

/**
 * Merged site configuration combining clinic layer and dental specialty layer
 */
export const siteConfig = {
  brand: {
    name: clinicConfig.name,
    legalName: clinicConfig.legalName || clinicConfig.name,
    shortName: clinicConfig.shortName,
    tagline: clinicConfig.tagline,
    subtitle: clinicConfig.subtitle || "DENTAL STUDIO",
    description: `Experience gentle, high-end private dental care in an ultra-modern studio in ${clinicConfig.city}. 3D digital smile scans, painless treatments, and reassuring specialists.`,
    fullDescription: `${clinicConfig.name} is a luxury boutique dental clinic in ${clinicConfig.city} providing painless cosmetic, restorative, and family dentistry. Equipped with 3D intraoral scanners, computerized anesthesia, and hospital-grade sterilisation, our specialists craft confident smiles without fear.`,
    callbackNotice: clinicConfig.callbackNotice || "We'll confirm your appointment on WhatsApp in under 15 minutes.",
    city: clinicConfig.city,
    state: clinicConfig.state,
    pincode: clinicConfig.pincode,
    address: clinicConfig.address,
    fullAddress: clinicConfig.fullAddress,
    landmark: clinicConfig.landmark,
    mapUrl: clinicConfig.mapsLink,
    embeddedMapUrl: clinicConfig.embeddedMapUrl || "",
    logoImage: clinicConfig.logoImage || "",
    stats: clinicConfig.stats,
    leadDoctor: clinicConfig.leadDoctor,
  },

  contact: {
    phone: clinicConfig.phone,
    phoneRaw: clinicConfig.phoneRaw,
    whatsapp: clinicConfig.whatsappNumber,
    tel: clinicConfig.phoneRaw,
    email: clinicConfig.email || "",
  },

  hours: {
    ...clinicConfig.hours,
    regular: clinicConfig.hours.weekday,
    sunday: clinicConfig.hours.weekend,
    emergency: "By appointment",
    display: `${clinicConfig.hours.weekday} · ${clinicConfig.hours.weekend}`,
  },

  leadDoctor: clinicConfig.leadDoctor,

  social: clinicConfig.socials || {},
  socials: clinicConfig.socials || {},

  theme: activeTheme,
  colors: {
    background: activeTheme.background,
    alternateBackground: activeTheme.softBackground,
    primary: activeTheme.primaryDark,
    primaryDark: activeTheme.deepestDark,
    primaryLight: activeTheme.primaryLight,
    accent: activeTheme.accent,
    accentHover: activeTheme.accentHover,
    cta: activeTheme.cta,
    ctaHover: activeTheme.ctaHover,
    text: activeTheme.text,
    textMuted: activeTheme.muted,
  },

  sections: clinicConfig.sections,
  sampleMode: clinicConfig.sampleMode,

  stats: clinicConfig.stats,
  ratingStrip,

  hero: {
    badgeRating: `${clinicConfig.stats.rating.display} Google Rating`,
    badgePatients: `${clinicConfig.stats.patientsServed.display} Happy Smiles`,
    headingPrefix: "Painless dentistry.",
    headingHighlight: "A smile",
    headingRest: "you'll love.",
    subtext: `Gentle private dental care in ${clinicConfig.city} designed for zero fear and total comfort. Advanced 3D digital scans, transparent pricing, and reassuring specialists.`,
    desktopSubtext: `High-end dental care in a serene, modern studio in ${clinicConfig.city}. Advanced 3D digital smile design, computer-assisted numbing, and lifelong confidence.`,
    ctaPrimary: "Book Appointment",
    ctaSecondary: "Call Us",
    ctaWhatsApp: "WhatsApp Us",
  },

  quickPicker: specialtyDentalConfig.quickPicker,
  whyChooseUs: specialtyDentalConfig.whyChooseUs,
  howItWorks: specialtyDentalConfig.howItWorks,

  galleryBadgeText: clinicConfig.sampleMode ? specialtyDentalConfig.galleryBadgeText : "",
  galleryDisclaimer: specialtyDentalConfig.galleryDisclaimer,
  smileGallery: specialtyDentalConfig.smileGallery,

  doctors: specialtyDentalConfig.doctors,
  reviews: specialtyDentalConfig.reviews,
  faqs: specialtyDentalConfig.faqs,
  treatments: specialtyDentalConfig.treatments,
  ctaBanner: specialtyDentalConfig.ctaBanner,

  pricing: {
    badge: "TRANSPARENT PRICING",
    title: "Honest, predictable dental fees",
    subtitle: "No surprise add-ons. 0% EMI financing available for all cosmetic and surgical treatments.",
    emiBanner: {
      title: "0% Interest EMI Available on Treatments Over ₹10,000",
      description: "Pay in 3, 6, or 9 easy monthly installments with major debit and credit cards or instant digital KYC.",
      buttonText: "Check EMI Eligibility",
    },
    items: specialtyDentalConfig.treatments.map((t) => ({
      id: t.id,
      title: t.title,
      badge: t.badge,
      startingPrice: t.startingPrice,
      emiMonthly: t.emiMonthly || "EMI available",
      description: t.shortDesc,
      features: t.whoItsFor.slice(0, 4),
      tagline: t.tagline,
      popular: t.badge === "Popular",
    })),
  },

  trustStrip: [
    { id: "3d", icon: "equipment", title: "3D Digital Scanning", shortDesc: "Zero-putty HD impression intraoral scanner." },
    { id: "sterilisation", icon: "shield", title: "Class-B Sterilisation", shortDesc: "European autoclave standard with sealed packs." },
    { id: "comfort", icon: "smile", title: "Painless Numbing", shortDesc: "Computerized slow-delivery local anesthesia." },
    { id: "emi", icon: "emi", title: "0% Easy EMI", shortDesc: "Flexible cashless installments on cards." },
  ],

  footer: {
    description: `Boutique private dental studio in ${clinicConfig.city} offering painless care, 3D scans, and bespoke smile transformations.`,
    quickLinks: dynamicNavLinks,
    treatmentLinks: specialtyDentalConfig.treatments.slice(0, 5).map((t) => ({
      name: t.title,
      href: `/treatments/${t.slug}`,
    })),
    legalLinks: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    copyright: `© 2026 ${clinicConfig.name}. All rights reserved.`,
  },
};

// Aliases and constants for backwards compatibility
export const hospitalConfig = siteConfig;
export const PHONE_DISPLAY = clinicConfig.phone;
export const PHONE_RAW = clinicConfig.phoneRaw;
export const WHATSAPP_NUMBER = clinicConfig.whatsappNumber;
export const CLINIC_EMAIL = clinicConfig.email || "";

export type PricingItem = { id: string; service: string; price: string; note?: string };
