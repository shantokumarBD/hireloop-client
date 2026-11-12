"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DashBoardSidebar } from "@/app/components/DashBoardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isJobSeeker = pathname.includes("/dashboard/job-seeker");

  return (
    <SidebarProvider
      className={isJobSeeker ? "bg-[#07090e] text-zinc-100" : "bg-[#FAFAFA] text-zinc-900"}
    >
      <DashBoardSidebar />
      <main
        className={`flex-1 min-h-screen ${
          isJobSeeker
            ? "bg-[#07090e] text-zinc-100"
            : "bg-[#FAFAFA] text-zinc-900 p-4 md:p-6 lg:p-8"
        }`}
      >
        {!isJobSeeker && (
          <div className="flex items-center gap-3 mb-6">
            <SidebarTrigger className="text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60" />
          </div>
        )}
        {children}
      </main>
    </SidebarProvider>
  );
}
