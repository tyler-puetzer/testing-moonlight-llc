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


/* =========================================================
   DIVINE MOONLIGHT — FLOATING WHATSAPP CONTACT
   Replace the blank whatsappNumber below with digits only,
   including country code, when the owner's number is ready.
   Example: "19195551234"
   ========================================================= */
(function initFloatingWhatsApp() {
  const whatsappNumber = "";

  function addWhatsAppButton() {
    if (document.getElementById("dm-whatsapp-float")) return;

    const button = document.createElement("a");
    button.id = "dm-whatsapp-float";
    button.className = "dm-whatsapp-float";
    button.href = whatsappNumber
      ? "https://wa.me/" + whatsappNumber + "?text=" +
        encodeURIComponent("Hi, I’m interested in learning more about Divine Moonlight Home Care Services.")
      : "#";
    button.target = whatsappNumber ? "_blank" : "_self";
    button.rel = "noopener noreferrer";
    button.setAttribute("aria-label", whatsappNumber ? "Contact Divine Moonlight on WhatsApp" : "WhatsApp contact number coming soon");
    button.innerHTML = `
      <span class="dm-whatsapp-label">Chat with us</span>
      <span class="dm-whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="img">
          <path d="M16 3.5a12.4 12.4 0 0 0-10.7 18.7L4 28.7l6.7-1.2A12.4 12.4 0 1 0 16 3.5Zm0 22.3a9.9 9.9 0 0 1-5-1.35l-.36-.22-3.98.72.73-3.87-.24-.39A9.9 9.9 0 1 1 16 25.8Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.06 3.15 4.99 4.42.7.3 1.25.48 1.68.61.7.22 1.33.19 1.83.11.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
        </svg>
      </span>
    `;

    if (!whatsappNumber) {
      button.classList.add("dm-whatsapp-pending");
      button.addEventListener("click", event => {
        event.preventDefault();
      });
    }

    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addWhatsAppButton);
  } else {
    addWhatsAppButton();
  }
})();
