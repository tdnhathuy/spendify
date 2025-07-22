import { HeaderDashboard, ListTrans } from "@/modules/dashboard/components";

export const PageDashboard = () => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <HeaderDashboard />
      <ListTrans />
    </section>
  );
};
