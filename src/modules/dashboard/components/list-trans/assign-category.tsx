"use client";

import { dialogs } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import type { ITransaction } from "@/lib/types";

type Props = {
  transaction: ITransaction;
};

export const WrapperAssign = (props: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const { children, onClick } = props;
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex hover:bg-gray-200 px-2 p-px rounded items-center gap-1 cursor-pointer"
    >
      {children}
    </span>
  );
};

export const AssignCategory = (props: Props) => {
  const title = props.transaction.category?.name || "No category";

  return (
    <WrapperAssign
      onClick={() => dialogs.open("assign-category", props.transaction)}
    >
      <IconPicker icon={props.transaction.category?.icon} size="xs" disabled />
      <span>{title}</span>
    </WrapperAssign>
  );
};
