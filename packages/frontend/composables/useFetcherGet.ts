import type { UseFetchOptions } from "#app";

export default function useFetcherGet<T>(url: string, opt: UseFetchOptions<T>) {
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const authorization = `Bearer ${toRaw(token.value)}`;

  return useFetch(config.public.baseApi + url, {
    headers: { Authorization: authorization },
    ...opt,
  });
}
