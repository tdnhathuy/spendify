import { createSafeModel } from "@/lib/server/helper.server";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({
  schemaOptions: {
    collection: "transactions",
    timestamps: true,
  },
})
export class TransactionClass {
  @prop({ type: Types.ObjectId, required: true })
  public _id!: Types.ObjectId;

  @prop({ type: Number, required: true })
  public amount!: number;

  @prop({ type: Date, required: true })
  public date!: Date;

  @prop({ type: String, required: true })
  public description!: string;

  @prop({ type: Types.ObjectId, required: true })
  public idUser!: Types.ObjectId;

  @prop({ type: Types.ObjectId })
  public idCategory!: Types.ObjectId;

  @prop({ type: Types.ObjectId })
  public idWallet!: Types.ObjectId;
}

export const TransactionModel = createSafeModel("TransactionModel", () =>
  getModelForClass(TransactionClass)
);
