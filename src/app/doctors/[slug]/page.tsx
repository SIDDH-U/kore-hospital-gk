import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, getSiteUrl, buildWhatsAppLink } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CalendarIcon, WhatsAppIcon, ClockIcon, CheckCircleIcon } from "@/components/Icons";

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
    description: `${doctor.name} (${doctor.degrees}) is an experienced ${doctor.speciality} with ${doctor.experience} experience at ${siteConfig.brand.name}.`,
    alternates: {
      canonical: `${getSiteUrl()}/doctors/${doctor.slug}`,
    },
    openGraph: {
      title: `${doctor.name} | ${siteConfig.brand.name}`,
      description: doctor.shortBio,
      images: [{ url: `${getSiteUrl()}${doctor.image}` }],
    },
  };
}

export default async function DoctorProfilePage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = siteConfig.doctors.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  const doctorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    jobTitle: doctor.role,
    medicalSpecialty: doctor.speciality,
    worksFor: {
      "@type": "Dentist",
      name: siteConfig.brand.name,
    },
    image: `${getSiteUrl()}${doctor.image}`,
    description: doctor.shortBio,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorJsonLd) }}
      />

      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* Profile Hero */}
        <section className="bg-[#0B3B4A] text-white py-12 sm:py-16">
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
                <li className="text-[#26B5AC] font-semibold">{doctor.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Doctor Photo */}
              <div className="md:col-span-4 lg:col-span-3">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Doctor Summary */}
              <div className="md:col-span-8 lg:col-span-9 space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15">
                  {doctor.speciality}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-base sm:text-lg text-[#F2A65A] font-semibold">
                  {doctor.role}
                </p>
                <p className="text-xs sm:text-sm text-white/70">
                  {doctor.degrees} · {doctor.experience} Experience
                </p>

                <div className="pt-2 text-xs text-[#E9F7F5] bg-white/10 p-3 rounded-xl inline-block border border-white/15">
                  ✨ {doctor.highlight}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href={`/book?doctor=${encodeURIComponent(doctor.name)}`}
                    className="btn-idle-shine btn-press h-12 px-7 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CalendarIcon className="w-4 h-4 text-[#07252F]" />
                    <span>Book Appointment with {doctor.name}</span>
                  </Link>

                  <a
                    href={buildWhatsAppLink(
                      `Hello ${siteConfig.brand.name}, I would like to book a visit with ${doctor.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press h-12 px-6 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#26B5AC]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info */}
        <section className="py-14 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Bio & Approach (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm">
                  <h2 className="font-display text-2xl font-bold text-[#0B3B4A] mb-4">
                    About {doctor.name}
                  </h2>
                  <p className="text-sm sm:text-base text-[#5B7480] leading-relaxed">
                    {doctor.shortBio}
                  </p>
                  <p className="text-sm sm:text-base text-[#5B7480] leading-relaxed mt-4">
                    At {siteConfig.brand.name}, {doctor.name} focuses on patient-first, painless dentistry using state-of-the-art 3D digital imaging, computerized anesthesia, and minimally invasive techniques to ensure your comfort is the priority at every appointment.
                  </p>
                </div>
              </div>

              {/* Consultation Timings (4 cols) */}
              <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#E9F7F5] border border-[#26B5AC]/20 shadow-sm space-y-4">
                <h3 className="font-display text-lg font-bold text-[#0B3B4A]">
                  Consultation Timings
                </h3>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-[#0B3B4A]">
                  <ClockIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
                  <span>{doctor.timings}</span>
                </div>
                <div className="pt-4 border-t border-[#26B5AC]/20">
                  <Link
                    href={`/book?doctor=${encodeURIComponent(doctor.name)}`}
                    className="btn-press w-full py-3 rounded-full bg-[#0B3B4A] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm text-center"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-[#F2A65A]" />
                    <span>Reserve Time Slot</span>
                  </Link>
                </div>
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
