import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { useQueryCategory } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { FooterCategoryDetail } from "@/lib/components/sheets/category-detail/footer";
import { useSheetCategoryDetail } from "@/lib/components/sheets/category-detail/hook";
import {
  resolverCategoryDetail as resolver,
  TypeSchemaCategoryDetail,
} from "@/lib/components/sheets/category-detail/schema";
import { useSheet } from "@/lib/components/sheets/sheet.store";
import { WiseSheetContent } from "@/lib/components/wise/wise-sheet-content";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { actionGetCategoryDetail } from "@/server/actions/category.action";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";

export const SheetCategoryDetail = () => {
  const { sheetProps, data } = useSheet("category-detail");

  const { title } = useSheetCategoryDetail();

  const form = useForm<TypeSchemaCategoryDetail>({ resolver });

  const idCategory = data?.id || "";

  const {
    data: detail,
    dataUpdatedAt,
    isLoading,
  } = useQuery({
    queryKey: ["get-category-detail", idCategory],
    queryFn: () => actionGetCategoryDetail({ idCategory }),
    enabled: !!data,
  });

  const { data: categories = [] } = useQueryCategory();

  useDidUpdate(async () => {
    if (detail) form.reset(detail);
  }, [detail, dataUpdatedAt]);

  const { category, parent } = form.watch();

  return (
    <Form {...form}>
      <Sheet {...sheetProps}>
        <WiseSheetContent
          title={title}
          loading={isLoading}
          className="p-8 gap-4"
          footer={<FooterCategoryDetail />}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <IconPicker
              icon={category?.icon}
              onChange={(icon) => {
                form.setValue("category.icon", icon);
              }}
            />
            <WiseTextInput {...form.register("category.name")} />
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            <IconPicker disabled icon={parent?.icon} />

            <Select
              onValueChange={(value) => {
                const item = categories.find((item) => item.id === value);
                form.setValue("parent", item);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{parent?.name}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </WiseSheetContent>
      </Sheet>
    </Form>
  );
};
