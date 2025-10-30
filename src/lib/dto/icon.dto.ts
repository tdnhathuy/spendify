import { convertIdFlatIcon, isNotNull } from "@/lib/helpers";
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

const fromDBs = (icons: DBIcon[]): IIcon[] => {
  const result = icons.map(DTOIcon.fromDB).filter(isNotNull);
  return result;
};

export const DTOIcon = {
  fromDB,
  fromDBs,
};
