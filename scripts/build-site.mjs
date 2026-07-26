#!/usr/bin/env node
/**
 * Materialises the current version of the site at the root.
 *
 *   node scripts/build-site.mjs
 *
 * "Current" is not declared anywhere — it is the era in public/archive.json with
 * the newest date. Shipping a redesign means adding an entry dated today and
 * running this; / follows automatically and the previous current becomes just
 * another frame in the timeline.
 *
 * Also writes the redirects declared in the manifest, so URLs that belonged to a
 * retired generation keep resolving instead of 404ing.
 */

import { readFile, writeFile, cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");

const manifest = JSON.parse(await readFile(join(PUBLIC_DIR, "archive.json"), "utf8"));
const eras = (manifest.eras || []).slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
const current = eras[eras.length - 1];

if (!current) {
  console.error("No eras in archive.json");
  process.exit(1);
}

console.log(`current era: ${current.id} (${current.date}) — ${current.label}`);

if (current.source) {
  // The era being authored right now lives in the working tree.
  const src = join(ROOT, current.source);
  if (!existsSync(src)) throw new Error(`source missing: ${current.source}`);
  await cp(src, join(PUBLIC_DIR, "index.html"));
  console.log(`  ${current.source} -> public/index.html`);
} else {
  // A previously frozen era was promoted back to current.
  const src = join(PUBLIC_DIR, "archive", current.id);
  if (!existsSync(src)) throw new Error(`not archived yet: ${current.id}`);
  await cp(src, PUBLIC_DIR, { recursive: true });
  console.log(`  public/archive/${current.id}/ -> public/`);
}

// Redirects keep the URLs of retired generations alive. A meta refresh plus a
// canonical link is enough on a static host and needs no server config.
const redirects = manifest.redirects || {};
for (const [from, to] of Object.entries(redirects)) {
  const file = join(PUBLIC_DIR, from.replace(/^\//, ""));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    `<!doctype html>
<meta charset="utf-8" />
<title>Moved</title>
<link rel="canonical" href="${to}" />
<meta http-equiv="refresh" content="0; url=${to}" />
<p>This page moved to <a href="${to}">${to}</a>.</p>
`
  );
  console.log(`  redirect ${from} -> ${to}`);
}

console.log("done");
