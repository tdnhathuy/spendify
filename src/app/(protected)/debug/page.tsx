import { ListCategoryDebug } from "@/app/(protected)/debug/list-category";
import { WiseButton } from "@/lib/components";
import { Page } from "@/lib/components/shared/page";
import { prisma } from "@/server";

const importFlatIcon = async () => {
  "use server";

  // await prisma.icon.create({
  //   data: {
  //     source: "System",
  //     iconGlobal: { create: { idFlatIcon: "3762131" } },
  //   },
  // });
};

export default function DebugPage() {
  return (
    <Page title={"Debug"}>
      <WiseButton onClick={importFlatIcon}>Import</WiseButton>
      <ListCategoryDebug />
    </Page>
  );
}
