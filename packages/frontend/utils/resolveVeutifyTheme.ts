import type { CookieRef } from "#app";
import { usePreferredDark } from "@vueuse/core";

export const resolveVuetifyTheme = (
  defaultTheme: "light" | "dark" | "system",
  storedTheme: CookieRef<string | null | undefined>,
): "light" | "dark" => {
  if (!storedTheme.value) {
    storedTheme.value = defaultTheme;
  }

  if (storedTheme.value === "system") {
    const preferedColorScheme = usePreferredDark();
    storedTheme.value = preferedColorScheme.value ? "dark" : "light";
  }

  return storedTheme.value as "light" | "dark";
};
