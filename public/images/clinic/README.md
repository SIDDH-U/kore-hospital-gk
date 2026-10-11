# Clinic Image Asset Directory

This directory `/public/images/clinic/` houses clinic-specific custom imagery that changes from clinic to clinic.

---

## 🏥 Clinic-Specific Images (Replace per Clinic)

When setting up a website for a new clinic, you only need to swap these assets if you have custom photos:

| File Name / Path | Dimensions / Aspect Ratio | Purpose | Fallback / Default Behavior |
|---|---|---|---|
| `logo.png` or `logo.svg` | Optional (~240x60px transparent PNG or SVG) | Custom clinic brand logo | If `clinicConfig.logoImage` is empty (`""`), the site automatically generates an SVG badge logo with tooth icon + clinic name + subtitle in serif typography. |
| `hero-mobile.webp` / `hero-desktop.webp` | 800x1000px (Mobile 4:5), 1600x900px (Desktop 16:9) | Hero smiling patient or clinic ambience photo | High-quality default aesthetic dental studio hero images are already bundled in `/public/images/`. |
| `clinic-interior.webp` | 1200x800px (3:2) | Clinic reception / operatory interior for About section & CTA background | Premium dental studio interior image is pre-bundled in `/public/images/clinic-interior.webp`. |
| `doctors/*.webp` | 600x750px (4:5 portrait) | Authentic doctor portraits | Pre-bundled high-definition specialist portraits are in `/public/images/doctors/`. If `showDoctors: false`, this entire section is cleanly omitted. |
| `gallery/*-before.webp`, `/*-after.webp` | 800x600px (4:3) | Before-and-after smile transformation cases | Pre-bundled clinical orthodontic and cosmetic cases are in `/public/images/gallery/`. If `showGallery: false`, this entire section is omitted. |

---

## 🦷 Generic Specialty Images (No Need to Touch)

These assets are dental-specific rather than clinic-specific, and remain constant across all dental practices:

- `/public/images/treatments/*.webp`: Clinical illustrations for Aligners, Implants, Veneers, Root Canals, Laser Whitening, etc.
- `/public/images/reviews/*.webp`: Verified patient avatars.
- Icon SVGs: Procedural equipment, 3D scanner, autoclave sterilisation, smile icons.

---

## ⏱️ Fast 10-Minute Swap Tip

You do **not** need to prepare or upload custom images to demo a new clinic to a client!
1. Keep `sampleMode: true` in `config/clinic.config.ts`.
2. The Auto-Logo will automatically render their brand name.
3. Pre-bundled high-end dental photos, cases, and doctor cards will render with subtle `"Sample"` badges.
4. When the client approves and sends real clinic photos, place them here and toggle `sampleMode: false`.
