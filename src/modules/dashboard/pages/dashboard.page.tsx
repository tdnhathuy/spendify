import { HeaderDashboard, ListTrans } from "@/modules/dashboard/components";
import { DashboardTabBar } from "@/modules/dashboard/components/dashboard.nav";

export const PageDashboard = () => {
  return (
    <section className="flex flex-1 flex-col gap-4 pb-24">
      <HeaderDashboard />
      <ListTrans />
      <DashboardTabBar />
    </section>
  );
};
