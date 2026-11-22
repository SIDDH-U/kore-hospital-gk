"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui/Button";
import { X, CheckCircle2, MessageCircle, Calendar } from "lucide-react";

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
  const { isMarathi } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: defaultDepartment || siteConfig.treatments[0]?.title || "Piles / Hemorrhoids",
    doctor: "Any Available Specialist",
    date: "",
    time: "Morning (09:00 AM – 01:00 PM)",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prevDept, setPrevDept] = useState(defaultDepartment);
  if (defaultDepartment !== prevDept) {
    setPrevDept(defaultDepartment);
    if (defaultDepartment) {
      setFormData((prev) => ({ ...prev, treatment: defaultDepartment }));
    }
  }

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
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = isMarathi ? "कृपया नाव लिहा." : "Please enter your name.";
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) errs.phone = isMarathi ? "१० अंकी नंबर टाका." : "Enter a 10-digit number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = `Hello Kore Hospital Gangakhed, I would like to book a consultation:

*Patient:* ${formData.name}
*Phone:* ${formData.phone}
*Condition/Topic:* ${formData.treatment}
*Doctor:* ${formData.doctor}
*Date:* ${formData.date}
*Time:* ${formData.time}`;

    const link = buildWhatsAppLink(message);
    window.open(link, "_blank");
    setIsSubmitted(true);
  };

  const treatmentOptions = [
    ...siteConfig.treatments.map((t) => t.title),
    "General Anorectal Consultation",
  ];

  const doctorOptions = [
    "Any Available Specialist",
    ...siteConfig.doctors.map((d) => d.name),
  ];

  return (
    <dialog
      ref={dialogRef}
      className="m-auto rounded-[16px] bg-white text-[#0F2321] p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-xs max-w-lg w-[calc(100%-2rem)] border border-[#D5E6E0]"
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#D5E6E0]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-[#EAF6F2] text-[#0B7A68] flex items-center justify-center">
              <Calendar className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#052F29]">
                {isMarathi ? "अपॉइंटमेंट बुक करा" : "Book appointment"}
              </h3>
              <p className="text-[11px] text-[#3F5652]">
                {isMarathi ? "कोरे हॉस्पिटल – गंगाखेड" : "Kore Hospital – Gangakhed"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#3F5652] hover:bg-[#EAF6F2] hover:text-[#052F29] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#1B8755] mx-auto" strokeWidth={2} />
            <h4 className="font-bold text-base text-[#052F29]">
              {isMarathi ? "अपॉइंटमेंट विनंती पाठवली!" : "Request sent on WhatsApp!"}
            </h4>
            <p className="text-xs text-[#3F5652] max-w-xs mx-auto">
              {isMarathi
                ? "आमचे रुग्णालय पथक लवकरच आपल्याशी पुष्टी करण्यासाठी संपर्क करेल."
                : "Our clinic reception will confirm your slot shortly."}
            </p>
            <div className="pt-3">
              <Button variant="secondary-light" size="sm" onClick={onClose}>
                {isMarathi ? "बंद करा" : "Close"}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#052F29] mb-1">
                {isMarathi ? "रुग्णाचे पूर्ण नाव *" : "Patient full name *"}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={isMarathi ? "उदा. रमेश पाटील" : "e.g. Rahul Sharma"}
                className={`w-full px-3.5 py-2.5 rounded-[10px] border text-sm text-[#0F2321] placeholder:text-[#3F5652]/50 focus:outline-none focus:border-[#0B7A68] ${errors.name ? "border-red-500" : "border-[#D5E6E0]"
                  }`}
              />
              {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#052F29] mb-1">
                {isMarathi ? "मोबाईल नंबर *" : "Mobile number *"}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit mobile number"
                className={`w-full px-3.5 py-2.5 rounded-[10px] border text-sm text-[#0F2321] placeholder:text-[#3F5652]/50 focus:outline-none focus:border-[#0B7A68] ${errors.phone ? "border-red-500" : "border-[#D5E6E0]"
                  }`}
              />
              {errors.phone && <p className="text-[11px] text-red-600 mt-0.5">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#052F29] mb-1">
                  {isMarathi ? "उपचार / समस्या" : "Treatment / Symptom"}
                </label>
                <select
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full px-3 py-2 rounded-[10px] border border-[#D5E6E0] text-xs text-[#0F2321] focus:outline-none focus:border-[#0B7A68] bg-white"
                >
                  {treatmentOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#052F29] mb-1">
                  {isMarathi ? "डॉक्टर प्राधान्य" : "Doctor preference"}
                </label>
                <select
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full px-3 py-2 rounded-[10px] border border-[#D5E6E0] text-xs text-[#0F2321] focus:outline-none focus:border-[#0B7A68] bg-white"
                >
                  {doctorOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                icon={<MessageCircle className="w-5 h-5 text-[#0F2321]" strokeWidth={2} />}
              >
                {isMarathi ? "व्हॉट्सॲपवर पुष्टी करा" : "Confirm on WhatsApp"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
