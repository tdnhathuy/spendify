import { DTOIcon } from "@/lib/dto/icon.dto";
import { CategoryClass, IconClass } from "@/lib/model";
import { Category } from "@/lib/types";

const fromClass = (
  category: CategoryClass,
  icons: IconClass[] = []
): Category => {
  const icon = icons.find(
    (x) => x._id?.toString() === category.idIcon.toString()
  );

  return {
    id: (category as any)._id.toString(),
    name: category.name,
    type: category.type,
    icon: icon ? DTOIcon.fromIcon(icon) : null,
    children: [],
  };
};

const fromClasses = (
  categories: CategoryClass[],
  icons: IconClass[] = []
): Category[] => {
  const listParent = categories.filter((x) => x.idParent === null);
  const listChildren = categories.filter((x) => x.idParent !== null);

  const list = listParent.map((x) => fromClass(x, icons));

  listChildren.forEach((child) => {
    const idx = list.findIndex(
      (x) => x.id!.toString() === child.idParent?.toString()
    );

    if (idx !== -1) {
      const cate = fromClass(child, icons);
      const { children, ...rest } = cate;
      console.log("children", children);
      list[idx].children?.push(rest);
    }
  });

  return list;
};

export const DTOCategory = {
  fromClass,
  fromClasses,
};
