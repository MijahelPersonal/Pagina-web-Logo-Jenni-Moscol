// Load the optional 3D scene only when it can actually be seen.
const mounted = new WeakSet();
export function initParticleProcesses() {
  document.querySelectorAll('[data-particle-process]').forEach((root) => {
    if (mounted.has(root)) return;
    mounted.add(root);
    setup(root);
  });
}

function setup(root) {
  const art = root.querySelector('.process-art');
  const host = root.querySelector('.process-canvas');
  const buttons = [...root.querySelectorAll('[data-process-step]')];
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0, visible = false, disposed = false, loading = false;
  let sceneState;
  const select = (index) => {
    selected = index;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    root.querySelectorAll('[data-symbol]').forEach((symbol, i) => { symbol.toggleAttribute('hidden', i !== index); });
    sceneState?.morph(index);
  };
  const handlers = buttons.map((button, index) => {
    const handler = () => select(index);
    button.addEventListener('click', handler);
    return handler;
  });
  async function start() {
    if (disposed || loading || sceneState || media.matches || !visible || document.hidden) return;
    loading = true;
    try {
      const [{ createScene }, { gsap }] = await Promise.all([import('./particle-engine.js'), import('gsap')]);
      if (disposed || media.matches || !visible || document.hidden) return;
      sceneState = createScene(gsap, host, selected);
      art.setAttribute('data-ready', '');
      sceneState.setActive(visible && !document.hidden);
    } catch {
      // SVG remains usable if WebGL or the optional module cannot load.
      sceneState?.destroy();
      sceneState = undefined;
      art.removeAttribute('data-ready');
    } finally { loading = false; }
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sceneState?.setActive(visible && !document.hidden);
    if (visible) start();
  }, { threshold: .12 });
  observer.observe(root);
  const visibility = () => {
    sceneState?.setActive(visible && !document.hidden);
    if (visible && !document.hidden) start();
  };
  const motion = () => {
    if (media.matches) {
      sceneState?.destroy(); sceneState = undefined; art.removeAttribute('data-ready');
    } else start();
  };
  document.addEventListener('visibilitychange', visibility);
  media.addEventListener('change', motion);
  const cleanup = () => {
    disposed = true;
    observer.disconnect(); sceneState?.destroy();
    buttons.forEach((button, i) => button.removeEventListener('click', handlers[i]));
    document.removeEventListener('visibilitychange', visibility);
    media.removeEventListener('change', motion);
    document.removeEventListener('astro:before-swap', cleanup);
    window.removeEventListener('pagehide', pagehide);
    mounted.delete(root);
  };
  const pagehide = (event) => { if (!event.persisted) cleanup(); };
  document.addEventListener('astro:before-swap', cleanup);
  window.addEventListener('pagehide', pagehide);
}

