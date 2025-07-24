import { createSafeModel } from "@/lib/server/helper.server";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({
  schemaOptions: {
    collection: "icons",
    timestamps: true,
  },
})
export class IconClass {
  @prop({ type: String, required: true })
  public code!: string;

  @prop({ type: Types.ObjectId, required: true })
  public userId!: Types.ObjectId;

  @prop({ type: String, required: true })
  public isDefault!: boolean;
}

export const IconModel = createSafeModel("IconModel", () =>
  getModelForClass(IconClass)
);
