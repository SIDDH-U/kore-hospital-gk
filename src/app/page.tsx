import React from "react";
import type { Metadata } from "next";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { HomeClient } from "@/components/HomeClient";

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} | ${siteConfig.brand.tagline}`,
  description: siteConfig.brand.fullDescription,
  alternates: {
    canonical: `${getSiteUrl()}/`,
  },
  openGraph: {
    title: `${siteConfig.brand.name} - ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: `${getSiteUrl()}/`,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: `${getSiteUrl()}/images/hero-desktop.webp`,
        width: 1600,
        height: 900,
        alt: `${siteConfig.brand.name} - Luxury Dental Studio`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  const dentalJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.brand.name,
    legalName: siteConfig.brand.legalName,
    description: siteConfig.brand.fullDescription,
    url: getSiteUrl(),
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    image: `${getSiteUrl()}/images/hero-desktop.webp`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.brand.address,
      addressLocality: siteConfig.brand.city,
      addressRegion: siteConfig.brand.state,
      postalCode: siteConfig.brand.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.1383",
      longitude: "77.3210",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
    medicalSpecialty: [
      "Dentistry",
      "Orthodontics",
      "Periodontics",
      "Endodontics",
      "PediatricDentistry",
      "Prosthodontics",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentalJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
