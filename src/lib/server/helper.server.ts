import { prisma } from "@/lib/server/prisma.server";
import { NextRequest, NextResponse } from "next/server";

export function createSafeModel<T>(
  modelName: string,
  modelBuilder: () => T
): T {
  // Kiểm tra biến global có tồn tại chưa
  const globalKey = `__typegoose_${modelName}`;
  if ((globalThis as any)[globalKey])
    return (globalThis as any)[globalKey] as T;
  const model = modelBuilder();
  if (process.env.NODE_ENV !== "production")
    (globalThis as any)[globalKey] = model;
  return model;
}

export function createApiHandler<T extends (req: NextRequest) => Promise<any>>(
  handler: T
): T {
  return (async (req: NextRequest) => {
    await prisma.$connect();

    const email = req.headers.get("x-user-email");
    if (email) {
      const info = await prisma.user.findFirst({ where: { email } });
      if (!info) throw new Error("User not found");
      req.headers.set("x-user-id", info.id ?? "");
    }

    return handler(req);
  }) as T;
}

export const responseSuccessV2 = (data: any, meta?: any) => {
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
