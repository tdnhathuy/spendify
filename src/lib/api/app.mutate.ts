import { keyQueryWalletDetail } from "@/lib/api/app.query";
import { Refetch } from "@/lib/api/app.refetch";
import { MutationKeys, queryClient } from "@/lib/configs";
import { updateQueryTransaction } from "@/lib/helpers/query.helper";
import { getCachedSession } from "@/lib/helpers/session.helper";
import { ServiceCategory, ServiceTrans, ServiceWallet } from "@/lib/services";
import { ServiceConfigSync } from "@/lib/services/config-sync.service";
import { ServiceTransfer } from "@/lib/services/transfer.service";
import { ServiceUser } from "@/lib/services/user.service";
import { IWallet } from "@/lib/types";
import {
  assignCategory,
  createTransaction,
  deleteTransaction,
  toggleNeedSplit,
} from "@/server-action";
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
    mutationFn: createTransaction,
    onSuccess: () => {
      Refetch.trans();
      Refetch.wallet();
    },
  });
};

export const useMutateAssignCategory = () => {
  return useMutation({
    mutationKey: [MutationKeys.assignCategory],
    mutationFn: assignCategory,
  });
};

export const useMutateAssignWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.assignWallet],
    mutationFn: ServiceTrans.assignWallet,
    onSuccess: (trans) => {
      updateQueryTransaction(trans);
      Refetch.wallet();
    },
  });
};

export const useMutateDeleteTrans = (idTrans: string) => {
  return useMutation({
    mutationKey: [MutationKeys.deleteTransaction, idTrans],
    mutationFn: deleteTransaction,
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
    onSuccess: async () => {
      await Refetch.trans();
      await Refetch.wallet();
    },
  });
};

export const useMutateMarkTransfer = () => {
  return useMutation({
    mutationKey: [MutationKeys.markTransfer],
    mutationFn: ServiceTransfer.markTransfer,
    onSuccess: Refetch.trans,
  });
};

export const useMutateUnmarkTransfer = () => {
  return useMutation({
    mutationKey: [MutationKeys.unmarkTransfer],
    mutationFn: ServiceTransfer.unmarkTransfer,
    onSuccess: Refetch.trans,
  });
};

export const useMutateUpdateConfigSync = () => {
  return useMutation({
    mutationKey: [MutationKeys.updateConfigSync],
    mutationFn: ServiceConfigSync.update,
    onSuccess: Refetch.configSync,
  });
};

export const useMutateCreateCategory = () => {
  return useMutation({
    mutationKey: [MutationKeys.createCategory],
    mutationFn: ServiceCategory.create,
    onSuccess: () => {
      Refetch.trans();
      Refetch.category();
    },
  });
};

export const useMutateUpdateCategoryParent = () => {
  return useMutation({
    mutationKey: [MutationKeys.updateCategoryParent],
    mutationFn: ServiceCategory.updateParent,
    onSuccess: () => {
      Refetch.category();
    },
  });
};

export const useMutateSplitTransaction = () => {
  return useMutation({
    mutationKey: [MutationKeys.splitTransaction],
    mutationFn: ServiceTrans.split,
    onSuccess: () => {
      Refetch.trans();
    },
  });
};

export const useMutateToggleNeedSplit = () => {
  return useMutation({
    mutationKey: [MutationKeys.toggleNeedSplit],
    mutationFn: toggleNeedSplit,
    onSuccess: Refetch.trans,
  });
};
