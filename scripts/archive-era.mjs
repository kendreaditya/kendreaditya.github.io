#!/usr/bin/env node
/**
 * Freezes a past version of this site into public/archive/<id>/ so the timeline
 * can link to a working copy of it.
 *
 *   node scripts/archive-era.mjs 2021-gitfolio     # one era
 *   node scripts/archive-era.mjs --all             # every era not yet archived
 *   node scripts/archive-era.mjs --all --force     # re-do ones already archived
 *
 * Eras are declared in public/archive.json.
 *
 * Why build once and commit the output, rather than rebuild on deploy:
 * these eras depend on 2021-era toolchains. If the live deploy rebuilt them,
 * a yanked transitive package or a Node bump would break shipping the CURRENT
 * site because of a five-year-old lockfile. Building once means each era has to
 * succeed exactly one time, ever; after that it is inert static files.
 *
 * Each era is built from its own commit in a detached git worktree, so nothing
 * is ever moved out of the working tree and every era carries the data it
 * actually shipped with (the 2024 build reads its own resume.ts, not today's
 * data.json).
 */

import { spawn, execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { readFile, writeFile, rm, mkdir, cp, access, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const ARCHIVE_DIR = join(PUBLIC_DIR, "archive");
const MANIFEST = join(PUBLIC_DIR, "archive.json");
const TMP = join(process.env.TMPDIR || "/tmp", "site-archive-worktrees");

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].find((p) => existsSync(p));

const args = process.argv.slice(2);
const force = args.includes("--force");
const all = args.includes("--all");
const wanted = args.filter((a) => !a.startsWith("--"));

const sh = (cmd, cwd) =>
  execFileSync("bash", ["-lc", cmd], { cwd, stdio: "inherit", env: { ...process.env } });

/** Point an era's build at /archive/<id>/ so its asset URLs resolve in a subfolder. */
async function prepare(kind, dir, id) {
  const base = `/archive/${id}`;
  if (kind === "basePath") {
    const f = join(dir, "next.config.mjs");
    let s = await readFile(f, "utf8");
    // Strip any existing basePath/assetPrefix first. The 2024 config carries a
    // leftover basePath from the starter template, and since a later property
    // wins in an object literal, an injected one would be silently overridden.
    s = s.replace(/^\s*(basePath|assetPrefix)\s*:\s*["'][^"']*["']\s*,?\s*$/gm, "");
    s = s.replace(/const nextConfig = \{/, `const nextConfig = {\n  basePath: "${base}",\n  assetPrefix: "${base}",`);
    await writeFile(f, s);
    if (!s.includes(`basePath: "${base}"`)) throw new Error("basePath patch did not apply");
  } else if (kind === "homepage") {
    const f = join(dir, "package.json");
    const p = JSON.parse(await readFile(f, "utf8"));
    p.homepage = base;
    await writeFile(f, JSON.stringify(p, null, 2));
  }
}

/**
 * Repoint root-absolute asset URLs at the archive folder.
 *
 * Next's basePath only rewrites next/image, next/link and router paths — a raw
 * <img src="/foo.jpg"> in JSX comes through untouched and would resolve against
 * the LIVE site root, where that file no longer exists. Only paths whose target
 * is actually present inside the archive are rewritten, so external and
 * unrelated links are left alone.
 */
async function rebaseAbsolutePaths(dest, id) {
  const base = `/archive/${id}`;
  const exts = new Set([".html", ".css", ".js", ".txt", ".json"]);
  const files = [];
  const walk = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (exts.has(extname(p))) files.push(p);
    }
  };
  await walk(dest);

  let n = 0;
  for (const f of files) {
    const s = await readFile(f, "utf8");
    const out = s.replace(/(src|href)="\/([^"/][^"]*)"/g, (m, attr, path) => {
      if (path.startsWith("archive/")) return m;
      const target = path.split(/[?#]/)[0];
      if (!existsSync(join(dest, target))) return m;
      n++;
      return `${attr}="${base}/${path}"`;
    });
    if (out !== s) await writeFile(f, out);
  }
  return n;
}

/**
 * Add the shared timeline bar to an archived page.
 *
 * Appended as a single external <script> rather than edited into the markup, so
 * the archived document itself stays byte-faithful to what shipped — the bar is
 * an overlay on the artifact, not a modification of it. Without this there is no
 * way back out of an archived era.
 */
async function injectBar(dest) {
  const tag = `<script src="/timeline-bar.js" defer></script>`;
  const files = [];
  const walk = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (extname(p) === ".html") files.push(p);
    }
  };
  await walk(dest);

  let n = 0;
  for (const f of files) {
    const s = await readFile(f, "utf8");
    if (s.includes("timeline-bar.js")) continue;
    const out = s.includes("</body>")
      ? s.replace(/<\/body>/i, `${tag}</body>`)
      : s + tag;
    await writeFile(f, out);
    n++;
  }
  return n;
}

/** Serve public/ on an ephemeral port so the archived copy can be screenshotted. */
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".gif": "image/gif", ".ico": "image/x-icon", ".webp": "image/webp" };

function serve() {
  const server = createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let file = join(PUBLIC_DIR, p);
      if (!file.startsWith(PUBLIC_DIR)) throw new Error("escape");
      try { if ((await import("node:fs")).statSync(file).isDirectory()) file = join(file, "index.html"); } catch {}
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

async function screenshot(url, outFile) {
  if (!CHROME) { console.warn("  ! no Chrome found, skipping screenshot"); return false; }
  const port = 9500 + Math.floor(process.hrtime()[1] % 400);
  const proc = spawn(CHROME, [
    "--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`,
    `--user-data-dir=${join(TMP, "chrome-profile")}`, "about:blank",
  ]);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  try {
    let targets;
    for (let i = 0; i < 40; i++) {
      try {
        targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
        if (targets.some((t) => t.type === "page")) break;
      } catch {}
      await wait(250);
    }
    const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));
    let id = 0;
    const pending = new Map();
    ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
    const send = (method, params = {}) => new Promise((ok) => { const i = ++id; pending.set(i, ok); ws.send(JSON.stringify({ id: i, method, params })); });

    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url });
    await wait(3500);
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 900, scale: 0.5 } });
    await writeFile(outFile, Buffer.from(shot.data, "base64"));
    ws.close();
    return true;
  } finally {
    proc.kill();
  }
}

async function archive(era) {
  const { id, commit } = era;
  const work = join(TMP, id);
  const dest = join(ARCHIVE_DIR, id);
  console.log(`\n== ${id}  (${era.date}, ${commit})`);

  await rm(work, { recursive: true, force: true });
  await mkdir(TMP, { recursive: true });
  // Detached worktree: the working tree is never touched.
  sh(`git worktree add --detach --force "${work}" ${commit}`, ROOT);

  try {
    if (era.prepare) { await prepare(era.prepare, work, id); console.log(`  prepared: ${era.prepare} -> /archive/${id}`); }
    if (era.build) { console.log(`  building: ${era.build}`); sh(era.build, work); }

    await rm(dest, { recursive: true, force: true });
    await mkdir(dest, { recursive: true });

    if (era.files) {
      for (const f of era.files) {
        try { await access(join(work, f)); await cp(join(work, f), join(dest, f)); }
        catch { console.warn(`  ! missing ${f}, skipped`); }
      }
      console.log(`  copied ${era.files.length} file(s)`);
    } else {
      await cp(join(work, era.output), dest, { recursive: true });
      console.log(`  copied ${era.output}/`);
    }
  } finally {
    sh(`git worktree remove --force "${work}"`, ROOT);
  }

  const rebased = await rebaseAbsolutePaths(dest, id);
  if (rebased) console.log(`  rebased ${rebased} root-absolute asset URL(s)`);

  const injected = await injectBar(dest);
  if (injected) console.log(`  injected timeline bar into ${injected} page(s)`);

  const server = await serve();
  const url = `http://127.0.0.1:${server.address().port}/archive/${id}/`;
  const ok = await screenshot(url, join(dest, "preview.png"));
  server.close();
  console.log(`  ${ok ? "screenshot saved" : "no screenshot"} -> public/archive/${id}/`);
  return true;
}

const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
// `live: true` is the generation currently served at /. It has no frozen copy
// and nothing to build — it becomes a real era only once it is replaced.
const todo = manifest.eras.filter((e) =>
  !e.live && (all ? force || !e.archived : wanted.includes(e.id))
);
if (!todo.length) { console.log("Nothing to do. Pass an era id or --all."); process.exit(0); }

for (const era of todo) {
  await archive(era);
  era.archived = true;
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nDone: ${todo.map((e) => e.id).join(", ")}`);
