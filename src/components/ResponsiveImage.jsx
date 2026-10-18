import images from '../data/image-sizes.json';

export default function ResponsiveImage({ src, alt, loading = 'lazy', decoding = 'async', sizes = '(max-width: 768px) 100vw, 55vw', ...props }) {
  const info = images[src];
  return <img src={src} alt={alt} loading={loading} decoding={decoding}
    width={info?.width} height={info?.height}
    srcSet={info?.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
    sizes={info ? sizes : undefined} {...props} />;
}
