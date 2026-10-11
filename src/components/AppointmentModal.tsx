"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { CalendarIcon, CloseIcon, CheckCircleIcon, WhatsAppIcon } from "./Icons";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartment?: string;
}

export function AppointmentModal({
  isOpen,
  onClose,
  defaultDepartment = "",
}: AppointmentModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: defaultDepartment || siteConfig.treatments[0]?.title || "Dental Implants",
    date: "",
    time: "Morning (09:00 AM – 01:00 PM)",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setFormData((prev) => ({ ...prev, date: prev.date || tomorrow.toISOString().split("T")[0] }));
  }, []);

  useEffect(() => {
    if (defaultDepartment) {
      setFormData((prev) => ({ ...prev, treatment: defaultDepartment }));
    }
  }, [defaultDepartment]);

  // Sync isOpen with native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setIsSubmitted(false);
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle backdrop clicks and Escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    const handleClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInside) {
        onClose();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  const timeSlots = [
    { id: "Morning (09:00 AM – 01:00 PM)", label: "Morning", hours: "9 AM – 1 PM" },
    { id: "Afternoon (01:00 PM – 05:00 PM)", label: "Afternoon", hours: "1 PM – 5 PM" },
    { id: "Evening (05:00 PM – 08:30 PM)", label: "Evening", hours: "5 PM – 8:30 PM" },
  ];

  const treatmentOptions = [
    ...siteConfig.treatments.map((t) => t.title),
    "General Checkup & 3D Scan",
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

    const rawMessage = `Hello ${siteConfig.brand.name}, I would like to book a dental consultation:

*Patient Name:* ${formData.name}
*Phone:* ${formData.phone}
*Treatment:* ${formData.treatment}
*Preferred Date:* ${formData.date}
*Preferred Time:* ${formData.time}
*Concerns:* ${formData.notes || "None"}`;

    const link = buildWhatsAppLink(rawMessage);
    window.open(link, "_blank");
    setIsSubmitted(true);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="appointment-dialog-title"
      className="m-auto p-0 rounded-3xl bg-white shadow-2xl max-w-lg w-[calc(100%-2rem)] backdrop:bg-[#0B3B4A]/65 backdrop:backdrop-blur-sm focus:outline-none overflow-hidden"
    >
      <div className="relative p-5 sm:p-7 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-[#12303A] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#26B5AC] cursor-pointer"
          aria-label="Close modal"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="pr-10 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E9F7F5] text-[#0B3B4A] mb-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#26B5AC]" /> Quick Scheduling
              </span>
              <h2
                id="appointment-dialog-title"
                className="font-serif text-xl sm:text-2xl font-bold text-[#0B3B4A] tracking-tight"
              >
                Book Your Consultation
              </h2>
              <p className="text-xs text-[#5B7480] mt-0.5">
                {siteConfig.brand.callbackNotice} Instant WhatsApp booking.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Name & Mobile on top */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="patient-name-modal" className="block text-[11px] font-bold text-[#0B3B4A] mb-1 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    id="patient-name-modal"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    className={`w-full px-3 py-2 rounded-xl border bg-[#FAFCFC] text-sm text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC] transition-all ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="patient-phone-modal" className="block text-[11px] font-bold text-[#0B3B4A] mb-1 uppercase tracking-wider">
                    WhatsApp Mobile *
                  </label>
                  <input
                    id="patient-phone-modal"
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`w-full px-3 py-2 rounded-xl border bg-[#FAFCFC] text-sm text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC] transition-all ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* 2. Treatment wrapping chips */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B3B4A] mb-1.5 uppercase tracking-wider">
                  Select Treatment *
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {treatmentOptions.map((title) => {
                    const isSelected = formData.treatment.toLowerCase() === title.toLowerCase();
                    return (
                      <button
                        key={title}
                        type="button"
                        onClick={() => setFormData({ ...formData, treatment: title })}
                        className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border ${
                          isSelected
                            ? "bg-[#0B3B4A] text-white border-[#0B3B4A]"
                            : "bg-[#FAFCFC] text-[#334E58] border-gray-200 hover:border-[#26B5AC]/60"
                        }`}
                      >
                        {title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Next 7 days pills */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-[#0B3B4A] uppercase tracking-wider">
                    Preferred Date *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowCustomDate(!showCustomDate)}
                    className="text-[11px] text-[#26B5AC] hover:underline font-semibold"
                  >
                    {showCustomDate ? "Show pills" : "Pick another date"}
                  </button>
                </div>

                {!showCustomDate ? (
                  <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
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
                          className={`shrink-0 flex flex-col items-center justify-center min-w-[58px] px-2 py-1.5 rounded-xl border text-center transition-all ${
                            isSelected
                              ? "bg-[#26B5AC] text-white border-[#26B5AC] font-bold shadow-xs"
                              : "bg-[#FAFCFC] text-[#334E58] border-gray-200 hover:border-[#26B5AC]/50"
                          }`}
                        >
                          <span className="text-[9px] uppercase tracking-wider opacity-85">
                            {d.weekday}
                          </span>
                          <span className="text-xs font-extrabold leading-tight mt-0.5">
                            {d.dayNum}
                          </span>
                          <span className="text-[9px] opacity-75">{d.monthShort}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    type="date"
                    min={minDate}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: "" });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAFCFC] text-sm text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
                  />
                )}
                {errors.date && (
                  <p className="text-[11px] text-red-500 mt-0.5 font-medium">{errors.date}</p>
                )}
              </div>

              {/* 4. Time slot pills */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B3B4A] mb-1 uppercase tracking-wider">
                  Preferred Time Slot *
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot.id })}
                        className={`py-1.5 px-1.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "bg-[#0B3B4A] text-white border-[#0B3B4A]"
                            : "bg-[#FAFCFC] text-[#334E58] border-gray-200 hover:border-[#26B5AC]/50"
                        }`}
                      >
                        <span className="block text-xs font-bold">{slot.label}</span>
                        <span className="block text-[9px] opacity-75">{slot.hours}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Collapsed notes */}
              <div>
                {!showNotes ? (
                  <button
                    type="button"
                    onClick={() => setShowNotes(true)}
                    className="text-xs text-[#26B5AC] hover:text-[#1F8F87] font-semibold"
                  >
                    + Add a note or symptoms (optional)
                  </button>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="notes-modal" className="text-[11px] font-bold text-[#0B3B4A] uppercase tracking-wider">
                        Notes / Concerns
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNotes(false);
                          setFormData({ ...formData, notes: "" });
                        }}
                        className="text-[10px] text-gray-400 hover:text-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                    <textarea
                      id="notes-modal"
                      rows={2}
                      placeholder="e.g. Sensitive lower molar, past dental anxiety..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAFCFC] text-xs text-[#12303A] focus:outline-none focus:ring-2 focus:ring-[#26B5AC]"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-press btn-idle-shine w-full py-3.5 rounded-full bg-[#F2A65A] hover:bg-[#E09244] text-[#07252F] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F2A65A]/25 transition-all mt-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#07252F]" />
                <span>Confirm on WhatsApp</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#E9F7F5] flex items-center justify-center mx-auto">
              <CheckCircleIcon className="w-7 h-7 text-[#26B5AC]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0B3B4A]">
              Request Forwarded!
            </h3>
            <p className="text-xs text-[#5B7480] max-w-sm mx-auto">
              Your appointment request has been opened in WhatsApp. Our clinic coordinator will confirm your exact consultation time.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-press px-6 py-2 rounded-full text-xs font-bold bg-[#0B3B4A] text-white"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
