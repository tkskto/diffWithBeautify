import { defineConfig } from 'vite';
import { svelte } from "@sveltejs/vite-plugin-svelte";
import license from 'rollup-plugin-license';
import { join } from 'path';
import { VitePWA } from 'vite-plugin-pwa'

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
    VitePWA({
      manifest: {
        lang: 'ja',
        name: "DiffWithBeautify",
        short_name: "DwB",
        display: "standalone",
        start_url: "/diffWithBeautify/",
        background_color: "#F9F9F9",
        theme_color: "#3A3F51",
        icons: [
          { src: "assets/img/icon_512.png", type: "image/png", sizes: "512x512" },
          { src: "assets/img/icon_256.png", type: "image/png", sizes: "256x256" },
          { src: "assets/img/icon_128.png", type: "image/png", sizes: "128x128" },
          { src: "assets/img/icon_64.png", type: "image/png", sizes: "64x64" },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
      injectRegister: 'script',
    }),
  ],
  base: '/diffWithBeautify/',
  build: {
    outDir: 'docs',
  },
});
