// Equivalent DOM behavior for the original React state and effects.
const timers = [];
const timeouts = [];
const repeat = (callback, delay) => timers.push(setInterval(callback, delay));
const later = (callback, delay) => timeouts.push(setTimeout(callback, delay));

const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const dropdownItem = document.querySelector('.nav-item-dropdown');
const dropdown = document.querySelector('[data-original-dropdown]');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
let menuOpen = false, dropdownOpen = false;
const setDropdown = (value) => { dropdownOpen = value; if (dropdown) { dropdown.hidden = !value; dropdown.style.display = value ? '' : 'none'; } };
const closeAll = () => {
  menuOpen = false;
  menu?.classList.remove('active');
  links?.classList.remove('active');
  setDropdown(false);
};
const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll);
menu?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menu.classList.toggle('active', menuOpen);
  links?.classList.toggle('active', menuOpen);
});
dropdownItem?.addEventListener('mouseenter', () => setDropdown(true));
dropdownItem?.addEventListener('mouseleave', () => setDropdown(false));
dropdownToggle?.addEventListener('click', () => setDropdown(!dropdownOpen));
document.querySelectorAll('.nav-links a, .logo-link').forEach((link) => {
  link.addEventListener('click', closeAll);
  if (link.closest('.nav-links') && !link.closest('.dropdown-menu')) {
    const selected = decodeURI(new URL(link.href).pathname) === decodeURI(window.location.pathname).replace(/\/$/, '') || (link.getAttribute('href') === '/' && window.location.pathname === '/');
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'page');
  }
});

const home = document.querySelector('.inicio-container');
if (home) {
  const specialties = ['Habla y Lenguaje', 'Motricidad Orofacial', 'Voz', 'Deglución'];
  const text = home.querySelector('.typing-text');
  let index = 0;
  repeat(() => {
    text?.classList.replace('fade-in', 'fade-out');
    later(() => {
      index = (index + 1) % specialties.length;
      if (text) { text.textContent = specialties[index]; text.classList.replace('fade-out', 'fade-in'); }
    }, 300);
  }, 3000);
  const photos = [...home.querySelectorAll('.slider-img')];
  let currentPhoto = 0;
  repeat(() => {
    currentPhoto = (currentPhoto + 1) % photos.length;
    photos.forEach((photo, position) => photo.classList.toggle('active', position === currentPhoto));
  }, 3500);
}

const story = document.querySelector('.story-carousel-box');
if (story) {
  const slides = [...story.querySelectorAll('.carousel-slide')];
  const dots = [...story.querySelectorAll('[data-original-slide]')];
  let currentIndex = 0;
  const select = (index) => {
    currentIndex = index;
    slides.forEach((slide, position) => slide.classList.toggle('active', position === index));
    dots.forEach((dot, position) => dot.classList.toggle('active', position === index));
  };
  dots.forEach((dot, index) => dot.addEventListener('click', () => select(index)));
  repeat(() => select((currentIndex + 1) % slides.length), 3500);
}

const widget = document.querySelector('.whatsapp-widget-container');
if (widget) {
  const panel = widget.querySelector('[data-original-chat]');
  const toggle = () => { panel.hidden = !panel.hidden; };
  widget.querySelector('.whatsapp-floating-button')?.addEventListener('click', toggle);
  widget.querySelector('.whatsapp-close-btn')?.addEventListener('click', toggle);
  let showWhatsAppIcon = false;
  repeat(() => {
    widget.querySelectorAll('.whatsapp-icon-animated').forEach((icon) => icon.classList.replace('slide-in', 'slide-out'));
    later(() => {
      showWhatsAppIcon = !showWhatsAppIcon;
      const whatsapp = widget.querySelector('[data-original-wa-icon]');
      const send = widget.querySelector('[data-original-send-icon]');
      if (whatsapp) whatsapp.hidden = !showWhatsAppIcon;
      if (send) send.hidden = showWhatsAppIcon;
      widget.querySelectorAll('.whatsapp-icon-animated').forEach((icon) => icon.classList.replace('slide-out', 'slide-in'));
    }, 300);
  }, 10000);
}

window.addEventListener('pagehide', (event) => {
  if (event.persisted) return;
  timers.forEach(clearInterval);
  timeouts.forEach(clearTimeout);
  window.removeEventListener('scroll', onScroll);
});
