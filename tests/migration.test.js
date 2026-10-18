import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const original = (file) => execFileSync('git', ['show', `ae38a18:${file}`], { maxBuffer: 20000000 });
const originalFiles = execFileSync('git', ['ls-tree', '-r', '--name-only', 'ae38a18'], { encoding: 'utf8' }).trim().split('\n');
const walk = async (directory) => (await Promise.all((await readdir(directory, { withFileTypes: true })).map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();

test('every original photo and logo is restored byte for byte', async () => {
  const assets = originalFiles.filter((file) => file.startsWith('src/assets/'));
  assert.equal(assets.length, 63);
  for (const file of assets) assert.deepEqual(await readFile(file), original(file), file);
});

test('all thirteen original visual stylesheets are unchanged', async () => {
  const styles = originalFiles.filter((file) => /^src\/(pages|components)\/.*\.css$/.test(file));
  assert.equal(styles.length, 13);
  for (const file of styles) assert.deepEqual(await readFile(`src/styles/original/${path.basename(file)}`), original(file), file);
});

test('contact validation API and original providers are preserved', async () => {
  assert.deepEqual(await readFile('api/validar.js'), original('api/validar.js'));
  const controller = await readFile('src/scripts/original-contact.js', 'utf8');
  assert(controller.includes('https://formspree.io/f/xwlelqbz'));
  assert(controller.includes('/api/validar?email='));
  assert(!controller.includes('Resend') && !controller.includes('UPSTASH'));
});

test('React is absent from dependencies, templates and the built pages', async () => {
  const pkg = JSON.parse(await readFile('package.json', 'utf8'));
  const packages = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const dependency of Object.keys(packages)) assert(!/react/i.test(dependency), dependency);
  for (const framework of ['astro', 'tailwindcss', 'gsap', 'three']) assert(packages[framework], framework);
  assert(!(await walk('src')).some((file) => /\.[jt]sx$/.test(file)));
  for (const file of (await walk('dist')).filter((file) => file.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    assert(!html.includes('<astro-island'), file);
    assert(!html.includes('[object Object]'), file);
    assert(!html.includes('data-particle-process'), file);
  }
});

test('original pages, service URLs, gallery and initial form state are retained', async () => {
  for (const route of ['index.html', 'sobre-mi/index.html', 'metodologia/index.html', 'blog/index.html', 'contacto/index.html', 'servicios/logopedia infantil/index.html', 'servicios/logopedia jovenes y adultos/index.html', 'servicios/logopedia online/index.html', 'servicios/logopedia a domicilio/index.html']) {
    assert((await readFile(`dist/${route}`, 'utf8')).includes('Jenny Moscol'), route);
  }
  const home = await readFile('dist/index.html', 'utf8');
  assert.equal((home.match(/class="marquee-item"/g) || []).length, 10);
  assert(home.includes('Habla y Lenguaje'));
  const contact = await readFile('dist/contacto/index.html', 'utf8');
  assert(contact.includes('Enviar mensaje'));
  assert(!contact.includes('Código de confirmación'));
  assert(!contact.includes('/media/'));
});
