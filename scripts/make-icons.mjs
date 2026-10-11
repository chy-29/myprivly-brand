#!/usr/bin/env node
// Renders an app's icon files from the MyPrivly mark, on the brand's near-black violet background.
//
//   npx myprivly-make-icons [--icons public/icons] [--next-app app]
//
// --icons     folder for icon-192.png, icon-512.png and maskable-512.png (PWA manifest)
// --next-app  folder for icon.png and apple-icon.png (Next.js app directory); skip for other stacks
// Needs @playwright/test and Chrome or Edge installed (nothing is downloaded).

import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const iconsDir = opt("icons", "public/icons");
const nextDir = opt("next-app", null);

const { chromium } = await import("@playwright/test");
const here = dirname(fileURLToPath(import.meta.url));
const mark = readFileSync(join(here, "..", "logo", "mark.svg"), "utf8");

// [file, pixel size, mark height relative to the icon]. Maskable icons get cropped by the phone,
// so their mark stays inside the middle 60%.
const ICONS = [
  [join(iconsDir, "icon-192.png"), 192, 0.56],
  [join(iconsDir, "icon-512.png"), 512, 0.56],
  [join(iconsDir, "maskable-512.png"), 512, 0.44],
  ...(nextDir ? [[join(nextDir, "apple-icon.png"), 180, 0.56], [join(nextDir, "icon.png"), 512, 0.56]] : []),
];

const executablePath = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => existsSync(p));
if (!executablePath) throw new Error("Chrome or Edge was not found.");

const browser = await chromium.launch({ executablePath });
for (const [file, size, height] of ICONS) {
  mkdirSync(dirname(file), { recursive: true });
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><style>
    html, body { margin: 0; width: ${size}px; height: ${size}px; }
    body { display: flex; align-items: center; justify-content: center;
           background: radial-gradient(ellipse at 50% 115%, #1a1066 0%, rgba(26,16,102,0) 60%), #06041a; }
    svg { height: ${Math.round(size * height)}px; width: auto; }
  </style></head><body>${mark}</body></html>`, { waitUntil: "load" });
  await page.screenshot({ path: file });
  await page.close();
  console.log(`wrote ${file} (${size}px)`);
}
await browser.close();