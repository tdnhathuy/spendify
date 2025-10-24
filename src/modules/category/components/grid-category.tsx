import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconPicker } from "@/lib/components";
import { Icon } from "@/lib/components/shared/icon";
import { WiseTag } from "@/lib/components/wise/wise-tag";
import { ICategory } from "@/lib/types";

type GridCategoryProps = {
  data: ICategory[];
  onSelectCategory?: (category: ICategory) => void;
};
export const GridCategory = (props: GridCategoryProps) => {
  const { data = [], onSelectCategory = () => {} } = props;

  const renderCategory = (category: ICategory, parent = false) => {
    const { icon, name, id } = category;

    const ic = <Icon icon={icon} />;

    return (
      <WiseTag
        key={id}
        icon={ic}
        title={name}
        variant={parent ? "category" : "wallet"}
        className="py-1 px-3"
        onClick={() => onSelectCategory(category)}
      />
    );
  };
  return (
    <ul className="flex flex-col p-2 divide-y h-full overflow-y-auto scrollbar">
      {data.map((parent) => {
        const children = parent.children || [];
        const isNoChildren = !children.length;
        return (
          <Accordion collapsible type="single" key={parent.id}>
            <AccordionItem value={parent.id} className="p-2">
              <AccordionTrigger
                className="hover:no-underline  justify-center items-center flex p-0  m-0"
                hideArrow={isNoChildren}
              >
                <div className="flex items-center gap-2 justify-between w-full">
                  {renderCategory(parent, true)}
                </div>
              </AccordionTrigger>

              <AccordionContent className={isNoChildren ? "hidden" : ""}>
                <div className="flex ml-8 gap-2 flex-wrap mt-2">
                  {children.map((child) => renderCategory(child))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </ul>
  );
};
