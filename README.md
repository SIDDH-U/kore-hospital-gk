# Smilora Dental Studio — Multi-Clinic Config-Driven Web Template

A high-converting, mobile-first private dental studio website template built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, and **TypeScript**. 

Designed specifically for web design agencies and freelancers to spin up custom, branded dental clinic websites in **under 10 minutes** by editing **a single file**: `config/clinic.config.ts`.

---

## ⚡ Quick Start: 10-Minute Clinic Swap

Want to create a custom demo for a new dental practice right now?
👉 **See the complete 10-step guide in [SWAP.md](./SWAP.md)**

```bash
# 1. Edit the ONE config file per clinic
# Open config/clinic.config.ts and change clinic name, phone, WhatsApp, and city

# 2. Run the swap safety check
npm run check-swap

# 3. Test build
npm run build

# 4. Deploy to Vercel (No environment variables required)
npx vercel --prod
```

---

## 🏗️ Two-Layer Configuration Architecture

The project cleanly separates clinic identity from dental specialty content:

```
config/
├── clinic.config.ts           # ⭐️ THE ONLY FILE YOU EDIT PER CLINIC
├── specialty.dental.config.ts # Dental medical treatments, FAQs, why-us, clinical gallery
└── theme.config.ts            # 4 Curated palette presets (teal, ocean, navy-gold, forest)
```

### 1. `config/clinic.config.ts` (Clinic Layer)
Contains only clinic-specific identity tokens:
- **Brand**: `name`, `shortName`, `subtitle`, `tagline`, `logoImage`
- **Contact & WhatsApp**: `phone`, `phoneRaw`, `whatsappNumber`, `email`
- **Location**: `address`, `city`, `state`, `pincode`, `mapsLink`, `embeddedMapUrl`
- **Hours**: `weekday`, `weekend`
- **Lead Doctor**: `name`, `qualification`, `yearsExperience`
- **Socials**: `instagram`, `facebook`, `linkedin`
- **Stats**: `rating`, `reviewCount`, `patientsServed`, `yearsExperience`
- **Theme Preset**: `"teal"` | `"ocean"` | `"navy-gold"` | `"forest"`
- **Section Flags**: `showDoctors`, `showGallery`, `showReviews`, `showStats`, `showMap`, `showEmi`
- **Sample Mode**: `sampleMode: true` (badges placeholder cases/reviews) / `false` (clean production)

### 2. `config/specialty.dental.config.ts` (Specialty Layer)
Contains specialty content that is identical across dental practices:
- 9 Dental treatments (Clear aligners, implants, veneers, root canal, teeth whitening, etc.)
- Clinical FAQs
- Why-Choose-Us clinical quality standards (3D digital scanning, Class-B autoclave sterilisation)
- How-It-Works 3-step smile journey
- Before-and-after smile makeover cases
- Specialist doctor categories and bios
- Verified patient review templates

---

## 🎨 4 Curated Theme Presets

Switching palettes is as simple as setting `theme: "ocean"` in `config/clinic.config.ts`:

1. **`teal`** *(Default Smilora)*: Deep medical teal `#0B3B4A`, refreshing aqua `#26B5AC`, and high-contrast peach CTA `#F2A65A`.
2. **`ocean`**: Deep ocean navy `#0A2540`, vibrant sky blue `#00A3E0`, and warm amber CTA `#FF9900`.
3. **`navy-gold`**: Regal midnight navy `#0C1829`, champagne gold `#D4AF37`, and rich coral CTA `#E65100`.
4. **`forest`**: Calming eucalyptus forest `#0E332A`, mint accent `#2EB886`, and terracotta CTA `#E26D5C`.

All presets are fully checked for WCAG AAA accessibility and high-contrast readability on mobile screens.

---

## 📱 Mobile-First Features

- **Sticky Call & Book Bar**: Stays fixed to the bottom of the viewport with haptic-like ripple effects.
- **Direct WhatsApp Concierge**: Instant booking requests formatted with patient name, treatment, and preferred slot.
- **Swipeable Horizontal Carousels**: Scroll-snap carousels with progress indicators (no endless vertical card stacks).
- **Interactive Before/After Smile Slider**: Touch-draggable divider slider comparing clinical outcomes.
- **Zero Environment Variables**: Deploys straight to Vercel without configuring `.env` keys.
