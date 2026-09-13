/* Shared script for the Future Stack Solutions demo sites.
 *
 * Language toggle and the copyright year, and nothing else. Every demo reads in full
 * with this file blocked — the English text is in the HTML and this swaps it, rather
 * than creating it. That is the same rule the client work follows, and these pages
 * exist partly to show it.
 */
(function () {
  "use strict";

  var KEY = "fsdemo_lang";
  var LANG = "en";
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "bn" || saved === "en") LANG = saved;
  } catch (e) { /* storage blocked — English stands */ }

  function apply(lang) {
    LANG = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "bn" ? "bn" : "en");
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var next = lang === "bn" ? el.getAttribute("data-bn") : el.getAttribute("data-en");
      /* A missing translation must never blank an element — leaving the existing text
         is always better than showing nothing. */
      if (next) el.textContent = next;
    }
    /* Placeholders on form fields are a separate attribute from text content. */
    var ph = document.querySelectorAll("[data-ph-en]");
    for (var j = 0; j < ph.length; j++) {
      var p = ph[j];
      var v = lang === "bn" ? p.getAttribute("data-ph-bn") : p.getAttribute("data-ph-en");
      if (v) p.setAttribute("placeholder", v);
    }
    var btn = document.getElementById("langBtn");
    if (btn) btn.textContent = lang === "bn" ? "English" : "বাংলা";
  }

  function init() {
    var btn = document.getElementById("langBtn");
    if (btn) btn.addEventListener("click", function () {
      var next = LANG === "bn" ? "en" : "bn";
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
    apply(LANG);

    var yr = document.getElementById("yr");
    if (yr) yr.textContent = new Date().getFullYear();

    /* Demo forms must not look like they submitted anything. Nothing is stored, and
       saying so is more honest than a fake success message. */
    var forms = document.querySelectorAll("form[data-demo]");
    for (var k = 0; k < forms.length; k++) {
      forms[k].addEventListener("submit", function (e) {
        e.preventDefault();
        var note = this.querySelector(".form-result");
        if (note) {
          note.textContent = LANG === "bn"
            ? "এটি একটি ডেমো — কোনো তথ্য পাঠানো বা সংরক্ষণ করা হয়নি। আসল সাইটে এটি ইমেইল, ড্যাশবোর্ড ও গুগল শিটে পৌঁছাত।"
            : "This is a demo — nothing was sent or stored. On a real site this would reach you by email, in a dashboard, and in a Google Sheet.";
          note.hidden = false;
        }
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
