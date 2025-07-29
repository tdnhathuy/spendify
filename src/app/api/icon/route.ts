import { DTOIcon } from "@/lib/dto/icon.dto";
import { createApiHandler, queryById, responseSuccessV2 } from "@/lib/server";
import { NextRequest } from "next/server";

export const GET = createApiHandler(async (req: NextRequest) => {
  const idUser = req.headers.get("x-user-id")!;

  const { icons } = await queryById(idUser, ["icons"]);
  const arr = icons.map(DTOIcon.fromIcon);
  return responseSuccessV2(arr);
});
