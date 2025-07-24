import { client } from "@/lib/configs";

export const ServiceUser = {
  setup: (json: PayloadSetupUser) => client.post("setup", { json }).json(),
  getInfo: () => client.get("user").json(),
};

export interface PayloadSetupUser {
  name: string;
  email: string;
}
