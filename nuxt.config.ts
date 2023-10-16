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
      description: "Sistema para realizar cálculos envolvendo matrizes",
      background_color: "#1234",
    },
  },
});
