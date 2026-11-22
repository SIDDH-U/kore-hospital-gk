"use client";

import React from "react";
import { AppointmentForm } from "@/components/AppointmentForm";

export function BookFormSkeleton() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#D5E6E0] animate-pulse">
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
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D5E6E0]">
      <AppointmentForm />
    </div>
  );
}
