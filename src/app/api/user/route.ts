import { DTOUser } from "@/lib/dto/user.dto";
import { getProfile } from "@/lib/server";
import {
  createApiHandler,
  responseSuccessV2,
} from "@/lib/server/helper.server";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const id = req.headers.get("x-user-id")!;

  console.time("getProfile");
  const profile = await getProfile(id);
  console.timeEnd("getProfile");

  const user = DTOUser.fromObject(profile);
  console.log('user', user)

  return responseSuccessV2(user);
});
