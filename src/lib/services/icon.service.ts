import { client } from "@/lib/configs";
import { IIcon, Response } from "@/lib/types";

export const ServiceIcon = {
  get: () =>
    client
      .get("icon")
      .json<Response<IIcon[]>>()
      .then((res) => res.data),
};
