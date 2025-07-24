import { createSafeModel } from "@/lib/server/helper.server";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

enum EnumWalletType {
  Cash = "Cash",
  Debit = "Debit",
  Credit = "Credit",
  Crypto = "Crypto",
}

@modelOptions({
  schemaOptions: {
    collection: "wallets",
    timestamps: true,
  },
})
export class WalletClass {
  @prop({ type: String, required: true })
  public idIcon!: string;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: Number, required: true })
  public initBalance!: number;

  @prop({ type: String, required: true, enum: EnumWalletType })
  public type!: EnumWalletType;
}

export const WalletModel = createSafeModel("WalletModel", () =>
  getModelForClass(WalletClass)
);
