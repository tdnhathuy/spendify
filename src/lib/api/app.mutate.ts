import { keyQueryWalletDetail } from "@/lib/api/app.query";
import { Refetch } from "@/lib/api/app.refech";
import { MutationKeys, queryClient, QueryKeys } from "@/lib/configs";
import {
  deleteQueryTransaction,
  updateQueryTransaction,
} from "@/lib/helpers/query.helper";
import { getCachedSession } from "@/lib/helpers/session.helper";
import { ServiceTrans, ServiceWallet } from "@/lib/services";
import { ServiceConfigSync } from "@/lib/services/config-sync.service";
import { ServiceTransfer } from "@/lib/services/transfer.service";
import { ServiceUser } from "@/lib/services/user.service";
import { IWallet } from "@/lib/types";
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

export const useMutateDeleteWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.deleteWallet],
    mutationFn: ServiceWallet.delete,
    onSuccess: Refetch.wallet,
  });
};

export const useMutateUpdateWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.updateWallet],
    mutationFn: ServiceWallet.update,
    onSuccess: (newWallet: IWallet) => {
      Refetch.wallet();
      queryClient.invalidateQueries({
        queryKey: keyQueryWalletDetail(newWallet.id),
      });
    },
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
    onSuccess: updateQueryTransaction,
  });
};

export const useMutateAssignWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.assignWallet],
    mutationFn: ServiceTrans.assignWallet,
    onSuccess: updateQueryTransaction,
  });
};

export const useMutateDeleteTrans = (idTrans: string) => {
  return useMutation({
    mutationKey: [MutationKeys.deleteTransaction, idTrans],
    mutationFn: ServiceTrans.delete,
    onSuccess: () => deleteQueryTransaction(idTrans),
  });
};

export const useMutateCreateConfigSync = () => {
  return useMutation({
    mutationKey: [MutationKeys.createConfigSync],
    mutationFn: ServiceConfigSync.create,
    onSuccess: Refetch.configSync,
  });
};

export const useMutateCreateTransfer = () => {
  return useMutation({
    mutationKey: [MutationKeys.createTransfer],
    mutationFn: ServiceTransfer.transfer,
  });
};

export const useMutateMarkTransfer = () => {
  return useMutation({
    mutationKey: [MutationKeys.markTransfer],
    mutationFn: ServiceTransfer.markTransfer,
  });
};

export const useMutateUpdateConfigSync = () => {
  return useMutation({
    mutationKey: [MutationKeys.updateConfigSync],
    mutationFn: ServiceConfigSync.update,
    onSuccess: Refetch.configSync,
  });
};
