import sharp from 'sharp';
import { readFile, writeFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

// Only the 53 explicitly replaced photos may be removed; brand assets are excluded.
const manifest = JSON.parse(await readFile('docs/ai-assets.json', 'utf8'));
assert.equal(manifest.length, 53);
let originalBytes = 0, replacementBytes = 0;
for (const asset of manifest) {
  assert(/^src\/assets\/imagenes-(blog|contacto|inicio|metodologia|servicio[1-4]|sobremi)\/(?!FP-|logo)[\w-]+\.(jpg|png)$/.test(asset.original), `Protected or unexpected original: ${asset.original}`);
  const original = path.resolve(asset.original);
  assert(original.startsWith(path.resolve('src/assets') + path.sep));
  const replacement = await stat(`public${asset.served}`);
  const previous = await stat(original).catch(() => null);
  if (previous) {
    const metadata = await sharp(original).metadata();
    asset.originalDimensions = { width: metadata.width, height: metadata.height };
    asset.originalBytes = previous.size;
  }
  asset.servedBytes = replacement.size;
  originalBytes += asset.originalBytes || 0;
  replacementBytes += replacement.size;
  if (previous) await unlink(original);
}
await writeFile('docs/ai-assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ photographs: manifest.length, originalBytes, replacementBytes, reductionPercent: Math.round((1 - replacementBytes / originalBytes) * 100) }, null, 2));
