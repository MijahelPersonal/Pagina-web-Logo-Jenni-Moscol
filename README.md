# Jenny Moscol · Migración a Astro

La web conserva el contenido, las fotografías, los logos, los estilos, las URL y la lógica del formulario de la versión original (`ae38a18`). El cambio se limita a sustituir React por plantillas Astro y JavaScript del navegador para los menús y carruseles existentes.

## Tecnologías

Astro, Tailwind CSS, GSAP y Three.js están instalados. React, React DOM y la integración de React se han retirado. Tailwind está disponible sin aplicar un reset al diseño original; GSAP y Three.js permanecen instalados sin introducir efectos nuevos.

## Desarrollo

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

Los tests se ejecutan después de compilar y comprueban que las fotos, logos, CSS y API originales se conservan, y que las páginas generadas no contienen islas React.

## Estructura

- `src/pages/`: rutas Astro con las direcciones originales.
- `src/views/`: plantillas de las páginas, adaptadas del JSX original.
- `src/components/`: navegación, pies de página, WhatsApp e iconos en Astro.
- `src/styles/original/`: trece hojas de estilos originales, sin modificaciones.
- `src/scripts/`: equivalentes de los estados y efectos originales en JavaScript del navegador.
- `src/assets/`: imágenes y logos originales.
- `api/validar.js`: API original, conservada sin cambios.

El formulario mantiene Formspree y la validación anterior. Las funciones de `api/` necesitan el entorno de Vercel; `astro dev` y `astro preview` no las ejecutan.

## Alcance

No se incorporan las fotografías de IA, el bloque 3D, el rediseño de servicios ni la verificación por código que se habían añadido por error. Cualquier cambio visual o funcional posterior requiere una petición del usuario.

Se trabaja en `main`. Por solicitud del usuario, cada fase validada se guarda con commit y push, informando su identificador. Los cambios locales previos de Obsidian quedan fuera de estos commits.
