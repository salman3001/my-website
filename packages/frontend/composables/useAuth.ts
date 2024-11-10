import type { AuthUser } from "~/utils/types";

export const useAuth = () => {
  const user = useCookie<AuthUser | null>("user");
  const token = useCookie<string | null>("token");

  const setAuth = (authUser: AuthUser | null, tokenString: string | null) => {
    user.value = authUser;
    token.value = tokenString;
  };

  return { user, token, setAuth };
};
