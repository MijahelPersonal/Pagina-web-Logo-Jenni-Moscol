import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  output: 'static',
  redirects: {
    '/servicios/logopedia infantil': '/servicios/logopedia-infantil',
    '/servicios/logopedia jovenes y adultos': '/servicios/logopedia-jovenes-y-adultos',
    '/servicios/logopedia online': '/servicios/logopedia-online',
    '/servicios/logopedia a domicilio': '/servicios/logopedia-a-domicilio',
  },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
