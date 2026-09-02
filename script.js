========================================
FILE: script.js
========================================
js
const header=document.querySelector('.header');
window.addEventListener('scroll',()=>header&&header.classList.toggle('scrolled',window.scrollY>8),{passive:true});
const toggle=document.querySelector('.mobile-toggle'), mobile=document.querySelector('.mobile-nav');
if(toggle&&mobile){toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false');toggle.textContent=open?'×':'☰'});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));}
const track=document.querySelector('[data-team-track]');
const card=track?.querySelector('.team-card');
document.querySelector('[data-team-prev]')?.addEventListener('click',()=>track?.scrollBy({left:-(card?.offsetWidth||320)-16,behavior:'smooth'}));
document.querySelector('[data-team-next]')?.addEventListener('click',()=>track?.scrollBy({left:(card?.offsetWidth||320)+16,behavior:'smooth'}));
