import { useSheet } from "@/lib/components/sheets/sheet.store";

export const useSheetCategoryDetail = () => {
  const { data } = useSheet("category-detail");

  const isUpdate = !!data;

  return {
    isUpdate,
    title: isUpdate ? "Update Category" : "Create Category",
    titleButton: isUpdate ? "Update" : "Create",
  };
};
