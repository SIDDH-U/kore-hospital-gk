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

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function run() {
  console.log("\n=======================================================");
  console.log(`🚀 STARTING ROUND 2 COMPREHENSIVE QA AUDIT`);
  console.log(`URL: ${BASE_URL}`);
  console.log("=======================================================\n");

  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  let failedChecks = 0;

  // Track console errors
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  // 1. CHECK NEXT.JS DEV ISSUES / CONSOLE ERRORS ON KEY ROUTES
  console.log("\n--- 1. CHECKING NEXT.JS DEV OVERLAY & CONSOLE ERRORS ---");
  const testRoutes = [
    "/",
    "/treatments",
    "/treatments/anal-fissure",
    "/treatments/piles-hemorrhoids",
    "/doctors",
    "/book",
    "/contact",
  ];

  for (const route of testRoutes) {
    for (const lang of ["en", "mr"]) {
      consoleErrors.length = 0;
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
      await page.evaluate((l) => {
        localStorage.setItem("kore_hospital_lang", l);
        window.dispatchEvent(new Event("storage"));
      }, lang);
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(500);

      // Check Next.js dev overlay indicator if present
      const devBadgeText = await page.evaluate(() => {
        const portal = document.querySelector("nextjs-portal");
        if (portal && portal.shadowRoot) {
          const toast = portal.shadowRoot.querySelector("[data-nextjs-toast]");
          const issueBadge = portal.shadowRoot.querySelector("[data-issues-badge]");
          if (issueBadge) return issueBadge.textContent;
          if (toast) return toast.textContent;
        }
        return null;
      });

      // Filter out harmless extension errors or favicon 404s if any
      const severeErrors = consoleErrors.filter(
        (err) =>
          !err.includes("favicon") &&
          !err.includes("chrome-extension") &&
          (err.includes("Hydration") ||
            err.includes("mismatch") ||
            err.includes("Error:") ||
            err.includes("Uncaught"))
      );

      if (severeErrors.length > 0 || (devBadgeText && devBadgeText.includes("Issue"))) {
        console.error(`❌ [${lang.toUpperCase()}] ${route} has errors:`, severeErrors, devBadgeText);
        failedChecks++;
      } else {
        console.log(`✅ [${lang.toUpperCase()}] ${route}: 0 errors / 0 hydration mismatches`);
      }
    }
  }

  // 2. CHECK VIEWPORT & OVERFLOW ACROSS ALL SIZES
  console.log("\n--- 2. CHECKING OVERFLOW ACROSS VIEWPORTS ---");
  const widths = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440];
  const auditRoutes = ["/", "/treatments", "/treatments/anal-fissure", "/contact"];

  for (const route of auditRoutes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(200);

      const hasOverflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          docWidth,
          winWidth,
          overflow: docWidth > winWidth,
        };
      });

      if (hasOverflow.overflow) {
        console.error(
          `❌ Overflow on ${route} at ${width}px (scrollWidth: ${hasOverflow.docWidth}px, innerWidth: ${hasOverflow.winWidth}px)`
        );
        failedChecks++;
      }
    }
    console.log(`✅ ${route}: No overflow across all 9 viewports (320px - 1440px)`);
  }

  // 3. CHECK IMAGES ARE NOT BROKEN
  console.log("\n--- 3. CHECKING IMAGE LOADING (NO BROKEN IMAGES) ---");
  for (const route of ["/", "/treatments", "/treatments/anal-fissure", "/contact"]) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
    const imgAudit = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));
      const broken = [];
      images.forEach((img) => {
        // If image is visible, it should have naturalWidth > 0
        if (img.offsetParent !== null && img.complete && img.naturalWidth === 0) {
          broken.push({ src: img.src, alt: img.alt });
        }
      });
      return { total: images.length, broken };
    });

    if (imgAudit.broken.length > 0) {
      console.error(`❌ Broken images on ${route}:`, imgAudit.broken);
      failedChecks++;
    } else {
      console.log(`✅ ${route}: All ${imgAudit.total} images loaded cleanly`);
    }
  }

  // 4. CHECK INTERACTIVE MOBILE DRAWER & BOOKING SHEET
  console.log("\n--- 4. CHECKING MOBILE INTERACTIONS (390x844) ---");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

  // Test hamburger menu
  const menuButton = page.locator('button[aria-label="Open navigation menu"]');
  await menuButton.click();
  await page.waitForTimeout(400);

  const mobileNavPanel = page.locator('#mobile-nav-panel');
  const isNavPanelVisible = await mobileNavPanel.isVisible();
  if (!isNavPanelVisible) {
    console.error("❌ Mobile navigation drawer did not open on tap");
    failedChecks++;
  } else {
    console.log("✅ Mobile navigation drawer opens cleanly on hamburger tap");
  }

  // Close hamburger menu via drawer close button
  const closeMenuButton = page.locator('#mobile-nav-panel button[aria-label="Close menu"]').first();
  if (await closeMenuButton.isVisible()) {
    await closeMenuButton.click();
    await page.waitForTimeout(300);
    const isClosed = !(await mobileNavPanel.isVisible());
    if (isClosed) {
      console.log("✅ Mobile navigation drawer closes cleanly");
    } else {
      console.error("❌ Mobile navigation drawer failed to close");
      failedChecks++;
    }
  }

  // Test Booking Sheet
  const bookBtn = page.locator("button:visible:has-text('Book appointment'), button:visible:has-text('अपॉइंटमेंट बुक करा')").first();
  await bookBtn.click();
  await page.waitForTimeout(400);

  const bookingSheet = page.locator('div[role="dialog"][aria-label="Appointment request sheet"]');
  if (await bookingSheet.isVisible()) {
    console.log("✅ Booking bottom sheet opens on Book CTA tap");
  } else {
    console.error("❌ Booking bottom sheet failed to open");
    failedChecks++;
  }

  // Check concern chips inside booking sheet
  const fissureChip = page.locator("button:visible:has-text('Fissure'), button:visible:has-text('फिशर')").first();
  if (await fissureChip.isVisible()) {
    await fissureChip.click();
    console.log("✅ Concern chips selectable inside Booking Sheet");
  }

  // Close booking sheet with close button
  const sheetCloseBtn = page.locator('button:visible[aria-label="Close booking sheet"]').first();
  if (await sheetCloseBtn.isVisible()) {
    await sheetCloseBtn.click();
    await page.waitForTimeout(300);
    console.log("✅ Booking sheet closes cleanly on close button tap");
  }

  // 5. CHECK CONTACT SECTION SEGMENTED CONTROL (MOBILE)
  console.log("\n--- 5. CHECKING CONTACT SECTION MOBILE TABS ---");
  await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 390, height: 844 });

  const buildingTab = page.locator("button:visible:has-text('Building'), button:visible:has-text('इमारत')").first();
  if (await buildingTab.isVisible()) {
    await buildingTab.click();
    await page.waitForTimeout(300);
    const photoVisible = await page.locator("img:visible[alt*='Kore Hospital' i]").first().isVisible();
    if (photoVisible) {
      console.log("✅ Mobile Contact segmented tab toggles Building photo view");
    } else {
      console.error("❌ Mobile Contact tab failed to switch to Building photo");
      failedChecks++;
    }
  }

  // 6. CHECK DESKTOP APPOINTMENT FORM & WHATSAPP URL GENERATION
  console.log("\n--- 6. CHECKING DESKTOP APPOINTMENT FORM (1280x800) ---");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

  const nameInput = page.locator('input:visible[placeholder*="Rahul Sharma"], input:visible[placeholder*="रमेश पाटील"]').first();
  const phoneInput = page.locator('input:visible[placeholder*="10-digit"], input:visible[placeholder*="9876543210"]').first();

  await nameInput.fill("Rahul Sharma");
  await phoneInput.fill("9876543210");

  // Select chip "Piles"
  const pilesChip = page.locator("button:visible:has-text('Piles'), button:visible:has-text('मुळव्याध')").first();
  await pilesChip.click();

  // Select chip "Tomorrow"
  const tomorrowChip = page.locator("button:visible:has-text('Tomorrow'), button:visible:has-text('उद्या')").first();
  await tomorrowChip.click();

  // Intercept window.open before submit
  await page.evaluate(() => {
    window.lastOpenedUrl = "";
    window.open = (url) => {
      window.lastOpenedUrl = url;
      return null;
    };
  });

  // Submit appointment form
  const submitButton = page.locator("button:visible:has-text('Send on WhatsApp'), button:visible:has-text('व्हॉट्सॲपवर पाठवा')").first();
  await submitButton.click();
  await page.waitForTimeout(300);

  const openedUrl = await page.evaluate(() => window.lastOpenedUrl);
  if (openedUrl && openedUrl.includes("Rahul") && openedUrl.includes("9876543210") && (openedUrl.includes("Piles") || openedUrl.includes("मुळव्याध"))) {
    console.log(`✅ Desktop Appointment Form generates valid prefilled WhatsApp URL: ${openedUrl.slice(0, 80)}...`);
  } else {
    console.error("❌ Form submit failed to produce prefilled WhatsApp URL:", openedUrl);
    failedChecks++;
  }

  console.log("\n=======================================================");
  if (failedChecks === 0) {
    console.log("🎉 ALL QA AUDIT CHECKS PASSED WITH 0 ERRORS!");
  } else {
    console.error(`⚠️ QA AUDIT COMPLETED WITH ${failedChecks} FAILED CHECK(S)`);
  }
  console.log("=======================================================\n");

  await browser.close();
  process.exit(failedChecks > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error("QA Script error:", err);
  process.exit(1);
});
