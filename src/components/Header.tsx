"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HospitalLogo } from "./HospitalLogo";
import { Button } from "./ui/Button";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Menu, X, Calendar, ChevronRight } from "lucide-react";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, isMarathi } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsMobileMenuOpen(false);
  }

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  // Navigation items
  const navItems = [
    { name: isMarathi ? "उपचार" : "Treatments", href: "/treatments" },
    { name: isMarathi ? "डॉक्टर्स" : "Doctors", href: "/doctors" },
    { name: isMarathi ? "लक्षणे" : "Symptoms", href: "/#when-to-see-doctor" },
    { name: isMarathi ? "प्रश्नोत्तरे" : "FAQ", href: "/#faq" },
    { name: isMarathi ? "संपर्क" : "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#D5E6E0] shadow-2xs">
        <div className="w-full max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-15 sm:h-16 lg:h-[70px]">
            {/* Logo */}
            <HospitalLogo variant="dark" />

            {/* Desktop Navigation (>= 1024px) */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-3.5 xl:gap-7 whitespace-nowrap"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] xl:text-[15px] font-medium text-[#3F5652] hover:text-[#0B7A68] transition-colors whitespace-nowrap py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68] rounded-md"
                  lang={isMarathi ? "mr" : "en"}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Right CTAs: Phone Button + Book Appointment */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 whitespace-nowrap">
              {/* Direct Phone Link */}
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-1.5 p-2 xl:px-3 xl:py-2 rounded-[12px] text-sm font-semibold text-[#0B7A68] hover:bg-[#EAF6F2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68]"
                aria-label={`Call hospital at ${siteConfig.contact.phone}`}
              >
                <Phone className="w-4 h-4 text-[#0B7A68] shrink-0" strokeWidth={2} />
                <span className="whitespace-nowrap hidden xl:inline">{siteConfig.contact.phone}</span>
              </a>

              {/* Primary CTA: Scrolls to and focuses the form's name field */}
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  const nameField = document.getElementById("apt-name-card");
                  if (nameField) {
                    e.preventDefault();
                    nameField.scrollIntoView({ behavior: "smooth", block: "center" });
                    setTimeout(() => {
                      nameField.focus({ preventScroll: true });
                    }, 400);
                  } else if (onOpenBooking) {
                    onOpenBooking();
                  } else {
                    router.push("/#apt-name-card");
                  }
                }}
                icon={<Calendar className="w-4 h-4 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "अपॉइंटमेंट" : "Book appointment"}
              </Button>
            </div>

            {/* Mobile Right Controls: Language Toggle Pill + Hamburger Button (< 1024px) */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher Pill */}
              <div className="inline-flex items-center rounded-full bg-[#EAF6F2] p-0.5 border border-[#D5E6E0] text-[10px] sm:text-[11px]">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-1.5 py-0.5 sm:px-2 rounded-full transition-colors cursor-pointer ${
                    language === "en"
                      ? "bg-[#F5A524] text-[#0F2321] font-bold"
                      : "text-[#3F5652] hover:text-[#0B7A68]"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("mr")}
                  className={`px-1.5 py-0.5 sm:px-2 rounded-full transition-colors cursor-pointer ${
                    language === "mr"
                      ? "bg-[#F5A524] text-[#0F2321] font-bold"
                      : "text-[#3F5652] hover:text-[#0B7A68]"
                  }`}
                  aria-label="मराठी मध्ये वाचा"
                  lang="mr"
                >
                  मराठी
                </button>
              </div>

              {/* Menu Hamburger Button */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="p-1.5 sm:p-2 rounded-xl text-[#0F2321] hover:bg-[#EAF6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A68] cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-panel"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU PORTAL / OVERLAY (Rendered outside header to escape backdrop-filter containing block) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => {
              setIsMobileMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-hidden="true"
          />

          {/* Sliding Panel */}
          <div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="relative z-50 w-full bg-white border-b border-[#D5E6E0] shadow-2xl p-5 pt-4 max-h-[85vh] overflow-y-auto flex flex-col justify-between animate-in slide-in-from-top-2 duration-150"
          >
            {/* Header row inside panel */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D5E6E0]">
              <div className="text-xs font-semibold text-[#064B40]">
                {isMarathi ? "नेव्हिगेशन मेनू" : "Navigation Menu"}
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className="p-1.5 rounded-lg text-[#5A7370] hover:bg-[#EAF6F2] hover:text-[#064B40]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* 48px Navigation Rows */}
            <nav className="py-2 divide-y divide-[#D5E6E0]/50">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-h-[48px] flex items-center justify-between px-3 text-base font-semibold text-[#0F2321] hover:bg-[#EAF6F2] hover:text-[#064B40] transition-colors rounded-xl"
                  lang={isMarathi ? "mr" : "en"}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#5A7370]" />
                </Link>
              ))}
            </nav>

            {/* Language Selector row inside menu */}
            <div className="py-3 border-t border-[#D5E6E0] flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-[#5A7370]">
                {isMarathi ? "भाषा निवडा / Language" : "Language"}
              </span>
              <div className="inline-flex items-center rounded-full bg-[#EAF6F2] p-0.5 border border-[#D5E6E0] text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full transition-colors font-bold ${
                    language === "en" ? "bg-[#F5A524] text-[#0F2321]" : "text-[#5A7370]"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("mr")}
                  className={`px-3 py-1 rounded-full transition-colors font-bold ${
                    language === "mr" ? "bg-[#F5A524] text-[#0F2321]" : "text-[#5A7370]"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Bottom Contact & Action Buttons */}
            <div className="pt-3 border-t border-[#D5E6E0] space-y-2.5">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#EAF6F2] text-[#064B40] font-bold text-sm border border-[#D5E6E0]"
              >
                <Phone className="w-4 h-4 text-[#0B7A68]" strokeWidth={2} />
                <span>Call {siteConfig.contact.phone}</span>
              </a>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenBooking) onOpenBooking();
                }}
                icon={<Calendar className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "अपॉइंटमेंट बुक करा" : "Book appointment"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
