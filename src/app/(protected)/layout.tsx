import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TabBar } from "@/lib/components";
import { AppSidebar } from "@/lib/components/sidebar/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-black gap-0 flex flex-1 ">
      <AppSidebar />
      <Toaster />
      <section className="flex-1 flex overflow-hidden h-dvh justify-center">
        {children}
      </section>
      <TabBar />
    </SidebarProvider>
  );
}
