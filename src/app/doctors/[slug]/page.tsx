import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig, getSiteUrl, buildWhatsAppLink } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  CalendarIcon,
  WhatsAppIcon,
  PhoneIcon,
  DoctorMaleAvatar,
  DoctorFemaleAvatar,
  ShieldCheckIcon,
} from "@/components/Icons";

interface DoctorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.doctors.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = siteConfig.doctors.find((d) => d.slug === slug);

  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  return {
    title: `${doctor.name} - ${doctor.role} | ${siteConfig.brand.name}`,
    description: `${doctor.name} (${doctor.qualification}) - Specialist in ${doctor.specialty} at ${siteConfig.brand.name}, Gangakhed.`,
    alternates: {
      canonical: `${getSiteUrl()}/doctors/${doctor.slug}`,
    },
    openGraph: {
      title: `${doctor.name} | ${siteConfig.brand.name}`,
      description: `${doctor.name} (${doctor.qualification}) - ${doctor.specialty}`,
    },
  };
}

export default async function DoctorProfilePage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = siteConfig.doctors.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  const isFemale = doctor.avatar === "female";

  const doctorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    jobTitle: doctor.role,
    medicalSpecialty: doctor.specialty,
    worksFor: {
      "@type": "MedicalClinic",
      name: siteConfig.brand.name,
      address: siteConfig.brand.fullAddress,
    },
    telephone: doctor.phoneRaw,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EAF6F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorJsonLd) }}
      />

      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        <section className="bg-[#064B40] text-white py-12 sm:py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/doctors" className="hover:text-white transition-colors">
                    Doctors
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[#F5A524] font-semibold">{doctor.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Doctor Avatar - Clean SVG */}
              <div className="md:col-span-4 flex justify-center">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden bg-[#EAF6F2] p-3 border-4 border-white/20 shadow-xl">
                  {isFemale ? (
                    <DoctorFemaleAvatar className="w-full h-full" />
                  ) : (
                    <DoctorMaleAvatar className="w-full h-full" />
                  )}
                </div>
              </div>

              {/* Doctor Details */}
              <div className="md:col-span-8 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#F5A524] border border-white/15 mb-3">
                  Specialist consultant
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-base sm:text-lg text-white/90 font-semibold mt-2">
                  {doctor.qualification}
                </p>
                <p className="text-sm text-[#F5A524] font-medium mt-1">
                  Specialty: {doctor.specialty}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a
                    href={`tel:${doctor.phoneRaw || siteConfig.contact.phoneRaw}`}
                    className="min-h-[48px] px-5 rounded-[12px] border-2 border-white hover:bg-white/10 text-white font-semibold text-sm inline-flex items-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <PhoneIcon className="w-4 h-4 text-white" />
                    <span>Call {doctor.phone}</span>
                  </a>

                  <Link
                    href={`/book?doctor=${encodeURIComponent(doctor.name)}`}
                    className="min-h-[48px] px-6 rounded-[12px] bg-[#F5A524] hover:bg-[#E09419] text-[#0F2321] font-semibold text-sm inline-flex items-center gap-2 shadow-xs transition-all active:scale-[0.98]"
                  >
                    <CalendarIcon className="w-4 h-4 text-[#0F2321]" />
                    <span>Book appointment</span>
                  </Link>

                  <a
                    href={buildWhatsAppLink(
                      `Hello ${siteConfig.brand.name}, I would like to book a consultation with ${doctor.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-5 rounded-[12px] bg-[#1B8755] hover:bg-[#167046] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-xs transition-all active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Overview */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D5E6E0] shadow-xs space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#064B40]">
                About {doctor.name}
              </h2>
              <p className="text-sm text-[#3F5652] leading-relaxed">
                {doctor.name} is a specialist in {doctor.specialty} practicing at {siteConfig.brand.name} in Gangakhed, Dist. Parbhani.
              </p>
              <div className="p-4 rounded-2xl bg-[#EAF6F2] border border-[#D5E6E0] flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-[#0B7A68] shrink-0" />
                <p className="text-xs text-[#064B40]">
                  <strong>Consultation Venue:</strong> {siteConfig.brand.fullAddress}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
