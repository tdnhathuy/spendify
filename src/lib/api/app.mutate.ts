import { MutationKeys } from "@/lib/configs";
import { ServiceUser } from "@/lib/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export const useMutateSetup = () => {
  return useMutation({
    mutationKey: [MutationKeys.setupUser],
    mutationFn: async () => {
      const session = await getSession();
      if (!session?.user) {
        throw new Error("User not found");
      }
      return ServiceUser.setup({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
      });
    },
  });
};
