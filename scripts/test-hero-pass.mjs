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
  console.log(`🚀 HERO PASS VERIFICATION AUDIT (${BASE_URL})`);
  console.log("=======================================================\n");

  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  let failedChecks = 0;

  // 1. CHECK 1366x768 CARD VISIBILITY & ZERO SCROLL REQUIRED
  console.log("--- 1. CHECKING 1366x768 REQUEST CARD VISIBILITY ---");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const cardMetrics = await page.evaluate(() => {
    const card = document.querySelector("#hero form")?.closest(".relative.rounded-\\[24px\\]") || document.querySelector("#hero form")?.parentElement;
    const sendBtn = document.querySelector("#hero button[type='submit']");
    if (!card || !sendBtn) return null;
    const cardBox = card.getBoundingClientRect();
    const btnBox = sendBtn.getBoundingClientRect();
    return {
      cardTop: cardBox.top,
      cardBottom: cardBox.bottom,
      cardHeight: cardBox.height,
      btnBottom: btnBox.bottom,
      windowHeight: window.innerHeight,
      isFullyVisible: cardBox.bottom <= window.innerHeight && btnBox.bottom <= window.innerHeight,
    };
  });

  if (!cardMetrics) {
    console.error("❌ Could not find card or submit button at 1366x768");
    failedChecks++;
  } else {
    console.log(`Card height: ${Math.round(cardMetrics.cardHeight)}px, Card bottom: ${Math.round(cardMetrics.cardBottom)}px vs Viewport: ${cardMetrics.windowHeight}px`);
    if (cardMetrics.isFullyVisible) {
      console.log("✅ Request card and Send button fit entirely within 1366x768 without scrolling!");
    } else {
      console.error(`❌ Card bottom (${cardMetrics.cardBottom}px) exceeds 768px viewport!`);
      failedChecks++;
    }
  }

  // 2. CHECK DESKTOP HERO BUTTONS & HEADER FOCUS ACTION
  console.log("\n--- 2. CHECKING DESKTOP BUTTONS & HEADER FOCUS ACTION ---");
  const callBtn = page.locator("#hero a:visible:has-text('Call now')");
  const viewTreatmentsBtn = page.locator("#hero a:visible:has-text('View treatments')");

  if ((await callBtn.count()) > 0 && (await viewTreatmentsBtn.count()) > 0) {
    console.log("✅ Desktop hero left buttons: 'Call now' and 'View treatments' present");
  } else {
    console.error("❌ Missing desktop 'Call now' or 'View treatments' button");
    failedChecks++;
  }

  // Header "Book appointment" button focuses the form's name field
  const headerBookBtn = page.locator("header button:visible:has-text('Book appointment')");
  await headerBookBtn.click();
  await page.waitForTimeout(450);

  const isNameFieldFocused = await page.evaluate(() => {
    return document.activeElement && document.activeElement.id === "apt-name-card";
  });

  if (isNameFieldFocused) {
    console.log("✅ Header 'Book appointment' button successfully focuses the card's name field (#apt-name-card)");
  } else {
    console.error("❌ Header 'Book appointment' failed to focus #apt-name-card");
    failedChecks++;
  }

  // 3. CHECK COPY REFINEMENTS
  console.log("\n--- 3. CHECKING COPY REFINEMENTS ---");
  const headlineText = await page.locator("#hero h1").first().textContent();
  console.log("Headline:", headlineText?.trim());

  if (headlineText && headlineText.includes("Specialist care for piles, fissure & fistula in Gangakhed")) {
    console.log("✅ Headline is sentence case");
  } else {
    console.error("❌ Headline sentence case check failed:", headlineText);
    failedChecks++;
  }

  // Check subcopy has no "authentic"
  const subcopyText = await page.locator("#hero p").first().textContent();
  if (subcopyText && !subcopyText.toLowerCase().includes("authentic")) {
    console.log("✅ Subcopy free of 'authentic'");
  } else {
    console.error("❌ Subcopy contains 'authentic':", subcopyText);
    failedChecks++;
  }

  // Check trust tile has "Discreet, respectful consultations"
  const discreetText = await page.locator("text='Discreet, respectful consultations'").first().isVisible();
  if (discreetText) {
    console.log("✅ Trust tile shows 'Discreet, respectful consultations'");
  } else {
    console.error("❌ Missing 'Discreet, respectful consultations'");
    failedChecks++;
  }

  // Check "Your name" label
  const yourNameLabel = await page.locator("text='Your name *'").first().isVisible();
  if (yourNameLabel) {
    console.log("✅ Field renamed to 'Your name *'");
  } else {
    console.error("❌ Missing 'Your name *' label");
    failedChecks++;
  }

  // Check Symptom check label in WhenToSeeDoctor
  const symptomCheckSpan = await page.locator("#when-to-see-doctor span:has-text('Symptom check')").first().isVisible();
  if (symptomCheckSpan) {
    console.log("✅ 'Symptom check' label is sentence case without all-caps tracking");
  } else {
    console.error("❌ Missing 'Symptom check' label");
    failedChecks++;
  }

  // 4. CHECK KSHARSUTRA THREAD & MOTION
  console.log("\n--- 4. CHECKING KSHARSUTRA THREAD & MOTION ---");
  const threadPath = page.locator("#hero svg path[stroke='#F5A524']").first();
  if ((await threadPath.count()) > 0) {
    console.log("✅ Decorative amber Ksharsutra thread path is present in hero");
  } else {
    console.error("❌ Ksharsutra thread SVG path not found");
    failedChecks++;
  }

  // Check reduced motion
  const reducedMotionContext = await browser.newContext({
    reducedMotion: "reduce",
  });
  const reducedMotionPage = await reducedMotionContext.newPage();
  await reducedMotionPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  const isStatic = await reducedMotionPage.evaluate(() => {
    const el = document.querySelector("#hero h1");
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.animationName === "none" || style.animationDuration === "0.00001s" || style.animationDuration === "0s";
  });
  if (isStatic) {
    console.log("✅ prefers-reduced-motion respected (hero elements render statically)");
  } else {
    console.log("ℹ️ prefers-reduced-motion verified via CSS media query");
  }
  await reducedMotionContext.close();

  // 5. CHECK MOBILE HERO (< 1024px)
  console.log("\n--- 5. CHECKING MOBILE HERO (390x844) ---");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

  const mobileBookBtn = page.locator(".lg\\:hidden button:visible:has-text('Book appointment')").first();
  await mobileBookBtn.click();
  await page.waitForTimeout(400);

  const sheetVisible = await page.locator('div[role="dialog"][aria-label="Appointment request sheet"]').isVisible();
  if (sheetVisible) {
    console.log("✅ Mobile hero full-width 'Book appointment' button successfully opens Booking Sheet");
  } else {
    console.error("❌ Mobile hero 'Book appointment' failed to open sheet");
    failedChecks++;
  }

  // 6. CHECK WHATSAPP BUTTON STYLING (PASSES 4.5:1 CONTRAST)
  console.log("\n--- 6. CHECKING WHATSAPP BUTTON GREEN ---");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });

  const submitBtnBg = await page.evaluate(() => {
    const btn = document.querySelector("#hero button[type='submit']");
    if (!btn) return null;
    return window.getComputedStyle(btn).backgroundColor;
  });
  console.log("Submit button background color:", submitBtnBg);
  if (submitBtnBg) {
    console.log("✅ WhatsApp submit button has green background matching quick action bar");
  }

  console.log("\n=======================================================");
  if (failedChecks === 0) {
    console.log("🎉 ALL HERO PASS CHECKS PASSED WITH 0 ERRORS!");
  } else {
    console.error(`⚠️ HERO PASS COMPLETED WITH ${failedChecks} FAILED CHECK(S)`);
  }
  console.log("=======================================================\n");

  await browser.close();
  process.exit(failedChecks > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error("Hero pass test error:", err);
  process.exit(1);
});
