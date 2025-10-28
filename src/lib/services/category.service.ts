import { api } from "@/lib/configs";
import { ICategory } from "@/lib/types";

export const ServiceCategory = {
  get: () => api<ICategory[]>("get", "category"),

  create: (json: any) => api<ICategory>("post", "category", { json }),

  updateParent: (json: any) =>
    api<boolean>("put", "category/update-parent", { json }),
};
