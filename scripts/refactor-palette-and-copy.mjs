import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const FILES_TO_UPDATE = [
  "config/clinic.config.ts",
  "config/theme.config.ts",
  "src/config/hospital.ts",
  "src/app/about/AboutContent.tsx",
  "src/app/contact/ContactContent.tsx",
  "src/app/patient-info/PatientInfoContent.tsx",
  "src/app/treatments/page.tsx",
  "src/app/treatments/[slug]/page.tsx",
  "src/app/doctors/page.tsx",
  "src/app/doctors/[slug]/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/blog/[slug]/page.tsx",
  "src/app/privacy-policy/page.tsx",
  "src/app/terms/page.tsx",
];

const REPLACEMENTS = [
  // Copy tweaks
  { from: /100% Confidential Consultations/g, to: "Private consultations" },
  { from: /१००% खाजगी व गोपनीय सल्लामसलत/g, to: "खाजगी व गोपनीय सल्लामसलत" },
  { from: /authentic Ayurvedic Ksharsutra therapy/gi, to: "Ayurvedic Ksharsutra therapy" },
  { from: /Authentic Ksharsutra/gi, to: "Ayurvedic Ksharsutra" },
  { from: /Ksharsutra Specialist/gi, to: "Ksharsutra care" },
  { from: /Safe, gentle, and respectful care/gi, to: "Careful, respectful care" },
  { from: /Book Consultation/g, to: "Book appointment" },
  { from: /Book Doctor Consultation/g, to: "Book appointment" },
  { from: /Book Visit/g, to: "Book appointment" },
  { from: /Chat with Hospital/g, to: "WhatsApp" },
  { from: /Call Hospital/g, to: "Call now" },

  // Exact address wording
  { from: /Beside Chandak Hospital, Dr\. Lane, Gangakhed/g, to: "Near Chandak Hospital, Dr. Lane, Gangakhed" },
  { from: /Dr\. Lane, Beside Chandak Hospital, Gangakhed/g, to: "Near Chandak Hospital, Dr. Lane, Gangakhed" },

  // Hex updates
  { from: /#0A4A40/g, to: "#064B40" },
  { from: /#0F6B5C/g, to: "#0B7A68" },
  { from: /#E8A33D/g, to: "#F5A524" },
  { from: /#D48F28/g, to: "#E09419" },
  { from: /#F2F8F6/g, to: "#EAF6F2" },
  { from: /#D6E5E1/g, to: "#D5E6E0" },
  { from: /#14282A/g, to: "#0F2321" },
  { from: /#5B6F70/g, to: "#3F5652" },
];

let totalReplacements = 0;

for (const relPath of FILES_TO_UPDATE) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, "utf8");
  let modified = false;

  for (const { from, to } of REPLACEMENTS) {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
      totalReplacements++;
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, "utf8");
    console.log(`Updated: ${relPath}`);
  }
}

console.log(`\nRefactored palette and copy across files. Total rule applications: ${totalReplacements}`);
