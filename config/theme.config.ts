export type ThemePreset = "ayurveda-teal" | "teal" | "ocean" | "navy-gold" | "forest";

export interface ThemeColors {
  name: ThemePreset;
  label: string;
  background: string;
  softBackground: string;
  softBackgroundDark: string;
  primaryDark: string;
  deepestDark: string;
  primaryLight: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  cta: string;
  ctaHover: string;
  ctaActive: string;
  ctaText: string;
  text: string;
  muted: string;
  border: string;
}

export const themes: Record<ThemePreset, ThemeColors> = {
  "ayurveda-teal": {
    name: "ayurveda-teal",
    label: "Kore Hospital Calm Ayurveda Teal & Saffron",
    background: "#EAF6F2",
    softBackground: "#EAF6F2",
    softBackgroundDark: "#E1EFEA",
    primaryDark: "#064B40",
    deepestDark: "#063029",
    primaryLight: "#0B7A68",
    accent: "#F5A524",
    accentHover: "#E09419",
    accentLight: "#F5BD66",
    cta: "#F5A524",
    ctaHover: "#E09419",
    ctaActive: "#BF7D1D",
    ctaText: "#064B40",
    text: "#0F2321",
    muted: "#3F5652",
    border: "#D5E6E0",
  },
  teal: {
    name: "teal",
    label: "Kore Hospital Calm Ayurveda Teal & Saffron",
    background: "#EAF6F2",
    softBackground: "#EAF6F2",
    softBackgroundDark: "#E1EFEA",
    primaryDark: "#064B40",
    deepestDark: "#063029",
    primaryLight: "#0B7A68",
    accent: "#F5A524",
    accentHover: "#E09419",
    accentLight: "#F5BD66",
    cta: "#F5A524",
    ctaHover: "#E09419",
    ctaActive: "#BF7D1D",
    ctaText: "#064B40",
    text: "#0F2321",
    muted: "#3F5652",
    border: "#D5E6E0",
  },
  ocean: {
    name: "ocean",
    label: "Medical Ocean Slate",
    background: "#F4F8FA",
    softBackground: "#EBF3F7",
    softBackgroundDark: "#D8E6ED",
    primaryDark: "#0D4052",
    deepestDark: "#082834",
    primaryLight: "#165E77",
    accent: "#F5A524",
    accentHover: "#E09419",
    accentLight: "#F5BD66",
    cta: "#F5A524",
    ctaHover: "#E09419",
    ctaActive: "#BF7D1D",
    ctaText: "#082834",
    text: "#0F2321",
    muted: "#3F5652",
    border: "#D0DFE5",
  },
  "navy-gold": {
    name: "navy-gold",
    label: "Prestige Navy & Warm Saffron",
    background: "#F8F9FA",
    softBackground: "#EFF3F5",
    softBackgroundDark: "#DFE5E8",
    primaryDark: "#112D3A",
    deepestDark: "#0B1D26",
    primaryLight: "#1B4356",
    accent: "#F5A524",
    accentHover: "#E09419",
    accentLight: "#F5BD66",
    cta: "#F5A524",
    ctaHover: "#E09419",
    ctaActive: "#BF7D1D",
    ctaText: "#0B1D26",
    text: "#0F2321",
    muted: "#3F5652",
    border: "#D4DCE0",
  },
  forest: {
    name: "forest",
    label: "Ayurvedic Forest Green & Warm Amber",
    background: "#F2F7F4",
    softBackground: "#E8F2EC",
    softBackgroundDark: "#D2E4DA",
    primaryDark: "#0D472D",
    deepestDark: "#082E1D",
    primaryLight: "#166B44",
    accent: "#F5A524",
    accentHover: "#E09419",
    accentLight: "#F5BD66",
    cta: "#F5A524",
    ctaHover: "#E09419",
    ctaActive: "#BF7D1D",
    ctaText: "#082E1D",
    text: "#0F2321",
    muted: "#3F5652",
    border: "#CFDFD6",
  },
};

export function getTheme(preset: ThemePreset = "teal"): ThemeColors {
  return themes[preset] || themes.teal;
}
