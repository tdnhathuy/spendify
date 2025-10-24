import { convertIdFlatIcon } from "@/lib/helpers";
import { IIcon } from "@/lib/types";
import { DBIcon } from "@/server";

const fromDB = (icon: DBIcon | null): IIcon | null => {
  if (!icon) return null;
  return {
    id: icon.id,
    url: icon.svgUrl || convertIdFlatIcon(icon.idFlatIcon || ""),
    isDefault: icon.isDefault,
  };
};

export const DTOIcon = {
  fromDB,
};
