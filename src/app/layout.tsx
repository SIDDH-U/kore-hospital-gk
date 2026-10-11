import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig, clinicConfig, getSiteUrl } from "@/config/site.config";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: siteConfig.theme.primaryDark,
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinicConfig.name} | Dental Clinic in ${clinicConfig.city}`,
    template: `%s | ${clinicConfig.name}`,
  },
  description: siteConfig.brand.fullDescription,
  keywords: [
    clinicConfig.name,
    clinicConfig.shortName,
    `Dentist in ${clinicConfig.city}`,
    `Dental Clinic ${clinicConfig.city}`,
    `Dental Implants ${clinicConfig.city}`,
    `Clear Aligners ${clinicConfig.city}`,
    `Painless Root Canal ${clinicConfig.city}`,
    `Teeth Whitening ${clinicConfig.city}`,
    `Best Dentist ${clinicConfig.city}`,
    "Cosmetic Dentistry",
  ],
  authors: [{ name: clinicConfig.name }],
  creator: clinicConfig.name,
  publisher: clinicConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${clinicConfig.name} | ${clinicConfig.tagline}`,
    description: siteConfig.brand.description,
    url: "/",
    siteName: clinicConfig.name,
    images: [
      {
        url: "/images/hero-desktop.webp",
        width: 1600,
        height: 900,
        alt: `${clinicConfig.name} - Modern Dental Studio`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinicConfig.name} | ${clinicConfig.tagline}`,
    description: siteConfig.brand.description,
    images: ["/images/hero-desktop.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = siteConfig.theme;

  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinicConfig.name,
    legalName: clinicConfig.legalName || clinicConfig.name,
    description: siteConfig.brand.description,
    url: siteUrl,
    telephone: clinicConfig.phoneRaw,
    email: clinicConfig.email || "",
    image: `${siteUrl}/images/hero-desktop.webp`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinicConfig.address,
      addressLocality: clinicConfig.city,
      addressRegion: clinicConfig.state,
      postalCode: clinicConfig.pincode,
      addressCountry: "IN",
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
    ],
    ...(clinicConfig.sections.showDoctors && clinicConfig.leadDoctor
      ? {
          founder: {
            "@type": "Person",
            name: clinicConfig.leadDoctor.name,
            jobTitle: clinicConfig.leadDoctor.role || "Lead Specialist",
          },
        }
      : {}),
  };

  // Injected CSS variables dynamically apply active theme preset
  const themeCssVariables = `
    :root {
      --color-primary: ${t.primaryDark};
      --color-primary-dark: ${t.deepestDark};
      --color-primary-light: ${t.primaryLight};
      --color-accent: ${t.accent};
      --color-accent-dark: ${t.accentHover};
      --color-accent-light: ${t.accentLight};
      --color-cta: ${t.cta};
      --color-cta-hover: ${t.ctaHover};
      --color-cta-active: ${t.ctaActive};
      --color-cta-text: ${t.ctaText};
      --color-mint: ${t.softBackground};
      --color-mint-dark: ${t.softBackgroundDark};
      --color-warm-white: ${t.background};
      --color-charcoal: ${t.text};
      --color-charcoal-muted: ${t.muted};
      --color-border: ${t.border};
    }
  `;

  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} scroll-smooth antialiased`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCssVariables }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-warm-white)] text-[var(--color-charcoal)] font-sans flex flex-col antialiased selection:bg-[var(--color-mint)] selection:text-[var(--color-primary)]">
        {children}
      </body>
    </html>
  );
}
