import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';
import license from 'rollup-plugin-license';
import {join} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    license({
      banner: {
        content: `see dependencies.txt to check license of thirdParty libraries.`,
        commentStyle: 'ignored',
      },
      thirdParty: {
        includePrivate: true, // Default is false.
        output: {
          file: join(__dirname, 'docs', 'dependencies.txt'),
          encoding: 'utf-8', // Default is utf-8.
        },
      },
    }),
  ],
  base: '/diffWithBeautify/',
  build: {
    outDir: 'docs',
  },
});
