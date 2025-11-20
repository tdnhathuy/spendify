import { Form } from "@/components/ui/form";
import { Sheet } from "@/components/ui/sheet";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { ListChildItem } from "@/lib/components/sheets/category-detail/components/list-children";
import { FooterCategoryDetail } from "@/lib/components/sheets/category-detail/footer";
import {
  resolverCategoryDetail as resolver,
  schemaCategoryDetail,
  TypeSchemaCategoryDetail,
} from "@/lib/components/sheets/category-detail/schema";
import { useSheet } from "@/lib/components/sheets/sheet.store";
import { WiseInput } from "@/lib/components/wise/input/wise-input";
import { WiseSheetContent } from "@/lib/components/wise/wise-sheet-content";
import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";

export const SheetCategoryDetail = () => {
  const { sheetProps, data } = useSheet("category-detail");

  const form = useForm<TypeSchemaCategoryDetail>({ resolver });

  useDidUpdate(() => {
    if (sheetProps.open && !!data) {
      const payload = schemaCategoryDetail.safeParse(data);
      form.reset(payload.data);
    }
  }, [sheetProps.open, data]);

  return (
    <Form {...form}>
      <Sheet {...sheetProps}>
        <WiseSheetContent
          title={"Category Details"}
          className="p-8 gap-4"
          footer={<FooterCategoryDetail />}
        >
          <div className="bg-foreground -mx-8 p-4 flex items-center gap-4">
            <IconPicker
              size={60}
              icon={form.watch("icon")}
              onChange={(icon) =>
                form.setValue("icon", icon, { shouldDirty: true })
              }
            />

            <WiseInput type="text" {...form.register("name")} />
          </div>

          <ListChildItem />
        </WiseSheetContent>
      </Sheet>
    </Form>
  );
};
