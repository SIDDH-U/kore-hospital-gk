import { ThemePreset } from "./theme.config";

export interface ClinicStat {
  value: number;
  display: string;
  suffix?: string;
  label: string;
  subtext?: string;
  show?: boolean;
}

export interface ClinicConfig {
  /** Public display name of the clinic (e.g. "Smilora Dental Studio") */
  name: string;
  /** Short brand name used in navbar and badges (e.g. "Smilora") */
  shortName: string;
  /** Primary clinic tagline */
  tagline: string;
  /** Legal entity name for footer / schema */
  legalName?: string;
  /** Subtitle displayed under logo (e.g. "DENTAL STUDIO") */
  subtitle?: string;

  /** Primary phone number formatted for human display */
  phone: string;
  /** Raw digits string for tel: links (e.g. "+919876543210") */
  phoneRaw: string;
  /** WhatsApp digits number with country code, no + or spaces (e.g. "919876543210") */
  whatsappNumber: string;
  /** Concierge email address */
  email?: string;

  /** Street address */
  address: string;
  /** City name - dynamically injected into titles, metadata and copy */
  city: string;
  /** State / Province */
  state: string;
  /** Postal / PIN Code */
  pincode: string;
  /** Formatted full address string */
  fullAddress: string;
  /** Prominent nearby landmark */
  landmark: string;
  /** Google Maps driving directions link */
  mapsLink: string;
  /** Optional Google Maps embed iframe URL */
  embeddedMapUrl?: string;

  /** Clinic operating hours */
  hours: {
    weekday: string;
    weekend: string;
    display?: string;
    emergency?: string;
  };

  /** Lead doctor / clinical director */
  leadDoctor: {
    name: string;
    qualification: string;
    yearsExperience: string;
    role?: string;
    bio?: string;
  };

  /** Social media links */
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };

  /** Clinic statistics (featured in rating strip and hero) */
  stats: {
    rating: ClinicStat;
    reviewCount: number;
    patientsServed: ClinicStat;
    yearsExperience: ClinicStat;
  };

  /** Color theme preset: "teal" | "ocean" | "navy-gold" | "forest" */
  theme: ThemePreset;

  /** Feature & section visibility flags (cleanly skipped when false) */
  sections: {
    showDoctors: boolean;
    showGallery: boolean;
    showReviews: boolean;
    showStats: boolean;
    showMap: boolean;
    showEmi: boolean;
  };

  /**
   * When true, gallery cases, reviews and stats display a small "Sample" tag.
   * When false, all sample labels disappear cleanly for production use.
   */
  sampleMode: boolean;

  /**
   * Optional custom logo image URL in /public (e.g. "/images/clinic/logo.png").
   * When empty, the system automatically generates an elegant serif + icon logo.
   */
  logoImage?: string;

  /** Quick callback notice shown on booking form */
  callbackNotice?: string;
}

/**
 * ============================================================================
 * CLINIC CONFIGURATION (THE ONLY FILE YOU EDIT PER CLINIC)
 * ============================================================================
 * Edit the details below to adapt this entire website for any dental clinic
 * in under 10 minutes. Specialty content (treatments, clinical faqs, etc.)
 * is maintained separately in specialty.dental.config.ts.
 */
export const clinicConfig: ClinicConfig = {
  name: "Smilora Dental Studio",
  shortName: "Smilora",
  tagline: "Painless dentistry. A smile you'll love.",
  legalName: "Smilora Dental Studio & Aesthetics Pvt. Ltd.",
  subtitle: "DENTAL STUDIO",

  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsappNumber: "919876543210",
  email: "hello@smiloradental.com",

  address: "Suite 204, Crystal Heights, North Park Road",
  city: "Nanded",
  state: "Maharashtra",
  pincode: "431601",
  fullAddress: "Suite 204, Crystal Heights, North Park Road, Nanded, Maharashtra 431601",
  landmark: "Opposite City Central Gardens",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Smilora+Dental+Studio+Nanded",
  embeddedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120612.92348589083!2d77.242784!3d19.155823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d66bb9d31721%3A0x46669c2794eb38e!2sNanded%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  hours: {
    weekday: "Mon – Sat: 9:00 AM – 8:30 PM",
    weekend: "Sunday: 10:00 AM – 2:00 PM (By Appointment)",
    display: "Mon – Sat: 9:00 AM – 8:30 PM · Sun by Appointment",
    emergency: "Emergency Dental On-Call 24/7",
  },

  leadDoctor: {
    name: "Dr. Ananya Roy",
    qualification: "BDS, MDS (Orthodontics), Certified Invisalign Provider",
    yearsExperience: "12+",
    role: "Lead Orthodontist & Smile Designer",
    bio: "Specialist in discreet clear aligners, ceramic braces, and computer-guided smile design. Passionate about gentle, anxiety-free orthodontic care.",
  },

  socials: {
    instagram: "https://instagram.com/smiloradental",
    facebook: "https://facebook.com/smiloradental",
    linkedin: "https://linkedin.com/company/smiloradental",
  },

  stats: {
    rating: {
      value: 4.9,
      display: "4.9",
      suffix: " ★",
      label: "Google rating",
      subtext: "850+ verified reviews",
      show: true,
    },
    reviewCount: 850,
    patientsServed: {
      value: 10000,
      display: "10,000+",
      suffix: "",
      label: "Smiles crafted",
      subtext: "Painless & calm",
      show: true,
    },
    yearsExperience: {
      value: 15,
      display: "15+",
      suffix: "",
      label: "Years of care",
      subtext: "Senior MDS team",
      show: true,
    },
  },

  theme: "teal",

  sections: {
    showDoctors: true,
    showGallery: true,
    showReviews: true,
    showStats: true,
    showMap: true,
    showEmi: true,
  },

  sampleMode: true,

  logoImage: "", // Leave blank to auto-generate from name & subtitle
  callbackNotice: "We'll confirm your appointment on WhatsApp in under 15 minutes.",
};
