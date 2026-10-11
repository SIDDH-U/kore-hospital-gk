"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DentalLogo } from "./DentalLogo";
import {
  SparkleIcon,
  CameraIcon,
  DoctorBadgeIcon,
  StarIcon,
  HelpCircleIcon,
  PhoneIcon,
  CalendarIcon,
  ArrowRightIcon,
  WhatsAppIcon,
} from "./Icons";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { useHeaderScroll } from "./useScrollAnimation";
import { useRipple, useIdleAnimationObserver } from "./useRipple";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const isScrolled = useHeaderScroll();

  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const desktopBtnRef = useRef<HTMLAnchorElement>(null);
  useIdleAnimationObserver(desktopBtnRef);

  const { ripples: desktopRipples, createRipple: createDesktopRipple } = useRipple("teal");
  const { ripples: popupBookRipples, createRipple: createPopupBookRipple } = useRipple("teal");

  // Close popup on route change
  useEffect(() => {
    setIsPopupOpen(false);
  }, [pathname]);

  // Body scroll lock and focus management
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
      setIsAnimating(true);
      // Focus first link or button inside popup after render
      const timer = setTimeout(() => {
        const firstFocusable = popupRef.current?.querySelector<HTMLElement>(
          'a, button, [tabindex="0"]'
        );
        firstFocusable?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      if (isAnimating) {
        toggleBtnRef.current?.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen, isAnimating]);

  // Trap focus and close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isPopupOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setIsPopupOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = popupRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [isPopupOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navLinks = [
    { name: "Treatments", href: "/treatments", icon: SparkleIcon, show: true },
    { name: "Smile Gallery", href: "/gallery", icon: CameraIcon, show: siteConfig.sections.showGallery },
    { name: "Doctors", href: "/doctors", icon: DoctorBadgeIcon, show: siteConfig.sections.showDoctors },
    { name: "Reviews", href: "/reviews", icon: StarIcon, show: siteConfig.sections.showReviews },
    { name: "FAQ", href: "/#faq", icon: HelpCircleIcon, show: true },
    { name: "Contact", href: "/contact", icon: PhoneIcon, show: true },
  ].filter((l) => l.show !== false);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-[#FAFCFC]/95 backdrop-blur-md transition-all duration-200 border-b ${
        isScrolled
          ? "border-gray-200/60 shadow-[0_4px_20px_rgba(11,59,74,0.06)] h-16 sm:h-18"
          : "border-gray-100 h-20"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Left */}
          <div className="shrink-0">
            <DentalLogo variant="dark" />
          </div>

          {/* Desktop Nav Center (1024px+) */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-8"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] rounded ${
                    active
                      ? "text-[#0B3B4A] font-bold"
                      : "text-[#5B7480] hover:text-[#0B3B4A]"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-[#26B5AC] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right: Call & Book CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="text-xs font-bold text-[#0B3B4A] hover:text-[#26B5AC] transition-colors py-2 px-3 rounded-full border border-gray-200 hover:border-[#26B5AC]/40 flex items-center gap-1.5"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#26B5AC]" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <Link
              ref={desktopBtnRef}
              href="/book"
              onClick={handleBookClick}
              onPointerDown={createDesktopRipple}
              style={{ "--shine-delay": "0.4s" } as React.CSSProperties}
              className="btn-ripple-container btn-idle-shine btn-press inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-bold text-sm shadow-md shadow-[#F2A65A]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-all"
            >
              <CalendarIcon className="w-4 h-4 text-[#07252F] shrink-0" />
              <span>Book Appointment</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#07252F]" />

              {desktopRipples.map((r) => (
                <span
                  key={r.id}
                  className="btn-ripple-circle"
                  style={{
                    left: r.x,
                    top: r.y,
                    width: r.size,
                    height: r.size,
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </Link>
          </div>

          {/* Mobile Right: Animated Morphing Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setIsPopupOpen((prev) => !prev)}
              aria-expanded={isPopupOpen}
              aria-controls="mobile-navigation-popup"
              aria-label={isPopupOpen ? "Close menu" : "Open navigation menu"}
              className="relative w-11 h-11 rounded-2xl flex items-center justify-center text-[#0B3B4A] hover:bg-[#E9F7F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] transition-colors"
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                {/* Top line morphs */}
                <span
                  className={`block h-0.5 w-full bg-[#0B3B4A] rounded-full transition-transform duration-250 ease-out origin-center ${
                    isPopupOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                {/* Middle line fades */}
                <span
                  className={`block h-0.5 w-full bg-[#0B3B4A] rounded-full transition-opacity duration-150 ${
                    isPopupOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                {/* Bottom line morphs */}
                <span
                  className={`block h-0.5 w-full bg-[#0B3B4A] rounded-full transition-transform duration-250 ease-out origin-center ${
                    isPopupOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE ANIMATED POPUP MENU CARD
          - Anchored under header at top-right
          - ~88% of screen width, max 340px, auto height, rounded 24px
          - Scale from 0.92, spring fade-in, backdrop dim + blur
         ======================================================== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-[#0B3B4A]/40 backdrop-blur-sm transition-opacity duration-200 ${
          isPopupOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsPopupOpen(false)}
        aria-hidden="true"
      />

      {/* Popup Dialog Card */}
      <div
        ref={popupRef}
        id="mobile-navigation-popup"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed top-18 right-4 sm:right-6 z-50 lg:hidden w-[calc(100vw-32px)] max-w-[340px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(11,59,74,0.18)] border border-[#E9F7F5] p-4 sm:p-5 transition-all origin-top-right ${
          isPopupOpen
            ? "opacity-100 scale-100 pointer-events-auto duration-240 ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "opacity-0 scale-92 pointer-events-none duration-160 ease-in"
        }`}
      >
        {/* 6 Links with Staggered Visual Delay */}
        <nav className="flex flex-col gap-1 mb-4" aria-label="Mobile Navigation Links">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsPopupOpen(false)}
                style={{
                  transitionDelay: isPopupOpen ? `${index * 40}ms` : "0ms",
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#E9F7F5] text-[#0B3B4A] font-bold"
                    : "text-[#12303A] hover:bg-[#F7FDFC] hover:text-[#0B3B4A]"
                } ${isPopupOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    active ? "bg-[#26B5AC]/20 text-[#0B3B4A]" : "bg-gray-100 text-[#5B7480]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="flex-1">{link.name}</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-[#26B5AC] opacity-60" />
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs: Book Appointment & WhatsApp Chat */}
        <div className="pt-3 border-t border-gray-100 space-y-2.5">
          {/* Full-width Book Appointment Button */}
          <button
            type="button"
            onClick={() => {
              setIsPopupOpen(false);
              onOpenBooking?.();
            }}
            onPointerDown={createPopupBookRipple}
            className="btn-ripple-container btn-press w-full h-11 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-bold text-sm flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC]"
          >
            <CalendarIcon className="w-4 h-4 text-[#07252F]" />
            <span>Book Appointment</span>

            {popupBookRipples.map((r) => (
              <span
                key={r.id}
                className="btn-ripple-circle"
                style={{
                  left: r.x,
                  top: r.y,
                  width: r.size,
                  height: r.size,
                  backgroundColor: "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </button>

          {/* Chat on WhatsApp Button */}
          <a
            href={buildWhatsAppLink(
              `Hello ${siteConfig.brand.name}, I would like to book a dental consultation.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsPopupOpen(false)}
            className="btn-press w-full h-11 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
