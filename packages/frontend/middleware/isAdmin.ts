import type { AuthUser } from "~/utils/types";
import { UserType } from "~/utils/types/modals";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie("user") as unknown as Ref<AuthUser>;

  if (!user.value) {
    return navigateTo(routes.auth.signin() + `?next=${to.fullPath}`);
  }

  if (user.value?.userType !== UserType.Admin) {
    return abortNavigation();
  }
});
