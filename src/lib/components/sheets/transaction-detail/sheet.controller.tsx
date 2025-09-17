import { dialogs } from "@/lib/components/dialogs";
import { sheets } from "@/lib/components/sheets/sheet.store";
import {
  resolverTransactionDetail as resolver,
  TypeSchemaTransactionDetail,
} from "@/lib/components/sheets/transaction-detail/schema";
import { ICategory, IWallet } from "@/lib/types";
import { useForm } from "react-hook-form";

const convertCategory = (
  params: ICategory
): TypeSchemaTransactionDetail["category"] => {
  return {
    icon: params.icon,
    name: params.name,
    id: params.id,
  };
};

const convertWallet = (
  params: IWallet
): TypeSchemaTransactionDetail["wallet"] => {
  return {
    icon: params.icon,
    name: params.name,
    id: params.id,
  };
};

export const useSheetTransactionDetail = () => {
  const { data } = sheets.useSheet("transaction-detail");

  const form = useForm<TypeSchemaTransactionDetail>({ resolver });

  const onClickCategory = () => {
    dialogs.open("assign-category", {
      ...data!,
      onSelectCategory: (category) => {
        dialogs.close("assign-category");
        form.setValue("category", convertCategory(category));
      },
    });
  };

  const onClickWallet = () => {
    dialogs.open("assign-wallet", {
      ...data!,
      onSelectWallet: (wallet) => {
        dialogs.close("assign-wallet");
        form.setValue("wallet", convertWallet(wallet));
      },
    });
  };

  return {
    form,
    actions: { onClickCategory, onClickWallet },
  };
};
