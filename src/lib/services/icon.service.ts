import { client } from "@/lib/configs";
import { Icon, Response } from "@/lib/types";

export const ServiceIcon = {
  get: () =>
    client
      .get("icon")
      .json<Response<Icon[]>>()
      .then((res) => res.data),
};
