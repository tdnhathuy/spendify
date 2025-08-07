"use client";
import { useMutateSetup } from "@/lib/api/app.mutate";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ServiceUser } from "@/lib/services/user.service";

export const PageProfile = () => {
  const { mutateAsync: setup } = useMutateSetup();

  return (
    <div>
      <WiseButton onClick={() => setup()}>Setup profile</WiseButton>
      <WiseButton onClick={() => ServiceUser.getInfo()}>Get profile</WiseButton>
    </div>
  );
};
