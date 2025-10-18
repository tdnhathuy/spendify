import { createApi, responseSuccess } from "@/server";

export const POST = () => {
  return responseSuccess(true, "Sync SMS success");
};
