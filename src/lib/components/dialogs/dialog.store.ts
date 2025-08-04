import { Category, Transaction, Wallet } from "@/lib/types";
import { create } from "zustand";

// 1. Định nghĩa Discriminated Union
export type DialogType =
  | { type: null; data: null }
  | { type: "trans"; data: Transaction }
  | { type: "wallet"; data: Wallet }
  | { type: "category"; data: Category };

export type DialogTypeKey = DialogType["type"];

export const useStoreDialog = create<DialogType>(() => ({
  type: null,
  data: null,
}));

export function openDialog<T extends DialogTypeKey>(
  type: T,
  data: Extract<DialogType, { type: T }>["data"] | null
) {
  useStoreDialog.setState({ type, data } as DialogType);
}

export function closeDialog() {
  useStoreDialog.setState({ type: null });
  // setTimeout(() => {
  //   useStoreDialog.setState({ data: null });
  // }, 300);
}
