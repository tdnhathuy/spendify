import { useController } from "react-hook-form";
import type { TypeSchemaTransaction } from "@/lib/components/dialogs/transaction/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const InputType = () => {
  const { field } = useController<TypeSchemaTransaction>({ name: "type" });
  const type = field.value;

  return (
    <div className="flex  gap-2">
      <WiseButton
        size="sm"
        className="flex flex-1"
        variant={type === "Expense" ? "default" : "outline"}
        onClick={() => field.onChange("Expense")}
      >
        Expense
      </WiseButton>
      <WiseButton
        size="sm"
        className="flex flex-1"
        variant={type === "Income" ? "default" : "outline"}
        onClick={() => field.onChange("Income")}
      >
        Income
      </WiseButton>
    </div>
  );
};
