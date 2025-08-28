import { api } from "@/lib/configs";
import { ICategory } from "@/lib/types";

export const ServiceCategory = {
  get: () => api<ICategory[]>("get", "category"),
};
