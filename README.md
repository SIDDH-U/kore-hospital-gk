# Kore Hospital – Piles (Mūlvyādh) Centre Website

Official web application for **Kore Hospital – Piles Centre** (कोरे हॉस्पिटल – मूळव्याध सेंटर), a specialist proctology hospital in Gangakhed, Dist. Parbhani, Maharashtra. Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, and **TypeScript**.

---

## 🏥 Hospital Overview
- **Name**: Kore Hospital – Piles Centre / कोरे हॉस्पिटल – मूळव्याध सेंटर
- **Specialty**: Anorectal & Ksharsutra Surgery (गुदशल्य व स्त्रीरोग तज्ञ)
- **Location**: Beside Chandak Hospital, Dr. Lane, Gangakhed, Dist. Parbhani, Maharashtra 431514
- **Coordinates**: Lat `18.9698392`, Lng `76.7479928`
- **Contact Helplines**: 9421873077 / 8888575671
- **Specialists**:
  1. **Dr. Anant Kamaji Kore** — BAMS, Fellowship in Ksharsutra (Ano-rectal & Ksharsutra Care)
  2. **Dr. Kiran Anant Kore** — MS, PGDEMS, DGO (Pune) (Ano-rectal & Ksharsutra Care, Gynecologist)

---

## 🌿 Central Unified Configuration
All hospital parameters, doctor profiles, treatments, timings, FAQs, and Marathi translations are maintained in a single configuration file:
```
config/
├── clinic.config.ts  # ⭐️ Single source of truth for all hospital information
└── theme.config.ts   # Ayurveda-meets-modern-medical color tokens
```

---

## 🚀 Development & Verification

```bash
# 1. Run local development server
npm run dev

# 2. Run codebase integrity and purge check
npm run check-swap

# 3. Production build
npm run build
```

---

## 🌐 Features
- **Bilingual Interface**: Seamless English and मराठी (Marathi) language toggle.
- **Privacy & Dignity**: Dedicated lady doctor consultations for female patients, private examination rooms.
- **Mobile First**: Sticky Call, WhatsApp, and Consultation CTAs designed for 375px+ mobile screens.
- **Compliant Medical Copy**: Non-graphic, reassuring language with zero exaggerated claims ("100% painless" or "No.1").
