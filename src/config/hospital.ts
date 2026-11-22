import {
  siteConfig,
  Doctor,
  Treatment,
  PHONE_DISPLAY,
  PHONE_RAW,
  WHATSAPP_NUMBER,
  CLINIC_EMAIL,
  getSiteUrl,
  buildWhatsAppLink,
} from "./site.config";

export {
  siteConfig,
  PHONE_DISPLAY,
  PHONE_RAW,
  WHATSAPP_NUMBER,
  CLINIC_EMAIL,
  getSiteUrl,
  buildWhatsAppLink,
};

export type { Doctor };
export type Department = Treatment & {
  icon?: string;
  conditionsTreat?: string[];
  treatmentsFacilities?: string[];
  headDoctor?: string;
};
export type ServiceItem = Treatment;
export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  readTime: string;
  image: string;
};

export const CALLBACK_TEXT = siteConfig.brand.callbackNotice;

export function isProductionDomain(): boolean {
  return false;
}

// Map siteConfig into hospitalConfig structure for backwards compatibility
export const hospitalConfig = {
  name: siteConfig.brand.name,
  legalName: siteConfig.brand.legalName,
  tagline: siteConfig.brand.tagline,
  description: siteConfig.brand.description,
  fullDescription: siteConfig.brand.fullDescription,
  callbackText: siteConfig.brand.callbackNotice,
  city: siteConfig.brand.city,
  state: siteConfig.brand.state,
  pincode: siteConfig.brand.pincode,
  location: {
    address: siteConfig.brand.address,
    city: siteConfig.brand.city,
    state: siteConfig.brand.state,
    pincode: siteConfig.brand.pincode,
    fullAddress: siteConfig.brand.fullAddress,
    mapUrl: siteConfig.brand.mapUrl,
  },
  contact: {
    display: siteConfig.contact.phone,
    tel: siteConfig.contact.tel,
    whatsapp: siteConfig.contact.whatsapp,
    phone: siteConfig.contact.phone,
    phoneRaw: siteConfig.contact.phoneRaw,
    emergencyPhone: siteConfig.contact.phone,
    emergencyPhoneRaw: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
  },
  hours: {
    regular: siteConfig.hours.regular,
    emergency: siteConfig.hours.emergency,
    display: siteConfig.hours.display,
  },
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  hero: {
    badgeRating: "Kore Hospital",
    badgePatients: "Piles Centre",
    headingPrefix: siteConfig.hero.headingPrefix,
    headingRest: siteConfig.hero.headingHighlight,
    subtext: siteConfig.hero.subtext,
    desktopSubtext: siteConfig.hero.desktopSubtext,
    ctaPrimary: siteConfig.hero.ctaPrimary,
    ctaSecondary: siteConfig.hero.ctaSecondary,
  },
  approach: {
    badge: "CLINICAL EXCELLENCE",
    titleStart: "Ayurvedic & modern care that puts ",
    titleHighlight: "your comfort and dignity first",
    description: siteConfig.whyChooseUs.description,
    cards: [
      {
        id: "ksharsutra-care",
        title: "Ksharsutra care",
        description: "Standardized medicated thread therapy for safe resolution of fistula and piles.",
        theme: "white" as const,
        href: "/treatments",
      },
      {
        id: "female-doctor",
        title: "Lady Doctor Available",
        description: "Dr. Kiran Kore provides discreet, supportive consultation for women patients.",
        theme: "mint" as const,
        href: "/doctors",
      },
      {
        id: "privacy-care",
        title: "100% Confidential Care",
        description: "Dedicated private examination chambers ensuring complete dignity.",
        theme: "teal" as const,
        href: "/#privacy",
      },
    ],
  },
  about: {
    badge: "ABOUT KORE HOSPITAL",
    titleStart: "Dedicated proctology care with ",
    titleHighlight: "experience and compassion",
    paragraph: siteConfig.brand.fullDescription,
    buttonText: "Meet Our Specialists",
    yearsOfCare: "Experienced Doctors",
    ratingScore: "Gangakhed",
    ratingMax: "",
    ratingCount: "Dist. Parbhani",
    medicalDirector: {
      name: siteConfig.doctors[0].name,
      role: siteConfig.doctors[0].role,
      image: "",
    },
    specialties: ["Piles (Hemorrhoids)", "Anal Fissure", "Anal Fistula", "Ksharsutra Therapy"],
  },
  departments: siteConfig.treatments.map((t) => ({
    id: t.id,
    name: t.title,
    slug: t.slug,
    tagline: t.tagline,
    description: t.shortDesc,
    icon: t.id,
    conditionsTreat: t.whoItsFor,
    treatmentsFacilities: t.processSteps.map((s) => s.title),
    features: t.aftercare,
    headDoctor: siteConfig.doctors[0].name,
  })),
  services: siteConfig.treatments.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    shortDesc: t.shortDesc,
    fullDesc: t.whatItIs,
    features: t.whoItsFor,
    icon: t.id,
    image: t.image,
  })),
  doctors: siteConfig.doctors.map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    speciality: d.specialty,
    departmentId: "proctology",
    qualifications: d.degrees,
    experience: "Ano-rectal Specialist",
    shortBio: d.shortBio,
    opdTimings: d.timings,
    image: "",
    avatar: d.avatar,
  })),
  blogArticles: [
    {
      id: "ksharsutra-therapy-guide",
      slug: "understanding-ksharsutra-therapy",
      title: "Understanding Ksharsutra Therapy: A Time-Tested Approach to Anal Fistula",
      excerpt: "How the Ayurvedic medicated thread procedure works to heal fistula tracts with minimal sphincter trauma.",
      content: [
        "Ksharsutra therapy is an established Ayurvedic surgical method recognized for managing anal fistulas and piles. A specialized medicated linen thread coated with alkaline plant extracts gradually cuts and heals the tract from within.",
        "Because it promotes simultaneous debridement and tissue granulation, Ksharsutra therapy preserves anal sphincter continence and reduces recurrence when compared to wide surgical excision.",
      ],
      date: "Clinical Guide",
      author: siteConfig.doctors[0].name,
      readTime: "4 min read",
      image: "/images/treatments/ksharsutra-therapy.svg",
    },
    {
      id: "constipation-prevention-tips",
      slug: "dietary-fiber-and-preventing-piles",
      title: "Preventing Piles and Fissures: The Role of Dietary Fiber and Hydration",
      excerpt: "Practical daily dietary habits to maintain soft, regular bowel movements and protect anorectal health.",
      content: [
        "Chronic constipation and hard stools are the single most common initiating factor for both anal fissures and hemorrhoids.",
        "Consuming adequate dietary fiber from leafy vegetables, whole grains, and fresh fruits alongside drinking 2.5 to 3 liters of warm water daily prevents excessive straining and protects delicate anal canal tissues.",
      ],
      date: "Wellness Guide",
      author: siteConfig.doctors[1].name,
      readTime: "3 min read",
      image: "/images/treatments/constipation-care.svg",
    },
  ],
  ctaBanner: {
    title: siteConfig.ctaBanner.title,
    subtext: siteConfig.ctaBanner.subtitle,
    buttonText: siteConfig.ctaBanner.buttonText,
  },
  footer: {
    description: siteConfig.brand.description,
    quickLinksCol1: siteConfig.navLinks.slice(0, 3),
    quickLinksCol2: siteConfig.navLinks.slice(3),
    legalLinks: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
    ],
    copyright: `© 2025 ${siteConfig.brand.name}. All rights reserved.`,
  },
};
