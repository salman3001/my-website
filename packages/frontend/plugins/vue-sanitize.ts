// @ts-ignore
import VueSanitize from "vue-sanitize-directive";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(VueSanitize);
});
