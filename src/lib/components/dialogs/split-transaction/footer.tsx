import { useMutateToasty } from "@/hooks/use-query-toast";
import { useMutateSplitTransaction } from "@/lib/api/app.mutate";
import { dialogs, useDialog } from "@/lib/components";
import { TypeSchemaSplitTransaction } from "@/lib/components/dialogs/split-transaction/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

export const FooterDialogSplitTransaction = (props: {}) => {
  const form = useFormContext<TypeSchemaSplitTransaction>();

  const { data: dialogData } = useDialog("split-transaction");

  const { asyncToast: splitTransaction } = useMutateToasty(
    useMutateSplitTransaction
  );

  const onSubmit: SubmitHandler<TypeSchemaSplitTransaction> = (data) => {
    splitTransaction({
      amount: Number(data.amount),
      idTransaction: dialogData?.idTransaction || "",
      idWallet: data.wallet,
    });
    dialogs.close("split-transaction");
  };

  const onError: SubmitErrorHandler<TypeSchemaSplitTransaction> = (
    errors
  ) => {};

  return (
    <>
      <WiseButton size="sm" className="w-24" variant="outline" type="button">
        Cancel
      </WiseButton>
      <WiseButton
        size="sm"
        className="w-24"
        variant="default"
        onClick={form.handleSubmit(onSubmit, onError)}
      >
        Split
      </WiseButton>
    </>
  );
};
