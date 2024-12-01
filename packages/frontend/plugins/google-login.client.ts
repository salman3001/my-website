import vue3GoogleLogin from "vue3-google-login";

export default defineNuxtPlugin((app) => {
  const appConfig = useAppConfig();
  app.vueApp.use(vue3GoogleLogin, {
    clientId: appConfig.auth.githubClientId,
  });
});
