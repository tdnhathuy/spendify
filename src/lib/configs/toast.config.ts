import { MutationKeys, MutationKeysType } from "@/lib/configs/key.config";

export type ToastContent<TData, TError> =
  | React.ReactNode
  | ((v: TData | TError) => React.ReactNode);

type ToastMessages<TData, TError> = {
  loading?: React.ReactNode;
  success?: ToastContent<TData, TError>;
  error?: ToastContent<TData, TError>;
};

export type VarsArg<TVariables> = TVariables extends void | undefined
  ? []
  : [variables: TVariables];

const defaultLoading = "Đang xử lý...";
const defaultSuccess = "Thành công!";
const defaultError = "Có lỗi xảy ra!";

export const configToastMessage: Partial<
  Record<MutationKeysType | "default", ToastMessages<any, any>>
> = {
  [MutationKeys.getWallet]: {
    loading: "Đang lấy danh sách ví",
    success: "Lấy danh sách ví thành công",
    error: "Lấy danh sách ví thất bại",
  },

  default: {
    loading: defaultLoading,
    success: defaultSuccess,
    error: defaultError,
  },
};
