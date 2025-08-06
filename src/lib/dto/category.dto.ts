import { Category, Icon } from "@/generated/prisma";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { RawCategory } from "@/lib/server";
import { ICategory } from "@/lib/types";

const fromObjects = (categories: Category[], icons: Icon[]): ICategory[] => {
  return categories.map((x) => fromObject(x, icons));
};
const fromObject = (category: Category, icons: Icon[]): ICategory => {
  const icon = icons.find((x) => x.id === category.idIcon);

  const result: ICategory = {
    id: category.id,
    name: category.name,
    type: category.type,
    icon: icon ? DTOIcon.fromIcon(icon) : null,
  };

  if (category.idParent) {
    result.idParent = category.idParent;
  }

  return result;
};

export const DTOCategory = {
  fromRawCategory: (category: RawCategory): ICategory | null => {
    if (!category) return null;
    return {
      id: category.id,
      name: category.name,
      type: category.type,
      icon: DTOIcon.fromObject(category.icon),
    };
  },
  fromObject,
  fromObjects,
};
