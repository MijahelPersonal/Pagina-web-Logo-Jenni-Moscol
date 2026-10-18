// Small DOM controllers: static pages do not download or hydrate React.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const controllers = [];
function rotation(root, advance, delay) {
  let timer, visible = false, paused = false, hovered = false, focused = false;
  const sync = () => {
    clearInterval(timer);
    const running = visible && !paused && !hovered && !focused && !reduce.matches && !document.hidden;
    if (running) timer = setInterval(advance, delay);
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  observer.observe(root);
  const enter = () => { hovered = true; sync(); };
  const leave = () => { hovered = false; sync(); };
  const focus = () => { focused = true; sync(); };
  const blur = (event) => { if (!root.contains(event.relatedTarget)) { focused = false; sync(); } };
  root.addEventListener('mouseenter', enter); root.addEventListener('mouseleave', leave);
  root.addEventListener('focusin', focus); root.addEventListener('focusout', blur);
  document.addEventListener('visibilitychange', sync); reduce.addEventListener('change', sync);
  controllers.push(() => {
    clearInterval(timer); observer.disconnect();
    root.removeEventListener('mouseenter', enter); root.removeEventListener('mouseleave', leave);
    root.removeEventListener('focusin', focus); root.removeEventListener('focusout', blur);
    document.removeEventListener('visibilitychange', sync); reduce.removeEventListener('change', sync);
  });
  return () => { paused = !paused; sync(); return paused; };
}

document.querySelectorAll('[data-carousel]').forEach((root) => {
  const slides = [...root.querySelectorAll('.slider-img, .carousel-slide')];
  const dots = [...root.querySelectorAll('[data-slide-to]')];
  if (!slides.length) return;
  let index = 0;
  const select = (next) => {
    index = next;
    slides.forEach((slide, i) => { slide.classList.toggle('active', i === index); slide.setAttribute('aria-hidden', String(i !== index)); });
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === index); dot.setAttribute('aria-pressed', String(i === index)); });
  };
  select(0);
  dots.forEach((dot, i) => dot.addEventListener('click', () => select(i)));
  const controls = document.createElement('div'); controls.className = 'carousel-controls';
  const previous = document.createElement('button'); previous.type = 'button'; previous.textContent = '←'; previous.setAttribute('aria-label', 'Imagen anterior');
  const pause = document.createElement('button'); pause.type = 'button'; pause.textContent = 'Pausar'; pause.setAttribute('aria-pressed', 'false');
  const next = document.createElement('button'); next.type = 'button'; next.textContent = '→'; next.setAttribute('aria-label', 'Imagen siguiente');
  controls.append(previous, pause, next); root.append(controls);
  const togglePause = rotation(root, () => select((index + 1) % slides.length), 5500);
  previous.addEventListener('click', () => select((index - 1 + slides.length) % slides.length));
  next.addEventListener('click', () => select((index + 1) % slides.length));
  pause.addEventListener('click', () => { const paused = togglePause(); pause.textContent = paused ? 'Reanudar' : 'Pausar'; pause.setAttribute('aria-pressed', String(paused)); });
});

// Keep the full set of specialties readable; no repeated updates to the whole page.
document.querySelectorAll('[data-rotating-words]').forEach((root) => {
  const words = JSON.parse(root.dataset.rotatingWords);
  root.textContent = words.join(' · ');
  root.classList.add('specialties-static');
});

// Horizontal gallery uses native touch scrolling instead of an endless duplicated strip.
document.querySelectorAll('[data-animated-marquee]').forEach((root) => {
  root.setAttribute('tabindex', '0'); root.setAttribute('role', 'region'); root.setAttribute('aria-label', 'Galería de logopedia: desplaza para ver las imágenes');
});
window.addEventListener('pagehide', (event) => { if (!event.persisted) controllers.forEach((cleanup) => cleanup()); });
