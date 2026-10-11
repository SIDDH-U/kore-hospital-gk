# 🚀 Clinic Swap Checklist: New Clinic in Under 10 Minutes

Follow this 10-step protocol to spin up a custom, production-ready website for any dental clinic in under 10 minutes by editing **ONE file**: `config/clinic.config.ts`.

---

## 📋 The 10-Step Swap Checklist

### Step 1: Duplicate the Codebase
Make a fresh copy of this template directory for the new client:
```bash
# Example for a new client: "Apex Dental Studio"
cp -r hospital-website-dental apex-dental-studio
cd apex-dental-studio
npm install
```

---

### Step 2: Open and Edit `config/clinic.config.ts`
Open `config/clinic.config.ts` — this is the **ONLY file** you need to edit.
Fill in the clinic's details:
- **`name`**: Full brand name (e.g., `"Apex Dental Studio"`)
- **`shortName`**: Short name for buttons & mobile headers (e.g., `"Apex Dental"`)
- **`subtitle`**: Under-logo descriptor (e.g., `"BOUTIQUE DENTAL STUDIO"`)
- **`tagline`**: Hero tagline (e.g., `"Painless dentistry. A smile you will love."`)
- **`phone`**: Formatted phone for display (e.g., `"+91 98230 12345"`)
- **`phoneRaw`**: Digits only for `tel:` links (e.g., `"919823012345"`)
- **`whatsappNumber`**: Digits with country code (e.g., `"919823012345"`)
- **`address`**: Street & building (e.g., `"Shop 4, Ground Floor, Sunshine Plaza, MG Road"`)
- **`city`**: City name (e.g., `"Pune"`)
- **`state`**: State name (e.g., `"Maharashtra"`)
- **`pincode`**: Pincode (e.g., `"411001"`)
- **`mapsLink`**: Google Maps share URL for navigation button
- **`embeddedMapUrl`**: Optional Google Maps iframe embed URL
- **`hours`**: `weekday` and `weekend` hours
- **`leadDoctor`**: `{ name, qualification, yearsExperience }`
- **`email`**: (optional) Concierge email
- **`socials`**: (optional) Instagram, Facebook, LinkedIn URLs
- **`stats`**: `{ rating, reviewCount, patientsServed, yearsExperience }`

---

### Step 3: Pick a Curated Theme Preset
In `config/clinic.config.ts`, set the `theme` field to match the clinic's branding:
```typescript
theme: "teal",      // High-end medical teal & warm peach CTA (Default Smilora)
// theme: "ocean",  // Deep ocean blue & electric cyan accents
// theme: "navy-gold", // Regal midnight navy & polished champagne gold
// theme: "forest", // Calming natural eucalyptus forest & soft peach
```
All buttons, borders, sticky action bars, and glow effects will instantly adapt with WCAG AAA accessible contrast.

---

### Step 4: Toggle Section Visibility Flags
Turn sections on or off based on what the clinic offers:
```typescript
sections: {
  showDoctors: true,   // Set to false if clinic has only 1 doctor or no staff photos
  showGallery: true,   // Set to false if clinic doesn't have before/after cases yet
  showReviews: true,   // Set to false if clinic is brand new
  showStats: true,     // Set to false to hide rating/patient count strips
  showMap: true,       // Set to false if no physical map embed is needed
  showEmi: true,       // Set to false if clinic doesn't offer 0% EMI financing
}
```
*Note: Disabling a section cleanly removes it from the homepage, header navigation, mobile drawer, footer links, and sitemap with zero gaps or dead links.*

---

### Step 5: Configure `sampleMode` & Images
- **Fast Demo Mode (`sampleMode: true`)**:
  Leave `sampleMode: true`. The website will render pre-bundled aesthetic dental photography and showcase cases with tasteful `"Sample"` badges. **No image editing required for a demo!** The logo is automatically rendered from `clinic.name`.
- **Live Client Mode (`sampleMode: false`)**:
  When launching live, set `sampleMode: false`. The `"Sample"` badges disappear. If you have custom assets, place them in `/public/images/clinic/`:
  - `logo.png`: Custom logo (or leave blank to use the Auto-Logo).
  - Doctor photos: `/public/images/doctors/`
  - Gallery cases: `/public/images/gallery/`

---

### Step 6: Run the Swap Safety Check
Run the automated pre-launch scanner to verify that zero old demo values remain:
```bash
npm run check-swap
```
- If `sampleMode: true`, it logs an informational audit.
- If `sampleMode: false`, it strictly fails if any placeholder data remains.

---

### Step 7: Validate the Production Build
Ensure clean compilation:
```bash
npm run build
```
Verify:
- 0 TypeScript errors
- 0 Turbopack/Next.js route errors
- All static pages generate properly

---

### Step 8: Deploy to Vercel (Zero Environment Variables Required)
Deploy in one step using the Vercel CLI or Web Console:

#### Option A: Using Vercel CLI (Recommended)
```bash
# 1. Install or run vercel
npx vercel

# 2. Follow prompts:
# ? Set up and deploy? [Y]
# ? Which scope? [Your Team/Account]
# ? Link to existing project? [N]
# ? What’s your project’s name? apex-dental-studio
# ? In which directory is your code located? ./
# ? Want to modify settings? [N]

# 3. Deploy to production
npx vercel --prod
```

#### Option B: Using GitHub & Vercel Dashboard
1. Push the folder to a new GitHub repository:
   ```bash
   git init && git add . && git commit -m "Initial commit for Apex Dental Studio"
   git remote add origin https://github.com/your-username/apex-dental-studio.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) -> Import repository.
3. Framework Preset: **Next.js**.
4. Environment Variables: **None needed!**
5. Click **Deploy**.

---

### Step 9: Test on Mobile Phone at 390px
Over 80% of dental patients browse on smartphones. Open the deployed URL on your phone or Chrome DevTools (iPhone 14 / 390x844px):
1. **Logo**: Renders crisp and clean in header.
2. **Sticky Bottom Bar**: Tap `Call Direct` -> checks dialer opens with `clinic.phoneRaw`.
3. **WhatsApp CTA**: Tap `WhatsApp Concierge` -> opens WhatsApp chat to `clinic.whatsappNumber` with pre-filled greeting.
4. **Interactive Booking Desk**: Fill out the appointment form -> verifies slot request routes directly to WhatsApp.
5. **Theme Colors**: Check button contrast and smooth card transitions.

---

### Step 10: Send Live Link to Clinic Client 🎉
Send the preview link to the clinic doctor / management.
```
"Hi Dr. [Name], here is the custom demo website we created for [Clinic Name]: https://[your-project].vercel.app"
```
Estimated turnaround: **< 10 minutes**.
