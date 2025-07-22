import { auth } from "@/auth";
import { responseSuccess } from "@/lib/server/response.server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    console.log('req', req)
  return Response.json(responseSuccess([]));
}
