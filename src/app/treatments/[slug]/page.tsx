import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { TreatmentDetailClient } from "./TreatmentDetailClient";

interface TreatmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.treatments.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = siteConfig.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: `${treatment.title} Treatment in ${siteConfig.brand.city} | ${siteConfig.brand.name}`,
    description: `${treatment.shortDesc} Compassionate medical evaluation and Ksharsutra therapy at ${siteConfig.brand.name}, Gangakhed.`,
    alternates: {
      canonical: `${getSiteUrl()}/treatments/${treatment.slug}`,
    },
    openGraph: {
      title: `${treatment.title} | ${siteConfig.brand.name}`,
      description: treatment.shortDesc,
      images: [{ url: `${getSiteUrl()}/images/hospital-front.jpg` }],
    },
  };
}

async function TreatmentDetailLoader({ params }: TreatmentPageProps) {
  const { slug } = await params;
  const treatment = siteConfig.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  const treatmentJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.title,
    description: treatment.shortDesc,
    procedureType: "AyurvedicProcedure",
    bodyLocation: "Anorectal",
    howPerformed: treatment.howTreated,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(treatmentJsonLd) }}
      />
      <TreatmentDetailClient slug={slug} />
    </>
  );
}

export default function IndividualTreatmentPage({ params }: TreatmentPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <div className="w-8 h-8 rounded-full border-2 border-[#0B7A68] border-t-transparent animate-spin" />
        </div>
      }
    >
      <TreatmentDetailLoader params={params} />
    </Suspense>
  );
}
