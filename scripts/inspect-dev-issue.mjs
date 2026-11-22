import { chromium } from "playwright-core";
import fs from "fs";

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

async function inspectIssue() {
  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const issueDetails = await page.evaluate(async () => {
    const portal = document.querySelector("nextjs-portal");
    if (!portal || !portal.shadowRoot) return "No portal found";

    // Click badge to expand issues
    const badge = portal.shadowRoot.querySelector("[data-next-badge]");
    if (badge) {
      badge.click();
    }

    // Wait a moment
    await new Promise((r) => setTimeout(r, 800));

    // Get all text in shadowRoot
    const allText = portal.shadowRoot.innerText || portal.shadowRoot.textContent;
    const dialog = portal.shadowRoot.querySelector("[role='dialog']") || portal.shadowRoot.querySelector("[data-nextjs-dialog-content]");
    return {
      allText: allText ? allText.slice(0, 2000) : null,
      dialogText: dialog ? (dialog.innerText || dialog.textContent) : null,
    };
  });

  console.log("ISSUE DETAILS FROM DEV OVERLAY:", JSON.stringify(issueDetails, null, 2));

  await browser.close();
}

inspectIssue().catch(console.error);
