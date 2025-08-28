// dialogs.ts
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { ICategory, ITransaction, IWallet } from "@/lib/types";

type DialogMap = {
  trans: ITransaction;
  wallet: { idWallet: string };
  category: ICategory;
  "assign-category": ITransaction;
  "assign-wallet": ITransaction;
  "create-wallet": null;
  "create-trans": null;
  "create-config-sync": null;
};

type DialogsState<M extends Record<string, any>> = {
  open: Partial<Record<keyof M, boolean>>;
  data: Partial<{ [K in keyof M]: M[K] | null }>;
};

const useStore = create<DialogsState<DialogMap>>(() => ({
  open: {},
  data: {},
}));

function open<K extends keyof DialogMap>(
  key: K,
  payload?: DialogMap[K] | null
) {
  useStore.setState((s) => ({
    open: { ...s.open, [key]: true },
    data: { ...s.data, [key]: payload },
  }));
}

function close<K extends keyof DialogMap>(key: K, clear = false) {
  useStore.setState((s) => ({
    open: { ...s.open, [key]: false },
    data: clear ? { ...s.data, [key]: null as any } : s.data,
  }));
}

function closeAll(clear = false) {
  useStore.setState((s) => ({
    open: Object.fromEntries(Object.keys(s.open).map((k) => [k, false])) as any,
    data: clear ? {} : s.data,
  }));
}

export function useDialog<K extends keyof DialogMap>(
  key: K
): { isOpen: boolean; data: DialogMap[K] | null } {
  return useStore(
    useShallow(
      (s) =>
        ({
          isOpen: Boolean(s.open[key]),
          data: (s.data[key] ?? null) as DialogMap[K] | null,
        } as const)
    )
  );
}

function useAnyOpen() {
  return useStore((s) => Object.values(s.open).some(Boolean));
}

export const dialogs = { useDialog, useAnyOpen, open, close, closeAll };
