/* =========================================================
   DIVINE MOONLIGHT — SHARED NAVIGATION
   Edit this file to change the navigation across the site.
   ========================================================= */

(function () {
  const logoPath = "media/logo%231.png";

  const navMarkup = `
    <header class="header">
      <div class="container navrow">
        <a aria-label="Divine Moonlight home" class="brand" href="index.html">
          <img alt="Divine Moonlight" src="${logoPath}">
        </a>
        <nav aria-label="Primary" class="desktop-nav">
          <a data-nav="home" href="index.html">Home</a>
          <a data-nav="services" href="services.html">Services</a>
          <a data-nav="about" href="mission.html">About Us</a>
          <a data-nav="team" href="team.html">Our Team</a>
          <a data-nav="service-areas" href="service-areas.html">Service Areas</a>
          <a data-nav="careers" href="careers.html">Careers</a>
          <a data-nav="contact" href="contact.html">Contact</a>
        </nav>
        <div>
          <a class="btn btn-primary" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lUNjZPMURaNVk0UjdXNktGN1ZVVE9MTUhaUS4u">Request Care</a>
          <button aria-expanded="false" aria-label="Open menu" class="mobile-toggle">☰</button>
        </div>
      </div>
      <div class="mobile-nav">
        <nav aria-label="Mobile">
          <a data-nav="home" href="index.html">Home</a>
          <a data-nav="services" href="services.html">Services</a>
          <a data-nav="about" href="mission.html">About Us</a>
          <a data-nav="team" href="team.html">Our Team</a>
          <a data-nav="service-areas" href="service-areas.html">Service Areas</a>
          <a data-nav="careers" href="careers.html">Careers</a>
          <a data-nav="contact" href="contact.html">Contact</a>
          <a class="btn btn-primary" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lUNjZPMURaNVk0UjdXNktGN1ZVVE9MTUhaUS4u">Request Care</a>
          <a class="btn btn-secondary nav-inquiry" href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lURFkyTFRUS0xTOEg3N1VOQk1XREpQUDBSNS4u">General Inquiry</a>
        </nav>
      </div>
    </header>
  `;

  function injectNavigation() {
    document.querySelectorAll(".header").forEach(header => header.remove());

    const wrapper = document.createElement("div");
    wrapper.id = "shared-site-navigation";
    wrapper.innerHTML = navMarkup;

    const skip = document.querySelector(".skip");
    if (skip) {
      skip.insertAdjacentElement("afterend", wrapper);
    } else {
      document.body.insertBefore(wrapper, document.body.firstChild);
    }

    const path = window.location.pathname.split("/").pop() || "index.html";
    const pageMap = {
      "index.html": "home",
      "": "home",
      "services.html": "services",
      "mission.html": "about",
      "team.html": "team",
      "service-areas.html": "service-areas",
      "careers.html": "careers",
      "contact.html": "contact"
    };

    const active = pageMap[path];
    wrapper.querySelectorAll("[data-nav]").forEach(link => {
      if (link.dataset.nav === active) link.classList.add("active");
    });

    const header = wrapper.querySelector(".header");
    const toggle = wrapper.querySelector(".mobile-toggle");
    const mobile = wrapper.querySelector(".mobile-nav");

    const updateHeader = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    toggle?.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.textContent = open ? "×" : "☰";
    });

    mobile?.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.textContent = "☰";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNavigation);
  } else {
    injectNavigation();
  }
})();