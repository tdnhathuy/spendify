import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const DashboardNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background px-2 pt-2 border-b h-16 lg:hidden flex  justify-between ">
      <div className="font-semibold">Dashboard</div>

      <WiseButton className="h-6 text-xs" variant={"outline"} size={"sm"}>
        Create
      </WiseButton>
    </nav>
  );
};
