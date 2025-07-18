import { create } from "zustand";

interface Values {
  emails: string[];
}
interface Actions {
  setEmails: (emails: string[]) => void;
}

interface State {
  values: Values;
  actions: Actions;
}

const initValues: Values = {
  emails: [],
};

export const useFileStore = create<State>((set, get) => ({
  values: initValues,
  actions: {
    setEmails: (emails) => set({ values: { ...get().values, emails } }),
  },
}));
