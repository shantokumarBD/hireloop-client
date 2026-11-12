"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSession, signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  LogOut,
  PlusCircle,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Role, DashboardMenuItem } from "@/Types";

// Role-based menu configuration
const menuItemByRole: Record<Role, DashboardMenuItem[]> = {
  // Seeker Menu
  seeker: [
    { name: "Dashboard", url: "/dashboard/job-seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/job-seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/job-seeker/saved", icon: Bookmark },
    { name: "Applications", url: "/dashboard/job-seeker/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/job-seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/job-seeker/settings", icon: Settings },
  ],
  // Recruiter Menu
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Add Jobs", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  // Admin Menu
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

export function DashBoardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // Role detection from URL and session fallback
  const role: Role =
    pathname.includes("recruiter") ? "recruiter" :
    pathname.includes("admin") ? "admin" :
    pathname.includes("job-seeker") ? "seeker" :
    (session?.user?.role as Role) || "seeker";

  const isDark = role === "seeker";
  const menuItems = menuItemByRole[role];

  // Find best matching active menu item for current pathname
  const activeItem = menuItems
    .filter((item) => pathname === item.url || pathname.startsWith(item.url + "/"))
    .sort((a, b) => b.url.length - a.url.length)[0];

  return (
    <Sidebar
      className={
        isDark
          ? "border-r border-zinc-800/80 bg-[#0B0E14] text-zinc-100 select-none"
          : "border-r border-zinc-200 bg-white text-zinc-900 select-none"
      }
    >
      {/* Sidebar Header */}
      <SidebarHeader className={isDark ? "p-4 bg-[#0B0E14]" : "p-4 bg-white"}>
        <Logo />
        {/* Admin Console subtitle */}
        {role === "admin" && (
          <p className="text-xs text-zinc-500 font-medium -mt-2 px-1">
            Admin Console
          </p>
        )}
      </SidebarHeader>

      <SidebarContent className={isDark ? "bg-[#0B0E14] px-2" : "bg-white px-2"}>
        {/* Recruiter Top Profile Card */}
        {role === "recruiter" && (
          <div className="mx-2 mb-4 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 font-bold text-sm flex items-center justify-center shrink-0">
              {session?.user?.name?.charAt(0).toUpperCase() || "R"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate leading-tight">
                {session?.user?.name || "Recruiter"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-zinc-500 font-medium">Recruiter</span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-[#5C53FE]/10 text-[#5C53FE] border border-[#5C53FE]/20">
                  Premium account
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Seeker Top Profile Card */}
        {role === "seeker" && (
          <div className="mx-2 mb-4 p-3 rounded-2xl bg-[#121624] border border-zinc-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-200 font-bold text-sm flex items-center justify-center shrink-0 border border-zinc-700/60 overflow-hidden">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                session?.user?.name?.charAt(0).toUpperCase() || "S"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">
                Seeker Portal
              </p>
              <p className="text-xs text-zinc-400 font-medium truncate mt-0.5">
                Professional Tier
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Navigation Menu Items */}
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const isActive = activeItem?.url === item.url;

            return (
              <Link
                key={item.name}
                href={item.url}
                className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? isDark
                      ? "bg-[#161C2C] text-white font-semibold"
                      : "bg-zinc-100 text-zinc-950 font-semibold"
                    : isDark
                    ? "text-zinc-400 hover:bg-[#161C2C]/50 hover:text-white"
                    : "text-zinc-600 hover:bg-zinc-100/90 hover:text-zinc-950"
                }`}
              >
                {isActive && (
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[#5C53FE]" />
                )}

                <item.icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? isDark
                        ? "text-white"
                        : "text-zinc-950"
                      : isDark
                      ? "text-zinc-400 group-hover:text-white"
                      : "text-zinc-500 group-hover:text-zinc-950"
                  }`}
                />

                <span
                  className={`truncate transition-colors ${
                    isActive
                      ? isDark
                        ? "text-white font-semibold"
                        : "text-zinc-950 font-semibold"
                      : isDark
                      ? "text-zinc-400 group-hover:text-white"
                      : "text-zinc-700 group-hover:text-zinc-950"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter
        className={
          isDark
            ? "p-4 border-t border-zinc-800/80 bg-[#0B0E14] flex flex-col gap-3"
            : "p-4 border-t border-zinc-200/80 bg-white flex flex-col gap-3"
        }
      >
        {/* Admin Bottom Profile Card */}
        {role === "admin" && (
          <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/90 flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-full bg-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center shrink-0">
              {session?.user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-900 truncate">
                {session?.user?.name || "Alex Rivera"}
              </p>
              <p className="text-[11px] text-zinc-500 truncate">Super Admin</p>
            </div>
          </div>
        )}

        {/* Seeker Post Resume Button */}
        {role === "seeker" && (
          <Link
            href="/dashboard/job-seeker/resume"
            className="w-full h-11 rounded-xl bg-white hover:bg-zinc-100 active:bg-zinc-200 text-zinc-950 text-sm font-semibold flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            Post Resume
          </Link>
        )}

        {/* Logout Button */}
        <button
          type="button"
          onClick={() =>
            signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.replace("/sign-in");
                  router.refresh();
                },
              },
            })
          }
          className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer group ${
            isDark
              ? "text-zinc-400 hover:text-red-400 hover:bg-zinc-800/40"
              : "text-zinc-600 hover:text-red-600 hover:bg-red-50/80"
          }`}
        >
          <LogOut
            className={`w-4 h-4 shrink-0 transition-colors ${
              isDark
                ? "text-zinc-400 group-hover:text-red-400"
                : "text-zinc-500 group-hover:text-red-600"
            }`}
          />
          <span
            className={`transition-colors ${
              isDark
                ? "text-zinc-400 group-hover:text-red-400"
                : "text-zinc-600 group-hover:text-red-600"
            }`}
          >
            Logout
          </span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}