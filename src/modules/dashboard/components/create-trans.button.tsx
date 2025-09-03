"use client";
import { WiseButton } from "@/lib/components";
import { dialogs } from "@/lib/components";

export const ButtonCreateTrans = () => {
  return (
    <WiseButton size={"sm"} onClick={() => dialogs.open("create-trans")}>
      Create
    </WiseButton>
  );
};
