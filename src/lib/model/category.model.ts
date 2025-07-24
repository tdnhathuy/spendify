import { createSafeModel } from "@/lib/server/helper.server";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export enum EnumCategoryType {
  Expense = "Expense",
  Income = "Income",
  Transfer = "Transfer",
}

@modelOptions({
  schemaOptions: {
    collection: "categories",
    timestamps: true,
  },
})
export class CategoryClass {
  @prop({ type: Types.ObjectId, required: true })
  public idIcon!: Types.ObjectId;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: Types.ObjectId, required: false, default: null })
  public idParent!: Types.ObjectId | null;

  @prop({ type: String, required: true, enum: EnumCategoryType })
  public type!: EnumCategoryType;

  @prop({ type: Types.ObjectId, required: true })
  public userId!: Types.ObjectId;
}

export const CategoryModel = createSafeModel("CategoryModel", () =>
  getModelForClass(CategoryClass)
);
