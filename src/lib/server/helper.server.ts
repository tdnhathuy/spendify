import { CategoryModel, IconModel, UserModel, WalletModel } from "@/lib/model";
import { dbConnect } from "@/lib/server/mongoose.server";
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
    await dbConnect();

    const email = req.headers.get("x-user-email");
    const user = await UserModel.findOne({ email }).lean();

    const userId = user?._id.toString();
    req.headers.set("x-user-id", userId ?? "");

    return handler(req);
  }) as T;
}

export const responseSuccessV2 = (data: any) => {
  return NextResponse.json({
    status: 200,
    message: "success",
    data,
  });
};

type Key = "categories" | "icons" | "wallets";
export const queryById = async (
  idUser: string,
  keys: Key[] = ["categories", "icons", "wallets"]
): Promise<Record<Key, any>> => {
  const promises = [];
  const keyOrder: Key[] = [];

  if (keys.includes("categories")) {
    promises.push(CategoryModel.find({ idUser }));
    keyOrder.push("categories");
  }
  if (keys.includes("icons")) {
    promises.push(IconModel.find({ idUser }));
    keyOrder.push("icons");
  }
  if (keys.includes("wallets")) {
    promises.push(WalletModel.find({ idUser }));
    keyOrder.push("wallets");
  }

  const res = await Promise.all(promises);

  // Gộp lại thành object
  const result: Record<string, any> = {};
  keyOrder.forEach((key, idx) => {
    result[key] = res[idx];
  });

  return result;
};
