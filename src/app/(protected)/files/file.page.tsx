import { TableFile } from "@/app/(protected)/files/components/file-table";
import { Textarea } from "@/components/ui/textarea";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const PageFile = () => {
  return (
    <section className="flex flex-col flex-1 gap-2">
      <Textarea className="h-48 resize-none" />
      <WiseButton>
        Fetch Files
      </WiseButton>
      <TableFile />
    </section>
  );
};
