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
import { useCallback, useMemo, useState } from "react";

export const DialogAssignCategory = () => {
  const { isOpen, data } = useDialog("assign-category");
  const { income, expense } = useQueryCategory();
  const { asyncToast: assignCategory } = useMutateAssignCategory();

  const [mode, setMode] = useState<CategoryType>("Spend");

  const categoryList = useMemo(
    () => (mode === CategoryType.Income ? income : expense),
    [mode, income, expense]
  );

  const handleDialogClose = useCallback(() => {
    dialogs.close("assign-category", true);
  }, []);

  const handleSelectCategory = useCallback(
    (category: ICategory) => {
      if (!data?.id) return;
      dialogs.close("assign-category");
      const idCategory = category.id;
      const idTransaction = data.id;
      assignCategory({ idCategory, idTransaction });
    },
    [data?.id, assignCategory]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <WiseDialogContent
        title="Assign Category"
        footer={<FooterDialogAssignCategory />}
        className="gap-4"
        ctnClassName="h-[70%] -translate-y-[60%] w-92 lg:w-128"
      >
        <ModeSelection mode={mode} setMode={setMode} />

        <GridCategory
          data={categoryList}
          onSelectCategory={handleSelectCategory}
        />
      </WiseDialogContent>
    </Dialog>
  );
};
