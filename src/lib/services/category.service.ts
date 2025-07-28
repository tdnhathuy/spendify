import { client } from "@/lib/configs";
import { Response } from "@/lib/types";
import { Category } from "@/lib/types";

export const ServiceCategory = {
  get: () =>
    client
      .get("category")
      .json<Response<Category[]>>()
      .then((res) => res.data),
};
