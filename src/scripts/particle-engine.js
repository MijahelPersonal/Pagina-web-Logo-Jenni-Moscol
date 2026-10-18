import { Scene, PerspectiveCamera, BufferGeometry, BufferAttribute, PointsMaterial, Points, WebGLRenderer } from 'three';

export function createScene(gsap, host, initial) {
  const count = 680;
  // Every shape uses the same number of particles so morphing allocates no buffers.
  const paths = [
    [[-.95,.65],[.95,.65],[.95,-.5],[-.1,-.5],[-.65,-.95],[-.65,-.5],[-.95,-.5],[-.95,.65]],
    [[-.8,-.8],[-.8,.8],[-.15,.8],[-.15,.1],[.8,.1],[.8,-.8],[-.8,-.8]],
    [[0,-.95],[0,.2],[-.2,.65],[-.85,.85],[-.72,.2],[0,-.05],[.15,.6],[.85,1],[.8,.3],[0,-.05]],
  ];
  const shapes = paths.map((path, shape) => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count * (path.length - 1), segment = Math.floor(t), fraction = t - segment;
      const a = path[segment], b = path[segment + 1];
      const spread = Math.sin(i * 17.31 + shape) * .035;
      values[i * 3] = a[0] + (b[0] - a[0]) * fraction + spread;
      values[i * 3 + 1] = a[1] + (b[1] - a[1]) * fraction + Math.cos(i * 11.7) * .035;
      values[i * 3 + 2] = Math.sin(i * 2.3) * .13;
    }
    return values;
  });
  const renderer = new WebGLRenderer({ alpha:true, antialias:false, powerPreference:'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, .1, 10);
  camera.position.z = 4;
  const geometry = new BufferGeometry();
  const positions = new Float32Array(shapes[initial]);
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  const material = new PointsMaterial({ color:0xb56543, size:.027, transparent:true, opacity:.85 });
  const points = new Points(geometry, material);
  scene.add(points);
  host.append(renderer.domElement);
  let active = false, frame = 0, tween;
  const render = () => {
    if (!active) return;
    points.rotation.y = Math.sin(performance.now() * .00035) * .15;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  const resize = new ResizeObserver(() => {
    const width = host.clientWidth, height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height; camera.updateProjectionMatrix();
    if (!active) renderer.render(scene, camera);
  });
  resize.observe(host);
  return {
    morph(index) {
      tween?.kill();
      const from = new Float32Array(positions), target = shapes[index], progress = { value:0 };
      tween = gsap.to(progress, { value:1, duration:.95, ease:'power2.inOut', onUpdate() {
        for (let i = 0; i < positions.length; i++) positions[i] = from[i] + (target[i] - from[i]) * progress.value;
        geometry.attributes.position.needsUpdate = true;
      } });
      if (!active) tween.pause();
    },
    setActive(value) {
      if (value === active) return;
      active = value;
      if (active) { tween?.resume(); render(); }
      else { cancelAnimationFrame(frame); tween?.pause(); }
    },
    destroy() {
      active = false; cancelAnimationFrame(frame); tween?.kill(); resize.disconnect();
      geometry.dispose(); material.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}
