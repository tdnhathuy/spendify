import { Icon } from "@/generated/prisma";
import { convertIdFlatIcon } from "@/lib/helpers/func.helper";
import { IIcon } from "@/lib/types";

export const DTOIcon = {
  fromIcon: (icon: Icon): IIcon => {
    return {
      id: icon.id,
      code: icon.code,
      url: convertIdFlatIcon(icon.code),
    };
  },
};
