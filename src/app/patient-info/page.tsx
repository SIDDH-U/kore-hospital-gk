import React from "react";
import type { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { PatientInfoContent } from "./PatientInfoContent";

export const metadata: Metadata = {
  title: `Patient & Visitor Information | ${siteConfig.brand.name}`,
  description: `Essential guide for patients and visitors at ${siteConfig.brand.name}, ${siteConfig.brand.city} - consultation process, visiting hours, and 0% EMI financing.`,
  alternates: {
    canonical: `${getSiteUrl()}/patient-info`,
  },
  openGraph: {
    title: `Patient & Visitor Information | ${siteConfig.brand.name}`,
    description: `Complete guide for visiting, appointments, and treatment process at ${siteConfig.brand.name}, ${siteConfig.brand.city}.`,
    url: `${getSiteUrl()}/patient-info`,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1200,
        height: 630,
        alt: `Patient Info at ${siteConfig.brand.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function PatientInfoPage() {
  return <PatientInfoContent />;
}
