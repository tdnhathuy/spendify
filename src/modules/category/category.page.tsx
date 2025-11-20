"use client";
import { CategoryType } from "@/generated/prisma";
import { useQueryCategory } from "@/lib/api/app.query";
import { dialogs, WiseButton } from "@/lib/components";
import { Page } from "@/lib/components/shared/page";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { ICategory } from "@/lib/types";
import { GridCategory } from "@/modules/category/components/grid-category";
import { OnSelectCategory } from "@/modules/category/components/grid-category-item";
import { useState } from "react";

export const PageCategory = () => {
  const { data: categories = [] } = useQueryCategory();

  const [mode, setMode] = useState<CategoryType>("Spend");

  const listCategory = categories.filter((item) => item.type === mode);

  const onSelectCategory: OnSelectCategory = (
    category: ICategory,
    parent?: ICategory
  ) => {
    sheets.open("category-detail", parent || category);
  };

  return (
    <Page title="Categories" className="gap-4">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <WiseButton
            size={"sm"}
            variant={mode === "Spend" ? "default" : "outline"}
            onClick={() => setMode("Spend")}
          >
            Spend
          </WiseButton>
          <WiseButton
            size={"sm"}
            variant={mode === "Income" ? "default" : "outline"}
            onClick={() => setMode("Income")}
          >
            Income
          </WiseButton>
        </div>

        <WiseButton size={"sm"} onClick={() => dialogs.open("create-category")}>
          Create
        </WiseButton>
      </div>

      <GridCategory data={listCategory} onSelectCategory={onSelectCategory} />
    </Page>
  );
};
