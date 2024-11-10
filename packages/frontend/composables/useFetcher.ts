import type { FetchContext } from "ofetch";
import { toast } from "vue3-toastify";
import type { IResType, ValidationErrorObj } from "~/utils/types";

export default function useFetcher() {
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const authorization = `Bearer ${toRaw(token.value)}`;
  const loading = ref(false);
  const errors = ref<ValidationErrorObj | null>(null);

  const exec = async (
    url: string,
    fetchOpt: Parameters<typeof $fetch>[1],
    opt?: {
      onSuccess?: (res: IResType<any>) => void;
      onError?: () => void;
      disableToast?: boolean;
    },
  ) => {
    const x = await $fetch(url, {
      ...fetchOpt,
      baseURL: config.public.baseApi,
      headers: token.value ? { authorization } : {},
      onRequest: () => {
        errors.value = null;
        loading.value = true;
      },
      onResponse: (ctx: FetchContext<IResType<any>>) => {
        loading.value = false;

        const res = ctx.response?._data;
        const success = res?.success;
        const errorsObj = res?.errors;
        const message = res?.message;

        if (success == true) {
          opt?.onSuccess && opt?.onSuccess(res);
          !opt?.disableToast && toast.success(message || "Success");
        } else if (success == false) {
          if (errorsObj) {
            errors.value = errorsObj;
          }

          opt?.onError && opt?.onError();
          !opt?.disableToast && toast.error(message || "Error");
        }
      },
      onRequestError: (ctx: FetchContext<IResType<any>>) => {
        loading.value = false;
        toast.error(ctx.error?.message || "Request Error");
      },
    });
  };

  return { loading, exec, errors };
}
