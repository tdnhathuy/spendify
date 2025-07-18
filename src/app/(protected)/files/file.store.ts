import { create } from "zustand";

interface Actions {}
interface Values {}

interface State {
  values: Values;
  actions: Actions;
}

const initValues: Values = {};

export const useFileStore = create<State>((set) => ({
  values: initValues,
  actions: {},
}));
