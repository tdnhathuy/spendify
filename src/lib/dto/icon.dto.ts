import { Icon } from "@/generated/prisma";
import { convertIdFlatIcon } from "@/lib/helpers/func.helper";
import { IIcon } from "@/lib/types";

export type ObjectIcon = { id: string; code: string } | null;
export const DTOIcon = {
  fromObject: (obj: ObjectIcon): IIcon | null => {
    if (!obj) return null;
    return {
      id: obj.id,
      code: obj.code,
      url: convertIdFlatIcon(obj.code),
    };
  },
  fromIcon: (icon: Icon): IIcon => {
    return {
      id: icon.id,
      code: icon.code,
      url: convertIdFlatIcon(icon.code),
    };
  },
};
