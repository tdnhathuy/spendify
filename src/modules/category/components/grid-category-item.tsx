import { WiseIcon } from "@/lib/components/wise/wise-icon";
import { ICategory } from "@/lib/types/app.type";
import { cn } from "@/lib/utils";

type OnSelectCategory = (category: ICategory) => void;
export const GridCategoryItem = (props: {
  category: ICategory;
  onSelectCategory: OnSelectCategory;
}) => {
  const { category, onSelectCategory } = props;
  return (
    <div className="flex  w-[calc(50%-4px)] sm:w-full lg:w-[calc(50%-4px)] bg-background p-3 rounded-sm border flex-col gap-2">
      <Parent category={category} onSelectCategory={onSelectCategory} />

      <div className="w-full self-end  flex-wrap flex gap-[6px] ">
        {category.children?.map((child) => {
          return (
            <Child
              key={child.id}
              category={child}
              onSelectCategory={onSelectCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

const Parent = (props: {
  category: ICategory;
  onSelectCategory: OnSelectCategory;
}) => {
  const { category, onSelectCategory } = props;
  return (
    <button
      role="button"
      className="cursor-pointer flex items-center gap-2"
      onClick={() => onSelectCategory(category)}
    >
      <WiseIcon icon={category.icon} size={40} />
      <span>{category.name}</span>
    </button>
  );
};

const Child = (props: {
  category: ICategory;
  onSelectCategory: OnSelectCategory;
}) => {
  const { category, onSelectCategory } = props;
  return (
    <button
      role="button"
      className={cn(
        "cursor-pointer flex items-center  w-[calc(50%-3px)] border bg-border rounded-xs py-2 flex-col gap-1"
      )}
      onClick={() => onSelectCategory(category)}
    >
      <WiseIcon icon={category.icon} size={26} />
      <span className="text-sm">{category.name}</span>
    </button>
  );
};
