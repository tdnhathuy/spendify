import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/lib/components/sidebar/sidebar";
import { TabBar } from "@/lib/components/tab-bar/tab-bar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-black gap-0 flex ">
      <AppSidebar />

      <section className="flex-1 flex overflow-hidden h-screen justify-center">{children}</section>
      {/* <TabBar /> */}
    </SidebarProvider>
  );
}
