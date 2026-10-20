/* =========================================================
   DIVINE MOONLIGHT — SHARED FOOTER
   One injected footer keeps contact details and branding
   consistent across every page.
   ========================================================= */

(function () {
  const logoPath = "media/logo%231.png";
  const requestCareUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lUNjZPMURaNVk0UjdXNktGN1ZVVE9MTUhaUS4u";
  const inquiryUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__7UrW5lURFkyTFRUS0xTOEg3N1VOQk1XREpQUDBSNS4u";
  const reviewUrl = "https://share.google/ayrhxBCKSYw2v3CpA";

  const footerMarkup = `
    <footer class="footer">
<div class="container footer-grid">
        <div class="footer-brand-column">
          <a class="footer-brand" href="index.html" aria-label="Divine Moonlight home">
            <img src="${logoPath}" alt="Divine Moonlight">
          </a>

        </div>

        <div>
          <div class="footer-title">Explore</div>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="mission.html">Our Mission</a></li>
            <li><a href="mission.html">About Us</a></li>
            <li><a href="index.html#testimonials">Testimonials</a></li>
            <li><a href="careers.html">Work With Us</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-title">For families</div>
          <ul>
            <li><a href="${inquiryUrl}">General Inquiry</a></li>
            <li><a href="${requestCareUrl}">Request Care</a></li>
            <li><a href="${reviewUrl}" target="_blank" rel="noopener noreferrer">Leave a Review</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-title">Contact</div>
          <ul class="footer-contact">
            <li><a href="tel:+19843890943">984-389-0943</a></li>
            <li><a href="mailto:divine.moonlight.hc@gmail.com">divine.moonlight.hc@gmail.com</a></li>
            <li>Raleigh, NC</li>
          </ul>
        </div>
      </div>

      <div class="container copyright">
        <span>&copy; 2026 Divine Moonlight Home Service LLC. All rights reserved.</span>
        <nav class="footer-social" aria-label="Social media">
            <span class="footer-social-item" role="img" aria-label="LinkedIn profile coming soon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.89 1.63-1.83 3.36-1.83 3.59 0 4.26 2.36 4.26 5.43v6.29ZM5.36 7.43a2.06 2.06 0 1 1 .02-4.12 2.06 2.06 0 0 1-.02 4.12ZM7.14 20.45H3.58V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>
            </span>
            <span class="footer-social-item" role="img" aria-label="Facebook profile coming soon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 21v-8.2h2.8l.42-3.2H13.4V7.55c0-.92.26-1.55 1.6-1.55h1.71V3.13c-.3-.04-1.35-.13-2.57-.13-2.54 0-4.28 1.55-4.28 4.4V9.6H7v3.2h2.86V21h3.54Z"/></svg>
            </span>
            <span class="footer-social-item" role="img" aria-label="Instagram profile coming soon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect class="social-outline" x="3" y="3" width="18" height="18" rx="5"/><circle class="social-outline" cx="12" cy="12" r="4"/><circle cx="17.7" cy="6.4" r="1.2"/></svg>
            </span>
          </nav>
      </div>
    </footer>
  `;

  function injectFooter() {
    let mount = document.getElementById("shared-site-footer");
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "shared-site-footer";
      document.body.appendChild(mount);
    }

    // Reuse an existing injected footer instead of overwriting page content.
    if (mount.querySelector(".footer")) return;
    mount.innerHTML = footerMarkup;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectFooter);
  } else {
    injectFooter();
  }
})();
