# Jenny Moscol · Web de logopedia

Sitio multipágina estático construido con Astro 7, React 19 y Tailwind CSS 4. Las páginas se renderizan durante la compilación; React se hidrata únicamente en el formulario. La navegación, WhatsApp y los carruseles usan JavaScript del navegador sin cargar una aplicación React completa.

## Desarrollo

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run audit:build
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

El formulario necesita `CONTACT_ORIGIN` (el origen exacto del sitio, sin barra final), `CONTACT_CODE_SECRET` (secreto aleatorio de al menos 32 caracteres), `RESEND_API_KEY`, `CONTACT_FROM` (remitente de un dominio verificado en Resend), `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`. `FORMSPREE_FORM_ID` conserva el identificador existente. Estas variables se configuran en el servidor de Vercel. Sin ellas, el envío se bloquea y se ofrece WhatsApp; no se simula una verificación satisfactoria.

Los códigos caducan a los diez minutos, admiten cinco intentos y se consumen una sola vez. Los límites compartidos permiten tres solicitudes por dirección y diez por IP cada diez minutos. Los tests simulan los proveedores: falta una prueba real de entrega tras configurar las cuentas. La información de privacidad debe completarse con los datos legales y plazos de conservación que confirme la responsable.

## Imágenes y rendimiento

Se sustituyeron 53 fotografías por imágenes originales de IA, con composiciones inspiradas en las referencias y personas ficticias. Los ocho logos personales e institucionales se conservaron. Los prompts y la correspondencia de archivos están en `docs/ai-assets.json`; se usó la herramienta integrada de generación de imágenes.

`public/media/` contiene WebP de hasta 1536 píxeles de ancho y variantes para distintos tamaños de pantalla. Las versiones principales suman 6.05 MB frente a los 23.40 MB originales (74 % menos); las variantes adicionales no se descargan todas a la vez. Estas cifras miden archivos, no RAM ni velocidad real del navegador.

Los originales de IA están en `output/ai-originals/`, excluidos de Git. `npm run assets:prepare` los necesita si se desean regenerar los WebP; clonar y compilar el sitio utiliza las versiones optimizadas ya incluidas. `npm run audit:build` comprueba rutas, referencias locales, imágenes adaptativas y que inicio no hidrate React.

Las cuatro páginas de servicios comparten `ServicePage.jsx` y `Servicios.css`. La base visual está en `src/styles/global.css`; cada vista conserva únicamente los estilos específicos para evitar cargar un único CSS con todas las páginas. La escena 3D se descarga al entrar en pantalla y se pausa fuera de ella; el paquete del motor sigue superando 500 kB minificado y la compilación lo advierte.

## Git

`main` es la rama predeterminada; se retiró `master` conservando ambos historiales. Por solicitud del usuario, cada fase validada se guarda mediante commit y push, y se informa su identificador. Los cambios previos de Obsidian permanecen locales.
