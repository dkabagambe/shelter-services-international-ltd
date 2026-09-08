#!/usr/bin/env node
/**
 * post-build.mjs
 *
 * Copies dist/index.html into a subfolder for every app route so Apache
 * can serve them as static files — no mod_rewrite / .htaccess needed.
 *
 * Result:
 *   dist/shop/index.html
 *   dist/login/index.html
 *   dist/signup/index.html
 *   dist/checkout/index.html
 *   dist/account/index.html
 *   dist/admin/index.html
 *   dist/forgot-password/index.html
 */

import { cpSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist");

// Every route path in the app (must match src/routeTree.gen.ts)
const routes = [
  "shop",
  "login",
  "signup",
  "checkout",
  "account",
  "admin",
  "forgot-password",
];

const src = join(distDir, "index.html");
const html = readFileSync(src, "utf8");

for (const route of routes) {
  const dir = join(distDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  console.log(`  ✓ dist/${route}/index.html`);
}

// Also write a minimal .htaccess as a fallback for product detail pages
// (/products/some-id) which are dynamic and can't be pre-rendered.
// This is the absolute minimum — just 3 lines, works on every Apache host.
const htaccess = `RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;
writeFileSync(join(distDir, ".htaccess"), htaccess);
console.log("  ✓ dist/.htaccess (fallback for /products/* routes)");

console.log("\nPost-build complete.");
