// dialogs.ts
import { ICategory, ITransaction, IWallet } from "@/lib/types";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type SheetMap = {
  "transaction-detail": ITransaction;
  "category-detail": ICategory | null;
  "wallet-detail": IWallet | null;
};

type DialogsState<M extends Record<string, any>> = {
  open: Partial<Record<keyof M, boolean>>;
  data: Partial<{ [K in keyof M]: M[K] | null }>;
};

const useStore = create<DialogsState<SheetMap>>(() => ({
  open: {},
  data: {},
}));

function open<K extends keyof SheetMap>(key: K, payload?: SheetMap[K] | null) {
  useStore.setState((s) => ({
    open: { ...s.open, [key]: true },
    data: { ...s.data, [key]: payload },
  }));
}

function close<K extends keyof SheetMap>(key: K, clear = false) {
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

export function useSheet<K extends keyof SheetMap>(
  key: K
): {
  data: SheetMap[K] | null;

  sheetProps: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
} {
  return {
    ...useStore(
      useShallow((s) => {
        const data = (s.data[key] ?? null) as SheetMap[K] | null;
        return { data } as const;
      })
    ),

    sheetProps: {
      open: useStore((s) => Boolean(s.open[key])),
      onOpenChange: (open: boolean) => {
        useStore.setState((s) => ({
          open: { ...s.open, [key]: open },
          data: {
            ...s.data,
            [key]: (s.data[key] ?? null) as SheetMap[K] | null,
          },
        }));
      },
    },
  };
}

function useAnyOpen() {
  return useStore((s) => Object.values(s.open).some(Boolean));
}

export const sheets = { useSheet, useAnyOpen, open, close, closeAll };
