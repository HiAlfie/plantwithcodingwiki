import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/PlantWithCodingWiki',

  vite: {
    plugins: [tailwindcss()],
  },
});