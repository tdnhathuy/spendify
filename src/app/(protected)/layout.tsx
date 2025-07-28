import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/lib/components/sidebar/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex bg-[#fbfbfb] p-4 w-full flex-1">{children}</main>
    </SidebarProvider>
  );
}
