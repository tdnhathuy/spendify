import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconPicker } from "@/lib/components";
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
    const ic = <IconPicker icon={icon} disabled className="size-4" />;
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
    <ul className="flex flex-col p-2 divide-y h-full overflow-y-scroll scrollbar">
      {data.map((parent) => {
        const children = parent.children || [];
        const isNoChildren = !children.length;
        return (
          <Accordion collapsible type="single" key={parent.id}>
            <AccordionItem value={parent.id} className="p-2">
              <div className="flex items-center gap-2 justify-between">
                {renderCategory(parent, true)}

                <AccordionTrigger
                  className=" hover:bg-gray-200 size-7 justify-center items-center flex p-0 m-0"
                  disabled={isNoChildren}
                ></AccordionTrigger>
              </div>

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
