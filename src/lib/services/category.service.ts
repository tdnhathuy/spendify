import { client } from "@/lib/configs";
import { Response } from "@/lib/types";
import { ICategory } from "@/lib/types";

export const ServiceCategory = {
  get: () =>
    client
      .get("category")
      .json<Response<ICategory[]>>()
      .then((res) => res.data),
};
