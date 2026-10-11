"use client";

import React, { useState, useEffect, useMemo } from "react";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  MailIcon,
  WhatsAppIcon,
  CheckCircleIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "./Icons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: siteConfig.treatments[0]?.title || "Dental Implants",
    date: "",
    timeSlot: "Morning (09:00 AM – 01:00 PM)",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [next7Days, setNext7Days] = useState<
    Array<{ iso: string; weekday: string; dayNum: number; monthShort: string }>
  >([]);

  useEffect(() => {
    const today = new Date();
    const todayIso = today.toISOString().split("T")[0];
    setMinDate(todayIso);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      const weekday = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.getDate();
      const monthShort = d.toLocaleDateString("en-US", { month: "short" });
      days.push({ iso, weekday, dayNum, monthShort });
    }
    setNext7Days(days);

    // Default to tomorrow for optimal clinic booking
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setFormData((prev) => ({ ...prev, date: prev.date || tomorrow.toISOString().split("T")[0] }));
  }, []);

  // Listen for quick picker or treatment card selection events
  useEffect(() => {
    const handleSelectTreatment = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setFormData((prev) => ({ ...prev, treatment: customEvent.detail }));
      }
    };
    window.addEventListener("select-treatment", handleSelectTreatment);
    return () => {
      window.removeEventListener("select-treatment", handleSelectTreatment);
    };
  }, []);

  const timeSlots = [
    { id: "Morning (09:00 AM – 01:00 PM)", label: "Morning", hours: "9 AM – 1 PM" },
    { id: "Afternoon (01:00 PM – 05:00 PM)", label: "Afternoon", hours: "1 PM – 5 PM" },
    { id: "Evening (05:00 PM – 08:30 PM)", label: "Evening", hours: "5 PM – 8:30 PM" },
  ];

  const treatmentOptions = [
    ...siteConfig.treatments.map((t) => t.title),
    "General Checkup & 3D Scan",
    "Emergency Toothache Relief",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (!formData.date) {
      errs.date = "Please select a preferred date.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedMessage = `Hello ${siteConfig.brand.name}, I would like to schedule a consultation:

*Patient Name:* ${formData.name}
*Phone:* ${formData.phone}
*Treatment:* ${formData.treatment}
*Preferred Date:* ${formData.date}
*Preferred Slot:* ${formData.timeSlot}
*Notes/Concerns:* ${formData.message || "None"}`;

    const link = buildWhatsAppLink(formattedMessage);
    window.open(link, "_blank");
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#FAFCFC] border-b border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#26B5AC]/15 text-[#0B3B4A] border border-[#26B5AC]/25 mb-3">
            CONCIERGE DESK
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3B4A] tracking-tight">
            Book Your Dental <span className="font-serif italic text-[#26B5AC]">Consultation</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#5B7480] max-w-md mx-auto">
            {siteConfig.brand.callbackNotice} Tappable app-like request with instant WhatsApp confirmation.
          </p>
        </div>

        {/* 2-Column Layout: Form & Clinic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 rounded-3xl bg-white border border-gray-200/80 shadow-md">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Name and Mobile on TOP (2 cols on sm+) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="full-name" className="block text-[11px] font-bold text-[#0B3B4A] mb-1 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#FAFCFC] text-sm text-[#12303A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#26B5AC] transition-all ${
                        errors.name ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-[11px] font-bold text-[#0B3B4A] mb-1 uppercase tracking-wider">
                      WhatsApp Mobile *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#FAFCFC] text-sm text-[#12303A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#26B5AC] transition-all ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* 2. Treatment as Wrapping Chips */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-[#0B3B4A] uppercase tracking-wider">
                      Select Treatment / Concern *
                    </label>
                    <span className="text-[10px] text-[#5B7480]">Tap to pick</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {treatmentOptions.map((title) => {
                      const isSelected = formData.treatment.toLowerCase() === title.toLowerCase();
                      return (
                        <button
                          key={title}
                          type="button"
                          onClick={() => setFormData({ ...formData, treatment: title })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                            isSelected
                              ? "bg-[#0B3B4A] text-white border-[#0B3B4A] shadow-sm shadow-[#0B3B4A]/20"
                              : "bg-[#FAFCFC] text-[#334E58] border-gray-200 hover:border-[#26B5AC]/60 hover:bg-[#E9F7F5]/50"
                          }`}
                        >
                          {title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Preferred Date: Next 7 Days Pills */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-[#0B3B4A] uppercase tracking-wider">
                      Preferred Date *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomDate(!showCustomDate)}
                      className="text-[11px] text-[#26B5AC] hover:underline font-semibold"
                    >
                      {showCustomDate ? "Show date pills" : "Pick another date"}
                    </button>
                  </div>

                  {!showCustomDate ? (
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
                      {next7Days.map((d) => {
                        const isSelected = formData.date === d.iso;
                        return (
                          <button
                            key={d.iso}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, date: d.iso });
                              if (errors.date) setErrors({ ...errors, date: "" });
                            }}
                            className={`shrink-0 flex flex-col items-center justify-center min-w-[62px] px-2.5 py-2 rounded-xl border text-center transition-all ${
                              isSelected
                                ? "bg-[#26B5AC] text-white border-[#26B5AC] shadow-md shadow-[#26B5AC]/25 font-bold"
                                : "bg-[#FAFCFC] text-[#334E58] border-gray-200 hover:border-[#26B5AC]/50 hover:bg-[#E9F7F5]/40"
                            }`}
                          >
                            <span className="text-[10px] uppercase tracking-wider opacity-85">
                              {d.weekday}
                            </span>
                            <span className="text-sm font-extrabold leading-tight mt-0.5">
                              {d.dayNum}
                            </span>
                            <span className="text-[9px] opacity-75">{d.monthShort}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="pt-1">
                      <input
                        type="date"
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: "" });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-[#FAFCFC] text-sm text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
                      />
                    </div>
                  )}
                  {errors.date && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.date}</p>
                  )}
                </div>

                {/* 4. Time Slot: 3 Pills */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0B3B4A] mb-1.5 uppercase tracking-wider">
                    Preferred Time Slot *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = formData.timeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot.id })}
                          className={`py-2 px-2 rounded-xl border text-center transition-all ${
                            isSelected
                              ? "bg-[#0B3B4A] text-white border-[#0B3B4A] shadow-sm"
                              : "bg-[#FAFCFC] text-[#334E58] border-gray-200 hover:border-[#26B5AC]/50 hover:bg-[#E9F7F5]/40"
                          }`}
                        >
                          <span className="block text-xs font-bold">{slot.label}</span>
                          <span className="block text-[10px] opacity-75 mt-0.5">{slot.hours}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Notes Collapsed behind "Add a note" */}
                <div>
                  {!showNotes ? (
                    <button
                      type="button"
                      onClick={() => setShowNotes(true)}
                      className="text-xs text-[#26B5AC] hover:text-[#1F8F87] font-semibold flex items-center gap-1"
                    >
                      <span>+ Add a note or past dental anxiety (optional)</span>
                    </button>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="notes" className="text-[11px] font-bold text-[#0B3B4A] uppercase tracking-wider">
                          Notes / Dental Concerns
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setShowNotes(false);
                            setFormData({ ...formData, message: "" });
                          }}
                          className="text-[10px] text-gray-400 hover:text-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                      <textarea
                        id="notes"
                        rows={2}
                        placeholder="Mention any pain, tooth sensitivity, past anxiety or queries..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-[#FAFCFC] text-xs text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
                      />
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-press btn-idle-shine w-full py-3.5 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#F2A65A]/25 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#07252F]" />
                  <span>Send Appointment Request via WhatsApp</span>
                </button>

                <p className="text-[11px] text-[#5B7480] text-center">
                  🔒 Instant response from clinic concierge during working hours. No spam guarantee.
                </p>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E9F7F5] flex items-center justify-center mx-auto">
                  <CheckCircleIcon className="w-8 h-8 text-[#26B5AC]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0B3B4A]">
                  Appointment Request Sent!
                </h3>
                <p className="text-sm text-[#5B7480] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your consultation request has been forwarded to our clinic concierge via WhatsApp. We will confirm your slot shortly.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="btn-press px-6 py-2.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-gray-200 text-[#0B3B4A]"
                  >
                    Submit Another Request
                  </button>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="btn-press px-6 py-2.5 rounded-full text-xs font-bold bg-[#0B3B4A] text-white"
                  >
                    Call Clinic Now
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Clinic Information & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Info Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0B3B4A] text-white shadow-xl space-y-4">
              <h3 className="font-display text-xl font-bold text-white">
                Visit {siteConfig.brand.shortName || siteConfig.brand.name}
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-white/85">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-[#26B5AC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white text-xs">Address</strong>
                    <span>{siteConfig.brand.fullAddress}</span>
                    {siteConfig.brand.landmark && (
                      <span className="block text-white/60 text-[11px] mt-0.5">
                        ({siteConfig.brand.landmark})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-[#26B5AC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white text-xs">Operating Hours</strong>
                    <span>{siteConfig.hours.regular}</span>
                    <span className="block text-white/70 text-[11px] mt-0.5">
                      {siteConfig.hours.sunday}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-[#26B5AC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white text-xs">Direct Line</strong>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="hover:text-[#F2A65A] font-semibold transition-colors block"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                {siteConfig.contact.email && (
                  <div className="flex items-start gap-3">
                    <MailIcon className="w-5 h-5 text-[#26B5AC] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-xs">Email Concierge</strong>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="hover:text-[#F2A65A] transition-colors block"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/15">
                <a
                  href={siteConfig.brand.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all text-center"
                >
                  <MapPinIcon className="w-4 h-4 text-[#26B5AC]" />
                  <span>Get Driving Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Embedded Map Container */}
            {siteConfig.sections.showMap && (
              <div className="relative w-full h-48 sm:h-52 rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm bg-gray-100">
                <iframe
                  title={`${siteConfig.brand.name} Location Map`}
                  src={
                    siteConfig.brand.embeddedMapUrl ||
                    `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.brand.fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[0.2] contrast-[1.05]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
