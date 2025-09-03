import { convertIdFlatIcon } from "@/lib/helpers";
import { DBIcon } from "@/lib/server";
import { IIcon } from "@/lib/types";

export type ObjectIcon = { id: string; code: string } | null;

const parseIconGlobal = (icon: DBIcon["iconGlobal"]): string => {
  if (icon?.idFlatIcon) return convertIdFlatIcon(icon.idFlatIcon);
  return icon?.url || "";
};

const fromDB = (icon: DBIcon | null): IIcon | null => {
  if (!icon) return null;

  const isSystemIcon = !!icon.iconGlobal?.id;

  return {
    id: icon.id,
    isSystemIcon,
    url: isSystemIcon
      ? parseIconGlobal(icon.iconGlobal)
      : icon.iconUser?.url || "",
  };
};

export const DTOIcon = {
  fromDB,
};
