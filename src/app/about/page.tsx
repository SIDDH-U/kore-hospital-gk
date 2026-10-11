import React from "react";
import type { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.brand.name}`,
  description: `Learn about ${siteConfig.brand.name} - our philosophy of painless dentistry, 3D technology, and specialist doctor team.`,
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
  openGraph: {
    title: `About Us | ${siteConfig.brand.name}`,
    description: `Discover the story, philosophy, and specialist doctors behind ${siteConfig.brand.name}.`,
    url: `${getSiteUrl()}/about`,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1600,
        height: 900,
        alt: `About ${siteConfig.brand.name}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
