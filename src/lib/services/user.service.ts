import { api } from "@/lib/configs";

export const ServiceUser = {
  setup: (json: PayloadSetupUser) => api("post", "setup", { json }),
  getInfo: () => api("get", "user"),
};

export interface PayloadSetupUser {
  name: string;
  email: string;
}
