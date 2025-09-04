import { getMail, prisma, Prompt } from "@/lib/server";
import { IConfigSync } from "@/lib/types";
import dayjs from "dayjs";
import { ParsedMail } from "mailparser";
import { NextResponse } from "next/server";

export const checkIsTransCreated = async (
  providerMsgId: string,
  idUser: string
) => {
  const isCreated = await prisma.transactionInfoSync.findFirst({
    where: { providerMsgId, idUser },
  });

  if (isCreated) {
    throw new Error("Transaction already created");
  }
};

export const getUserInfo = (email: string) => {
  return prisma.user.findUniqueOrThrow({
    where: { email },
    select: {
      id: true,
      syncConfig: {
        select: {
          fromEmail: true,
          walletId: true,
        },
      },
    },
  });
};

const NAMES: Record<string, string> = {
  "VCBDigibank@info.vietcombank.com.vn": "VCB",
  "tpbank@tpb.com.vn": "TPB",
  "HSBC Vietnam": "HSBC",
};

type Params = {
  idUser: string;
  syncConfig: {
    fromEmail: string;
    walletId: string | null;
  }[];
  providerMsgId: string;
  mail: ParsedMail;
};

export const createSyncInfo = async (params: Params) => {
  const { idUser, syncConfig, providerMsgId, mail } = params;

  const { from, date, subject, html, to } = mail;

  const emailFrom = getMail(from);
  const emailTo = getMail(to);

  const walletId = syncConfig.find(
    (item) => item.fromEmail === emailFrom
  )?.walletId;

  const name = from?.value[0]?.name || from?.value[0]?.address || "";

  const finalName = NAMES[name] || name;
  const dateStr = dayjs(date).format("DD/MM/YYYY");

  const note = `Sync transaction ${dateStr} from ${finalName}`;

  const amount = await Prompt.extractAmount(String(html || ""));

  await prisma.transaction.create({
    data: {
      amount: amount ?? 0,
      note,
      date: new Date(date || ""),
      createdAt: new Date(),
      updatedAt: new Date(),
      user: { connect: { id: idUser } },
      ...(walletId && { wallet: { connect: { id: walletId } } }),

      infoSync: {
        create: {
          emailProvider: emailFrom,
          emailReceived: emailTo,
          emailTitle: subject || "",
          idUser: idUser,
          providerMsgId: providerMsgId,
        },
      },
    },
  });

  return NextResponse.json({
    ok: true,
    via: "gmail_raw",
    messageId: providerMsgId,
    subject: mail.subject,
    from: mail.from?.text,
    amount,
  });
};
