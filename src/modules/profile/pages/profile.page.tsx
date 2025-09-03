"use client";
import { useMutateSetup } from "@/lib/api/app.mutate";
import { useQueryCategory } from "@/lib/api/app.query";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ServiceUser } from "@/lib/services/user.service";

export const PageProfile = () => {
  const { mutateAsync: setup } = useMutateSetup();
  const { data: categories } = useQueryCategory();

  return (
    <div>
      <WiseButton onClick={() => setup()}>Setup profile</WiseButton>
      <WiseButton onClick={() => ServiceUser.getInfo()}>Get profile</WiseButton>
    </div>
  );
};
