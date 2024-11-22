import VueEasyLightbox from "vue-easy-lightbox";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(VueEasyLightbox);
});
