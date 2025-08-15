import "server-only";

import { prisma } from "@/lib/server/prisma.server";
import { NextRequest, NextResponse } from "next/server";

export type HandlerCtx = {
  timing<T>(name: string, fn: () => Promise<T>): Promise<T>;
  idUser: string;
};

type Handler = (req: NextRequest, ctx: HandlerCtx) => Promise<NextResponse>;

type HandlerV2 = (payload: {
  request: NextRequest;
  timing<T>(name: string, fn: () => Promise<T>): Promise<T>;
  idUser: string;
}) => Promise<NextResponse>;

export const timing = async <T>(name: string, fn: () => Promise<T>) => {
  const label = `====${name}====`;
  console.time(label);
  return await fn().finally(() => {
    console.timeEnd(label);
  });
};

export function createApi(handler: HandlerV2) {
  return async (request: NextRequest) => {
    const t = timing;

    let idUser: string = "";
    const email = request.headers.get("x-user-email");
    if (email) {
      const u = await prisma.user.findUnique({ where: { email } });
      if (!u)
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      idUser = u.id;
    }

    const res = await handler({ request, timing: t, idUser });
    return res;
  };
}

export const responseSuccess = (data: any, meta?: any) => {
  const response: any = {
    status: 200,
    message: "success",
    data,
  };

  if (meta) response.meta = meta;
  return NextResponse.json(response);
};

export const getParamsPaging = (req: NextRequest) => {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ?? 1;
  const limit = url.searchParams.get("limit") ?? 5;

  return { page: Number(page), limit: Number(limit) };
};
