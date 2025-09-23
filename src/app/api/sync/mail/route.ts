import { createApi, responseSuccess } from "@/server";

export const POST = createApi(async ({ idUser, request }) => {
  return responseSuccess(true);
});
