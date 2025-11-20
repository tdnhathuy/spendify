import { IconPicker } from "@/lib/components/shared/icon-picker";
import { TypeSchemaCategoryDetail } from "@/lib/components/sheets/category-detail/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseInput } from "@/lib/components/wise/input/wise-input";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export const ListChildItem = () => {
  const { control, formState, watch, clearErrors, setValue, register } =
    useFormContext<TypeSchemaCategoryDetail>();

  const {
    fields = [],
    remove,
    update,
    append,
  } = useFieldArray<TypeSchemaCategoryDetail>({
    control,
    name: "children",
  });

  const onAddChild = () => {
    append({
      name: "",
      icon: undefined as any,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <WiseButton size={"sm"} className="self-end h-6" onClick={onAddChild}>
        <Plus size={14} />
      </WiseButton>
      <ul className="flex flex-col gap-2">
        {fields.map((child, index) => {
          const isErrorIcon = !!formState.errors.children?.[index]?.icon;
          return (
            <li key={child.id} className="flex items-center gap-4">
              <span
                className={cn(
                  "flex rounded-sm p-2 bg-foreground",
                  isErrorIcon && "border border-red-500"
                )}
              >
                <IconPicker
                  icon={child.icon}
                  size={40}
                  onChange={(icon) => {
                    setValue(`children.${index}.icon`, icon, {
                      shouldValidate: true,
                    });
                  }}
                />
              </span>
              <div className="w-full">
                <WiseInput
                  type="text"
                  {...register(`children.${index}.name`)}
                />
              </div>

              <button
                type="button"
                className="hover:bg-foreground rounded-sm p-2"
                onClick={() => remove(index)}
                aria-label="Remove category"
              >
                <X size={14} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
