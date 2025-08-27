import { createApi, responseSuccess } from "@/lib/server";

export const POST = createApi(async ({ idUser, request }) => {
  return responseSuccess(true);
});
