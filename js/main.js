/* ============================================================
   Nithin Hari — portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var PROJECTS = window.PROJECTS || [];
  var stage = document.querySelector(".stage");
  var stageMedia = document.getElementById("stageMedia");
  var worksList = document.getElementById("worksList");
  var cursorLabel = document.getElementById("cursorLabel");
  var scrollHint = document.getElementById("scrollHint");

  var slots = [];
  var videos = [];
  var items = [];
  var activeIndex = 0;
  var DEFAULT_INDEX = 0;

  /* ---------- build viewer media + work list ---------- */
  PROJECTS.forEach(function (p, i) {
    var slot = document.createElement("div");
    slot.className = "slot";

    var v = document.createElement("video");
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.preload = i === 0 ? "auto" : "metadata";
    if (p.poster) v.poster = p.poster;
    v.setAttribute("aria-label", p.title);

    var src = document.createElement("source");
    src.src = p.video;
    src.type = "video/mp4";
    v.appendChild(src);

    // graceful fallback when the file isn't there yet
    v.addEventListener("error", function () { slot.classList.add("missing"); }, true);

    var ph = document.createElement("div");
    ph.className = "placeholder";
    ph.innerHTML = "<b>" + p.title.toUpperCase() + "</b><span>" + p.category + "</span>";

    slot.appendChild(v);
    slot.appendChild(ph);
    stageMedia.appendChild(slot);
    slots.push(slot);
    videos.push(v);

    var btn = document.createElement("button");
    btn.className = "works__item";
    btn.type = "button";
    btn.textContent = p.title;
    btn.setAttribute("data-index", i);
    worksList.appendChild(btn);
    items.push(btn);
  });

  /* ---------- active project switching ---------- */
  function setActive(i) {
    if (i < 0 || i >= PROJECTS.length) return;
    activeIndex = i;
    var p = PROJECTS[i];

    slots.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
    videos.forEach(function (v, k) {
      if (k === i) {
        var pr = v.play();
        if (pr && pr.catch) pr.catch(function () {});
      } else {
        v.pause();
      }
    });

    items.forEach(function (b, k) { b.classList.toggle("is-active", k === i); });
  }

  /* ---------- cursor-following "view project" label ---------- */
  function moveCursorLabel(e) {
    if (!cursorLabel) return;
    cursorLabel.style.transform = "translate(" + (e.clientX + 18) + "px," + (e.clientY + 18) + "px)";
  }

  /* ---------- hover / tap wiring ---------- */
  items.forEach(function (btn, i) {
    btn.addEventListener("mouseenter", function (e) {
      worksList.classList.add("has-hover");
      setActive(i);
      moveCursorLabel(e);
      if (cursorLabel) cursorLabel.classList.add("show");
    });
    btn.addEventListener("mousemove", moveCursorLabel);
    btn.addEventListener("mouseleave", function () {
      if (cursorLabel) cursorLabel.classList.remove("show");
    });
    btn.addEventListener("focus", function () {
      setActive(i);
    });
    btn.addEventListener("click", function () {
      var p = PROJECTS[i];
      if (p.url && p.url !== "#") location.href = p.url;
    });
  });

  worksList.addEventListener("mouseleave", function () {
    worksList.classList.remove("has-hover");
    if (cursorLabel) cursorLabel.classList.remove("show");
    setActive(DEFAULT_INDEX);
  });

  // init: default project playing, no tag
  setActive(DEFAULT_INDEX);

  /* ============================================================
     Motion  (skipped on small screens / reduced-motion)
     ============================================================ */
  var mqSmall = window.matchMedia("(max-width: 820px)");
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (mqSmall.matches || mqReduce.matches || typeof gsap === "undefined") {
    if (scrollHint) scrollHint.classList.add("hide");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scroll ---------- */
  var lenis = null;
  if (typeof Lenis !== "undefined" && location.search.indexOf("nolenis") === -1) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", function () { ScrollTrigger.update(); });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function bigSize() {
    // fills the whole viewport — the stage is centred (left/top 50% + translate -50%),
    // so a viewport-sized box sits edge to edge
    return { w: window.innerWidth, h: window.innerHeight };
  }

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".reveal",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  tl.to(".hero__about", { autoAlpha: 0, xPercent: 14, duration: 0.18, ease: "power1.in" }, 0.02)
    .to(".hero__title", { autoAlpha: 0, scale: 0.9, duration: 0.32, ease: "power1.inOut" }, 0.04)
    .to(".stage", {
      width: function () { return bigSize().w; },
      height: function () { return bigSize().h; },
      borderRadius: 0,
      duration: 0.42,
      ease: "power2.inOut"
    }, 0.04)
    .fromTo(".works", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.22, ease: "power2.out" }, 0.34)
    .to({}, { duration: 0.4 }); // hold fully-revealed state to the end of the pin

  ScrollTrigger.create({
    trigger: ".reveal",
    start: "top top",
    end: "bottom bottom",
    onUpdate: function (self) {
      var p = self.progress;
      stage.classList.toggle("is-open", p > 0.46);
      worksList.classList.toggle("is-live", p > 0.5);
      if (scrollHint) scrollHint.classList.toggle("hide", p > 0.015);
    }
  });

  window.addEventListener("resize", function () {
    ScrollTrigger.refresh();
  });

  /* ---------- jump straight to the revealed work list, not just the top of
     the hero (which is what #work would land on by default, since the
     reveal is one tall scroll-hijacked section) — used by the nav "works"
     link (in-page click) and by any "#work" link arriving from another
     page, e.g. a project page's "back to work" / the browser back button ---------- */
  function workListTarget() {
    var reveal = document.querySelector(".reveal");
    var revealTop = reveal.getBoundingClientRect().top + window.scrollY;
    var scrollRange = reveal.offsetHeight - window.innerHeight;
    return revealTop + scrollRange * 0.68; // well past is-open/is-live thresholds (0.46/0.5), inside the hold
  }

  var navWorks = document.querySelector('.nav__link[href="#work"]');
  if (navWorks) {
    navWorks.addEventListener("click", function (e) {
      e.preventDefault();
      var target = workListTarget();
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(target, { duration: 1.2 });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    });
  }

  // arriving from elsewhere with #work already in the URL (project pages'
  // "back to work" link, browser back/forward, a bookmarked link, etc.) —
  // the browser does its own "scroll to the #work element" as part of
  // finishing the navigation, and it does this *after* synchronous scripts
  // run, so correcting it here immediately gets clobbered a moment later.
  // Running the correction on `load` instead guarantees we go last.
  if (location.hash === "#work") {
    var correctWorkHashScroll = function () {
      ScrollTrigger.refresh();
      var loadTarget = workListTarget();
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(loadTarget, { immediate: true });
      } else {
        window.scrollTo({ top: loadTarget, behavior: "instant" });
      }
    };
    if (document.readyState === "complete") {
      correctWorkHashScroll();
    } else {
      window.addEventListener("load", correctWorkHashScroll);
    }
  }
})();
