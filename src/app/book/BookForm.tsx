"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { useRipple, useIdleAnimationObserver } from "@/components/useRipple";
import {
  CalendarIcon,
  PhoneIcon,
  WhatsAppIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/Icons";

export function BookFormSkeleton() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 animate-pulse">
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="h-6 w-36 bg-gray-200 rounded-full mb-3" />
        <div className="h-8 w-64 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-80 bg-gray-200 rounded" />
      </div>
      <div className="space-y-4">
        <div className="h-12 w-full bg-gray-100 rounded-xl" />
        <div className="h-12 w-full bg-gray-100 rounded-xl" />
        <div className="h-12 w-full bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
}

export function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const treatmentParam = searchParams.get("treatment") || searchParams.get("dept") || "";
  const doctorParam = searchParams.get("doctor") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: treatmentParam || siteConfig.treatments[0]?.title || "Dental Implants",
    doctor: doctorParam || "Any Available Specialist",
    date: "",
    time: "Morning (09:00 AM – 01:00 PM)",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [minDate, setMinDate] = useState("");

  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  useIdleAnimationObserver(submitBtnRef);
  const { ripples, createRipple } = useRipple("teal");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (treatmentParam) {
      setFormData((prev) => ({ ...prev, treatment: treatmentParam }));
    }
    if (doctorParam) {
      setFormData((prev) => ({ ...prev, doctor: doctorParam }));
    }
  }, [treatmentParam, doctorParam]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) errs.phone = "Please enter a valid 10-digit mobile number.";
    if (!formData.date) errs.date = "Please select a date.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `Hello ${siteConfig.brand.name}, I would like to book a visit:

*Patient:* ${formData.name}
*Phone:* ${formData.phone}
*Treatment:* ${formData.treatment}
*Doctor Preference:* ${formData.doctor}
*Date:* ${formData.date}
*Slot:* ${formData.time}
*Notes:* ${formData.notes || "None"}`;

    const link = buildWhatsAppLink(message);
    window.open(link, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
      {!isSubmitted ? (
        <div>
          <div className="text-center mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9F7F5] text-[#0B3B4A] border border-[#26B5AC]/30 mb-2.5">
              INSTANT SCHEDULING
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3B4A]">
              Book Your Consultation
            </h1>
            <p className="text-xs sm:text-sm text-[#5B7480] mt-1.5">
              {siteConfig.brand.callbackNotice}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="bk-name" className="block text-xs font-bold text-[#12303A] mb-1.5 uppercase tracking-wider">
                Full Name *
              </label>
              <input
                id="bk-name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFCFC] text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="bk-phone" className="block text-xs font-bold text-[#12303A] mb-1.5 uppercase tracking-wider">
                Mobile Number (WhatsApp) *
              </label>
              <input
                id="bk-phone"
                type="tel"
                required
                placeholder="e.g. 98765 43210"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFCFC] text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="bk-treatment" className="block text-xs font-bold text-[#12303A] mb-1.5 uppercase tracking-wider">
                Treatment *
              </label>
              <select
                id="bk-treatment"
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFCFC] text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
              >
                {siteConfig.treatments.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.title} (From {t.startingPrice})
                  </option>
                ))}
                <option value="General Checkup & 3D Scan">General Checkup & 3D Scan (₹500)</option>
              </select>
            </div>

            <div>
              <label htmlFor="bk-doc" className="block text-xs font-bold text-[#12303A] mb-1.5 uppercase tracking-wider">
                Doctor Preference
              </label>
              <select
                id="bk-doc"
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFCFC] text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
              >
                <option value="Any Available Specialist">Any Available Specialist</option>
                {siteConfig.doctors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.speciality})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-date" className="block text-xs font-bold text-[#12303A] mb-1.5 uppercase tracking-wider">
                  Preferred Date *
                </label>
                <input
                  id="bk-date"
                  type="date"
                  required
                  min={minDate}
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFCFC] text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
                />
                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="bk-time" className="block text-xs font-bold text-[#12303A] mb-1.5 uppercase tracking-wider">
                  Time Slot *
                </label>
                <select
                  id="bk-time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFCFC] text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
                >
                  <option value="Morning (09:00 AM – 01:00 PM)">Morning (09:00 AM – 01:00 PM)</option>
                  <option value="Afternoon (01:00 PM – 05:00 PM)">Afternoon (01:00 PM – 05:00 PM)</option>
                  <option value="Evening (05:00 PM – 08:30 PM)">Evening (05:00 PM – 08:30 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="bk-notes" className="block text-xs font-bold text-[#12303A] mb-1.5 uppercase tracking-wider">
                Notes or Concerns (Optional)
              </label>
              <textarea
                id="bk-notes"
                rows={2}
                placeholder="Mention any dental anxiety, toothache history, or preferences..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFCFC] text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
              />
            </div>

            <button
              ref={submitBtnRef}
              type="submit"
              onPointerDown={createRipple}
              className="btn-idle-shine btn-ripple-container btn-press w-full py-4 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#F2A65A]/25 mt-6"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#07252F]" />
              <span>Confirm Appointment via WhatsApp</span>

              {ripples.map((r) => (
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
          </form>
        </div>
      ) : (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E9F7F5] flex items-center justify-center mx-auto">
            <CheckCircleIcon className="w-8 h-8 text-[#26B5AC]" />
          </div>
          <h2 className="font-display text-2xl font-bold text-[#0B3B4A]">
            Request Received!
          </h2>
          <p className="text-xs sm:text-sm text-[#5B7480] max-w-sm mx-auto">
            Your appointment details have opened in WhatsApp. Our concierge desk will confirm your scheduled slot within 15 minutes.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-press px-6 py-2.5 rounded-full text-xs font-bold bg-[#0B3B4A] text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
