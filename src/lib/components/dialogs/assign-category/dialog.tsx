"use client";

import { Dialog } from "@/components/ui/dialog";
import { CategoryType } from "@/generated/prisma";
import { useMutateAssignCategory } from "@/lib/api/app.mutate";
import { useQueryCategory } from "@/lib/api/app.query";
import { ModeSelection } from "@/lib/components/dialogs/assign-category/components/mode.selection";
import { FooterDialogAssignCategory } from "@/lib/components/dialogs/assign-category/footer";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { ICategory } from "@/lib/types";
import { GridCategory } from "@/modules/category/components/grid-category";
import { useState } from "react";
import { useDidUpdate } from "rooks";

export const DialogAssignCategory = () => {
  const { isOpen, data } = useDialog("assign-category");

  const defaultMode = data?.category?.type || CategoryType.Spend;

  const [mode, setMode] = useState<CategoryType>(defaultMode);

  const { income, expense } = useQueryCategory();

  const listCategory = mode === CategoryType.Income ? income : expense;

  useDidUpdate(() => {
    setMode(data?.category?.type || CategoryType.Spend);
  }, [data]);

  const { asyncToast: assignCategory } = useMutateAssignCategory();

  const onSelectCategory = (category: ICategory) => {
    if (!data?.id) return;
    dialogs.close("assign-category");
    assignCategory({
      idCategory: category.id,
      idTransaction: data?.id,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => dialogs.close("assign-category", true)}
    >
      <WiseDialogContent
        title="Assign Category"
        footer={<FooterDialogAssignCategory />}
        className="gap-4 "
        ctnClassName="h-[70%] -translate-y-[60%] w-92"
      >
        <ModeSelection mode={mode} setMode={setMode} />

        <GridCategory data={listCategory} onSelectCategory={onSelectCategory} />
      </WiseDialogContent>
    </Dialog>
  );
};
