import { clinicConfig, ClinicConfig, DoctorConfig, TreatmentItem } from "../../config/clinic.config";
import { themes, getTheme, ThemeColors } from "../../config/theme.config";

export { clinicConfig };
export { themes, getTheme };
export type { ClinicConfig, DoctorConfig, TreatmentItem, ThemeColors };

// Type aliases for hospital domain models
export type Doctor = DoctorConfig & {
  degrees?: string;
  shortBio?: string;
  experience?: string;
  image?: string;
  timings?: string;
};

export type Treatment = TreatmentItem & {
  duration?: string;
  startingPrice?: string;
  costRange?: {
    starting: string;
    average: string;
    note: string;
  };
  whoItsFor?: string[];
  processSteps?: Array<{ step: number; title: string; description: string }>;
  aftercare?: string[];
  whatItIs?: string;
};

export interface FAQItem {
  q: string;
  qMr?: string;
  a: string;
  aMr?: string;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://kore-hospital-gangakhed.vercel.app";
}

/**
 * Builds an official WhatsApp link using the hospital's configured WhatsApp number.
 */
export function buildWhatsAppLink(message: string): string {
  const number = clinicConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Active theme colors
const activeTheme = getTheme(clinicConfig.theme);

export const PHONE_DISPLAY = clinicConfig.phone;
export const PHONE_RAW = clinicConfig.phoneRaw;
export const WHATSAPP_NUMBER = clinicConfig.whatsappNumber;
export const CLINIC_EMAIL = clinicConfig.email;

/**
 * Filtered navigation links respecting clinicConfig.sections flags
 */
const dynamicNavLinks = [
  { name: "Treatments", nameMr: "उपचार", href: "/treatments" },
  { name: "Our Doctors", nameMr: "डॉक्टर्स", href: "/#doctors" },
  { name: "When to Consult", nameMr: "लक्षणे व सल्ला", href: "/#when-to-see-doctor" },
  { name: "Privacy & Comfort", nameMr: "गोपनीयता", href: "/#privacy" },
  { name: "FAQ", nameMr: "प्रश्नोत्तरे", href: "/#faq" },
  { name: "Contact", nameMr: "संपर्क", href: "/#contact" },
];

/**
 * Merged site configuration for Kore Hospital – Piles Centre
 */
export const siteConfig = {
  brand: {
    name: clinicConfig.name,
    nameMr: clinicConfig.nameMr,
    legalName: clinicConfig.legalName,
    shortName: clinicConfig.shortName,
    shortNameMr: clinicConfig.shortNameMr,
    tagline: clinicConfig.tagline,
    taglineMr: clinicConfig.taglineMr,
    subtitle: clinicConfig.subtitle,
    subtitleMr: clinicConfig.subtitleMr,
    description: `Kore Hospital in ${clinicConfig.city} offers specialized, respectful care for piles (hemorrhoids), anal fissure, fistula, and Ayurvedic Ksharsutra therapy by experienced specialists.`,
    fullDescription: `${clinicConfig.name} is a specialist anorectal and Ksharsutra centre in Gangakhed, Dist. Parbhani, Maharashtra. Led by Dr. Anant Kamaji Kore and Dr. Kiran Anant Kore, the hospital provides gentle, confidential evaluation and treatment for piles, fissures, fistulas, and chronic constipation.`,
    callbackNotice: clinicConfig.callbackNotice,
    callbackNoticeMr: clinicConfig.callbackNoticeMr,
    city: clinicConfig.city,
    cityMr: clinicConfig.address.cityMr,
    district: clinicConfig.address.district,
    state: clinicConfig.state,
    pincode: clinicConfig.pincode,
    address: clinicConfig.address.street,
    addressMr: clinicConfig.address.streetMr,
    fullAddress: clinicConfig.fullAddress,
    fullAddressMr: clinicConfig.address.fullAddressMr,
    landmark: clinicConfig.landmark,
    mapUrl: clinicConfig.mapsLink,
    embeddedMapUrl: clinicConfig.embeddedMapUrl,
    logoImage: clinicConfig.logoImage || "",
    exteriorImage: clinicConfig.exteriorImage,
    coordinates: clinicConfig.address.coordinates,
    leadDoctor: clinicConfig.leadDoctor,
  },

  contact: {
    phone: clinicConfig.phone,
    phoneRaw: clinicConfig.phoneRaw,
    secondaryPhone: clinicConfig.phones.secondary,
    secondaryPhoneRaw: clinicConfig.phones.secondaryRaw,
    whatsapp: clinicConfig.whatsappNumber,
    tel: clinicConfig.phoneRaw,
    email: clinicConfig.email,
  },

  hours: {
    weekday: clinicConfig.hours.weekday,
    weekdayMr: clinicConfig.hours.weekdayMr,
    weekend: clinicConfig.hours.weekend,
    weekendMr: clinicConfig.hours.weekendMr,
    display: clinicConfig.hours.display,
    displayMr: clinicConfig.hours.displayMr,
    emergency: clinicConfig.hours.emergency,
    emergencyMr: clinicConfig.hours.emergencyMr,
    regular: clinicConfig.hours.weekday,
  },

  theme: activeTheme,
  sections: clinicConfig.sections,
  sampleMode: clinicConfig.sampleMode,

  navLinks: dynamicNavLinks,

  hero: {
    badge: "KORE HOSPITAL · GANGAKHED",
    badgeMr: "कोरे हॉस्पिटल · गंगाखेड",
    headingPrefix: "Specialist Care for",
    headingHighlight: "Piles, Fissure & Fistula",
    headingPrefixMr: "मूळव्याध, फिशर व फिस्टुलावर",
    headingHighlightMr: "विश्वासार्ह उपचार",
    subtext: `Confidential clinical examination and Ayurvedic Ksharsutra therapy in Gangakhed, Dist. Parbhani. Safe, gentle, and respectful care.`,
    subtextMr: `गंगाखेड येथील सुसज्ज व खाजगी वातावरणात मुळव्याध, फिशर, फिस्टुला आणि बद्धकोष्ठतेवर शास्त्रोक्त व सुरक्षित उपचार.`,
    desktopSubtext: `Led by Dr. Anant Kamaji Kore (BAMS, Fellowship in Ksharsutra) and Dr. Kiran Anant Kore. Dignified care for men, women, and seniors with complete privacy.`,
    desktopSubtextMr: `डॉ. अनंत कामाजी कोरे आणि डॉ. किरण अनंत कोरे यांच्या मार्गदर्शनाखाली पूर्ण गोपनीयता व आदरयुक्त वातावरणात वैद्यकीय सल्ला.`,
    ctaPrimary: "Book Consultation",
    ctaPrimaryMr: "तपासणीसाठी वेळ घ्या",
    ctaSecondary: "Call Hospital",
    ctaSecondaryMr: "फोन करा",
  },

  whyChooseUs: {
    badge: "WHY CHOOSE KORE HOSPITAL",
    badgeMr: "कोरे हॉस्पिटलची वैशिष्ट्ये",
    titleStart: "Compassionate, specialist care you can ",
    titleHighlight: "trust",
    titleEnd: " completely",
    titleStartMr: "तुमच्या आरोग्यासाठी ",
    titleHighlightMr: "विश्वासार्ह",
    titleEndMr: " व सुरक्षित उपचार",
    description: "Combining classical Ksharsutra surgical principles with sterile, modern clinical standards in Gangakhed.",
    descriptionMr: "पारंपरिक शास्त्रोक्त क्षारसूत्र चिकित्सा आणि आधुनिक क्लिनिकल स्वच्छता यांचे योग्य संतुलन.",
    tiles: [
      {
        id: "ksharsutra-exp",
        icon: "shield",
        title: "Ksharsutra Specialist",
        titleMr: "क्षारसूत्र विशेष उपचार",
        desc: "Experienced practitioner in specialized medicated thread therapy for fistula and piles.",
        descMr: "फिस्टुला व मुळव्याधीवर शास्त्रोक्त क्षारसूत्र तंत्राने सुरक्षित उपचार.",
      },
      {
        id: "female-doctor",
        icon: "doctor",
        title: "Lady Doctor Available",
        titleMr: "महिला तज्ज्ञ डॉक्टर उपलब्ध",
        desc: "Dr. Kiran Kore provides comfortable, discreet consultations for female patients.",
        descMr: "महिला रुग्णांना संकोच न वाटता तपासणी करता यावी यासाठी महिला डॉक्टर उपलब्ध.",
      },
      {
        id: "privacy",
        icon: "feather",
        title: "Dignity & Absolute Privacy",
        titleMr: "पूर्ण गोपनीयता व आदर",
        desc: "Strictly confidential consultations in private examination chambers.",
        descMr: "स्वतंत्र कक्षात सुरक्षित, गोपनीय व आदरयुक्त वातावरणात तपासणी.",
      },
      {
        id: "transparent",
        icon: "receipt",
        title: "Honest Medical Advice",
        titleMr: "पारदर्शक व प्रामाणिक सल्ला",
        desc: "Conservative therapy first. Procedures only when genuinely indicated.",
        descMr: "सुरुवातीला योग्य औषधोपचार व पथ्य. गरज असल्यासच पुढील प्रक्रियेचा सल्ला.",
      },
      {
        id: "hygiene",
        icon: "scan",
        title: "Hygienic Clinical Facility",
        titleMr: "स्वच्छ व निर्जंतुक सुविधा",
        desc: "Sterile instruments, disposable linen, and rigorous sanitation standards.",
        descMr: "रुग्णालयात स्वच्छता व निर्जंतुकीकरणाची काटेकोर काळजी घेतली जाते.",
      },
      {
        id: "location",
        icon: "clock",
        title: "Central Gangakhed Location",
        titleMr: "मध्यवर्ती सोयीचे ठिकाण",
        desc: "Located on Dr. Lane beside Chandak Hospital with easy road accessibility.",
        descMr: "डॉ. लेन, चांडक हॉस्पिटल शेजारी, गंगाखेड (जि. परभणी).",
      },
    ],
  },

  howItWorks: {
    badge: "CLINICAL PATHWAY",
    badgeMr: "उपचार प्रक्रिया",
    titleStart: "Your pathway to comfort in ",
    titleHighlight: "four simple steps",
    titleEnd: "",
    titleStartMr: "आरोग्य व सुलभतेसाठी ",
    titleHighlightMr: "४ सोप्या पायऱ्या",
    titleEndMr: "",
    subtitle: "From your first confidential call to complete digestive well-being.",
    subtitleMr: "पहिल्या संभाषणापासून ते पूर्ण निरोगी स्वास्थ्यापर्यंत.",
    steps: [
      {
        step: 1,
        title: "Confidential Consultation",
        titleMr: "खाजगी तपासणी",
        description: "Discuss your symptoms openly in a private, supportive consultation room.",
        descriptionMr: "स्वतंत्र व सुरक्षित वातावरणात आपल्या लक्षणांची तपासणी करा.",
      },
      {
        step: 2,
        title: "Accurate Clinical Assessment",
        titleMr: "अचूक निदान",
        description: "Careful examination by the doctor to determine the exact diagnosis and stage.",
        descriptionMr: "डॉक्टरांकडून तपासणी करून आजाराचा टप्पा व प्रकार निश्चित केला जातो.",
      },
      {
        step: 3,
        title: "Individualized Care Plan",
        titleMr: "योग्य उपचार पद्धती",
        description: "Prescription of dietary adjustments, Ayurvedic medicines, or Ksharsutra if needed.",
        descriptionMr: "आहारातील बदल, औषधोपचार किंवा आवश्यक असल्यास क्षारसूत्र उपचार.",
      },
      {
        step: 4,
        title: "Recovery & Follow-Up",
        titleMr: "पुढील काळजी व पथ्य",
        description: "Guidance on avoiding constipation and maintaining long-term anorectal health.",
        descriptionMr: "बद्धकोष्ठता टाळण्यासाठी पथ्य आणि नियमित आरोग्य मार्गदर्शन.",
      },
    ],
  },

  ctaBanner: {
    title: "Relief from Anorectal Pain Begins with a Simple Consultation",
    titleMr: "मुळव्याध व गुदभागाच्या त्रासावर वेळेवर सल्ला घ्या",
    subtitle: "Do not delay seeking medical guidance. Our experienced doctors at Kore Hospital are here to help with compassion and privacy.",
    subtitleMr: "संकोच न करता वेळेवर योग्य तपासणी करा. कोरे हॉस्पिटलमध्ये तज्ज्ञ डॉक्टरांकडून सुरक्षित व विश्वासार्ह मार्गदर्शन उपलब्ध आहे.",
    buttonText: "Book Appointment",
    buttonTextMr: "तपासणीसाठी वेळ घ्या",
    whatsAppText: "Chat on WhatsApp",
    whatsAppTextMr: "व्हॉट्सॲपवर संपर्क करा",
  },

  treatments: clinicConfig.treatments.map((t) => ({
    ...t,
    duration: t.duration || "Clinical Consultation",
    startingPrice: t.startingPrice || "Consultation",
    costRange: {
      starting: "Consultation",
      average: "As per exam",
      note: "Treatment fee depends on individual diagnosis and procedure required.",
    },
    whatItIs: t.howTreated,
    whoItsFor: t.symptoms,
    processSteps: [
      { step: 1, title: "Clinical Inspection", description: "Examination by the doctor to confirm diagnosis and grade." },
      { step: 2, title: "Therapy Selection", description: "Choice of medical management, Ksharsutra, or minor procedure." },
      { step: 3, title: "Post-Care Guidance", description: "Dietary plan and sitz bath instructions to ensure smooth healing." },
    ],
    aftercare: t.careAdvice,
  })),

  doctors: clinicConfig.doctors.map((d) => ({
    ...d,
    degrees: d.qualification,
    shortBio: `${d.name} (${d.qualification}) specializes in ${d.specialty} at Kore Hospital, Gangakhed.`,
    experience: "Senior Specialist",
    image: "", // Zero photos: inline SVG avatars used everywhere
    timings: clinicConfig.hours.display,
  })),

  whenToSeeDoctor: clinicConfig.whenToSeeDoctor,
  privacyAndComfort: clinicConfig.privacyAndComfort,
  faqs: clinicConfig.faqs,
  disclaimer: clinicConfig.disclaimer,

  social: clinicConfig.socials,

  footer: {
    keyLinks: dynamicNavLinks,
    topTreatments: clinicConfig.treatments.slice(0, 5),
  },
};
