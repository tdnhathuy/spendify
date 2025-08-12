import { Refetch } from "@/lib/api/app.refech";
import { MutationKeys } from "@/lib/configs";
import { getCachedSession } from "@/lib/helpers/session.helper";
import { ServiceTrans, ServiceWallet } from "@/lib/services";
import { ServiceUser } from "@/lib/services/user.service";
import { useMutation } from "@tanstack/react-query";

export const useMutateSetup = () => {
  return useMutation({
    mutationKey: [MutationKeys.setupUser],
    mutationFn: async () => {
      const session = await getCachedSession();
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

export const useMutateCreateWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.createWallet],
    mutationFn: ServiceWallet.create,
    onSuccess: Refetch.wallet,
  });
};

export const useMutateUpdateWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.updateWallet],
    mutationFn: ServiceWallet.update,
    onSuccess: Refetch.wallet,
  });
};

export const useMutateCreateTrans = () => {
  return useMutation({
    mutationKey: [MutationKeys.createTransaction],
    mutationFn: ServiceTrans.create,
    onSuccess: Refetch.trans,
  });
};

export const useMutateAssignCategory = () => {
  return useMutation({
    mutationKey: [MutationKeys.assignCategory],
    mutationFn: ServiceTrans.assignCategory,
    onSuccess: Refetch.trans,
  });
};

export const useMutateAssignWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.assignWallet],
    mutationFn: ServiceTrans.assignWallet,
    onSuccess: Refetch.trans,
  });
};
