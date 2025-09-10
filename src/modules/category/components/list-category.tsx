import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { IconPicker } from "@/lib/components";
import { ICategory } from "@/lib/types";
import { PopoverListCategoryItem } from "@/modules/category/components/list-category-item.popover";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { forwardRef } from "react";

type Props = {
  listCategory: ICategory[];
};
export const ListCategory = ({ listCategory = [] }: Props) => {
  return (
    <Accordion type="multiple">
      {listCategory.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        return (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-b-0 py-0"
          >
            <AccordionTrigger className="w-full" disabled={!hasChildren}>
              <WrapperItem category={item}>
                <CategoryItem category={item} />
              </WrapperItem>
            </AccordionTrigger>

            {hasChildren && (
              <AccordionContent>
                <div className="ml-12 flex flex-col gap-2">
                  {item.children?.map((child) => {
                    return (
                      <WrapperItem key={child.id} category={child}>
                        <CategoryItem category={child} />
                      </WrapperItem>
                    );
                  })}
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const WrapperItem = (props: {
  children: React.ReactNode;
  category: ICategory;
}) => {
  const { children, category } = props;
  return (
    <span className="py-2 cursor-default justify-between flex gap-2 rounded-sm px-4 hover:bg-gray-100">
      {children}
      <PopoverListCategoryItem category={category} />
    </span>
  );
};

const CategoryItem = forwardRef<HTMLDivElement, { category: ICategory }>(
  (props: { category: ICategory }, ref: React.Ref<HTMLDivElement>) => {
    const { category } = props;
    return (
      <div ref={ref} className="flex items-center gap-3" {...props}>
        <IconPicker icon={category.icon} disabled size="sm" />
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    );
  }
);

CategoryItem.displayName = "CategoryItem";
