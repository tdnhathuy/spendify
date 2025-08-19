import { HeaderDashboard, ListTrans } from "@/modules/dashboard/components";
import { DashboardNav } from "@/modules/dashboard/components/dashboard.nav";

export const PageDashboard = () => {
  return (
    <div className="flex flex-col relative">
      <DashboardNav />
      <section className="flex flex-1 flex-col gap-4 pt-16 lg:pt-0">
        <HeaderDashboard />
        <ListTrans />
      </section>
    </div>
  );
};
