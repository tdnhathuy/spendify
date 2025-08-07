import { DTOIcon } from "@/lib/dto/icon.dto";
import { DBCategory } from "@/lib/server";
import { ICategory } from "@/lib/types";

const fromDB = (category: DBCategory | null): ICategory | null => {
  if (!category) return null;
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    icon: DTOIcon.fromDB(category.icon),
  };
};

const fromDBs = (categories: DBCategory[]): ICategory[] => {
  const listParent = categories.filter((x) => x.idParent === null);
  const listChild = categories.filter((x) => x.idParent !== null);

  return listParent.map((x) => ({
    id: x.id,
    name: x.name,
    type: x.type,
    icon: DTOIcon.fromDB(x.icon),
    children: listChild
      .filter((y) => y.idParent === x.id)
      .map((x) => ({
        id: x.id,
        name: x.name,
        type: x.type,
        icon: DTOIcon.fromDB(x.icon),
      })),
  }));
};

export const DTOCategory = {
  fromDB,
  fromDBs,
};
