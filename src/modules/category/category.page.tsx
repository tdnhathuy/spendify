"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoryType } from "@/generated/prisma";
import { useQueryCategory } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { Page } from "@/lib/components/shared/page";
import { ICategory } from "@/lib/types";
import { forwardRef, useState } from "react";

export const PageCategory = () => {
  const { data: categories = [] } = useQueryCategory();
  console.log("categories", categories);

  const [mode, setMode] = useState<CategoryType>("Expense");

  const listCategory = categories.filter((item) => item.type === mode);

  return (
    <Page title="Categories">
      PageCategory
      <Accordion type="multiple">
        {listCategory.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          return (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b-0 py-0"
            >
              <AccordionTrigger className="hover:no-underline hover:bg-gray-100 items-center p-0 pr-3">
                <CategoryItem category={item} />
              </AccordionTrigger>

              {hasChildren && (
                <AccordionContent>
                  <div className="ml-12 flex flex-col gap-2">
                    {item.children?.map((child) => {
                      return <CategoryItem key={child.id} category={child} />;
                    })}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Page>
  );
};

const CategoryItem = forwardRef<HTMLDivElement, { category: ICategory }>(
  (props: { category: ICategory }, ref: React.Ref<HTMLDivElement>) => {
    const { category } = props;
    return (
      <div
        ref={ref}
        className="flex rounded-sm hover:bg-gray-100 items-center cursor-pointer gap-3 py-2 px-4"
        {...props}
      >
        <IconPicker icon={category.icon} disabled size="sm" />
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    );
  }
);

CategoryItem.displayName = "CategoryItem";
