import { DashBoardSidebar } from "@/app/components/DashBoardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#FAFAFA] text-zinc-900">
      <DashBoardSidebar />
      <main className="flex-1 min-h-screen bg-[#FAFAFA] text-zinc-900 p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <SidebarTrigger className="text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
