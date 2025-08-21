import { IconPicker } from "@/lib/components/shared/icon-picker";
import { ICategory } from "@/lib/types";

export const ListCategory = (props: {
  listCategory: ICategory[];
  onSelectCategory: (category: ICategory) => void;
}) => {
  const { listCategory, onSelectCategory } = props;

  return (
    <ul className="flex flex-1 gap-1 overflow-y-auto flex-col scrollbar ">
      {listCategory.map((category) => {
        const hasChildren = category.children && category.children.length > 0;
        return (
          <span key={category.id}>
            <CategoryItem category={category} onSelect={onSelectCategory} />
            {hasChildren && (
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
            )}
          </span>
        );
      })}
    </ul>
  );
};

const CategoryItem = (props: {
  category: ICategory;
  onSelect: (category: ICategory) => void;
}) => {
  return (
    <b
      onClick={() => {
        props.onSelect(props.category);
      }}
      className="flex items-center gap-2  p-2 px-4 text-sm font-semibold hover:bg-gray-100 rounded-md"
    >
      <IconPicker icon={props.category.icon} disabled />
      <span>{props.category.name}</span>
    </b>
  );
};
