"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Download,
  Users,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  FileQuestion,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AdminUsersTable, AdminUserItem } from "./AdminUsersTable";
import { updateUserRole } from "@/lib/actions/users";

interface AdminUsersViewProps {
  initialUsers: AdminUserItem[];
}

export function AdminUsersView({ initialUsers }: AdminUsersViewProps) {
  const [users, setUsers] = useState<AdminUserItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All Roles");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);

  // Dynamic KPI Stats calculated directly from real database users
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const recruiters = users.filter(
      (u) => (u.role || "").toLowerCase() === "recruiter"
    ).length;
    const suspended = users.filter(
      (u) => (u.status || "").toLowerCase() === "suspended"
    ).length;
    const active = users.filter(
      (u) => (u.status || "Active").toLowerCase() === "active"
    ).length;

    // Real signups in the last 24 hours based on createdAt timestamp
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const signupsLast24h = users.filter((u) => {
      if (!u.createdAt) return false;
      const created = new Date(u.createdAt).getTime();
      return !isNaN(created) && now - created <= oneDayMs;
    }).length;

    const suspendedPercent =
      totalUsers > 0 ? ((suspended / totalUsers) * 100).toFixed(1) : "0";

    return {
      activeCount: active.toLocaleString(),
      activeGrowth: `${totalUsers} total registered`,
      recruiterCount: recruiters.toLocaleString(),
      recruiterGrowth: `${recruiters} active recruiters`,
      suspendedCount: suspended.toLocaleString(),
      suspendedRatio: `${suspendedPercent}% of total`,
      newSignups: signupsLast24h.toLocaleString(),
      newSignupsDesc: "Last 24 hours",
    };
  }, [users]);

  // Event handler for toggling / changing role (persisted to database)
  const handleRoleChange = async (
    userId: string,
    newRole: "admin" | "recruiter" | "seeker"
  ) => {
    const previous = [...users];
    const user = users.find((u) => u._id === userId);

    // 1. Optimistic update
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );

    // 2. Persist to MongoDB
    const res = await updateUserRole(userId, newRole);

    if (res?.acknowledged || res?.modifiedCount) {
      toast.add({
        title: "Role Updated",
        description: `${user?.name || "User"} is now set as ${newRole}.`,
      });
    } else {
      setUsers(previous);
      toast.add({
        title: "Update Failed",
        description: "Could not save role to database.",
      });
    }
  };

  // Event handler for toggling status (Active <-> Suspended)
  const handleStatusToggle = (
    userId: string,
    newStatus: "Active" | "Suspended"
  ) => {
    const user = users.find((u) => u._id === userId);

    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, status: newStatus } : u))
    );

    toast.add({
      title: newStatus === "Suspended" ? "User Suspended" : "User Activated",
      description: `${user?.name || "User"} account marked as ${newStatus}.`,
    });
  };

  // Event handler for deleting user
  const handleDeleteUser = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    setUsers((prev) => prev.filter((u) => u._id !== userId));

    toast.add({
      title: "User Removed",
      description: `${user?.name || "User"} removed from active list.`,
    });
  };

  // Export list handler
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Role,Status"]
        .concat(users.map((u) => `"${u.name}","${u.email}","${u.role}","${u.status || "Active"}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hireloop_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.add({
      title: "Export Complete",
      description: `Exported ${users.length} users to CSV.`,
    });
  };

  // Filtered users by search query and role filter
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Role filter
      if (roleFilter !== "All Roles") {
        if ((u.role || "").toLowerCase() !== roleFilter.toLowerCase()) {
          return false;
        }
      }

      // Search query (search by email or name)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const emailMatch = u.email?.toLowerCase().includes(query);
        const nameMatch = u.name?.toLowerCase().includes(query);
        return Boolean(emailMatch || nameMatch);
      }

      return true;
    });
  }, [users, roleFilter, searchQuery]);

  return (
    <div className="space-y-6 text-zinc-100 max-w-[1440px] mx-auto pb-12">
      {/* 1. Top Navbar / Controls (Figma Style) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
        {/* Search by email bar */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-9 h-10 bg-[#121624] border-[#1F2433] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#5C53FE] focus-visible:border-[#5C53FE]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Top Right Utilities: Notifications, Help, Manage Roles */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-[#121624] border border-[#1F2433] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#161B2B] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-xl bg-[#121624] border border-[#1F2433] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#161B2B] transition-colors cursor-pointer"
            title="Help & Documentation"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Manage Roles button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsManageRolesOpen((prev) => !prev)}
              className="h-9 px-3.5 rounded-xl bg-[#121624] border border-[#1F2433] flex items-center gap-2 text-xs font-medium text-zinc-200 hover:text-white hover:bg-[#161B2B] transition-colors cursor-pointer"
            >
              <span>Manage Roles</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isManageRolesOpen && (
              <div
                className="absolute right-0 mt-1.5 w-48 rounded-xl bg-[#141826] border border-[#232A3E] shadow-xl py-1.5 z-30"
                onMouseLeave={() => setIsManageRolesOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Role Permissions
                </div>
                <div className="px-3 py-1 text-xs text-zinc-400">
                  Admin: Full console access
                </div>
                <div className="px-3 py-1 text-xs text-zinc-400">
                  Recruiter: Post & review jobs
                </div>
                <div className="px-3 py-1 text-xs text-zinc-400">
                  Seeker: Apply & profile access
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. User Management Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        {/* Filter by Role & Export List */}
        <div className="flex items-center gap-3">
          {/* All Roles Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleDropdownOpen((prev) => !prev)}
              className="h-10 px-4 rounded-xl bg-[#121624] border border-[#1F2433] flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#161B2B] transition-colors cursor-pointer"
            >
              <span>{roleFilter}</span>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>

            {isRoleDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-40 rounded-xl bg-[#141826] border border-[#232A3E] shadow-xl py-1.5 z-30"
                onMouseLeave={() => setIsRoleDropdownOpen(false)}
              >
                {["All Roles", "Seeker", "Recruiter", "Admin"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setRoleFilter(role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm text-left hover:bg-[#1E2538] transition-colors cursor-pointer ${
                      roleFilter === role ? "text-[#5C53FE] font-semibold" : "text-zinc-300"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export List Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleExport}
            className="h-10 px-4 rounded-xl border-zinc-700/80 bg-transparent text-zinc-200 hover:bg-zinc-800/60 hover:text-white text-xs sm:text-sm font-medium cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
            <span>Export List</span>
          </Button>
        </div>
      </div>

      {/* 3. Four KPI Metric Cards (Figma Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Active Users */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Total Active Users
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.activeCount}
          </p>
          <p className="text-xs font-medium text-emerald-400">
            {stats.activeGrowth}
          </p>
        </div>

        {/* Card 2: Recruiter Growth */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Recruiter Growth
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.recruiterCount}
          </p>
          <p className="text-xs font-medium text-emerald-400">
            {stats.recruiterGrowth}
          </p>
        </div>

        {/* Card 3: Suspended Accounts */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Suspended Accounts
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.suspendedCount}
          </p>
          <p className="text-xs font-medium text-zinc-400">
            {stats.suspendedRatio}
          </p>
        </div>

        {/* Card 4: New Signups (24h) */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            New Signups (24h)
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.newSignups}
          </p>
          <p className="text-xs font-medium text-amber-400">
            {stats.newSignupsDesc}
          </p>
        </div>
      </div>

      {/* 4. Users Table Card */}
      <div className="rounded-2xl border border-[#1E2333] bg-[#111522] shadow-sm overflow-hidden">
        {filteredUsers.length > 0 ? (
          <AdminUsersTable
            users={filteredUsers}
            onRoleChange={handleRoleChange}
            onStatusToggle={handleStatusToggle}
            onDeleteUser={handleDeleteUser}
          />
        ) : (
          <div className="py-20 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 text-zinc-400 flex items-center justify-center mx-auto">
              <FileQuestion className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">
                No users found
              </p>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                No user accounts match your search query or role filter.
              </p>
            </div>
            {(searchQuery || roleFilter !== "All Roles") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setRoleFilter("All Roles");
                }}
                className="mt-2 text-xs rounded-xl border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
