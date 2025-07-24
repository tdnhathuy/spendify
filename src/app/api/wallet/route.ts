import { UserModel } from "@/lib/model";
import { dbConnect } from "@/lib/server/mongoose.server";
import { responseSuccess } from "@/lib/server/response.server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  const users = await UserModel.find();
  return Response.json(responseSuccess([]));
}

export async function POST(req: NextRequest) {
  await dbConnect();

  return Response.json(responseSuccess([]));
}
