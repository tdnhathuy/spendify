import { convertIdFlatIcon } from "@/lib/helpers/func.helper";
import { IconClass } from "@/lib/model";
import { Icon } from "@/lib/types";

export const DTOIcon = {
  fromIcon: (icon: IconClass): Icon => {
    return {
      id: (icon as any)._id.toString(),
      code: icon.code,
      url: convertIdFlatIcon(icon.code),
    };
  },
};
