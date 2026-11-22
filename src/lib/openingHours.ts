import { useSyncExternalStore } from "react";
import { clinicConfig } from "@/config/site.config";

export interface HospitalStatus {
  isMounted: boolean;
  isOpen: boolean;
  statusTextEn: string;
  statusTextMr: string;
  hoursDisplayEn: string;
  hoursDisplayMr: string;
}

export const NEUTRAL_SERVER_STATUS: HospitalStatus = {
  isMounted: false,
  isOpen: false,
  statusTextEn: "Mon–Sat 9:00 AM – 8:00 PM · Sun 9:00 AM – 2:00 PM",
  statusTextMr: "सोम–शनि स. ९:०० – रा. ८:०० · रवि स. ९:०० – दु. २:००",
  hoursDisplayEn: clinicConfig.hours.display,
  hoursDisplayMr: clinicConfig.hours.displayMr,
};

export function getHospitalLiveStatus(): HospitalStatus {
  // Compute current date & time in IST (Asia/Kolkata = UTC+5:30)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000;
  const istDate = new Date(utc + istOffset);

  const day = istDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  let isOpen = false;
  let todayHoursEn = "9:00 AM – 8:00 PM";
  let todayHoursMr = "सकाळी ९:०० – रात्री ८:००";
  let nextOpenTimeEn = "9:00 AM";
  let nextOpenTimeMr = "सकाळी ९:००";

  if (day === 0) {
    // Sunday: 9:00 AM to 2:00 PM
    todayHoursEn = "9:00 AM – 2:00 PM";
    todayHoursMr = "सकाळी ९:०० – दुपारी २:००";
    const openTime = 9 * 60; // 540
    const closeTime = 14 * 60; // 840
    if (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
      isOpen = true;
    }
  } else {
    // Monday – Saturday: 9:00 AM to 8:00 PM
    const openTime = 9 * 60; // 540
    const closeTime = 20 * 60; // 1200
    if (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {
      isOpen = true;
    }
    if (day === 6 && currentTimeInMinutes >= closeTime) {
      // Saturday after close, next open is Sunday 9:00 AM
      nextOpenTimeEn = "Sunday 9:00 AM";
      nextOpenTimeMr = "रविवारी सकाळी ९:००";
    }
  }

  const statusTextEn = isOpen
    ? `Open today · ${todayHoursEn}`
    : `Closed · Opens ${nextOpenTimeEn}`;

  const statusTextMr = isOpen
    ? `आज सुरू आहे · ${todayHoursMr}`
    : `बंद आहे · उघडेल ${nextOpenTimeMr}`;

  return {
    isMounted: true,
    isOpen,
    statusTextEn,
    statusTextMr,
    hoursDisplayEn: todayHoursEn,
    hoursDisplayMr: todayHoursMr,
  };
}

let cachedClientStatus: HospitalStatus | null = null;
let lastCheckMinute = -1;

function getClientSnapshot(): HospitalStatus {
  if (typeof window === "undefined") return NEUTRAL_SERVER_STATUS;
  const currentMinute = Math.floor(Date.now() / 60000);
  if (!cachedClientStatus || lastCheckMinute !== currentMinute) {
    lastCheckMinute = currentMinute;
    cachedClientStatus = getHospitalLiveStatus();
  }
  return cachedClientStatus;
}

function getServerSnapshot(): HospitalStatus {
  return NEUTRAL_SERVER_STATUS;
}

function subscribe(callback: () => void): () => void {
  const timer = setInterval(callback, 60000);
  return () => clearInterval(timer);
}

/**
 * Hook to read hospital live opening status.
 * Renders NEUTRAL_SERVER_STATUS on server/prerender to prevent hydration mismatch.
 * Recomputes live status strictly on client after mounting.
 */
export function useHospitalLiveStatus(): HospitalStatus {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
