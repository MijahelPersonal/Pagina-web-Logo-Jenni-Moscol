import sharp from 'sharp';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const manifest = JSON.parse(await readFile('docs/ai-assets.json', 'utf8'));
await mkdir('public/media', { recursive: true });
await mkdir('src/data', { recursive: true });
const sizes = {};
for (const asset of manifest) {
  const slug = path.basename(asset.generated, '.png');
  const metadata = await sharp(asset.generated).metadata();
  const maxWidth = Math.min(1536, metadata.width);
  const widths = [...new Set([480, 960, maxWidth].filter((width) => width <= maxWidth))];
  const src = `/media/${slug}.webp`;
  const variants = [];
  for (const width of widths) {
    const filename = width === maxWidth ? `${slug}.webp` : `${slug}-${width}.webp`;
    const info = await sharp(asset.generated).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(`public/media/${filename}`);
    variants.push({ src: `/media/${filename}`, width: info.width });
  }
  const info = await sharp(`public${src}`).metadata();
  sizes[src] = { width: info.width, height: info.height, variants };
  asset.served = src;
  asset.dimensions = { width: info.width, height: info.height };
}
await writeFile('src/data/image-sizes.json', JSON.stringify(sizes, null, 2) + '\n');
await writeFile('docs/ai-assets.json', JSON.stringify(manifest, null, 2) + '\n');
for (const file of await readdir('src/views')) {
  if (!file.endsWith('.jsx')) continue;
  const filename = `src/views/${file}`;
  let text = await readFile(filename, 'utf8');
  for (const asset of manifest) {
    const relative = '../' + asset.original.replace(/^src\//, '');
    const escaped = relative.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`import (\\w+)Asset from ["']${escaped}["'];?\\r?\\nconst \\1 = \\1Asset\\.src;?`, 'g');
    text = text.replace(regex, (_, name) => `const ${name} = '${asset.served}';`);
  }
  if (text.includes('<img')) {
    if (!text.includes('import ResponsiveImage ')) text = "import ResponsiveImage from '../components/ResponsiveImage.jsx';\n" + text;
    text = text.replaceAll('<img', '<ResponsiveImage');
  }
  await writeFile(filename, text);
}
console.log(`Prepared ${manifest.length} original AI photographs and responsive WebP variants.`);
