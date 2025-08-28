import { DTOWallet } from "@/lib/dto/wallet.dto";
import {
  createApi,
  prisma,
  responseSuccess,
  selectConfigSync,
  selectWallet,
} from "@/lib/server";
import { IConfigSync } from "@/lib/types";

export const GET = createApi(async ({ idUser }) => {
  const response = await prisma.syncConfig.findMany({
    where: { idUser },
    select: selectConfigSync,
  });

  const configs: IConfigSync[] = response.map((item) => ({
    id: item.id,
    idUser: idUser,
    fromEmail: item.fromEmail,
    toWallet: item.toWallet.id,
    wallet: DTOWallet.fromDB(item.toWallet)!,
  }));
  return responseSuccess(configs);
});

export const POST = createApi(async ({ request, idUser }) => {
  const body = (await request.json()) as PayloadCreateConfigSync;

  await prisma.syncConfig.create({
    data: {
      idUser,
      walletId: body.walletId,
      fromEmail: body.email,
    },
  });

  return responseSuccess(true);
});

export interface PayloadCreateConfigSync {
  walletId: string;
  email: string;
}
