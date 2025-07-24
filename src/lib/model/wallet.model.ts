import { createSafeModel } from "@/lib/server/helper.server";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export enum EnumWalletType {
  Cash = "Cash",
  Debit = "Debit",
  Credit = "Credit",
  Crypto = "Crypto",
}

export type WalletType = keyof typeof EnumWalletType;

@modelOptions({
  schemaOptions: {
    collection: "wallets",
    timestamps: true,
  },
})
export class WalletClass {
  @prop({ type: Types.ObjectId })
  public _id!: Types.ObjectId;

  @prop({ type: Types.ObjectId, required: true })
  public idIcon!: Types.ObjectId;

  @prop({ type: Types.ObjectId, required: true })
  public idUser!: Types.ObjectId;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: Number, required: true })
  public initBalance!: number;

  @prop({ type: String, required: true, enum: EnumWalletType })
  public type!: WalletType;
}

export const WalletModel = createSafeModel("WalletModel", () =>
  getModelForClass(WalletClass)
);
