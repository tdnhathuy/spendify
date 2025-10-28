import { useMutateToasty } from "@/hooks/use-query-toast";
import { Refetch } from "@/lib/api/app.refetch";
import { MutationKeys } from "@/lib/configs";
import { updateQueryTransaction } from "@/lib/helpers/query.helper";
import { getCachedSession } from "@/lib/helpers/session.helper";
import { ServiceCategory, ServiceTrans, ServiceWallet } from "@/lib/services";
import { ServiceConfigSync } from "@/lib/services/config-sync.service";
import { ServiceTransfer } from "@/lib/services/transfer.service";
import { ServiceUser } from "@/lib/services/user.service";
import {
  assignCategory,
  assignWallet,
  createTransaction,
  deleteTransaction,
  getWallets,
  toggleNeedSplit,
} from "@/server-action";
import { useMutation } from "@tanstack/react-query";

export const useMutateWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.getWallet],
    mutationFn: getWallets,
  });
};

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
    mutationFn: (idWallet: string) => {
      return Promise.resolve(ServiceWallet.delete(idWallet));
    },
    onSuccess: Refetch.wallet,
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
    mutationFn: assignWallet,
  });
};

export const useMutateDeleteTrans = (idTrans: string) => {
  const mutation = useMutation({
    mutationKey: [MutationKeys.deleteTransaction, idTrans],
    mutationFn: deleteTransaction,
    onSuccess: () => {
      Refetch.trans();
      Refetch.wallet();
    },
  });
  return useMutateToasty(() => mutation, "deleteTransaction");
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
    mutationFn: () => Promise.resolve(true),
    onSuccess: Refetch.trans,
  });
};

export const useMutateUnmarkTransfer = () => {
  return useMutateToasty(() =>
    useMutation({
      mutationKey: [MutationKeys.unmarkTransfer],
      mutationFn: () => Promise.resolve(true),
      onSuccess: Refetch.trans,
    })
  );
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
    mutationFn: () => Promise.resolve(true),
    onSuccess: () => {
      Refetch.trans();
    },
  });
};
export const useMutateUpdateWallet = () => {
  return useMutation({
    mutationKey: [MutationKeys.splitTransaction],
    mutationFn: () => Promise.resolve(true),
    onSuccess: () => {
      Refetch.trans();
    },
  });
};

export const useMutateToggleNeedSplit = () => {
  return useMutateToasty(() =>
    useMutation({
      mutationKey: [MutationKeys.toggleNeedSplit],
      mutationFn: toggleNeedSplit,
      onSuccess: Refetch.trans,
    })
  );
};
