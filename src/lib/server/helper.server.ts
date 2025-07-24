import { UserModel } from "@/lib/model";
import { dbConnect } from "@/lib/server/mongoose.server";
import { NextRequest } from "next/server";

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

interface ExParams {
  userId?: string;
}
export function createApiHandler<T extends (req: NextRequest) => Promise<any>>(
  handler: T
): T {
  return (async (req: NextRequest) => {
    await dbConnect();

    const email = req.headers.get("x-user-email");
    const user = await UserModel.findOne({ email }).lean();

    const userId = user?._id.toString();
    req.headers.set("x-user-id", userId ?? "");

    return handler(req);
  }) as T;
}
