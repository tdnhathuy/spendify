import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/lib/components/sidebar/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex bg-slate-900 flex-1 w-screen h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
