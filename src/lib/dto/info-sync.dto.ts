import { TransactionInfoSync } from "@/generated/prisma";
import { IInfoSync } from "@/lib/types";

const fromDB = (infoSync?: TransactionInfoSync | null): IInfoSync | null => {
  if (!infoSync) return null;
  return {
    id: infoSync.id,
    emailProvider: infoSync.emailProvider,
    emailReceived: infoSync.emailReceived,
    emailTitle: infoSync.emailTitle,
  };
};

export const DTOInfoSync = {
  fromDB,
};
