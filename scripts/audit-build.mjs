import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const walk = async (directory) => (await Promise.all((await readdir(directory, { withFileTypes: true })).map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
const files = await walk('dist');
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const htmlByPath = new Map(await Promise.all(htmlFiles.map(async (file) => [path.resolve(file), await readFile(file, 'utf8')])));
let checked = 0;
for (const [file, html] of htmlByPath) {
  assert(!html.includes('[object Object]'), `${file}: invalid image URL`);
  const attributes = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of attributes) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(reference)) continue;
    const [pathname, fragment] = reference.split('#');
    let target = pathname ? path.resolve(pathname.startsWith('/') ? 'dist' : path.dirname(file), '.' + (pathname.startsWith('/') ? pathname : '/' + pathname)) : file;
    if (!path.extname(target)) target = path.join(target, 'index.html');
    await stat(target).catch(() => { throw new Error(`${file}: missing ${reference}`); });
    if (fragment && target.endsWith('.html')) {
      const destination = htmlByPath.get(target);
      assert(destination?.includes(`id="${fragment}"`), `${file}: missing anchor ${reference}`);
    }
    checked++;
  }
}
const homepage = await readFile('dist/index.html', 'utf8');
assert(!homepage.includes('<astro-island'), 'Homepage must not hydrate React');
const sizes = JSON.parse(await readFile('src/data/image-sizes.json', 'utf8'));
assert.equal(Object.keys(sizes).length, 53, 'Expected 53 AI photographs');
let bytes = 0;
for (const [src, image] of Object.entries(sizes)) {
  assert(image.width <= 1536, `${src}: oversized image`);
  assert(image.variants.length >= 2, `${src}: responsive variants missing`);
  for (const variant of image.variants) await stat(`dist${variant.src}`);
  bytes += (await stat(`dist${src}`)).size;
}
console.log(JSON.stringify({ htmlPages: htmlFiles.length, localReferencesChecked: checked, aiPhotographs: Object.keys(sizes).length, fullSizePhotographsBytes: bytes, homepageReactIslands: 0 }, null, 2));
