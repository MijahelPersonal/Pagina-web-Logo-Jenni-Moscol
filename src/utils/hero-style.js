export function heroStyle(src) {
  return { '--hero-image': `url(${src})`, '--hero-mobile': `url(${src.replace(/\.webp$/, '-960.webp')})` };
}
