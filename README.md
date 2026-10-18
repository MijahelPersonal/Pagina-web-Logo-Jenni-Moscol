# Jenny Moscol · Web de logopedia

Sitio multipágina estático construido con Astro 7, React 19 y Tailwind CSS 4. Las páginas se renderizan durante la compilación; React se hidrata únicamente en el formulario. La navegación, WhatsApp y los carruseles usan JavaScript del navegador sin cargar una aplicación React completa.

## Desarrollo

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

Astro genera `dist/`. `npm run dev` y `npm run preview` sirven el sitio; **no ejecutan las funciones de `api/` de Vercel**. Para probar el correo y el formulario de extremo a extremo, se necesita un entorno Vercel con las variables de `.env.example` configuradas. Nunca guardes secretos en variables `PUBLIC_*` ni los subas al repositorio.

## Estructura

- `src/pages/`: rutas `.astro`, títulos de página y redirecciones antiguas configuradas en `astro.config.mjs`.
- `src/layouts/BaseLayout.astro`: documento HTML, metadatos y elementos compartidos.
- `src/views/`: contenido JSX de cada página y CSS de la vista. Mover estos archivos fuera de `pages/` evita que Astro los interprete como rutas.
- `src/components/`: navegación Astro, interacción 3D, componentes visuales y formulario.
- `src/styles/global.css`: base visual compartida, accesibilidad y utilidades Tailwind. Se omite el reset de Tailwind para conservar la identidad visual existente.
- `src/scripts/`: carruseles y animaciones progresivas.
- `public/media/`: imágenes servidas directamente; `src/assets/` conserva los recursos de marca.
- `api/contacto.js`: función de servidor para verificar el correo mediante código antes de enviar la consulta.

Las rutas de servicios ahora usan guiones; las URL anteriores disponen de redirecciones. Las páginas informativas no necesitan React en el navegador. La escena Three.js se carga por separado y debe respetar visibilidad y movimiento reducido.

## Formulario y publicación

Completa las variables de `.env.example` para habilitar los servicios de correo, almacenamiento temporal y entrega del formulario. La validación de sintaxis o DNS no acredita que una persona controle una dirección: el código enviado al correo es el paso de verificación.

Antes de publicar, revisa la información de privacidad, los textos profesionales, datos de contacto y los perfiles sociales. Las fotografías generadas con IA son ilustrativas y no deben presentarse como pacientes, instalaciones o credenciales reales de la profesional. La compilación local no publica el sitio.
