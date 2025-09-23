import "server-only";

import { prisma } from "@/server/prisma/prisma.server";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export type HandlerCtx = {
  timing<T>(name: string, fn: () => Promise<T>): Promise<T>;
  idUser: string;
};

type HandlerV2 = (payload: {
  request: NextRequest;
  idUser: string;
  id: string;
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
    try {
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
          id: getParamId(request),
        });
      }

      return await handler({
        request,
        idUser: "6bdb5088-1831-44ee-af45-9909955df7b7",
        id: "",
      });
    } catch (error) {
      console.error("API error:", error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
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

async function getListPublic(
  absDir: string,
  baseUrl: string
): Promise<string[]> {
  const ents = await fs.readdir(absDir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of ents) {
    const abs = path.join(absDir, e.name);
    const rel = `${baseUrl}/${e.name}`.replace(/\\/g, "/");
    if (e.isDirectory()) out.push(...(await getListPublic(abs, rel)));
    else if (e.isFile() && e.name.endsWith(".svg")) out.push(rel);
  }
  return out;
}

export const getSvgByFolderName = async (folderName: string) => {
  const dir = path.join(process.cwd(), "public", "svg");
  const result = await getListPublic(
    path.join(dir, folderName),
    `/svg/${folderName}`
  );

  return result;
};

export const getParamId = (request: NextRequest) => {
  const pathParts = request.nextUrl.pathname.split("/").filter(Boolean);

  // Check if the URL follows a pattern with dynamic route segments
  // For Next.js dynamic routes like /api/[type]/[id] or /api/[type]/[id]/action
  // The ID is typically a UUID or similar format that can be detected

  for (const part of pathParts) {
    // Check if the part looks like a UUID (common ID format)
    if (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        part
      )
    ) {
      return part;
    }
  }

  // Fallback: if no UUID-like string found, return the last segment
  // This handles cases where the ID might not be a UUID
  return pathParts.length > 0 ? pathParts[pathParts.length - 1] : "";
};

type ServerActionContext = {
  idUser: string;
};
export const withParams = <TParams, TReturn>(
  fn: (context: ServerActionContext, params: TParams) => Promise<TReturn>
) => {
  return async (params: TParams): Promise<TReturn> => {
    return await fn({ idUser: "123" }, params);
  };
};
