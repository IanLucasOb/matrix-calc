// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  build: { transpile: ["vuetify"] },
  modules: ["@vite-pwa/nuxt"],
  pwa: {
    manifest: {
      name: "Matrix",
      short_name: "Mtx",
      description: "Matrix calculator po",
      background_color: "#AAA",
      theme_color: "#3367D6",
      // icons: [
      //   {
      //     src: "pwa-64x64.png",
      //     sizes: "64x64",
      //     type: "image/png",
      //   },
      //   {
      //     src: "pwa-192x192.png",
      //     sizes: "192x192",
      //     type: "image/png",
      //   },
      //   {
      //     src: "pwa-512x512.png",
      //     sizes: "512x512",
      //     type: "image/png",
      //     purpose: "any",
      //   },
      //   {
      //     src: "maskable-icon-512x512.png",
      //     sizes: "512x512",
      //     type: "image/png",
      //     purpose: "maskable",
      //   },
      // ],
    },
  },
});
