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

// ৩টি রোলের হুবহু মেনু আইটেম (ইমেজ অনুযায়ী)
const menuItemByRole: Record<Role, DashboardMenuItem[]> = {
  // Image 3: Seeker Menu
  seeker: [
    { name: "Dashboard", url: "/dashboard/job-seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/job-seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/job-seeker/saved", icon: Bookmark },
    { name: "Applications", url: "/dashboard/job-seeker/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/job-seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/job-seeker/settings", icon: Settings },
  ],
  // Image 2: Recruiter Menu (৪টি আইটেম)
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Add Jobs", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  // Image 1: Admin Menu (Users, Companies, Payments)
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

  // URL ও Session মিলিয়ে নিখুঁত রোল ডিটেকশন
  const role: Role =
    pathname.includes("recruiter") ? "recruiter" :
    pathname.includes("admin") ? "admin" :
    pathname.includes("job-seeker") ? "seeker" :
    (session?.user?.role as Role) || "seeker";

  const menuItems = menuItemByRole[role];

  // বর্তমান pathname-এর সাথে সবচেয়ে নিখুঁত ও সর্বোচ্চ মিলে যাওয়া আইটেমটি সিলেক্ট করা
  const activeItem = menuItems
    .filter((item) => pathname === item.url || pathname.startsWith(item.url + "/"))
    .sort((a, b) => b.url.length - a.url.length)[0];

  return (
    <Sidebar className="border-r border-zinc-200 bg-white text-zinc-900 select-none">
      {/* হেডার অংশ */}
      <SidebarHeader className="p-4 bg-white">
        <Logo />
        {/* Image 1: Admin-এর জন্য লোগোর নিচে 'Admin Console' সাবটাইটেল */}
        {role === "admin" && (
          <p className="text-xs text-zinc-500 font-medium -mt-2 px-1">
            Admin Console
          </p>
        )}
      </SidebarHeader>

      <SidebarContent className="bg-white px-2">
        {/* Image 2: Recruiter Top Profile Card (Premium account badge সহ) */}
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

        {/* Image 3: Seeker Top Profile Card (Seeker Portal + Professional Tier) */}
        {role === "seeker" && (
          <div className="mx-2 mb-4 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 font-bold text-sm flex items-center justify-center shrink-0">
              {session?.user?.name?.charAt(0).toUpperCase() || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate leading-tight">
                Seeker Portal
              </p>
              <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                Professional Tier
              </p>
            </div>
          </div>
        )}

        {/* ডাইনামিক মেনু আইটেমসমূহ */}
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const isActive = activeItem?.url === item.url;

            return (
              <Link
                key={item.name}
                href={item.url}
                className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-100/90 hover:text-zinc-950"
                }`}
              >
                {isActive && (
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-[#5C53FE]" />
                )}

                <item.icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-zinc-950"
                      : "text-zinc-500 group-hover:text-zinc-950"
                  }`}
                />

                <span
                  className={`truncate transition-colors ${
                    isActive
                      ? "text-zinc-950 font-semibold"
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

      {/* ফুটার অংশ */}
      <SidebarFooter className="p-4 border-t border-zinc-200/80 bg-white flex flex-col gap-3">
        {/* Image 1: Admin-এর জন্য বটম প্রোফাইল কার্ড */}
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

        {/* Image 3: শুধুমাত্র Seeker-এর জন্য 'Post Resume' বাটন */}
        {role === "seeker" && (
          <Link
            href="/dashboard/job-seeker/resume"
            className="w-full h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:bg-black text-white text-sm font-semibold flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            Post Resume
          </Link>
        )}

        {/* Logout বাটন (সবার জন্য) */}
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
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:text-red-600 hover:bg-red-50/80 transition-colors cursor-pointer group"
        >
          <LogOut className="w-4 h-4 shrink-0 text-zinc-500 group-hover:text-red-600 transition-colors" />
          <span className="text-zinc-600 group-hover:text-red-600 transition-colors">
            Logout
          </span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}