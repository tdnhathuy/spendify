import { PayloadCreateCategory } from "@/app/api/category/route";
import { useMutateCreateCategory } from "@/lib/api/app.mutate";
import { dialogs, WiseButton } from "@/lib/components";
import { FieldErrors, useFormContext } from "react-hook-form";
import { TypeSchemaCreateCategory } from "./schema";

export const FooterDialogCreateCategory = () => {
  const { handleSubmit } = useFormContext<TypeSchemaCreateCategory>();

  const { mutateAsync: createCategory } = useMutateCreateCategory();

  const onSubmit = async (data: TypeSchemaCreateCategory) => {
    // const payload: PayloadCreateCategory = {
    //   idIcon: data.category?.icon?.id ?? "",
    //   name: data.category?.name ?? "",
    //   idParent: data.parent?.id ?? undefined,
    //   type: data.parent?.type ?? "Expense",
    // };
    // await createCategory(payload);
  };

  const onError = (errors: FieldErrors<TypeSchemaCreateCategory>) => {
    console.log("errors", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <WiseButton
        variant="outline"
        onClick={() => dialogs.close("create-category")}
      >
        Cancel
      </WiseButton>
      <WiseButton type="submit">Create</WiseButton>
    </form>
  );
};
