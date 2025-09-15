import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useQueryCategory } from "@/lib/api/app.query";
import {
  dialogs,
  IconPicker,
  useDialog,
  WiseButton,
  WiseDialogContent,
  WisePopoverContent,
  WiseTextInput,
} from "@/lib/components";
import { ICategory } from "@/lib/types";
import {
  resolverCreateCategory as resolver,
  TypeSchemaCreateCategory,
} from "@/modules/category/dialogs/create-category/schema";
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { FooterDialogCreateCategory } from "./footer";
import { useDidUpdate } from "rooks";

export const DialogCreateCategory = () => {
  const { isOpen, data } = useDialog("create-category");

  const { income, expense } = useQueryCategory();

  const form = useForm<TypeSchemaCreateCategory>({ resolver });

  const { category, parent } = form.watch();

  useDidUpdate(() => {
    console.log("data", data);
    console.log("isOpen", isOpen);
    if (isOpen && (!!data || data === null)) {
      console.log("1", 1);
      form.reset(data ?? {});
    }
  }, [data, isOpen]);

  const renderList = (title: string, list: ICategory[]) => {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">{title}</span>
        <ul className="flex flex-col gap-px">
          {list.map(({ id, name, icon: ic }) => {
            const icon = ic ?? undefined;
            return (
              <PopoverInput
                key={id}
                category={{ name, icon }}
                onClick={() => {
                  form.setValue("parent", { name, id, icon });
                }}
              />
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <Form {...form}>
      <Dialog
        open={isOpen}
        onOpenChange={() => dialogs.close("create-category", true)}
      >
        <WiseDialogContent
          title="Create Category"
          footer={<FooterDialogCreateCategory />}
          className="gap-4"
        >
          <div className="flex gap-2">
            <IconPicker
              icon={category?.icon}
              onChange={(icon) => form.setValue("category.icon", icon)}
            />
            <WiseTextInput
              placeholder="Name"
              {...form.register("category.name")}
            />
          </div>

          <Popover modal>
            <PopoverTrigger className="border h-9 rounded-sm flex gap-4  items-center">
              <PopoverInput category={parent} />

              {!!parent && (
                <WiseButton
                  asChild
                  variant={"ghost"}
                  className="mx-2 h-6 px-1"
                  size={"icon"}
                  onClick={(e) => {
                    e.stopPropagation();
                    form.setValue("parent", undefined);
                  }}
                >
                  <span>
                    <X className="size-3" />
                  </span>
                </WiseButton>
              )}
            </PopoverTrigger>

            <WisePopoverContent className="gap-2 flex flex-col h-72 overflow-y-scroll scrollbar">
              {renderList("Expense", expense)}
              {renderList("Income", income)}
            </WisePopoverContent>
          </Popover>
        </WiseDialogContent>
      </Dialog>
    </Form>
  );
};

const PopoverInput = ({
  category,
  onClick,
}: {
  category: TypeSchemaCreateCategory["category"];
  onClick?: () => void;
}) => {
  if (!category) return null;
  return (
    <PopoverClose
      className="flex cursor-pointer items-center gap-2 w-full p-2 px-4 rounded-sm "
      type="button"
      onClick={onClick}
    >
      <IconPicker icon={category?.icon} disabled size="sm" />
      <span>{category?.name}</span>
    </PopoverClose>
  );
};
