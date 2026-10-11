import React from "react";
import Link from "next/link";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { CheckCircleIcon, WhatsAppIcon, PercentIcon, ArrowRightIcon } from "./Icons";

export function PricingSection() {
  const pricing = siteConfig.pricing;

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#FAFCFC] border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9F7F5] text-[#0B3B4A] border border-[#26B5AC]/25 mb-3">
            {pricing.badge}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight text-balance">
            {pricing.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5B7480] text-balance">
            {pricing.subtitle}
          </p>
        </div>

        {/* 0% EMI Banner Box */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B3B4A] to-[#165366] text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <PercentIcon className="w-6 h-6 text-[#F2A65A]" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#26B5AC]">
                FLEXIBLE FINANCING
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                {pricing.emiBanner.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                {pricing.emiBanner.description}
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppLink(
              `Hello ${siteConfig.brand.name}, I would like to know more about the 0% EMI payment options for dental treatments.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>{pricing.emiBanner.buttonText}</span>
          </a>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {(pricing.items || []).map((item: any) => (
            <div
              key={item.id}
              className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border transition-all card-press ${
                item.popular
                  ? "border-[#26B5AC] ring-2 ring-[#26B5AC]/20 shadow-md"
                  : "border-gray-200/80 shadow-sm"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#0B3B4A] text-[#F2A65A] shadow-sm">
                  Most Requested
                </div>
              )}

              <div>
                <span className="text-[11px] font-bold text-[#26B5AC] uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#0B3B4A] mt-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#5B7480] mt-1.5 leading-relaxed">
                  {item.description}
                </p>

                {/* Price Pill */}
                <div className="my-5 p-3.5 rounded-2xl bg-[#FAFCFC] border border-gray-100 flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-[#5B7480]">Starting from</span>
                  <span className="font-display text-2xl font-bold text-[#0B3B4A]">
                    {item.startingFrom}
                  </span>
                </div>

                {/* Inclusions */}
                <ul className="space-y-2.5 text-xs text-[#12303A] mb-6">
                  {(item.features || []).map((feat: string, fidx: number) => (
                    <li key={fidx} className="flex items-center gap-2.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#26B5AC] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book button for this treatment */}
              <Link
                href={`/book?treatment=${encodeURIComponent(item.name)}`}
                className="btn-press w-full py-3 rounded-full text-center font-bold text-xs bg-[#E9F7F5] hover:bg-[#D4EFEA] text-[#0B3B4A] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Book This Treatment</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-[#0B3B4A]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
