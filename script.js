/* Shared navigation is loaded from nav.js so the header only needs to be edited once. */
(function loadSharedNavigation() {
  if (document.querySelector('script[src$="nav.js"]')) return;
  const script = document.createElement("script");
  script.src = "nav.js";
  script.defer = true;
  document.head.appendChild(script);
})();

const header = document.querySelector(".header");
const toggle = document.querySelector(".mobile-toggle");
const mobile = document.querySelector(".mobile-nav");

function updateHeader() {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
}

updateHeader();

window.addEventListener("scroll", updateHeader, { passive: true });

if (toggle && mobile) {
  toggle.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.textContent = open ? "×" : "☰";
  });

  mobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobile.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.textContent = "☰";
    });
  });
}

const track = document.querySelector("[data-team-track]");
const card = track?.querySelector(".team-card");

document.querySelector("[data-team-prev]")?.addEventListener("click", () => {
  track?.scrollBy({
    left: -(card?.offsetWidth || 320) - 16,
    behavior: "smooth"
  });
});

document.querySelector("[data-team-next]")?.addEventListener("click", () => {
  track?.scrollBy({
    left: (card?.offsetWidth || 320) + 16,
    behavior: "smooth"
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal-mission");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(element => observer.observe(element));
});


/* =========================================================
   DIVINE MOONLIGHT — INTERACTION ENGINE
   Handles colored service icons and gentle scroll reveals.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* Swap each monochrome service icon for its matching color icon on hover. */
  document.querySelectorAll(".service-grid .card").forEach(card => {
    const icon = card.querySelector(".icon img");
    if (!icon) return;

    const original = icon.getAttribute("src");
    if (!original || !original.includes("media/icons/")) return;

    const fileName = original.split("/").pop();

    /* The uploaded colored artwork uses its own filenames. */
    const coloredIcons = {
      "heart-care-icon.svg": "heart-care-colored.svg",
      "brain-line-icon.svg": "brain-colored.svg",
      "heartbeat-icon.svg": "heartbeat-colored.svg",
      "nurse-cap.svg": "nurse-cap-colored.svg",
      "housekeeping-icon.svg": "housekeeping-colored.svg",
      "pasta-icon.svg": "pasta-colored.svg",
      "diary-icon.svg": "diary-colored.svg",
      "car-icon.svg": "car-colored.svg"
    };

    const coloredFileName = coloredIcons[fileName];
    if (!coloredFileName) return;

    const colorSrc = "media/colors/" + coloredFileName;

    /* Preload so the hover feels instant. */
    const preload = new Image();
    preload.src = colorSrc;

    const restore = () => {
      if (!card.matches(":hover") && document.activeElement !== card) {
        icon.src = original;
      }
    };

    card.addEventListener("mouseenter", () => {
      icon.src = colorSrc;
    });

    card.addEventListener("mouseleave", restore);
    card.addEventListener("focusin", () => {
      icon.src = colorSrc;
    });
    card.addEventListener("focusout", restore);
  });

  /* Add a restrained reveal animation to common content blocks. */
  const revealSelectors = [
    ".section-head",
    ".service-grid .card",
    ".steps .step",
    ".quote-box",
    ".founders-intro",
    ".founders-feature",
    ".founders-josephine",
    ".two-col",
    ".split-dark",
    ".roles .role",
    ".areas li",
    ".mission-section-heading",
    ".mission-statement",
    ".mission-highlight",
    ".mission-professional",
    ".mission-closing",
    ".mission-final"
  ];

  const revealItems = [];
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      if (!element.classList.contains("reveal-mission") && !element.classList.contains("dm-reveal")) {
        element.classList.add("dm-reveal");
        revealItems.push(element);
      }
    });
  });

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(element => element.classList.add("dm-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("dm-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -45px 0px"
  });

  revealItems.forEach((element, index) => {
    const group = element.closest(".service-grid, .steps, .home-mission-inner");
    if (group) {
      const siblings = Array.from(group.children).filter(child =>
        child.classList.contains("dm-reveal")
      );
      const position = siblings.indexOf(element);
      if (position >= 0 && position < 4) {
        element.classList.add("dm-delay-" + (position + 1));
      }
    }
    revealObserver.observe(element);
  });
});
