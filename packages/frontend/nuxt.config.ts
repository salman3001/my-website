// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      baseApi: "http://localhost:4000/api",
      appName: "SalmanDev",
      uploadsPath: "http://localhost:4000/uploads/",
    },
  },
  app: {
    head:{
      script:[
        {
          src:'https://accounts.google.com/gsi/client'
        }
      ]
    }
  },
  experimental: {
    noVueServer: true,
  },
});
