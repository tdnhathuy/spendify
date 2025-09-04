import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAccordionAutoScroll } from "@/lib/components/dialogs/assign-category/components/use-accordion-auto-scroll";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { ICategory } from "@/lib/types";

export const ListCategory = (props: {
  listCategory: ICategory[];
  onSelectCategory: (category: ICategory) => void;
}) => {
  const { listCategory, onSelectCategory } = props;

  const { containerRef, itemRefs } = useAccordionAutoScroll();

  return (
    <ul
      ref={containerRef}
      className="flex flex-1 gap-1 overflow-y-scroll flex-col scrollbar pr-2"
    >
      <Accordion type="multiple">
        {listCategory.map((category) => {
          const hasChildren = category.children && category.children.length > 0;
          return (
            <AccordionItem
              value={category.id}
              key={category.id}
              className="border-b-0"
              data-value={category.id}
              ref={(el) => {
                if (el) itemRefs.current.set(category.id, el);
                else itemRefs.current.delete(category.id);
              }}
            >
              <span className="flex">
                <CategoryItem category={category} onSelect={onSelectCategory} />

                {hasChildren && (
                  <AccordionTrigger
                    className="px-4 hover:bg-gray-100"
                    id={`accordion-trigger-${category.id}`}
                  ></AccordionTrigger>
                )}
              </span>

              {hasChildren && (
                <AccordionContent>
                  <ul className="flex flex-col gap-1 ml-10 mt-1">
                    {category.children?.map((child) => {
                      return (
                        <CategoryItem
                          key={child.id}
                          category={child}
                          onSelect={onSelectCategory}
                        />
                      );
                    })}
                  </ul>
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </ul>
  );
};

const CategoryItem = (props: {
  category: ICategory;
  onSelect: (category: ICategory) => void;
}) => {
  const onClick = () => {
    props.onSelect(props.category);
  };

  return (
    <b
      onClick={onClick}
      className="flex flex-1 items-center gap-2  p-2 px-4 text-sm font-semibold hover:bg-gray-100 rounded-md"
    >
      <IconPicker icon={props.category.icon} disabled size="sm" />
      <span>{props.category.name}</span>
    </b>
  );
};
