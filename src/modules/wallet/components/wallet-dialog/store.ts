import { Wallet } from "@/lib/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Values {
  open: boolean;
  wallet: Wallet | null;
}

interface Actions {
  setOpen: (open: boolean, wallet?: Wallet) => void;
}

type State = { values: Values; actions: Actions };

const initValues: Values = {
  open: false,
  wallet: null,
};

export const useStoreDialogWallet = create<State>()(
  immer((set) => ({
    values: initValues,
    actions: {
      setOpen: (open, wallet) => {
        set((state) => {
          state.values.open = open;
          state.values.wallet = open ? wallet || null : null;
        });
      },
    },
  }))
);
