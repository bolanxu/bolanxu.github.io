import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bolanxu.github.io',
  output: 'static',
  
  server: {
    host: true, // Tells Astro to listen on all network interfaces
  }
});

