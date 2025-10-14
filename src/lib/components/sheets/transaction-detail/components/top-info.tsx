import { IconPicker } from "@/lib/components/shared/icon-picker";
import { TypeSchemaTransactionDetail } from "@/lib/components/sheets/transaction-detail/schema";
import { WiseTextArea } from "@/lib/components/wise/wise-text-arena";
import { formatMoney } from "@/lib/helpers";
import { ITransaction } from "@/lib/types";
import { useFormContext } from "react-hook-form";

export const SheetTransactionDetailTopInfo = ({
  transaction,
}: {
  transaction: ITransaction;
}) => {
  const { register } = useFormContext<TypeSchemaTransactionDetail>();

  const { category } = transaction || {};

  return (
    <div className="flex flex-col gap-4 text-white bg-foreground p-4 border-b">
      <span className="flex gap-4 ">
        <span className="flex flex-col gap-2 items-center">
          <span className="bg-white/80 p-2 h-fit w-fit rounded-sm">
            <IconPicker disabled className="size-4" icon={category?.icon} />
          </span>

          {/* <span className="text-sm text-center font-semibold"> */}
          {/* {category?.name} */}
          {/* </span> */}
        </span>

        <span className="text-2xl font-semibold flex-1 items-center  flex ">
          {formatMoney(transaction.amount)}
        </span>
      </span>

      <span className="flex flex-col gap-2">
        <WiseTextArea
          tabIndex={-1}
          className="h-full bg-focus border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Note"
          {...register("note")}
        />
      </span>
    </div>
  );
};
