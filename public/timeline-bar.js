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
 * At rest it is a small centred glass pill showing only dots. Hovering expands
 * it, fades in the year labels, and raises a preview of whichever era is under
 * the pointer; clicking navigates there. Dragging scrubs, for when there are
 * more eras than fit.
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

  var CSS = [
    ":host{all:initial}",
    "*{box-sizing:border-box;margin:0;padding:0}",

    ".wrap{",
    "  position:fixed;left:50%;bottom:14px;transform:translateX(-50%);",
    "  z-index:2147483000;display:flex;flex-direction:column;align-items:center;",
    "  font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,monospace;",
    "  font-size:11px;line-height:1;",
    "  --fg:#111;--muted:#8a8a8f;--glass:rgba(255,255,255,.62);",
    "  --edge:rgba(255,255,255,.7);--ring:rgba(0,0,0,.08);",
    "  --shadow:0 8px 32px rgba(0,0,0,.14);--sheen:rgba(255,255,255,.75);",
    "}",
    ".wrap[data-theme=dark]{",
    "  --fg:#f2f2f5;--muted:#83858d;--glass:rgba(18,20,26,.58);",
    "  --edge:rgba(255,255,255,.12);--ring:rgba(0,0,0,.5);",
    "  --shadow:0 8px 32px rgba(0,0,0,.5);--sheen:rgba(255,255,255,.10);",
    "}",

    /* Preview rises out of the pill rather than sitting above it permanently. */
    ".peek{",
    "  pointer-events:none;margin-bottom:9px;",
    "  opacity:0;transform:translateY(8px) scale(.96);transform-origin:50% 100%;",
    "  transition:opacity .22s cubic-bezier(.2,.8,.2,1),transform .22s cubic-bezier(.2,.8,.2,1);",
    "}",
    ".wrap.open .peek{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}",
    ".card{",
    "  display:block;width:min(300px,78vw);overflow:hidden;",
    "  border-radius:14px;border:1px solid var(--edge);",
    "  background:var(--glass);-webkit-backdrop-filter:blur(22px) saturate(180%);",
    "  backdrop-filter:blur(22px) saturate(180%);",
    "  box-shadow:var(--shadow),0 0 0 1px var(--ring),inset 0 1px 0 var(--sheen);",
    "  text-decoration:none;color:var(--fg);",
    "}",
    ".card img{display:block;width:100%;height:auto}",
    ".card .cap{display:flex;gap:6px;align-items:baseline;padding:7px 10px;",
    "  border-top:1px solid var(--edge);white-space:nowrap;overflow:hidden}",
    ".card .cap b{font-weight:700}",
    ".card .cap span{color:var(--muted);font-size:10px}",

    /* The pill itself: barely there until you reach for it. */
    ".pill{",
    "  display:flex;align-items:center;max-width:min(420px,88vw);",
    "  padding:7px 9px;border-radius:999px;",
    "  background:var(--glass);-webkit-backdrop-filter:blur(22px) saturate(180%);",
    "  backdrop-filter:blur(22px) saturate(180%);",
    "  border:1px solid var(--edge);",
    "  box-shadow:var(--shadow),0 0 0 1px var(--ring),inset 0 1px 0 var(--sheen);",
    "  overflow-x:auto;scrollbar-width:none;cursor:grab;",
    "  opacity:.4;transition:opacity .26s ease,box-shadow .26s ease;",
    "}",
    ".pill::-webkit-scrollbar{display:none}",
    ".pill.dragging{cursor:grabbing}",
    ".wrap.open .pill{opacity:1}",

    ".era{",
    "  flex:0 0 auto;display:flex;align-items:center;gap:0;",
    "  padding:3px 5px;border-radius:999px;",
    "  color:var(--muted);text-decoration:none;white-space:nowrap;",
    "  background:none;border:0;font:inherit;cursor:pointer;",
    "  transition:color .2s ease;",
    "}",
    ".era .dot{",
    "  width:6px;height:6px;border-radius:50%;background:currentColor;flex:0 0 auto;",
    "  transition:transform .24s cubic-bezier(.2,.8,.2,1),background .24s ease;",
    "}",
    /* Labels are collapsed to zero width at rest, so the pill grows into them. */
    ".era .yr{",
    "  display:inline-block;overflow:hidden;max-width:0;opacity:0;",
    "  font-variant-numeric:tabular-nums;",
    "  transition:max-width .3s cubic-bezier(.2,.8,.2,1),opacity .2s ease,margin .3s cubic-bezier(.2,.8,.2,1);",
    "}",
    ".wrap.open .era .yr{max-width:5.5em;opacity:1;margin-left:5px}",
    ".era[aria-current=true]{color:var(--fg);font-weight:700}",
    ".era[aria-current=true] .dot{transform:scale(1.45)}",
    ".era:hover,.era:focus-visible{color:var(--fg)}",
    ".era.peeking .dot{transform:scale(1.45)}",
    ".era:focus-visible{outline:2px solid var(--fg);outline-offset:2px}",

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
    var hour = new Date().getHours();
    wrap.dataset.theme = hour >= 7 && hour < 19 ? "light" : "dark";

    var peek = document.createElement("div");
    peek.className = "peek";
    var card = document.createElement("a");
    card.className = "card";
    var img = document.createElement("img");
    var cap = document.createElement("div");
    cap.className = "cap";
    card.appendChild(img);
    card.appendChild(cap);
    peek.appendChild(card);

    var pill = document.createElement("div");
    pill.className = "pill";
    pill.setAttribute("role", "list");
    pill.setAttribute("aria-label", "Versions of this site");

    var here = location.pathname.match(/\/archive\/([^/]+)\//);
    var currentId = here ? here[1] : null;

    var items = eras.map(function (era) {
      // The newest era is what / serves, so it is linked there rather than at
      // its archive path — same page, canonical URL.
      var href = era.newest ? "/" : "/archive/" + era.id + "/";
      var a = document.createElement("a");
      a.className = "era";
      a.href = href;
      a.setAttribute("role", "listitem");
      a.title = era.label + " · " + span(era);

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

    wrap.appendChild(peek);
    wrap.appendChild(pill);
    root.appendChild(style);
    root.appendChild(wrap);
    document.body.appendChild(host);

    // Keep the host page's own content clear of the floating pill.
    var prev = parseInt(getComputedStyle(document.body).paddingBottom, 10) || 0;
    document.body.style.paddingBottom = prev + CLEARANCE + "px";

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
      img.src = "/archive/" + item.era.id + "/preview.png";
      img.alt = item.era.label;
      cap.innerHTML = "";
      var b = document.createElement("b");
      b.textContent = item.era.label;
      var s = document.createElement("span");
      s.textContent = span(item.era);
      cap.appendChild(b);
      cap.appendChild(s);
      card.href = item.href;
    }
    preview(current);

    items.forEach(function (i) {
      i.el.addEventListener("pointerenter", function () { preview(i); });
      i.el.addEventListener("focus", function () { open(true); preview(i); });
    });

    var openTimer = 0;
    function open(state) {
      clearTimeout(openTimer);
      if (state) {
        wrap.classList.add("open");
      } else {
        // Brief grace period so crossing the gap to the card doesn't dismiss it.
        openTimer = setTimeout(function () {
          wrap.classList.remove("open");
          preview(current);
        }, 160);
      }
    }
    wrap.addEventListener("pointerenter", function () { open(true); });
    wrap.addEventListener("pointerleave", function () { if (!down) open(false); });
    wrap.addEventListener("focusout", function (e) {
      if (!wrap.contains(e.relatedTarget)) open(false);
    });

    // Drag to scrub, for when there are more eras than fit the pill. Only
    // suppress the click if the pointer actually moved, so a tap still navigates.
    var down = false, startX = 0, startScroll = 0, moved = 0;
    pill.addEventListener("pointerdown", function (e) {
      down = true; moved = 0;
      startX = e.clientX;
      startScroll = pill.scrollLeft;
      pill.classList.add("dragging");
      open(true);
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      pill.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false;
      pill.classList.remove("dragging");
    });
    pill.addEventListener("click", function (e) {
      if (moved > 4) { e.preventDefault(); e.stopPropagation(); }
    }, true);
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
