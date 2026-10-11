import React from "react";
import { siteConfig } from "@/config/site.config";
import { Scanner3DIcon, ShieldCheckIcon, SmileIcon, PercentIcon } from "./Icons";

export function TrustStrip() {
  const getIcon = (type: string) => {
    switch (type) {
      case "equipment":
        return <Scanner3DIcon className="w-6 h-6 text-[#26B5AC]" />;
      case "shield":
        return <ShieldCheckIcon className="w-6 h-6 text-[#26B5AC]" />;
      case "smile":
        return <SmileIcon className="w-6 h-6 text-[#26B5AC]" />;
      case "emi":
        return <PercentIcon className="w-6 h-6 text-[#26B5AC]" />;
      default:
        return <SmileIcon className="w-6 h-6 text-[#26B5AC]" />;
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-[#FAFCFC] border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {(siteConfig.trustStrip || []).map((item: any) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100/90 shadow-sm hover:border-[#26B5AC]/30 transition-all card-press"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E9F7F5] flex items-center justify-center shrink-0">
                {getIcon(item.icon)}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#0B3B4A]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5B7480] mt-1 leading-relaxed">
                  {item.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
