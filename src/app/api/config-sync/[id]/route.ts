import { DTOConfigSync } from "@/lib/dto/config-sync.dto";
import {
  createApi,
  prisma,
  responseSuccess,
  // selectConfigSync,
} from "@/server";

export const PATCH = createApi(async ({ request, idUser, id }) => {
  const body = (await request.json()) as PayloadUpdateConfigSync;
  // const config = await prisma.syncConfig.update({
  //   where: { idUser: idUser!, id: id! },
  //   data: { walletId: body.walletId },
  //   select: selectConfigSync,
  // });
  // return responseSuccess(DTOConfigSync.fromDB(config));
  return responseSuccess(true);
});

export interface PayloadUpdateConfigSync {
  id: string;
  walletId: string;
}
