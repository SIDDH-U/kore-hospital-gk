import { chromium } from "playwright-core";
import fs from "fs";

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

async function measure() {
  const browser = await chromium.launch({ executablePath, headless: true });
  
  // Mobile
  const mobilePage = await browser.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  const mobileSections = await mobilePage.evaluate(() => {
    const list = [];
    const elements = document.querySelectorAll("header, main > section, footer");
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      const h2 = el.querySelector("h1, h2");
      list.push({
        id: el.id || el.tagName.toLowerCase(),
        title: h2 ? h2.textContent.trim().slice(0, 30) : el.tagName.toLowerCase(),
        height: Math.round(rect.height),
        ratio: (rect.height / 844).toFixed(2),
      });
    }
    return list;
  });

  // Desktop
  const desktopPage = await browser.newPage();
  await desktopPage.setViewportSize({ width: 1280, height: 800 });
  await desktopPage.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  const desktopFooterHeight = await desktopPage.$eval("footer", (el) => el.offsetHeight);

  console.log("\n📐 MEASURED SECTION HEIGHTS AT MOBILE 390x844 (Viewport = 844px):");
  console.log("------------------------------------------------------------------");
  for (const s of mobileSections) {
    console.log(`  ${s.id.padEnd(20)} | ${s.height}px | ${(s.ratio * 100).toFixed(0)}% of screen | "${s.title}"`);
  }
  console.log("------------------------------------------------------------------");
  console.log(`🖥️ DESKTOP FOOTER HEIGHT @ 1280px: ${desktopFooterHeight}px (Target <= 280px)\n`);

  await browser.close();
}

measure();
