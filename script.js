const header=document.querySelector('.header');
window.addEventListener('scroll',()=>header&&header.classList.toggle('scrolled',window.scrollY>8),{passive:true});
const toggle=document.querySelector('.mobile-toggle'), mobile=document.querySelector('.mobile-nav');
if(toggle&&mobile){toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false');toggle.textContent=open?'×':'☰'});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));}
const track=document.querySelector('[data-team-track]');
const card=track?.querySelector('.team-card');
document.querySelector('[data-team-prev]')?.addEventListener('click',()=>track?.scrollBy({left:-(card?.offsetWidth||320)-16,behavior:'smooth'}));
document.querySelector('[data-team-next]')?.addEventListener('click',()=>track?.scrollBy({left:(card?.offsetWidth||320)+16,behavior:'smooth'}));
// Testing Testing Testin HEro Edit Later
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function updateHeader() {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 18);
  }
}

updateHeader();

window.addEventListener("scroll", updateHeader, {
  passive: true
});

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open menu"
      );
    });
  });
}
