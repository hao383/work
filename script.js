/* ============================================================
   Devondi (得丰地 / DFD) — site interactions
   - Mobile nav toggle
   - Close nav on link click / outside click / Escape
   - Subtle scroll-reveal for sections
   - Auto year in footer
   ============================================================ */
(function () {
  "use strict";

  /* ---- Mobile navigation -------------------------------------------------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close when a nav link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---- Scroll-reveal ------------------------------------------------------ */
  var reveals = document.querySelectorAll(
    ".section-head, .card, .industries li, .why-item, .about-points li, .contact-card"
  );

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    reveals.forEach(function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition =
        "opacity .5s cubic-bezier(.22,.61,.36,1) " +
        (i % 6) * 60 +
        "ms, transform .5s cubic-bezier(.22,.61,.36,1) " +
        (i % 6) * 60 +
        "ms";
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---- Footer year -------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
