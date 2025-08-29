import { convertIdFlatIcon } from "@/lib/helpers/func.helper";
import { DBIcon } from "@/lib/server";
import { IIcon } from "@/lib/types";

export type ObjectIcon = { id: string; code: string } | null;

const fromDB = (icon: DBIcon | null): IIcon | null => {
  if (!icon) return null;

  if (icon.code) {
    return {
      ...icon,
      url: convertIdFlatIcon(icon.code),
    };
  }

  return icon;
};

export const DTOIcon = {
  fromDB,
};
