import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/lib/components/sidebar/sidebar";
import { TabBar } from "@/lib/components/tab-bar/tab-bar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full scrollbar ">
        <AppSidebar />
        {children}
        <TabBar />
      </div>
    </SidebarProvider>
  );
}
