import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// import { VDataTable } from "vuetify/labs/VDataTable";
import { pt } from "vuetify/locale";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    locale: {
      locale: "pt",
      messages: { pt },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
