"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";
import { ChevronDown, Shield, Briefcase, User, MoreVertical } from "lucide-react";

export interface AdminUserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
  status?: string;
  createdAt?: string | Date;
}

interface AdminUsersTableProps {
  users: AdminUserItem[];
  onRoleChange: (userId: string, newRole: "admin" | "recruiter" | "seeker") => void;
  onStatusToggle: (userId: string, newStatus: "Active" | "Suspended") => void;
  onDeleteUser?: (userId: string) => void;
}

export function AdminUsersTable({
  users,
  onRoleChange,
  onStatusToggle,
  onDeleteUser,
}: AdminUsersTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[950px] text-left">
        <TableHeader className="bg-transparent border-b border-[#1E2333]">
          <TableRow className="border-[#1E2333] hover:bg-transparent">
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[240px]">
              User Name
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[240px]">
              Email Address
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[140px]">
              Role
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[140px]">
              Join Date
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[130px]">
              Status
            </TableHead>
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 text-right w-[200px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-[#1A1F2E]">
          {users.map((user) => {
            const role = (user.role || "seeker").toLowerCase();
            const isSuspended = (user.status || "Active").toLowerCase() === "suspended";

            // Format join date
            const joinDate = user.createdAt
              ? (() => {
                  try {
                    return format(new Date(user.createdAt), "MMM dd, yyyy");
                  } catch {
                    return "Recently";
                  }
                })()
              : "Recently";

            // Initials avatar fallback
            const initials = user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : "U";

            // Next role suggestion for quick toggle button (like in Figma)
            const quickNextRole: "admin" | "recruiter" | "seeker" =
              role === "seeker" ? "recruiter" : role === "recruiter" ? "seeker" : "recruiter";
            const quickActionLabel =
              role === "seeker"
                ? "Make Recruiter"
                : role === "recruiter"
                ? "Make Seeker"
                : "Make Seeker";

            return (
              <TableRow
                key={user._id}
                className="border-[#1A1F2E] hover:bg-[#161B2B]/60 transition-colors group"
              >
                {/* 1. User Name & Avatar */}
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A1F2E] text-zinc-200 border border-zinc-700/60 flex items-center justify-center font-semibold text-xs shrink-0 overflow-hidden shadow-xs">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-white group-hover:text-zinc-200 transition-colors truncate">
                      {user.name}
                    </span>
                  </div>
                </TableCell>

                {/* 2. Email Address */}
                <TableCell className="py-4 px-4 text-sm text-zinc-400">
                  <span className="truncate">{user.email}</span>
                </TableCell>

                {/* 3. Role Badge */}
                <TableCell className="py-4 px-4">
                  <UserRoleBadge role={user.role} />
                </TableCell>

                {/* 4. Join Date */}
                <TableCell className="py-4 px-4 text-sm text-zinc-400">
                  {joinDate}
                </TableCell>

                {/* 5. Status Badge */}
                <TableCell className="py-4 px-4">
                  <UserStatusBadge status={user.status} />
                </TableCell>

                {/* 6. Actions (Toggleable Role Buttons & Suspend/Activate) */}
                <TableCell className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-3 text-xs font-medium">
                    {/* Primary Role Toggle (Figma Style) */}
                    <button
                      type="button"
                      onClick={() => onRoleChange(user._id, quickNextRole)}
                      className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {quickActionLabel}
                    </button>

                    {/* Role Selector Dropdown (Toggle directly to Admin, Recruiter, or Seeker) */}
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(user._id)}
                        className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-md transition-colors cursor-pointer"
                        title="Change role to Admin, Recruiter, or Seeker"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {openDropdownId === user._id && (
                        <div
                          className="absolute right-0 mt-1 w-36 rounded-xl bg-[#141826] border border-[#232A3E] shadow-xl py-1 z-30 animate-in fade-in zoom-in-95 duration-100"
                          onMouseLeave={() => setOpenDropdownId(null)}
                        >
                          <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                            Set Role To
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              onRoleChange(user._id, "admin");
                              setOpenDropdownId(null);
                            }}
                            className={`w-full px-3 py-1.5 text-xs text-left flex items-center gap-2 hover:bg-[#1E2538] transition-colors cursor-pointer ${
                              role === "admin" ? "text-rose-400 font-semibold" : "text-zinc-300"
                            }`}
                          >
                            <Shield className="w-3.5 h-3.5 text-rose-400" />
                            <span>Admin</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onRoleChange(user._id, "recruiter");
                              setOpenDropdownId(null);
                            }}
                            className={`w-full px-3 py-1.5 text-xs text-left flex items-center gap-2 hover:bg-[#1E2538] transition-colors cursor-pointer ${
                              role === "recruiter" ? "text-[#A594FD] font-semibold" : "text-zinc-300"
                            }`}
                          >
                            <Briefcase className="w-3.5 h-3.5 text-[#A594FD]" />
                            <span>Recruiter</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onRoleChange(user._id, "seeker");
                              setOpenDropdownId(null);
                            }}
                            className={`w-full px-3 py-1.5 text-xs text-left flex items-center gap-2 hover:bg-[#1E2538] transition-colors cursor-pointer ${
                              role === "seeker" ? "text-zinc-100 font-semibold" : "text-zinc-300"
                            }`}
                          >
                            <User className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Seeker</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Status Action (Suspend / Activate) */}
                    {isSuspended ? (
                      <>
                        <button
                          type="button"
                          onClick={() => onStatusToggle(user._id, "Active")}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                        >
                          Activate
                        </button>
                        {onDeleteUser && (
                          <button
                            type="button"
                            onClick={() => onDeleteUser(user._id)}
                            className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onStatusToggle(user._id, "Suspended")}
                        className="text-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
