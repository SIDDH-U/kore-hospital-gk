export type ThemePreset = "teal" | "ocean" | "navy-gold" | "forest";

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
  teal: {
    name: "teal",
    label: "Signature Teal & Aqua (Smilora Default)",
    background: "#FAFCFC",
    softBackground: "#E9F7F5",
    softBackgroundDark: "#D4EFEA",
    primaryDark: "#0B3B4A",
    deepestDark: "#07252F",
    primaryLight: "#165366",
    accent: "#26B5AC",
    accentHover: "#1E948C",
    accentLight: "#4DD0C7",
    cta: "#F2A65A",
    ctaHover: "#E09244",
    ctaActive: "#C87B2E",
    ctaText: "#07252F",
    text: "#12303A",
    muted: "#5B7480",
    border: "#E2E8F0",
  },
  ocean: {
    name: "ocean",
    label: "Cool Marine Ocean Blue",
    background: "#F8FAFC",
    softBackground: "#E0F2FE",
    softBackgroundDark: "#BAE6FD",
    primaryDark: "#0C4A6E",
    deepestDark: "#082F49",
    primaryLight: "#0369A1",
    accent: "#0284C7",
    accentHover: "#0369A1",
    accentLight: "#38BDF8",
    cta: "#F59E0B",
    ctaHover: "#D97706",
    ctaActive: "#B45309",
    ctaText: "#082F49",
    text: "#0F172A",
    muted: "#475569",
    border: "#E2E8F0",
  },
  "navy-gold": {
    name: "navy-gold",
    label: "Prestige Midnight Navy & Champagne Gold",
    background: "#FAF9F6",
    softBackground: "#F1F5F9",
    softBackgroundDark: "#E2E8F0",
    primaryDark: "#1E293B",
    deepestDark: "#0F172A",
    primaryLight: "#334155",
    accent: "#D97706",
    accentHover: "#B45309",
    accentLight: "#F59E0B",
    cta: "#EAB308",
    ctaHover: "#CA8A04",
    ctaActive: "#A16207",
    ctaText: "#0F172A",
    text: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
  },
  forest: {
    name: "forest",
    label: "Calming Sage & Forest Emerald",
    background: "#FBFBFA",
    softBackground: "#ECFDF5",
    softBackgroundDark: "#D1FAE5",
    primaryDark: "#064E3B",
    deepestDark: "#022C22",
    primaryLight: "#047857",
    accent: "#059669",
    accentHover: "#047857",
    accentLight: "#34D399",
    cta: "#F59E0B",
    ctaHover: "#D97706",
    ctaActive: "#B45309",
    ctaText: "#022C22",
    text: "#132A21",
    muted: "#4B6358",
    border: "#E2E8F0",
  },
};

export function getTheme(themeName: ThemePreset = "teal"): ThemeColors {
  return themes[themeName] || themes.teal;
}
