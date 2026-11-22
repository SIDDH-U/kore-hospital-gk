import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { siteConfig, clinicConfig, getSiteUrl } from "@/config/site.config";
import { LanguageProvider } from "@/context/LanguageContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#052F29",
};

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinicConfig.name} | Piles & Ksharsutra Care in ${clinicConfig.city}`,
    template: `%s | ${clinicConfig.name}`,
  },
  description: siteConfig.brand.fullDescription,
  keywords: [
    clinicConfig.name,
    clinicConfig.shortName,
    "Kore Hospital Gangakhed",
    "Piles hospital Gangakhed",
    "Mūlvyādh Centre Gangakhed",
    "Fissure treatment Parbhani",
    "Fistula Ksharsutra Gangakhed",
    "Dr Anant Kore",
    "Dr Kiran Kore",
    "Piles specialist Gangakhed",
    "Ano-rectal clinic Gangakhed",
  ],
  authors: [
    { name: "Dr. Anant Kamaji Kore" },
    { name: "Dr. Kiran Anant Kore" },
  ],
  creator: clinicConfig.name,
  publisher: clinicConfig.name,
  formatDetection: {
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: `${clinicConfig.name} | Piles & Ksharsutra Centre Gangakhed`,
    description: siteConfig.brand.description,
    siteName: clinicConfig.name,
    images: [
      {
        url: `${siteUrl}/images/clinic-exterior.jpg`,
        width: 1200,
        height: 630,
        alt: `${clinicConfig.name} - Gangakhed`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinicConfig.name} | Piles & Ksharsutra Centre Gangakhed`,
    description: siteConfig.brand.description,
    images: [`${siteUrl}/images/clinic-exterior.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hospitalStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${siteUrl}/#hospital`,
    name: clinicConfig.name,
    alternateName: clinicConfig.nameMr,
    url: siteUrl,
    logo: `${siteUrl}/images/clinic-exterior.jpg`,
    image: `${siteUrl}/images/clinic-exterior.jpg`,
    description: siteConfig.brand.fullDescription,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
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
      latitude: "18.9698392",
      longitude: "76.7479928",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
    medicalSpecialty: [
      "Ano-rectal Care",
      "Ksharsutra Therapy",
      "Ayurvedic Surgery",
      "Proctology",
      "General Medicine",
      "Gynecology",
    ],
    physician: clinicConfig.doctors.map((doc) => ({
      "@type": "Physician",
      name: doc.name,
      medicalSpecialty: doc.specialty,
      knowsAbout: [
        "Piles Treatment",
        "Anal Fissure",
        "Anal Fistula",
        "Ksharsutra",
        "Anorectal Care",
      ],
    })),
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${notoDevanagari.variable} ${sourceSerif.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased overflow-x-hidden min-h-screen flex flex-col bg-white text-[#0F2321]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hospitalStructuredData),
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
