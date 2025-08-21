import "server-only";

import { prisma } from "@/lib/server/prisma.server";
import { NextRequest, NextResponse } from "next/server";

export type HandlerCtx = {
  timing<T>(name: string, fn: () => Promise<T>): Promise<T>;
  idUser: string;
};

type HandlerV2 = (payload: {
  request: NextRequest;
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
      return await handler({
        idUser: u.id,
        request,
      });
    }

    return await handler({
      request,
      idUser: "6bdb5088-1831-44ee-af45-9909955df7b7",
    });
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
