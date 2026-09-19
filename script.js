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
