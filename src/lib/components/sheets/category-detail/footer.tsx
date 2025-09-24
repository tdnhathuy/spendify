import { useSheetCategoryDetail } from "@/lib/components/sheets/category-detail/hook";
import { TypeSchemaCategoryDetail } from "@/lib/components/sheets/category-detail/schema";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { useFormContext } from "react-hook-form";

export const FooterCategoryDetail = () => {
  const form = useFormContext<TypeSchemaCategoryDetail>();

  const { titleButton } = useSheetCategoryDetail();
  return (
    <>
      <WiseButton className="w-24" variant={"default"}>
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
