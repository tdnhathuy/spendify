import { createSafeModel } from "@/lib/server/helper.server";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "users",
    timestamps: true,
  },
})
export class UserClass {
  @prop({ type: String, required: true })
  public email!: string;

  @prop({ type: String, required: true })
  public name!: string;
}

export const UserModel = createSafeModel("UserModel", () =>
  getModelForClass(UserClass)
);
