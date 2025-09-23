import { IConfigSync } from "@/lib/types";
import { DTOWallet } from "./wallet.dto";
import { DBSyncConfig } from "@/server";

const fromDB = (config: DBSyncConfig): IConfigSync => {
  return {
    id: config.id,
    idUser: config.idUser,
    fromEmail: config.fromEmail,
    toWallet: config.toWallet?.id ?? null,
    wallet: config.toWallet ? DTOWallet.fromDB(config.toWallet) : null,
  };
};

export const DTOConfigSync = {
  fromDB,
};
