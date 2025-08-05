import { Category, Icon } from "@/generated/prisma";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { ICategory } from "@/lib/types";

const fromClass = (category: Category, icons: Icon[] = []): ICategory => {
  const icon = icons.find((x) => x.id === category.idIcon);

  return {
    id: category.id,
    name: category.name,
    type: category.type,
    icon: icon ? DTOIcon.fromIcon(icon) : null,
    children: [],
  };
};

const fromObjects = (categories: Category[], icons: Icon[]) => {
  const allParents = categories.filter((x) => x.idParent === null);
  const allChildren = categories.filter((x) => x.idParent !== null);

  const result: ICategory[] = allParents.map((x) => {
    return { ...fromClass(x, icons) };
  });

  result.forEach((parent) => {
    const listChild = allChildren
      .filter((x) => x.idParent === parent.id)
      .map((x) => fromClass(x, icons));

    for (const child of listChild) delete child.children;

    parent.children = listChild;
  });

  return result;
};

export const DTOCategory = {
  fromClass,
  fromObjects,
};
