import { DebugDND } from "@/app/(protected)/debug/dnd";
import { DebugToasty } from "@/app/(protected)/debug/toasty";
import { Page } from "@/lib/components/shared/page";

export default function DebugPage() {
  return <DebugToasty />;

  return (
    <Page title={"Debug"}>
      <DebugDND />
    </Page>
  );
}
