import { CategoryClass } from "@/lib/model";
import { Category } from "@/lib/types";

export const DTOCategory = {
  fromClass: (category: CategoryClass): Category => {
    return {
      id: (category as any)._id.toString(),
      name: category.name,
      type: category.type,
    };
  },
};
