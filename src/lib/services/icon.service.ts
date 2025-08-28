import { api } from "@/lib/configs";
import { IIcon } from "@/lib/types";

export const ServiceIcon = {
  get: () => api<IIcon[]>("get", "icon"),
};
