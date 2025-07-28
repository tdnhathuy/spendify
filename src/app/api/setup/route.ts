import { defaultExpenseCategory, defaultIncomeCategory } from "@/lib/configs";
import { flatIcon } from "@/lib/configs/cdn.config";
import {
  CategoryClass,
  CategoryModel,
  EnumCategoryType,
  IconClass,
  IconModel,
  TransactionModel,
  UserModel,
  WalletModel,
} from "@/lib/model";
import { createApiHandler, responseSuccessV2 } from "@/lib/server";
import { PayloadSetupUser } from "@/lib/services";
import { values } from "lodash";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export const POST = createApiHandler(async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  if (userId) {
    const idUser = new Types.ObjectId(userId);
    await Promise.all([
      UserModel.findByIdAndDelete(idUser),
      IconModel.deleteMany({ idUser }),
      CategoryModel.deleteMany({ idUser }),
      WalletModel.deleteMany({ idUser }),
      TransactionModel.deleteMany({ idUser }),
    ]);
  }

  const payload: PayloadSetupUser = await req.json();
  const user = await UserModel.create(payload);
  const newId = user.id;

  const icons = await IconModel.create(createDefaultIcon(newId));
  await CategoryModel.create(await createCategory(newId, icons));

  return Response.json(responseSuccessV2([]));
});

export const createDefaultIcon = (userId: string): IconClass[] => {
  const defaultIcons: IconClass[] = values(flatIcon).map((x) => {
    const icon: IconClass = {
      code: x,
      idUser: new Types.ObjectId(userId),
      isDefault: true,
      _id: new Types.ObjectId(),
    };
    return icon;
  });

  return defaultIcons;
};

export const createCategory = async (
  userId: string,
  icons: IconClass[]
): Promise<CategoryClass[]> => {
  const arrExpense = defaultExpenseCategory;
  const arrIncome = defaultIncomeCategory;

  const result: CategoryClass[] = [];

  arrExpense.forEach((expense) => {
    const icon = icons.find((x) => x.code === expense.idIcon);
    console.log("icon", icon);
    const parentId = new Types.ObjectId();
    result.push({
      idUser: new Types.ObjectId(userId),
      name: expense.name,
      idIcon: icon?._id!,
      type: EnumCategoryType.Expense,
      idParent: null,
      _id: parentId,
    });

    expense.children.forEach((child) => {
      const icon = icons.find((x) => x.code === child.idIcon);
      result.push({
        idUser: new Types.ObjectId(userId),
        name: child.name,
        idIcon: new Types.ObjectId(icon?._id),
        type: EnumCategoryType.Expense,
        idParent: parentId,
        _id: new Types.ObjectId(),
      });
    });
  });

  arrIncome.forEach((income) => {
    const icon = icons.find((x) => x.code === income.idIcon);
    result.push({
      idUser: new Types.ObjectId(userId),
      name: income.name,
      idIcon: new Types.ObjectId(icon?._id),
      type: EnumCategoryType.Income,
      idParent: null,
      _id: new Types.ObjectId(),
    });
  });

  return result;
};
