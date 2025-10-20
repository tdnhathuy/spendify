import { DTOConfigSync } from "@/lib/dto/config-sync.dto";
import {
  createApi,
  prisma,
  responseSuccess,
  // selectConfigSync,
} from "@/server";
import { IConfigSync } from "@/lib/types";

export const GET = createApi(async ({ idUser }) => {
  // const response = await prisma.syncConfig.findMany({
  //   where: { idUser },
  //   select: selectConfigSync,
  // });

  // const configs: IConfigSync[] = response.map(DTOConfigSync.fromDB);
  return responseSuccess(true);
});

export const POST = createApi(async ({ request, idUser }) => {
  const body = (await request.json()) as PayloadCreateConfigSync;

  // await prisma.syncConfig.create({
  //   data: {
  //     idUser,
  //     walletId: body.walletId,
  //     fromEmail: body.email,
  //   },
  // });

  return responseSuccess(true);
});

export interface PayloadCreateConfigSync {
  walletId: string;
  email: string;
}
