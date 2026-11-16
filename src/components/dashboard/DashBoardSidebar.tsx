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
  Home,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Role, DashboardMenuItem } from "@/types";
import { ROUTES } from "@/constants/routes";

// Role-based menu configuration
const menuItemByRole: Record<Role, DashboardMenuItem[]> = {
  // Seeker Menu
  seeker: [
    { name: "Dashboard", url: ROUTES.DASHBOARD.JOB_SEEKER, icon: LayoutDashboard },
    { name: "Jobs", url: ROUTES.BROWSE_JOBS, icon: Briefcase },
    { name: "Saved Jobs", url: ROUTES.DASHBOARD.JOB_SEEKER_SAVED, icon: Bookmark },
    { name: "Applications", url: ROUTES.DASHBOARD.JOB_SEEKER_APPLICATIONS, icon: FileText },
    { name: "Billing", url: ROUTES.DASHBOARD.JOB_SEEKER_BILLING, icon: CreditCard },
    { name: "Settings", url: ROUTES.DASHBOARD.JOB_SEEKER_SETTINGS, icon: Settings },
  ],
  // Recruiter Menu
  recruiter: [
    { name: "Dashboard", url: ROUTES.DASHBOARD.RECRUITER, icon: LayoutDashboard },
    { name: "Add Jobs", url: ROUTES.DASHBOARD.RECRUITER_NEW_JOB, icon: PlusCircle },
    { name: "Manage Jobs", url: ROUTES.DASHBOARD.RECRUITER_JOBS, icon: Briefcase },
    { name: "Settings", url: ROUTES.DASHBOARD.RECRUITER_SETTINGS, icon: Settings },
  ],
  // Admin Menu
  admin: [
    { name: "Dashboard", url: ROUTES.DASHBOARD.ADMIN, icon: LayoutDashboard },
    { name: "Users", url: ROUTES.DASHBOARD.ADMIN_USERS, icon: Users },
    { name: "Companies", url: ROUTES.DASHBOARD.ADMIN_COMPANIES, icon: Building2 },
    { name: "Jobs", url: ROUTES.DASHBOARD.ADMIN_JOBS, icon: Briefcase },
    { name: "Payments", url: ROUTES.DASHBOARD.ADMIN_PAYMENTS, icon: CreditCard },
    { name: "Settings", url: ROUTES.DASHBOARD.ADMIN_SETTINGS, icon: Settings },
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

  const isDark = role === "seeker" || role === "admin";
  const menuItems = menuItemByRole[role];

  const userName =
    session?.user?.name ||
    (role === "admin" ? "Admin" : role === "recruiter" ? "Recruiter" : "Job Seeker");
  const userImage =
    (session?.user as any)?.imageUrl || session?.user?.image || null;

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
        {/* Top Header Row with Logo and explicit Home Link */}
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="inline-flex items-center" title="HireLoop Home">
            <Logo />
          </Link>
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isDark
                ? "text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200"
            }`}
            title="Go to Home Page"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>

        {/* Display User Name and User Role in Header for all three types of users */}
        <div
          className={`mt-3 p-2.5 rounded-xl border flex items-center gap-2.5 ${
            isDark
              ? "bg-[#121624] border-zinc-800/80 text-white"
              : "bg-zinc-50 border-zinc-200/90 text-zinc-900"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border overflow-hidden ${
              isDark
                ? "bg-zinc-800 text-zinc-200 border-zinc-700/60"
                : "bg-zinc-200 text-zinc-700 border-zinc-300"
            }`}
          >
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/images/placeholder-avatar.svg";
                }}
              />
            ) : (
              userName.charAt(0).toUpperCase() || "U"
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p
              className={`text-xs sm:text-sm font-semibold truncate leading-tight ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {userName}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                  role === "admin"
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    : role === "recruiter"
                    ? "bg-[#5C53FE]/10 text-[#5C53FE] border border-[#5C53FE]/20"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                }`}
              >
                {role === "seeker" ? "Job Seeker" : role}
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className={isDark ? "bg-[#0B0E14] px-2" : "bg-white px-2"}>
        {/* Dynamic Navigation Menu Items */}
        <nav className="flex flex-col gap-1 px-2 pt-2">
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
        {/* Seeker Post Resume Button */}
        {role === "seeker" && (
          <Link
            href={ROUTES.DASHBOARD.JOB_SEEKER_RESUME}
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