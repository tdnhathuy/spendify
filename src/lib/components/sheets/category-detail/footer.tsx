import { useSheetCategoryDetail } from "@/lib/components/sheets/category-detail/hook";
import { TypeSchemaCategoryDetail } from "@/lib/components/sheets/category-detail/schema";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

export const FooterCategoryDetail = () => {
  const form = useFormContext<TypeSchemaCategoryDetail>();

  const isDirty = form.formState.isDirty;

  const { titleButton } = useSheetCategoryDetail();

  const onSubmit: SubmitHandler<TypeSchemaCategoryDetail> = (data) => {
    console.log(data);
  };
  const onError: SubmitErrorHandler<TypeSchemaCategoryDetail> = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <WiseButton
        className="w-24"
        variant={"default"}
        disabled={!isDirty}
        onClick={form.handleSubmit(onSubmit, onError)}
      >
        {titleButton}
      </WiseButton>

      <WiseButton
        onClick={() => sheets.close("category-detail")}
        className="w-24"
        variant={"outline"}
      >
        Cancel
      </WiseButton>
    </>
  );
};
