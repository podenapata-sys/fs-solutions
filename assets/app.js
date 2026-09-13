/* Future Stack Solutions — the only script on the page.
 *
 * Everything it does is an improvement on a page that already works without it: the
 * language toggle and the copyright year. The English text is in the HTML, so if this
 * file never loads, never parses, or is blocked, the page still reads in full. That is
 * the same rule the Omega Dental build ended up with, and the case study explains why.
 */
(function () {
  "use strict";

  var LANG = "en";
  /* localStorage throws outright in some privacy modes rather than returning null, so the
     read is guarded. A failure here must not stop the rest of the script running. */
  try {
    var saved = localStorage.getItem("fs_lang");
    if (saved === "bn" || saved === "en") LANG = saved;
  } catch (e) { /* storage unavailable — English stands */ }

  function apply(lang) {
    LANG = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "bn" ? "bn" : "en");
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var next = lang === "bn" ? el.getAttribute("data-bn") : el.getAttribute("data-en");
      /* An empty or missing translation would blank the element. Leaving the existing
         text in place is always better than showing nothing. */
      if (next) el.textContent = next;
    }
    var btn = document.getElementById("langBtn");
    if (btn) {
      btn.textContent = lang === "bn" ? "English" : "বাংলা";
      btn.setAttribute("aria-label", lang === "bn" ? "Switch to English" : "বাংলায় দেখুন");
    }
  }

  function toggle() {
    var next = LANG === "bn" ? "en" : "bn";
    try { localStorage.setItem("fs_lang", next); } catch (e) { /* not fatal */ }
    apply(next);
  }

  function init() {
    var btn = document.getElementById("langBtn");
    if (btn) btn.addEventListener("click", toggle);
    if (LANG !== "en") apply(LANG); else apply("en");

    var yr = document.getElementById("yr");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
