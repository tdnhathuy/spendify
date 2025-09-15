import { PayloadCreateCategory } from "@/app/api/category/route";
import { api } from "@/lib/configs";
import { ICategory } from "@/lib/types";

export const ServiceCategory = {
  get: () => api<ICategory[]>("get", "category"),

  create: (json: PayloadCreateCategory) =>
    api<ICategory>("post", "category", { json }),
};
