import { HeaderDashboard } from "@/modules/dashboard/components";
import { ListTrans } from "@/modules/dashboard/components/list-trans/list-trans";

export const PageDashboard = () => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <HeaderDashboard />
      <ListTrans />
    </section>
  );
};
