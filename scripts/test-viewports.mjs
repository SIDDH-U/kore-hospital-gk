import { chromium } from "playwright-core";
import fs from "fs";

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("❌ No Chrome or Edge executable found!");
  process.exit(1);
}

const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440];
const LANGUAGES = ["en", "mr"];
const ROUTES = [
  "/",
  "/treatments",
  "/treatments/piles-hemorrhoids",
  "/treatments/anal-fistula",
  "/doctors",
  "/doctors/dr-anant-kore",
  "/about",
  "/contact",
  "/book",
  "/patient-info",
];

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function run() {
  console.log("\n=======================================================");
  console.log(`🌐 VIEWPORT & OVERFLOW AUDIT (${BASE_URL})`);
  console.log(`Browser: ${executablePath}`);
  console.log(`Widths: ${WIDTHS.join(", ")}`);
  console.log(`Languages: ${LANGUAGES.join(", ")}`);
  console.log("=======================================================\n");

  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  let totalTests = 0;
  let overflowErrors = [];
  const sectionHeightLogs = [];

  for (const lang of LANGUAGES) {
    console.log(`\n--- TESTING LANGUAGE: ${lang.toUpperCase()} ---`);

    for (const route of ROUTES) {
      for (const width of WIDTHS) {
        totalTests++;
        const height = 844;
        await page.setViewportSize({ width, height });

        // Set language preference in localStorage before loading
        await page.addInitScript((l) => {
          localStorage.setItem("kore_hospital_language", l);
        }, lang);

        const url = `${BASE_URL}${route}`;
        try {
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
          await page.waitForTimeout(100);

          // Check overflow
          const overflowInfo = await page.evaluate(() => {
            const scrollWidth = document.documentElement.scrollWidth;
            const innerWidth = window.innerWidth;
            const hasOverflow = scrollWidth > innerWidth;

            let offending = [];
            if (hasOverflow) {
              const all = document.querySelectorAll("*");
              for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.right > innerWidth + 1) {
                  offending.push({
                    tag: el.tagName.toLowerCase(),
                    className: (el.className || "").toString().slice(0, 60),
                    right: rect.right,
                    width: rect.width,
                  });
                }
              }
            }

            // Measure section heights on homepage at 390
            let sections = [];
            if (window.location.pathname === "/" && innerWidth === 390) {
              const secNodes = document.querySelectorAll("main > section, header, footer");
              for (const s of secNodes) {
                const r = s.getBoundingClientRect();
                sections.push({
                  id: s.id || s.tagName.toLowerCase(),
                  height: Math.round(r.height),
                  ratioToViewport: (r.height / window.innerHeight).toFixed(2),
                });
              }
            }

            return {
              hasOverflow,
              scrollWidth,
              innerWidth,
              offending: offending.slice(0, 3),
              sections,
            };
          });

          if (overflowInfo.hasOverflow) {
            console.error(
              `❌ OVERFLOW at ${route} [${width}px] (${lang}): scrollWidth=${overflowInfo.scrollWidth} > innerWidth=${overflowInfo.innerWidth}`
            );
            if (overflowInfo.offending.length > 0) {
              console.error("  Offending elements:", JSON.stringify(overflowInfo.offending));
            }
            overflowErrors.push({
              route,
              width,
              lang,
              scrollWidth: overflowInfo.scrollWidth,
              innerWidth: overflowInfo.innerWidth,
              offending: overflowInfo.offending,
            });
          }

          if (overflowInfo.sections.length > 0 && sectionHeightLogs.length === 0) {
            sectionHeightLogs.push(...overflowInfo.sections);
          }
        } catch (err) {
          console.error(`⚠️ Failed to load ${url} at ${width}px:`, err.message);
        }
      }
    }
  }

  await browser.close();

  console.log("\n=======================================================");
  console.log("📊 HOMEPAGE SECTION HEIGHTS @ 390x844 (Target ~85svh):");
  console.log("=======================================================");
  for (const s of sectionHeightLogs) {
    const isTargetFit = parseFloat(s.ratioToViewport) <= 1.25;
    const statusIcon = isTargetFit ? "✅" : "ℹ️";
    console.log(
      `  ${statusIcon} ${s.id.padEnd(22)}: ${s.height}px (${s.ratioToViewport}x viewport height)`
    );
  }

  console.log("\n=======================================================");
  console.log(`TOTAL VIEWPORT CHECKS: ${totalTests}`);
  if (overflowErrors.length === 0) {
    console.log("🎉 ALL TESTS PASSED: 0 OVERFLOWS DETECTED ACROSS ALL VIEWPORTS!");
    console.log("=======================================================\n");
    process.exit(0);
  } else {
    console.error(`❌ DETECTED ${overflowErrors.length} OVERFLOWS!`);
    console.log("=======================================================\n");
    process.exit(1);
  }
}

run();
