import fs from "fs";

let content = fs.readFileSync("src/config/site.config.ts", "utf8");

// 1. dental-implants
content = content.replace(
  'shortDesc: "Permanent, natural-feeling tooth replacement using precision Swiss titanium fixtures and lifelike zirconia crowns.",',
  'shortDesc: "Permanent, natural-feeling tooth replacement using precision Swiss titanium fixtures and lifelike zirconia crowns.",\n      oneLineDesc: "Swiss titanium replacement with lifelike zirconia crown.",\n      emiMonthly: "₹2,083/mo",'
);

// 2. braces-and-aligners
content = content.replace(
  'shortDesc: "Discreet, removable clear aligners and modern ceramic braces to straighten teeth comfortably at any age.",',
  'shortDesc: "Discreet, removable clear aligners and modern ceramic braces to straighten teeth comfortably at any age.",\n      oneLineDesc: "Discreet clear aligners to straighten teeth without wires.",\n      emiMonthly: "₹2,916/mo",'
);

// 3. root-canal
content = content.replace(
  'shortDesc: "Microscope-assisted, single-sitting painless root canal to eliminate infection and preserve your natural tooth.",',
  'shortDesc: "Microscope-assisted, single-sitting painless root canal to eliminate infection and preserve your natural tooth.",\n      oneLineDesc: "Single-sitting gentle treatment to eliminate pain and save tooth.",'
);

// 4. teeth-whitening
content = content.replace(
  'shortDesc: "In-office laser whitening that safely brightens your teeth by 4 to 8 shades in just 45 comfortable minutes.",',
  'shortDesc: "In-office laser whitening that safely brightens your teeth by 4 to 8 shades in just 45 comfortable minutes.",\n      oneLineDesc: "In-office LED laser whitening up to 5 shades brighter.",'
);

// 5. smile-design-veneers
content = content.replace(
  'shortDesc: "Ultra-thin porcelain veneers and composite bonding for a handcrafted, symmetrical dream smile.",',
  'shortDesc: "Ultra-thin porcelain veneers and composite bonding for a handcrafted, symmetrical dream smile.",\n      oneLineDesc: "Handcrafted ultra-thin porcelain veneers for a radiant smile.",\n      emiMonthly: "₹1,000/mo",'
);

// 6. pediatric-dentistry
content = content.replace(
  'shortDesc: "Gentle, fear-free dental visits for toddlers, children, and teenagers with cavity prevention and fluoride protection.",',
  'shortDesc: "Gentle, fear-free dental visits for toddlers, children, and teenagers with cavity prevention and fluoride protection.",\n      oneLineDesc: "Gentle cavity protection and stress-free care for kids.",'
);

// 7. gum-treatment
content = content.replace(
  'shortDesc: "Laser deep cleaning, scaling, and periodontics to halt bleeding gums, sensitivity, and chronic bad breath permanently.",',
  'shortDesc: "Laser deep cleaning, scaling, and periodontics to halt bleeding gums, sensitivity, and chronic bad breath permanently.",\n      oneLineDesc: "Laser gum therapy to stop bleeding and protect teeth.",'
);

// 8. wisdom-tooth-removal
content = content.replace(
  'shortDesc: "Painless extraction of impacted wisdom teeth using piezosurgery to minimize post-op swelling and recovery time.",',
  'shortDesc: "Painless extraction of impacted wisdom teeth using piezosurgery to minimize post-op swelling and recovery time.",\n      oneLineDesc: "Painless keyhole extraction with minimal healing downtime.",'
);

// 9. dentures-and-crowns
content = content.replace(
  'tagline: "Rebuild complete biting strength and youthful facial contours.",\n      image: "/images/treatments/dentures-and-crowns.webp",',
  'tagline: "Rebuild complete biting strength and youthful facial contours.",\n      oneLineDesc: "Unbreakable metal-free zirconia crowns and flexible dentures.",\n      image: "/images/treatments/dentures-and-crowns.webp",'
);

// Gallery badge text and category fields
content = content.replace(
  'smileGallery: [',
  'galleryBadgeText: "Sample case",\n  galleryDisclaimer: "Sample clinical photographs for demonstration purposes. Individual anatomical results may vary.",\n  smileGallery: ['
);

content = content.replace(
  'id: "case-1",\n      title: "Clear Aligners Crowding Correction",\n      treatment: "Clear Aligners (Invisible Braces)",\n      duration: "7 Months",',
  'id: "case-1",\n      title: "Clear Aligners Straightening",\n      treatment: "Clear Aligners",\n      category: "Aligners",\n      duration: "7 Months",\n      dentist: "Dr. Ananya Roy",'
);

content = content.replace(
  'id: "case-2",\n      title: "Single Tooth Implant & Zirconia Crown",\n      treatment: "Titanium Dental Implant",\n      duration: "3 Visits",',
  'id: "case-2",\n      title: "Single Tooth Implant & Crown",\n      treatment: "Dental Implant",\n      category: "Implants",\n      duration: "3 Visits",\n      dentist: "Dr. Vikram Singhania",'
);

content = content.replace(
  'id: "case-3",\n      title: "8-Tooth Porcelain Veneers Makeover",\n      treatment: "Cosmetic Smile Design",\n      duration: "2 Weeks",',
  'id: "case-3",\n      title: "Porcelain Veneers Makeover",\n      treatment: "Porcelain Veneers",\n      category: "Veneers",\n      duration: "2 Weeks",\n      dentist: "Dr. Ananya Roy",'
);

content = content.replace(
  'id: "case-4",\n      title: "In-Office Laser Teeth Whitening",\n      treatment: "Medical Teeth Whitening",\n      duration: "45 Minutes",',
  'id: "case-4",\n      title: "In-Office Laser Whitening",\n      treatment: "Teeth Whitening",\n      category: "Whitening",\n      duration: "45 Minutes",\n      dentist: "Dr. Neha Kapoor",'
);

// Footer quickLinks
content = content.replace(
  `quickLinks: [
      { name: "Home", href: "/" },
      { name: "Treatments", href: "/treatments" },
      { name: "Smile Gallery", href: "/gallery" },
      { name: "Our Dentists", href: "/doctors" },
      { name: "Transparent Pricing", href: "/pricing" },
      { name: "Patient Reviews", href: "/reviews" },
      { name: "Book Visit", href: "/book" },
      { name: "Contact Clinic", href: "/contact" },
    ],`,
  `quickLinks: [
      { name: "Home", href: "/" },
      { name: "Treatments", href: "/treatments" },
      { name: "Smile Gallery", href: "/gallery" },
      { name: "Our Dentists", href: "/doctors" },
      { name: "Patient Reviews", href: "/reviews" },
      { name: "Contact Clinic", href: "/contact" },
    ],`
);

// Footer treatmentLinks to top 5
content = content.replace(
  `treatmentLinks: [
      { name: "Dental Implants", href: "/treatments/dental-implants" },
      { name: "Braces & Aligners", href: "/treatments/braces-and-aligners" },
      { name: "Root Canal (RCT)", href: "/treatments/root-canal" },
      { name: "Teeth Whitening", href: "/treatments/teeth-whitening" },
      { name: "Smile Design / Veneers", href: "/treatments/smile-design-veneers" },
      { name: "Pediatric Dentistry", href: "/treatments/pediatric-dentistry" },
      { name: "Gum Treatment", href: "/treatments/gum-treatment" },
      { name: "Wisdom Tooth Removal", href: "/treatments/wisdom-tooth-removal" },
      { name: "Dentures & Crowns", href: "/treatments/dentures-and-crowns" },
    ],`,
  `treatmentLinks: [
      { name: "Dental Implants", href: "/treatments/dental-implants" },
      { name: "Braces & Aligners", href: "/treatments/braces-and-aligners" },
      { name: "Root Canal (RCT)", href: "/treatments/root-canal" },
      { name: "Teeth Whitening", href: "/treatments/teeth-whitening" },
      { name: "Smile Design / Veneers", href: "/treatments/smile-design-veneers" },
    ],`
);

fs.writeFileSync("src/config/site.config.ts", content, "utf8");
console.log("Successfully updated src/config/site.config.ts");
