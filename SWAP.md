# Kore Hospital – Configuration & Customization Guide

This guide describes how to update hospital details, add new procedures, or adjust doctor profiles in `config/clinic.config.ts`.

---

## 📋 Quick Customization Reference

All details are controlled in `config/clinic.config.ts`:

### 1. Hospital Contact & Helplines
```typescript
contact: {
  phone: "+91 94218 73077",
  phoneRaw: "9421873077",
  secondaryPhone: "+91 88885 75671",
  secondaryPhoneRaw: "8888575671",
  whatsappNumber: "919421873077",
  emergencyPhone: "+91 94218 73077",
  email: "korehospitalgangakhed@gmail.com",
}
```

### 2. Doctor Avatars & Qualifications
```typescript
doctors: [
  {
    id: "dr-anant-kore",
    name: "Dr. Anant Kamaji Kore",
    nameMr: "डॉ. अनंत कामाजी कोरे",
    qualification: "BAMS, Fellowship in Ksharsutra",
    specialty: "Ano-rectal & Ksharsutra care",
    avatar: "male", // "male" | "female"
  },
  {
    id: "dr-kiran-kore",
    name: "Dr. Kiran Anant Kore",
    nameMr: "डॉ. किरण अनंत कोरे",
    qualification: "MS, PGDEMS, DGO (Pune)",
    specialty: "Ano-rectal & Ksharsutra care, Gynecologist",
    avatar: "female", // "male" | "female"
  }
]
```

### 3. Enabling Laser or Newer Procedures
Under `treatments`:
```typescript
{
  id: "laser-hemorrhoidoplasty",
  slug: "laser-piles-treatment",
  enabled: false, // Set to true when laser services are inaugurated
  ...
}
```

---

## 🧪 Verification Check
After updating `config/clinic.config.ts`, verify the site:
```bash
npm run check-swap
npm run build
```
