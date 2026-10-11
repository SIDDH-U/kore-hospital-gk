import {
  siteConfig,
  Doctor as DentalDoctor,
  Treatment as DentalTreatment,
  ReviewItem,
  PricingItem,
  FAQItem,
  SmileGalleryCase,
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

export type Doctor = DentalDoctor;
export type Department = DentalTreatment & {
  icon?: string;
  conditionsTreat?: string[];
  treatmentsFacilities?: string[];
  headDoctor?: string;
};
export type ServiceItem = DentalTreatment;
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
    facebook: "https://facebook.com/smiloradental",
    instagram: "https://instagram.com/smiloradental",
    linkedin: "https://linkedin.com/company/smiloradental",
    youtube: "",
  },
  hero: {
    badgeRating: "4.9",
    badgePatients: siteConfig.hero.badgePatients,
    headingPrefix: siteConfig.hero.headingPrefix,
    headingRest: siteConfig.hero.headingRest,
    subtext: siteConfig.hero.subtext,
    desktopSubtext: siteConfig.hero.desktopSubtext,
    ctaPrimary: siteConfig.hero.ctaPrimary,
    ctaSecondary: siteConfig.hero.ctaSecondary,
  },
  approach: {
    badge: "THE SMILORA STANDARD",
    titleStart: "Gentle dentistry that puts ",
    titleHighlight: "your comfort first",
    description: siteConfig.whyChooseUs.description,
    cards: [
      {
        id: "painless-tech",
        title: "Painless Techniques",
        description: "Computerized micro-anesthesia for an anxiety-free visit with zero fear.",
        theme: "white" as const,
        href: "/treatments",
      },
      {
        id: "digital-scans",
        title: "3D Digital Scans",
        description: "Zero impression goop. High-definition 3D smile mapping in seconds.",
        theme: "mint" as const,
        href: "/about#technology",
      },
      {
        id: "expert-specialists",
        title: "Senior MDS Specialists",
        description: "Dedicated orthodontists, implantologists, and endodontists under one roof.",
        theme: "teal" as const,
        href: "/doctors",
      },
    ],
  },
  about: {
    badge: "WHO WE ARE",
    titleStart: "Crafting confident smiles with ",
    titleHighlight: "gentle, modern care",
    paragraph: siteConfig.brand.fullDescription,
    buttonText: "Meet Our Team",
    yearsOfCare: "15+",
    ratingScore: "4.9",
    ratingMax: "5",
    ratingCount: "850+ Google reviews",
    medicalDirector: {
      name: siteConfig.doctors[0].name,
      role: siteConfig.doctors[0].role,
      image: siteConfig.doctors[0].image,
    },
    specialties: ["Dental Implants", "Clear Aligners", "Root Canal (RCT)", "Teeth Whitening"],
  },
  // Map treatments to departments and services for legacy subpage support
  departments: siteConfig.treatments.map((t) => ({
    id: t.id,
    name: t.title,
    slug: t.slug,
    tagline: t.tagline,
    description: t.shortDesc,
    icon: t.id as any,
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
    speciality: d.speciality,
    departmentId: "dentistry",
    qualifications: d.degrees,
    experience: d.experience,
    shortBio: d.shortBio,
    opdTimings: d.timings,
    image: d.image,
  })),
  blogArticles: [
    {
      id: "aligners-guide",
      slug: "clear-aligners-vs-metal-braces",
      title: "Clear Aligners vs Metal Braces: Which Is Right for You in 2026?",
      excerpt: "A comprehensive orthodontic guide comparing comfort, duration, visibility, and cost of invisible aligners.",
      content: [
        "Clear aligners have revolutionized modern orthodontics. Made of medical-grade transparent polyurethane, they apply gentle, continuous force to move teeth into ideal positions without uncomfortable metal wires.",
        "Unlike traditional braces, clear aligners are completely removable for meals and brushing, ensuring oral hygiene remains pristine throughout your treatment.",
      ],
      date: "October 2026",
      author: siteConfig.leadDoctor.name,
      readTime: "4 min read",
      image: "/images/treatments/braces-and-aligners.webp",
    },
    {
      id: "implants-faq",
      slug: "how-long-do-dental-implants-last",
      title: "How Long Do Dental Implants Really Last? Facts vs Myths",
      excerpt: "Why dental implants remain the gold standard for missing teeth replacement, and how to care for them.",
      content: [
        "When placed by an experienced implantologist with proper 3D bone mapping, titanium dental implants achieve a success rate exceeding 98%.",
        "Because the implant biologically integrates with your jawbone through osseointegration, it prevents bone loss and acts as a permanent, lifetime tooth.",
      ],
      date: "September 2026",
      author: siteConfig.doctors[1]?.name || siteConfig.leadDoctor.name,
      readTime: "5 min read",
      image: "/images/treatments/dental-implants.webp",
    },
    {
      id: "painless-rct",
      slug: "truth-about-painless-root-canals",
      title: "The Truth About Root Canals: Why They Don't Hurt Anymore",
      excerpt: "How computer-guided numbing and rotary microscope endodontics make root canal therapy as relaxing as a routine filling.",
      content: [
        "The fear of root canals dates back decades to older dental techniques. Today, digital anesthetics and rotary NiTi files completely numb the tooth and allow treatment in one 45-minute sitting.",
        "A root canal relieves acute pain caused by infected nerve tissue and preserves your original natural tooth root.",
      ],
      date: "September 2026",
      author: siteConfig.doctors[2]?.name || siteConfig.leadDoctor.name,
      readTime: "3 min read",
      image: "/images/treatments/root-canal.webp",
    },
  ],
  ctaBanner: {
    title: siteConfig.ctaBanner.title,
    subtext: siteConfig.ctaBanner.subtitle,
    buttonText: siteConfig.ctaBanner.buttonText,
  },
  footer: {
    description: siteConfig.footer.description,
    quickLinksCol1: siteConfig.footer.quickLinks.slice(0, 4),
    quickLinksCol2: siteConfig.footer.quickLinks.slice(4),
    legalLinks: siteConfig.footer.legalLinks,
    copyright: siteConfig.footer.copyright,
  },
};
