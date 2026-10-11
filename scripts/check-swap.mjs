import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Read clinic config to determine sampleMode
let sampleMode = true;
try {
  const clinicConfigContent = fs.readFileSync(path.join(rootDir, "config", "clinic.config.ts"), "utf8");
  const sampleModeMatch = clinicConfigContent.match(/sampleMode:\s*(true|false)/);
  if (sampleModeMatch) {
    sampleMode = sampleModeMatch[1] === "true";
  }
} catch (err) {
  console.warn("⚠️ Could not read config/clinic.config.ts, defaulting sampleMode to true.");
}

console.log("\n=======================================================");
console.log("🔍 CLINIC CONFIG SWAP CHECK");
console.log(`Current Mode: ${sampleMode ? "SAMPLE MODE (Demo Allowed)" : "PRODUCTION MODE (Strict - Zero Demo Values Allowed)"}`);
console.log("=======================================================\n");

// 2. Demo keywords to scan for
const DEMO_STRINGS = [
  { term: "Smilora", label: "Demo Clinic Name" },
  { term: "919876543210", label: "Demo WhatsApp Raw Digits" },
  { term: "+91 98765 43210", label: "Demo Formatted Phone" },
  { term: "Crystal Heights", label: "Demo Address Street" },
  { term: "North Park Road", label: "Demo Address Area" },
  { term: "Nanded", label: "Demo City" },
  { term: "Dr. Ananya Roy", label: "Demo Lead Doctor" },
  { term: "Dr. Vikram Singhania", label: "Demo Doctor 2" },
  { term: "Dr. Kavita Shenoy", label: "Demo Doctor 3" },
  { term: "Dr. Rohan Deshmukh", label: "Demo Doctor 4" },
];

const SCAN_DIRS = [
  path.join(rootDir, "src"),
  path.join(rootDir, "public"),
];

// Check if .next/ exists (built output)
if (fs.existsSync(path.join(rootDir, ".next", "server"))) {
  SCAN_DIRS.push(path.join(rootDir, ".next", "server"));
}

const IGNORE_PATTERNS = [
  "node_modules",
  ".git",
  ".next/cache",
  "check-swap.mjs",
  "specialty.dental.config.ts", // specialty config is allowed to hold generic dental specialty data
];

function shouldScanFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const allowedExts = [".js", ".jsx", ".ts", ".tsx", ".html", ".json", ".md", ".css"];
  return allowedExts.includes(ext);
}

const findings = [];

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, "/");

    if (IGNORE_PATTERNS.some((p) => relPath.includes(p))) {
      continue;
    }

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && shouldScanFile(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, "utf8");
        const lines = content.split("\n");

        lines.forEach((line, lineIdx) => {
          // Ignore placeholder examples in form inputs
          if (line.includes('placeholder="e.g. 98765 43210"')) return;

          for (const item of DEMO_STRINGS) {
            if (line.includes(item.term)) {
              findings.push({
                file: relPath,
                line: lineIdx + 1,
                term: item.term,
                label: item.label,
                snippet: line.trim().slice(0, 100),
              });
            }
          }
        });
      } catch (err) {
        // Skip unreadable files
      }
    }
  }
}

for (const dir of SCAN_DIRS) {
  scanDirectory(dir);
}

if (findings.length === 0) {
  console.log("✅ Zero demo values found across scanned files.");
  console.log("🎉 Perfect swap! Ready for launch.\n");
  process.exit(0);
} else {
  console.log(`⚠️ Found ${findings.length} occurrence(s) matching demo keywords:\n`);
  findings.slice(0, 25).forEach((f) => {
    console.log(`  [${f.label}] ${f.file}:${f.line}`);
    console.log(`     Term: "${f.term}" -> ${f.snippet}\n`);
  });

  if (findings.length > 25) {
    console.log(`  ... and ${findings.length - 25} more occurrences.\n`);
  }

  if (sampleMode) {
    console.log("ℹ️ SWAP AUDIT NOTICE:");
    console.log("Demo values detected, but permitted because `sampleMode: true` in config/clinic.config.ts.");
    console.log("To launch live, set `sampleMode: false` in config/clinic.config.ts once clinic details are replaced.\n");
    process.exit(0);
  } else {
    console.error("❌ SWAP CHECK FAILED:");
    console.error("Production mode is active (`sampleMode: false`), but demo values are still present.");
    console.error("Please update config/clinic.config.ts and replace all demo values before deploying.\n");
    process.exit(1);
  }
}
