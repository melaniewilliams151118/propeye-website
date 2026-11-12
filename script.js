/* PropEye website — minimal progressive enhancement (no dependencies). */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var header = document.querySelector("[data-site-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-site-nav]");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    document.addEventListener("click", function (event) {
      if (!header || !header.contains(event.target)) setMenu(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setMenu(false);
    });
  }

  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }
})();
