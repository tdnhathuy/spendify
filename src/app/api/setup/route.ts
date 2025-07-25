import { defaultExpenseCategory, defaultIncomeCategory } from "@/lib/configs";
import { flatIcon } from "@/lib/configs/cdn.config";
import {
  CategoryClass,
  CategoryModel,
  EnumCategoryType,
  IconClass,
  IconModel,
  UserModel,
  WalletModel,
} from "@/lib/model";
import { createApiHandler, responseSuccess } from "@/lib/server";
import { PayloadSetupUser } from "@/lib/services";
import { values } from "lodash";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export const POST = createApiHandler(async (req: NextRequest) => {
  const userId = req.headers.get("x-user-id");
  if (userId) {
    await UserModel.findByIdAndDelete(userId);
    await IconModel.deleteMany({ idUser: new Types.ObjectId(userId) });
    await CategoryModel.deleteMany({ idUser: new Types.ObjectId(userId) });
    await WalletModel.deleteMany({ idUser: new Types.ObjectId(userId) });
  }

  const payload: PayloadSetupUser = await req.json();
  const user = await UserModel.create(payload);
  const newId = user.id;

  IconModel.create(createDefaultIcon(newId));
  CategoryModel.create(await createCategory(newId));

  return Response.json(responseSuccess([]));
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

  const arr: IconClass[] = [...defaultIcons];
  return [...arr];
};

export const createCategory = async (
  userId: string
): Promise<CategoryClass[]> => {
  const arrExpense = defaultExpenseCategory;
  const arrIncome = defaultIncomeCategory;

  const result: CategoryClass[] = [];

  const icons = await IconModel.find({ idUser: new Types.ObjectId(userId) });

  arrExpense.forEach((expense) => {
    const icon = icons.find((x) => x.code === expense.idIcon);
    const parentId = new Types.ObjectId();
    result.push({
      userId: new Types.ObjectId(userId),
      name: expense.name,
      idIcon: new Types.ObjectId(icon?._id),
      type: EnumCategoryType.Expense,
      idParent: null,
      _id: new Types.ObjectId(),
    });

    expense.children.forEach((child) => {
      const icon = icons.find((x) => x.code === child.idIcon);
      result.push({
        userId: new Types.ObjectId(userId),
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
      userId: new Types.ObjectId(userId),
      name: income.name,
      idIcon: new Types.ObjectId(icon?._id),
      type: EnumCategoryType.Income,
      idParent: null,
      _id: new Types.ObjectId(),
    });
  });

  return result;
};
