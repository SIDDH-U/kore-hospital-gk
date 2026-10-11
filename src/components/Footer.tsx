import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { DentalLogo } from "./DentalLogo";
import { MapPinIcon, ClockIcon, PhoneIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "./Icons";

export function Footer() {
  const footer = siteConfig.footer;
  const keyLinks = [
    { name: "Treatments", href: "/treatments" },
    ...(siteConfig.sections.showGallery ? [{ name: "Smile Gallery", href: "/#gallery" }] : []),
    ...(siteConfig.sections.showDoctors ? [{ name: "Our Doctors", href: "/#doctors" }] : []),
    ...(siteConfig.sections.showReviews ? [{ name: "Reviews", href: "/#reviews" }] : []),
    { name: "Contact & Book", href: "/#contact" },
  ];
  const topTreatments = siteConfig.treatments.slice(0, 5);

  return (
    <footer className="bg-[#07252F] text-white pt-10 sm:pt-12 pb-24 lg:pb-12 border-t border-white/10 text-xs sm:text-sm">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-white/10">
          {/* Col 1: Brand & One-line description + Socials (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <DentalLogo variant="light" />
            <p className="text-white/70 text-xs leading-relaxed max-w-sm">
              Boutique private dental studio in {siteConfig.brand.city} offering painless care, 3D scans, and bespoke smile transformations.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2.5 pt-1">
              {siteConfig.social?.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {siteConfig.social?.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {siteConfig.social?.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: 2-Column Grid of 5 Key Links + 5 Top Treatments (4 cols) */}
          <div className="md:col-span-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#26B5AC] mb-2.5">
                  Navigation
                </h4>
                <ul className="space-y-1.5 text-xs text-white/75">
                  {keyLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#26B5AC] mb-2.5">
                  Treatments
                </h4>
                <ul className="space-y-1.5 text-xs text-white/75">
                  {topTreatments.map((t) => (
                    <li key={t.id}>
                      <Link href={`/treatments/${t.slug}`} className="hover:text-white transition-colors truncate block">
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Col 3: Address, Hours, Phone (4 cols) */}
          <div className="md:col-span-4 space-y-2.5 text-xs text-white/80">
            <div className="flex items-start gap-2">
              <MapPinIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
              <span>{siteConfig.brand.fullAddress}</span>
            </div>
            <div className="flex items-start gap-2">
              <ClockIcon className="w-4 h-4 text-[#26B5AC] shrink-0 mt-0.5" />
              <div>
                <span>{siteConfig.hours.regular}</span>
                <span className="block text-white/60 text-[11px]">{siteConfig.hours.sunday}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-[#26B5AC] shrink-0" />
              <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-[#F2A65A] font-semibold">
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            {footer.legalLinks.map((l) => (
              <Link key={l.name} href={l.href} className="hover:text-white transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
