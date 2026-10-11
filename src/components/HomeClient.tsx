"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { TopStrip } from "@/components/TopStrip";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RatingAndQuickPicker } from "@/components/RatingAndQuickPicker";
import { TreatmentsGrid } from "@/components/TreatmentsGrid";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SmileGallery } from "@/components/SmileGallery";
import { DoctorsMarquee } from "@/components/DoctorsMarquee";
import { ReviewsSection } from "@/components/ReviewsSection";
import { HowItWorks } from "@/components/HowItWorks";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { StickyActionBar } from "@/components/StickyActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AppointmentModal } from "@/components/AppointmentModal";
import { useScrollAnimation } from "@/components/useScrollAnimation";

export function HomeClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");

  // Activate scroll-driven entrance and touch-first card observers
  useScrollAnimation();

  const handleOpenBooking = (treatmentName?: string) => {
    setSelectedTreatment(treatmentName || "");
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFC] text-[#12303A] selection:bg-[#E9F7F5] selection:text-[#0B3B4A]">
      {/* 1. Top bar: address, working hours, phone */}
      <TopStrip />

      {/* 2. Nav */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content with bottom padding on mobile for sticky action bar */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* 3. Hero */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Rating strip + quick picker */}
        <RatingAndQuickPicker onSelectTreatment={(t) => setSelectedTreatment(t)} />

        {/* 5. Treatments carousel (with prices) */}
        <TreatmentsGrid onOpenBooking={(t) => handleOpenBooking(t)} />

        {/* 6. Why choose us (Deep teal 2x3 grid) */}
        <WhyChooseUs />

        {/* 7. Smile Gallery (Interactive single-card slider carousel) */}
        {siteConfig.sections.showGallery && <SmileGallery />}

        {/* 8. Doctors (Meet our dentists strip) */}
        {siteConfig.sections.showDoctors && <DoctorsMarquee />}

        {/* 9. Reviews (Swipeable card carousel directly after doctors) */}
        {siteConfig.sections.showReviews && <ReviewsSection />}

        {/* 10. How it works (Compact 4-step stepper) */}
        <HowItWorks />

        {/* 11. FAQ (First 4 questions + expandable remainder) */}
        <FaqAccordion />

        {/* 12. CTA banner */}
        <CtaBanner onOpenBooking={() => handleOpenBooking()} />

        {/* 13. Contact form + map */}
        <ContactSection />
      </main>

      {/* 14. Footer */}
      <Footer />

      {/* Desktop Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Bottom Action Bar (Call Now / Book on WhatsApp) */}
      <StickyActionBar onOpenBooking={() => handleOpenBooking()} />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        defaultDepartment={selectedTreatment}
      />
    </div>
  );
}
