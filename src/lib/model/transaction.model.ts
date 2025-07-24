import { createSafeModel } from "@/lib/server/helper.server";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "transactions",
    timestamps: true,
  },
})
export class TransactionClass {
  @prop({ type: Number, required: true })
  public amount!: number;

  @prop({ type: Date, required: true })
  public date!: Date;

  @prop({ type: String, required: true })
  public description!: string;

  @prop({ type: String, required: true })
  public idProfile!: string;

  @prop({ type: String, required: true })
  public idCategory!: string;

  @prop({ type: String, required: true })
  public idWallet!: string;
}

export const TransactionModel = createSafeModel("TransactionModel", () =>
  getModelForClass(TransactionClass)
);
