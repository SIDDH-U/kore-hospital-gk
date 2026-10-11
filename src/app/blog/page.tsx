import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, getSiteUrl } from "@/config/site.config";
import { hospitalConfig } from "@/config/hospital";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CtaBanner } from "@/components/CtaBanner";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Dental Health Blog & Smile Guides | ${siteConfig.brand.name}`,
  description: `Read evidence-based dental care tips, clear aligner guides, and oral wellness articles by dentists at ${siteConfig.brand.name}.`,
  alternates: {
    canonical: `${getSiteUrl()}/blog`,
  },
};

export default function BlogIndexPage() {
  const articles = hospitalConfig.blogArticles;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC] text-[#12303A]">
      <TopStrip />
      <Header />

      <main className="flex-1 pb-16 lg:pb-0">
        <section className="bg-[#0B3B4A] text-white py-14 lg:py-20 text-center">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#26B5AC] border border-white/15 mb-3">
              DENTAL INSIGHTS
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Smile & Dental Wellness Blog
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Clear orthodontic advice, implant insights, and preventive oral health guides curated by our specialist dentists.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col rounded-3xl bg-white border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all card-press"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover hover-img-zoom"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#5B7480] mb-2.5">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h2 className="font-display text-lg sm:text-xl font-bold text-[#0B3B4A] leading-snug">
                        <Link href={`/blog/${article.slug}`} className="hover:text-[#26B5AC] transition-colors">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5B7480] mt-2.5 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#12303A]">
                        By {article.author}
                      </span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-xs font-bold text-[#26B5AC] hover:text-[#1E948C] flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyActionBar />
    </div>
  );
}
