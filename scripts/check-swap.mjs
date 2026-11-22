import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("\n=======================================================");
console.log("🏥 KORE HOSPITAL - CODEBASE INTEGRITY & PURGE CHECK");
console.log("=======================================================\n");

// 1. Verify Unified Config
const clinicConfigPath = path.join(rootDir, "config", "clinic.config.ts");
if (!fs.existsSync(clinicConfigPath)) {
  console.error("❌ config/clinic.config.ts is missing!");
  process.exit(1);
}

const configContent = fs.readFileSync(clinicConfigPath, "utf8");

// Validate required proctology hospital tokens
const REQUIRED_TOKENS = [
  "Kore Hospital",
  "कोरे हॉस्पिटल",
  "Gangakhed",
  "गंगाखेड",
  "9421873077",
  "8888575671",
  "Dr. Anant Kamaji Kore",
  "Dr. Kiran Anant Kore",
  "Ksharsutra",
  "fistula",
  "fissure",
];

let configErrors = 0;
for (const token of REQUIRED_TOKENS) {
  if (!configContent.includes(token)) {
    console.error(`❌ Missing required token in config: "${token}"`);
    configErrors++;
  }
}

if (configErrors > 0) {
  console.error(`\nFailed config validation with ${configErrors} errors.\n`);
  process.exit(1);
} else {
  console.log("✅ Unified hospital config contains all required clinic, doctor, and treatment tokens.");
}

// 2. Scan for forbidden dental keywords in src/
const FORBIDDEN_DENTAL_WORDS = [
  "dental",
  "dentist",
  "tooth",
  "teeth",
  "smile",
  "orthodont",
  "implant",
  "braces",
  "root canal",
  "whitening",
  "smilora",
];

const SCAN_DIRS = [path.join(rootDir, "src")];
const allowedExts = [".js", ".jsx", ".ts", ".tsx", ".html", ".json", ".md", ".css"];

let dentalFindings = [];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && allowedExts.includes(path.extname(entry.name).toLowerCase())) {
      const content = fs.readFileSync(fullPath, "utf8");
      for (const word of FORBIDDEN_DENTAL_WORDS) {
        // Case-insensitive regex with word boundary
        const regex = new RegExp(`\\b${word}\\b`, "i");
        if (regex.test(content)) {
          dentalFindings.push({
            file: path.relative(rootDir, fullPath),
            keyword: word,
          });
        }
      }
    }
  }
}

for (const dir of SCAN_DIRS) {
  scanDir(dir);
}

if (dentalFindings.length > 0) {
  console.error("\n❌ Found residual dental references in src/:\n");
  dentalFindings.forEach((f) => {
    console.error(`  - ${f.file}: contains forbidden word "${f.keyword}"`);
  });
  console.error(`\nTotal residual dental occurrences: ${dentalFindings.length}\n`);
  process.exit(1);
} else {
  console.log("✅ Complete zero-dental purge verified across all src/ files.");
}

console.log("\n=======================================================");
console.log("🎉 ALL CHECKS PASSED: Kore Hospital website is clean!");
console.log("=======================================================\n");
