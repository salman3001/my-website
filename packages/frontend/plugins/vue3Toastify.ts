import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(Vue3Toastify, {} as ToastContainerOptions);
});
