"use client";

import { MutationKeysType } from "@/lib/configs/key.config";
import {
  configToastMessage,
  ToastContent,
  VarsArg,
} from "@/lib/configs/toast.config";
import type { UseMutationResult } from "@tanstack/react-query";
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

  const render = <T>(content: ToastContent<any, any>, value: T) =>
    typeof content === "function" ? (content as any)(value) : content;

  const asyncToast = async (...args: VarsArg<TVariables>): Promise<TData> => {
    const variables = (args[0] ?? undefined) as TVariables;
    const run = mutateAsync(variables);

    toast.promise(run, {
      loading: messages?.loading,
      success: (data) => render<TData>(messages?.success ?? undefined, data),
      error: (err) => render<TError>(messages?.error ?? undefined, err),
    });

    return run;
  };

  return {
    ...rest,
    mutateAsync,
    asyncToast,
  };
}
