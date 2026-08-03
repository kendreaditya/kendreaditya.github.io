/**
 * Universal footer: a floating timeline of every version of this site.
 * Include it on any page with:
 *
 *   <script src="/timeline-bar.js" defer></script>
 *
 * It reads /archive.json, works out which era the current page belongs to from
 * the URL, and marks it — so on kendre.me it rests on the live site, and inside
 * /archive/<id>/ it rests on that era.
 *
 * It starts as a compact row of dots. The first click expands the year labels;
 * every labelled era is then a normal direct link. Precise pointers may hover an
 * expanded era for a preview, while touch screens omit previews entirely so a
 * link tap cannot be mistaken for a selection step.
 *
 * Everything lives in a shadow root. That matters because this is injected into
 * three historically different sites (a 2021 CRA bundle, a gitfolio page, a
 * Next export) whose global CSS would otherwise reach in and restyle it.
 */
(function () {
  "use strict";

  if (window.__timelineBar) return;
  window.__timelineBar = true;

  var MANIFEST = "/archive.json";
  var CLEARANCE = 62; // room reserved at the foot of the host page

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Parsed by hand rather than with Date(), which would shift an ISO date across
  // the day boundary for anyone west of UTC.
  function pretty(iso) {
    var p = String(iso || "").split("-");
    return p[1] ? MONTHS[+p[1] - 1] + " " + p[0] : p[0] || "";
  }
  function year(iso) {
    return String(iso || "").split("-")[0] || "";
  }
  function span(era) {
    var from = pretty(era.date);
    var to = era.newest ? "now" : pretty(era.dateEnd);
    return to && to !== from ? from + " – " + to : from;
  }
  // Two eras began in 2021, so bare start years would print "2021" twice and
  // read as a bug. Multi-year eras show their span instead: 2021–24.
  function tick(era) {
    if (era.newest) return "now";
    var a = year(era.date), b = year(era.dateEnd);
    return b && b !== a ? a + "–" + b.slice(2) : a;
  }

  // Computed colours are returned as rgb()/rgba() in current browsers. The bar
  // is shared by white, charcoal, black and textured dark pages, so its material
  // must follow the surface beneath it rather than the viewer's local clock.
  function rgb(value) {
    var n = String(value || "").match(/[\d.]+%?/g);
    if (!n || n.length < 3) return null;
    var channel = function (v) { return v.endsWith("%") ? parseFloat(v) * 2.55 : parseFloat(v); };
    var alpha = n[3] == null ? 1 : n[3].endsWith("%") ? parseFloat(n[3]) / 100 : parseFloat(n[3]);
    return [channel(n[0]), channel(n[1]), channel(n[2]), alpha];
  }

  function luminance(c) {
    var linear = c.slice(0, 3).map(function (v) {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  }

  function pageTheme() {
    var surfaces = [document.body, document.documentElement];
    for (var i = 0; i < surfaces.length; i++) {
      var c = rgb(getComputedStyle(surfaces[i]).backgroundColor);
      if (c && c[3] > 0.05) return luminance(c) > 0.34 ? "light" : "dark";
    }
    var scheme = getComputedStyle(document.documentElement).colorScheme;
    if (scheme && scheme.indexOf("dark") !== -1) return "dark";
    var foreground = rgb(getComputedStyle(document.body).color);
    return foreground && luminance(foreground) > 0.5 ? "dark" : "light";
  }

  var CSS = [
    ":host{all:initial}",
    "*{box-sizing:border-box;margin:0;padding:0}",

    ".wrap{",
    "  position:fixed;left:50%;bottom:14px;transform:translateX(-50%);",
    "  z-index:2147483000;display:flex;flex-direction:column;align-items:center;",
    "  font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,monospace;",
    "  font-size:11px;line-height:1;",
    "  --fg:#17171a;--muted:#62636a;",
    "  --frost:rgba(246,246,248,.76);--frost-top:rgba(255,255,255,.9);--solid:#f2f2f4;",
    "  --edge:rgba(255,255,255,.92);--inner:rgba(255,255,255,.66);--ring:rgba(25,25,30,.12);",
    "  --shadow:0 10px 32px rgba(20,20,24,.18);",
    "}",
    ".wrap[data-theme=dark]{",
    "  --fg:#f5f5f7;--muted:#b5b6bd;",
    "  --frost:rgba(34,36,43,.78);--frost-top:rgba(54,57,66,.86);--solid:#292b32;",
    "  --edge:rgba(255,255,255,.24);--inner:rgba(255,255,255,.12);--ring:rgba(0,0,0,.72);",
    "  --shadow:0 12px 36px rgba(0,0,0,.56);",
    "}",

    /* Preview rises out of the pill rather than sitting above it permanently. */
    ".peek{",
    "  order:-1;pointer-events:none;margin-bottom:9px;",
    "  opacity:0;transform:translateY(8px) scale(.96);transform-origin:50% 100%;",
    "  transition:opacity .22s cubic-bezier(.2,.8,.2,1),transform .22s cubic-bezier(.2,.8,.2,1);",
    "}",
    ".wrap.open .peek{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}",
    ".card{",
    "  position:relative;isolation:isolate;display:block;width:min(300px,78vw);overflow:hidden;",
    "  border-radius:16px;border:1px solid var(--edge);",
    "  background:linear-gradient(180deg,var(--frost-top),var(--frost));",
    "  -webkit-backdrop-filter:blur(22px) saturate(125%) contrast(105%);",
    "  backdrop-filter:blur(22px) saturate(125%) contrast(105%);",
    "  box-shadow:var(--shadow),0 0 0 1px var(--ring),inset 0 1px 0 var(--inner);",
    "  text-decoration:none;color:var(--fg);",
    "}",
    ".card .visual{position:relative;aspect-ratio:4/3;overflow:hidden;",
    "  background:var(--solid)}",
    ".card img{position:relative;z-index:1;display:block;width:100%;height:100%;object-fit:cover}",
    ".card .shot-fallback{position:absolute;z-index:0;inset:0;display:flex;align-items:center;justify-content:center;",
    "  color:var(--muted);font-weight:700;letter-spacing:.02em}",
    ".card:not(.no-shot) .shot-fallback{display:none}",
    ".card.no-shot img{display:none}",
    ".card .cap{display:flex;gap:6px;align-items:center;min-height:36px;padding:8px 11px;",
    "  position:relative;z-index:1;border-top:1px solid var(--edge);white-space:nowrap;overflow:hidden}",
    ".card .cap b{font-weight:700}",
    ".card .cap span{color:var(--muted);font-size:10px}",
    ".card .cap .go{margin-left:auto;color:var(--fg);font-weight:700}",

    /* The pill starts as a compact row of dots. Its first click reveals labels;
       only subsequent clicks follow an era link. */
    ".pill{",
    "  position:relative;isolation:isolate;display:flex;align-items:center;max-width:min(420px,88vw);",
    "  padding:7px 9px;border-radius:999px;",
    "  background:linear-gradient(180deg,var(--frost-top),var(--frost));",
    "  -webkit-backdrop-filter:blur(22px) saturate(125%) contrast(105%);",
    "  backdrop-filter:blur(22px) saturate(125%) contrast(105%);",
    "  border:1px solid var(--edge);",
    "  box-shadow:var(--shadow),0 0 0 1px var(--ring),inset 0 1px 0 var(--inner);",
    "  overflow-x:auto;scrollbar-width:none;overscroll-behavior-x:contain;",
    "  transition:box-shadow .26s ease,max-width .3s cubic-bezier(.2,.8,.2,1);",
    "}",
    ".pill::-webkit-scrollbar{display:none}",

    ".era{",
    "  flex:0 0 auto;display:flex;align-items:center;gap:0;",
    "  min-width:28px;min-height:28px;justify-content:center;padding:3px 7px;border-radius:999px;",
    "  color:var(--muted);text-decoration:none;white-space:nowrap;",
    "  background:none;border:0;font:inherit;cursor:pointer;",
    "  transition:color .2s ease;",
    "}",
    ".era .dot{",
    "  width:6px;height:6px;border-radius:50%;background:currentColor;flex:0 0 auto;",
    "  transition:transform .24s cubic-bezier(.2,.8,.2,1),background .24s ease;",
    "}",
    ".era .yr{",
    "  display:inline-block;max-width:0;opacity:0;margin-left:0;overflow:hidden;",
    "  font-variant-numeric:tabular-nums;",
    "  transition:max-width .3s cubic-bezier(.2,.8,.2,1),opacity .18s ease,margin .3s ease;",
    "}",
    ".wrap.expanded .era .yr{max-width:5.5em;opacity:1;margin-left:5px}",
    ".era[aria-current=true]{color:var(--fg);font-weight:700}",
    ".era[aria-current=true] .dot{transform:scale(1.45)}",
    ".era[aria-expanded=true]{color:var(--fg);background:rgba(127,127,127,.14)}",
    ".era:hover,.era:focus-visible{color:var(--fg)}",
    ".era.peeking .dot{transform:scale(1.45)}",
    ".era:focus-visible{outline:2px solid var(--fg);outline-offset:2px}",

    "@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){",
    "  .card,.pill{background:var(--solid)}",
    "}",

    "@media (prefers-reduced-transparency:reduce),(prefers-contrast:more){",
    "  .card,.pill{background:var(--solid);-webkit-backdrop-filter:none;backdrop-filter:none;",
    "    border-color:var(--fg);box-shadow:0 8px 24px var(--ring)}",
    "}",

    "@media (hover:none),(pointer:coarse),(max-width:600px){",
    "  .wrap{bottom:max(8px,env(safe-area-inset-bottom));width:100%;padding:0 10px}",
    "  .peek{margin-bottom:8px}",
    "  .card{width:min(360px,calc(100vw - 20px));border-radius:18px}",
    "  .card .cap{min-height:48px;padding:10px 14px}",
    "  .pill{max-width:calc(100vw - 20px);padding:3px 4px;touch-action:pan-x;scroll-snap-type:x proximity}",
    "  .era{min-width:44px;min-height:44px;padding:0 10px;scroll-snap-align:center}",
    "  .era .dot{width:7px;height:7px}",
    "  .wrap.expanded .era .yr{margin-left:6px}",
    "}",

    "@media (hover:none),(pointer:coarse){.peek{display:none}}",

    "@media (prefers-reduced-motion:reduce){*{transition:none!important}}",
  ].join("\n");

  function build(eras) {
    var host = document.createElement("div");
    host.id = "site-timeline-bar";
    var root = host.attachShadow({ mode: "open" });

    var style = document.createElement("style");
    style.textContent = CSS;

    var wrap = document.createElement("div");
    wrap.className = "wrap";
    wrap.dataset.theme = pageTheme();

    var peek = document.createElement("div");
    peek.className = "peek";
    peek.id = "timeline-preview";
    peek.setAttribute("aria-hidden", "true");
    var card = document.createElement("a");
    card.className = "card";
    card.tabIndex = -1;
    var visual = document.createElement("div");
    visual.className = "visual";
    var img = document.createElement("img");
    var shotFallback = document.createElement("div");
    shotFallback.className = "shot-fallback";
    var cap = document.createElement("div");
    cap.className = "cap";
    var go = document.createElement("span");
    go.className = "go";
    go.textContent = "open →";
    visual.appendChild(img);
    visual.appendChild(shotFallback);
    card.appendChild(visual);
    card.appendChild(cap);
    peek.appendChild(card);

    var pill = document.createElement("nav");
    pill.className = "pill";
    pill.setAttribute("aria-label", "Versions of this site");
    pill.setAttribute("aria-expanded", "false");

    var here = location.pathname.match(/\/archive\/([^/]+)\//);
    var currentId = here ? here[1] : null;

    var items = eras.map(function (era) {
      // The newest era is what / serves, so it is linked there rather than at
      // its archive path — same page, canonical URL.
      var href = era.newest ? "/" : "/archive/" + era.id + "/";
      var a = document.createElement("a");
      a.className = "era";
      a.href = href;
      a.title = era.label + " · " + span(era);
      a.setAttribute("aria-controls", peek.id);
      a.setAttribute("aria-label", era.label + ", " + span(era));

      var dot = document.createElement("span");
      dot.className = "dot";
      var yr = document.createElement("span");
      yr.className = "yr";
      yr.textContent = tick(era);
      a.appendChild(dot);
      a.appendChild(yr);
      pill.appendChild(a);

      return { era: era, el: a, href: href };
    });

    wrap.appendChild(pill);
    wrap.appendChild(peek);
    root.appendChild(style);
    root.appendChild(wrap);
    document.body.appendChild(host);

    // Keep the host page's own content clear of the floating pill.
    var finePointer = !window.matchMedia || window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    var prev = parseInt(getComputedStyle(document.body).paddingBottom, 10) || 0;
    document.body.style.paddingBottom = prev + (finePointer ? CLEARANCE : 76) + "px";

    // The page's own era stays marked; hovering only changes what is PREVIEWED.
    var current =
      items.filter(function (i) { return currentId ? i.era.id === currentId : i.era.newest; })[0] ||
      items[items.length - 1];
    items.forEach(function (i) { i.el.setAttribute("aria-current", String(i === current)); });

    var shown = null;
    function preview(item) {
      if (!item || item === shown) return;
      if (shown) shown.el.classList.remove("peeking");
      shown = item;
      item.el.classList.add("peeking");
      // The live era is served at / and has no frozen archive directory yet.
      // Show a labelled glass fallback while a screenshot loads, and retain it
      // if an old archive is ever missing its preview instead of showing a broken
      // image icon.
      card.classList.add("no-shot");
      shotFallback.textContent = item.era.label;
      img.alt = item.era.label;
      img.src = item.era.preview ||
        (item.era.newest ? "/preview.svg" : "/archive/" + item.era.id + "/preview.png");
      cap.innerHTML = "";
      var b = document.createElement("b");
      b.textContent = item.era.label;
      var s = document.createElement("span");
      s.textContent = span(item.era);
      cap.appendChild(b);
      cap.appendChild(s);
      cap.appendChild(go);
      card.href = item.href;
      card.setAttribute("aria-label", "Open " + item.era.label + ", " + span(item.era));
    }
    img.addEventListener("load", function () { card.classList.remove("no-shot"); });
    img.addEventListener("error", function () { card.classList.add("no-shot"); });
    preview(current);

    var expanded = false;
    function setExpanded(state) {
      expanded = state;
      wrap.classList.toggle("expanded", state);
      pill.setAttribute("aria-expanded", String(state));
      if (!state) closeNow();
    }

    var openTimer = 0;
    function closeNow() {
      clearTimeout(openTimer);
      wrap.classList.remove("open");
      peek.setAttribute("aria-hidden", "true");
      card.tabIndex = -1;
      items.forEach(function (i) { i.el.setAttribute("aria-expanded", "false"); });
      preview(current);
    }
    function open(state) {
      clearTimeout(openTimer);
      if (state) {
        wrap.classList.add("open");
        peek.setAttribute("aria-hidden", "false");
        card.tabIndex = 0;
        items.forEach(function (i) { i.el.setAttribute("aria-expanded", String(i === shown)); });
      } else {
        // Brief grace period so crossing the gap to the card doesn't dismiss it.
        openTimer = setTimeout(closeNow, 160);
      }
    }

    items.forEach(function (i) {
      i.el.setAttribute("aria-expanded", "false");
      if (finePointer) {
        i.el.addEventListener("focus", function () {
          // Pointer clicks commonly focus a link before dispatching click. Only
          // keyboard-visible focus may expand here, otherwise the first pointer
          // click would accidentally become a navigation click.
          if (i.el.matches(":focus-visible")) {
            setExpanded(true);
            preview(i);
            open(true);
          }
        });
        i.el.addEventListener("pointerenter", function () {
          if (expanded) {
            preview(i);
            open(true);
          }
        });
      }
    });

    // Whichever dot receives the first click only expands the timeline. Once
    // expanded, the anchors retain their native one-click navigation behavior.
    pill.addEventListener("click", function (e) {
      if (!expanded) {
        e.preventDefault();
        setExpanded(true);
      }
    });

    if (finePointer) {
      wrap.addEventListener("pointerleave", function () { open(false); });
    }
    wrap.addEventListener("focusout", function (e) {
      if (!wrap.contains(e.relatedTarget)) open(false);
    });

    document.addEventListener("pointerdown", function (e) {
      if (expanded && e.composedPath().indexOf(host) === -1) setExpanded(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setExpanded(false);
    });

    // Touch browsers can synthesize hover while a fixed element moves under a
    // scrolling finger. Coarse pointers bind no hover/preview behavior, and a
    // page scroll returns the control to its compact resting state.
    if (!finePointer) window.addEventListener("scroll", function () { setExpanded(false); }, { passive: true });

    // Re-evaluate if a host changes theme after hydration or through its own UI.
    var syncTheme = function () { wrap.dataset.theme = pageTheme(); };
    requestAnimationFrame(syncTheme);
    setTimeout(syncTheme, 250);
    if (window.MutationObserver) {
      var observer = new MutationObserver(syncTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
      observer.observe(document.body, { attributes: true, attributeFilter: ["class", "style"] });
    }
  }

  function init() {
    fetch(MANIFEST, { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        var eras = (data.eras || []).slice().sort(function (a, b) {
          return String(a.date).localeCompare(String(b.date));
        });
        // "Current" is derived, not declared: the last era by date is the one
        // being served at /. Nothing in the manifest has to be kept in sync.
        if (eras.length) {
          eras[eras.length - 1].newest = true;
          build(eras);
        }
      })
      .catch(function () { /* the bar is an enhancement; never break the page */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
