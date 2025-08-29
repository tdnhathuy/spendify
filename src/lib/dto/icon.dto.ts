import { convertIdFlatIcon } from "@/lib/helpers/func.helper";
import { DBIcon } from "@/lib/server";
import { IIcon } from "@/lib/types";

export type ObjectIcon = { id: string; code: string } | null;

const fromDB = (icon: DBIcon | null): IIcon | null => {
  console.log('icon', icon)
  if (!icon) return null;

  if (icon.code) {
    return {
      id: icon.id,
      code: icon.code,
      url: convertIdFlatIcon(icon.code),
    };
  }

  return {
    id: icon.id,
    code: icon.code,
    url: icon.url,
  };
};

const formPublic = (url: string, code: string): IIcon | null => {
  return {
    id: url,
    code,
    url,
  };
};
export const DTOIcon = {
  fromDB,
  formPublic,
};
