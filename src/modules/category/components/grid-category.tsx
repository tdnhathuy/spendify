import { ICategory } from "@/lib/types";
import { GridCategoryItem } from "@/modules/category/components/grid-category-item";

type GridCategoryProps = {
  data: ICategory[];
  onSelectCategory?: (category: ICategory) => void;
};
export const GridCategory = (props: GridCategoryProps) => {
  const { data = [], onSelectCategory = () => {} } = props;

  return (
    <div className="flex flex-wrap gap-[8] overflow-y-auto scrollbar">
      {data.map((parent) => {
        return (
          <GridCategoryItem
            category={parent}
            onSelectCategory={onSelectCategory}
          />
        );
      })}
    </div>
  );
};
