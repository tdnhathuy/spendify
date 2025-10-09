"use client";
import { useMutateSetup } from "@/lib/api/app.mutate";
import { useQueryCategory } from "@/lib/api/app.query";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ServiceUser } from "@/lib/services/user.service";
import { setupProfile } from "@/server-action";

export const PageProfile = () => {
  const { mutateAsync: setup } = useMutateSetup();

  return (
    <Page title={"Profile"}>
      <WiseButton onClick={() => setup()}>Setup profile</WiseButton>
      <WiseButton onClick={setupProfile}>Setup profile 2</WiseButton>
      <WiseButton onClick={() => ServiceUser.getInfo()}>Get profile</WiseButton>
    </Page>
  );
};
