import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bolanxu.github.io',
  output: 'static',

  server: {
    host: true,
  },

  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
  },
});