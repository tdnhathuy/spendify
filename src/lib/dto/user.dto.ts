import { Prisma } from "@/generated/prisma";
import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { UserProfile } from "@/lib/types";

export const userProfileSelect = {
  icons: true,
  categories: true,
  wallets: true,
  id: true,
  name: true,
  email: true,
} as const;

export type UserProfileSelect = Prisma.UserGetPayload<{
  select: typeof userProfileSelect;
}>;

export const DTOUser = {
  fromObject: (obj: UserProfileSelect): UserProfile => {
    return {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      wallets: [],
      icons: obj.icons.map(DTOIcon.fromIcon),
      categories: DTOCategory.fromObjects(obj.categories, obj.icons),
    };
  },
};
