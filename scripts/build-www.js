#!/usr/bin/env node
/*
 * Capacitor needs a `webDir` containing the web app. Our single source of truth
 * is the root `index.html`, so this copies it (and any static assets) into `www/`.
 * Run automatically by `npm run build` / `npm run sync`.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "www");

fs.mkdirSync(outDir, { recursive: true });

// The app is a single self-contained file. Copy it as the web entry point.
fs.copyFileSync(path.join(root, "index.html"), path.join(outDir, "index.html"));

// If you later add static assets (icons, fonts, images), list them here to copy too.
const extraAssets = []; // e.g. ["favicon.png", "assets/"]
for (const rel of extraAssets) {
  const src = path.join(root, rel);
  const dest = path.join(outDir, rel);
  if (!fs.existsSync(src)) continue;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

console.log("✓ Built www/ from index.html");
