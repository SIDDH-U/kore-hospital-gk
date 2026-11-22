import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true
});

const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const page = await context.newPage();

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1000);

const btn = page.locator('button[aria-label="Open navigation menu"]');
console.log("Menu button count:", await btn.count());
const btnBox = await btn.boundingBox();
console.log("Menu button bounding box:", btnBox);

await btn.tap();
await page.waitForTimeout(500);

const hasDrawer = await page.locator("text=Treatments").count();
console.log("Treatments text count after tap:", hasDrawer);

const menuOpenAttr = await btn.getAttribute("aria-expanded");
console.log("Button aria-expanded:", menuOpenAttr);

const drawerLoc = page.locator(".fixed.inset-x-0");
console.log("Fixed drawer count:", await drawerLoc.count());
if (await drawerLoc.count() > 0) {
  console.log("Drawer visible:", await drawerLoc.isVisible());
  console.log("Drawer box:", await drawerLoc.boundingBox());
}

await browser.close();
