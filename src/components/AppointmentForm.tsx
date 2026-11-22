"use client";

import React, { useState } from "react";
import { siteConfig, buildWhatsAppLink } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { useHospitalLiveStatus } from "@/lib/openingHours";
import { MessageCircle, Clock, AlertCircle } from "lucide-react";

interface AppointmentFormProps {
  onSuccess?: () => void;
  className?: string;
  isSheet?: boolean;
}

export function AppointmentForm({
  onSuccess,
  className = "",
  isSheet = false,
}: AppointmentFormProps) {
  const { isMarathi } = useLanguage();
  const liveStatus = useHospitalLiveStatus();

  const concernOptions = [
    { id: "Piles", labelEn: "Piles", labelMr: "मुळव्याध" },
    { id: "Fissure", labelEn: "Fissure", labelMr: "फिशर" },
    { id: "Fistula", labelEn: "Fistula", labelMr: "भगंदर (फिस्टुला)" },
    { id: "Other", labelEn: "Other or not sure", labelMr: "इतर / खात्री नाही" },
  ];

  const whenOptions = [
    { id: "Today", labelEn: "Today", labelMr: "आज" },
    { id: "Tomorrow", labelEn: "Tomorrow", labelMr: "उद्या" },
    { id: "Any day", labelEn: "Any day", labelMr: "कोणत्याही दिवशी" },
  ];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState(concernOptions[0].id);
  const [userSelectedWhen, setUserSelectedWhen] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Default to "Any day" when hospital is closed, otherwise "Today" (derived client state without cascading effect renders)
  const when = userSelectedWhen ?? (liveStatus.isMounted && !liveStatus.isOpen ? "Any day" : "Today");

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      errs.name = isMarathi ? "कृपया आपले नाव प्रविष्ट करा." : "Please enter your name.";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      errs.phone = isMarathi
        ? "कृपया वैध १० अंकी मोबाईल नंबर टाका (६-९ ने सुरू होणारा)."
        : "Please enter a valid 10-digit Indian mobile number.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedConcernObj = concernOptions.find((c) => c.id === concern);
    const concernLabel = isMarathi ? selectedConcernObj?.labelMr : selectedConcernObj?.labelEn;

    const selectedWhenObj = whenOptions.find((w) => w.id === when);
    const whenLabel = isMarathi ? selectedWhenObj?.labelMr : selectedWhenObj?.labelEn;

    const message = isMarathi
      ? `नमस्कार कोरे हॉस्पिटल, मला तपासणीसाठी वेळ हवी आहे:
• नाव: ${name.trim()}
• मोबाईल: ${phone.trim()}
• समस्या: ${concernLabel}
• सोयीचा दिवस: ${whenLabel}
(वेबसाइटद्वारे पाठवलेली विनंती)`
      : `Hello Kore Hospital, I would like to request a consultation:
• Name: ${name.trim()}
• Mobile: ${phone.trim()}
• Concern: ${concernLabel}
• Preferred Day: ${whenLabel}
(Sent via korehospital.in)`;

    const url = buildWhatsAppLink(message);
    window.open(url, "_blank", "noopener,noreferrer");

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className={`w-full bg-white text-[#0F2321] ${className}`}>
      {/* Header with Live Status (Subtitle removed to keep card under ~600px) */}
      <div className="pb-2.5 border-b border-[#D5E6E0] flex items-center justify-between gap-2">
        <h3 className="font-bold text-base sm:text-[17px] text-[#064B40] leading-snug">
          {isMarathi ? "तपासणीसाठी वेळ निश्चित करा" : "Request a consultation"}
        </h3>

        {/* Live IST Status Chip */}
        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAF6F2] border border-[#D5E6E0] text-[11px] font-semibold text-[#064B40]">
          {liveStatus.isMounted && (
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                liveStatus.isOpen ? "bg-[#167D48] animate-hero-pulse" : "bg-[#B87108]"
              }`}
            />
          )}
          <Clock className="w-3.5 h-3.5 text-[#0B7A68] shrink-0" strokeWidth={2} />
          <span className="whitespace-nowrap">
            {isMarathi ? liveStatus.statusTextMr : liveStatus.statusTextEn}
          </span>
        </div>
      </div>

      <form onSubmit={handleSendWhatsApp} className="mt-2.5 space-y-2.5 sm:space-y-3 text-left">
        {/* Name Field */}
        <div>
          <label htmlFor={`apt-name-${isSheet ? "sheet" : "card"}`} className="block text-xs font-semibold text-[#064B40] mb-1">
            {isMarathi ? "तुमचे नाव *" : "Your name *"}
          </label>
          <input
            id={`apt-name-${isSheet ? "sheet" : "card"}`}
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder={isMarathi ? "उदा. राहुल शर्मा" : "e.g. Rahul Sharma"}
            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-[#0F2321] text-sm placeholder:text-[#5A7370]/50 transition-[box-shadow,border-color] duration-120 focus:outline-none focus:ring-2 focus:ring-[#0B7A68] ${
              errors.name ? "border-red-500" : "border-[#D5E6E0]"
            }`}
          />
          {errors.name && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Mobile Number Field */}
        <div>
          <label htmlFor={`apt-phone-${isSheet ? "sheet" : "card"}`} className="block text-xs font-semibold text-[#064B40] mb-1">
            {isMarathi ? "मोबाईल नंबर *" : "Mobile number *"}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5A7370] select-none">
              +91
            </span>
            <input
              id={`apt-phone-${isSheet ? "sheet" : "card"}`}
              type="tel"
              inputMode="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(val);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="9876543210"
              className={`w-full h-11 pl-12 pr-3.5 rounded-xl border bg-white text-[#0F2321] text-sm placeholder:text-[#5A7370]/50 transition-[box-shadow,border-color] duration-120 focus:outline-none focus:ring-2 focus:ring-[#0B7A68] ${
                errors.phone ? "border-red-500" : "border-[#D5E6E0]"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* What's your concern? (Tappable Chips - Single Select) */}
        <div>
          <label className="block text-xs font-semibold text-[#064B40] mb-1.5">
            {isMarathi ? "आपली मुख्य समस्या काय आहे?" : "What's your concern?"}
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2" role="radiogroup" aria-label="Concern">
            {concernOptions.map((opt) => {
              const isSelected = concern === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setConcern(opt.id)}
                  className={`px-2.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold text-center border transition-all duration-120 active:scale-[0.98] cursor-pointer ${
                    isSelected
                      ? "bg-[#064B40] text-white border-[#064B40] shadow-xs"
                      : "bg-[#F4FAF8] text-[#0F2321] border-[#D5E6E0] hover:bg-[#EAF6F2]"
                  }`}
                >
                  {isMarathi ? opt.labelMr : opt.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* When? (Tappable Chips - Single Select) */}
        <div>
          <label className="block text-xs font-semibold text-[#064B40] mb-1.5">
            {isMarathi ? "कधी भेटायची इच्छा आहे?" : "When?"}
          </label>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2" role="radiogroup" aria-label="Preferred day">
            {whenOptions.map((opt) => {
              const isSelected = when === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setUserSelectedWhen(opt.id)}
                  className={`px-2 py-1.5 sm:py-2 rounded-xl text-xs font-semibold text-center border transition-all duration-120 active:scale-[0.98] cursor-pointer ${
                    isSelected
                      ? "bg-[#064B40] text-white border-[#064B40] shadow-xs"
                      : "bg-[#F4FAF8] text-[#0F2321] border-[#D5E6E0] hover:bg-[#EAF6F2]"
                  }`}
                >
                  {isMarathi ? opt.labelMr : opt.labelEn}
                </button>
              );
            })}
          </div>
          {/* Note when hospital is closed (client-only render) */}
          {liveStatus.isMounted && !liveStatus.isOpen && (
            <p className="text-[11px] text-[#5A7370] mt-1.5 leading-tight">
              {isMarathi
                ? "हॉस्पिटल सध्या बंद आहे. मेसेज पाठवा, आम्ही उघडल्यावर उत्तर देऊ."
                : "We're closed now. Send your message and we'll reply when we open."}
            </p>
          )}
        </div>

        {/* Primary CTA: Send on WhatsApp (Official WhatsApp green with > 4.5:1 contrast) */}
        <div className="pt-1 space-y-1.5 text-center">
          <button
            type="submit"
            className="w-full h-11 sm:h-12 px-5 rounded-xl bg-[#167D48] hover:bg-[#12683B] active:bg-[#0E542F] text-white font-bold text-sm sm:text-[15px] flex items-center justify-center gap-2 shadow-xs transition-all duration-120 active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white fill-white" strokeWidth={1.5} />
            <span>{isMarathi ? "व्हॉट्सॲपवर पाठवा" : "Send on WhatsApp"}</span>
          </button>

          {/* Direct Call Link */}
          <p className="text-xs text-[#5A7370]">
            {isMarathi ? "किंवा थेट संपर्क करा: " : "or call "}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="font-bold text-[#064B40] hover:underline"
            >
              {siteConfig.contact.phone}
            </a>
          </p>

          {/* Privacy Note */}
          <p className="text-[10.5px] text-[#5A7370] leading-snug pt-0.5">
            {isMarathi
              ? "यामुळे आपला संदेश थेट व्हॉट्सॲपवर उघडेल. या संकेतस्थळावर कोणतीही माहिती साठवली जात नाही."
              : "This opens WhatsApp with your message. Nothing is stored on this website."}
          </p>
        </div>
      </form>
    </div>
  );
}
