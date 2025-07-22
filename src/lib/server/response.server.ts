import { Response } from "@/lib/types";

export const responseSuccess = <T>(data: T): Response<T> => {
  return { data, message: "success", status: 200 };
};
