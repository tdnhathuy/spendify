import { createApi, responseSuccess } from "@/lib/server";
import { google } from "googleapis";

const oauth2 = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);

export const POST = createApi(async ({ idUser, request }) => {
  console.log("request", request);
  const token = request.headers.get("x-user-token");
  console.log("token", token);

  const gmail = google.gmail({ version: "v1" });

  const res = await gmail.users.messages.list({
    userId: "me",
  });

  console.log("res", res);
  return responseSuccess(idUser);
});
