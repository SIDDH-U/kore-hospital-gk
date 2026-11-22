"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhenToSeeDoctor } from "@/components/WhenToSeeDoctor";
import { UnderstandCondition } from "@/components/UnderstandCondition";
import { TreatmentsGrid } from "@/components/TreatmentsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { DoctorsMarquee } from "@/components/DoctorsMarquee";
import { PrivacyComfort } from "@/components/PrivacyComfort";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactSection } from "@/components/ContactSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BookingSheet } from "@/components/BookingSheet";

export function HomeClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F2321] selection:bg-[#EAF6F2] selection:text-[#0B7A68]">
      {/* 1. Desktop Top Bar (36px, non-wrapping) */}
      <TopStrip />

      {/* 2. Main Navigation Bar */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content with bottom padding on mobile for sticky action bar */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* 3. Hero Section (Bright light mint-to-white, 7/5 col grid on desktop, 1-screen mobile) */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 4. Symptoms / "When to consult" (Mint background, 2-col compact tiles) */}
        <WhenToSeeDoctor />

        {/* 5. "Understand your condition" (White background, swipeable on mobile, 4-col on desktop) */}
        <UnderstandCondition />

        {/* 6. Treatments (White background, 2-col compact tiles with soft hue tints) */}
        <TreatmentsGrid />

        {/* 7. "How a visit works" (Deep green band with white text & amber step numbers) */}
        <HowItWorks />

        {/* 8. Doctors Section (White background, 72px tinted avatars, zero photos) */}
        {siteConfig.sections.showDoctors && <DoctorsMarquee />}

        {/* 9. Privacy & Comfort (Mint background, three short icon rows) */}
        <PrivacyComfort />

        {/* 10. FAQ Section (White background, all collapsed by default) */}
        <FaqAccordion />

        {/* 11. Contact Section (Mint background, Map + Hospital Building Photo beside map) */}
        <ContactSection />

        {/* 12. Deep-green Pre-footer CTA Band */}
        <CtaBanner onOpenBooking={handleOpenBooking} />
      </main>

      {/* 13. Compact Footer */}
      <Footer />

      {/* 14. Desktop Floating WhatsApp Button (56px round icon, 24px from corner) */}
      <FloatingWhatsApp />

      {/* 15. Mobile Sticky Bottom Action Bar (3 equal buttons: Call | WhatsApp | Book) */}
      <StickyActionBar onOpenBooking={handleOpenBooking} />

      {/* 16. Appointment Booking Sheet / Dialog */}
      <BookingSheet
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
      />
    </div>
  );
}
