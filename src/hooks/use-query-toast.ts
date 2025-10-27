"use client";

import { MutationKeysType } from "@/lib/configs/key.config";
import { configToastMessage, ToastContent } from "@/lib/configs/toast.config";
import type { UseMutationResult, MutateOptions } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMutateToasty<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  factory: () => UseMutationResult<TData, TError, TVariables, TContext>,
  toastKey?: MutationKeysType
) {
  const messages = configToastMessage[toastKey || "default"];
  const mutation = factory();
  const { mutateAsync, ...rest } = mutation;

  const render = <T>(content: ToastContent<any, any> | undefined, value: T) =>
    typeof content === "function" ? (content as any)(value) : content;

  type AsyncToast = TVariables extends void | undefined
    ? (
        options?: MutateOptions<TData, TError, TVariables, TContext>
      ) => Promise<TData>
    : (
        variables: TVariables,
        options?: MutateOptions<TData, TError, TVariables, TContext>
      ) => Promise<TData>;

  const asyncToast: AsyncToast = (async (...args: any[]): Promise<TData> => {
    let variables: TVariables | undefined;
    let options: MutateOptions<TData, TError, TVariables, TContext> | undefined;

    const [a, b] = args;
    if (b !== undefined) {
      variables = a as TVariables;
      options = b as typeof options;
    } else if (
      a &&
      typeof a === "object" &&
      ("onSuccess" in a || "onError" in a || "onSettled" in a)
    ) {
      options = a as typeof options;
      variables = undefined as any;
    } else {
      variables = a as TVariables;
    }

    const run = mutateAsync(variables as TVariables, options);

    toast.promise(run, {
      loading: messages?.loading,
      success: (data) => render<TData>(messages?.success, data),
      error: (err) => render<TError>(messages?.error, err),
    });

    return run;
  }) as AsyncToast;

  return {
    ...rest,
    isLoading: rest.isPending,
    mutateAsync,
    asyncToast,
  };
}
