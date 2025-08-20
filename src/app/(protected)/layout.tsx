import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/lib/components/sidebar/sidebar";
import { TabBar } from "@/lib/components/tab-bar/tab-bar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col pb-16">
          <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#fbfbfb] p-4 sm:p-6 px-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] pb-[max(16px,env(safe-area-inset-bottom))]">
            <div className="mx-auto w-full max-w-screen-md">{children}</div>
          </main>
        </div>
        <TabBar />
      </div>
    </SidebarProvider>
  );
}
