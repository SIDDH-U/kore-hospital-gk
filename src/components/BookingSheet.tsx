"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AppointmentForm } from "./AppointmentForm";

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingSheet({ isOpen, onClose }: BookingSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet / Dialog Container */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Appointment request sheet"
        className="relative z-50 w-full max-w-lg mx-auto bg-white rounded-t-[28px] sm:rounded-[28px] border-t sm:border border-[#D5E6E0] shadow-2xl p-5 sm:p-6 pb-8 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-5 duration-200"
      >
        {/* Drag Handle (Mobile only) */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-[#D5E6E0] mx-auto mb-3.5" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#5A7370] hover:bg-[#EAF6F2] hover:text-[#064B40] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Form Body */}
        <AppointmentForm onSuccess={onClose} isSheet />
      </div>
    </div>
  );
}
