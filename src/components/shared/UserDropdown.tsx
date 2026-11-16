"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut } from "lucide-react";
import { UserSession } from "@/types";

const PLACEHOLDER_AVATAR = "/images/placeholder-avatar.svg";

export default function UserDropdown({
  user,
  onSignOut,
}: {
  user: UserSession;
  onSignOut: () => void;
}) {
  const imageUrl = (user as any)?.imageUrl || user?.image || PLACEHOLDER_AVATAR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <Avatar className="w-9 h-9 border border-white/10 hover:border-[#5E48FF] transition-colors overflow-hidden">
          <AvatarImage
            src={imageUrl}
            alt={user.name || "User"}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="bg-zinc-800 p-0 overflow-hidden">
            <img
              src={PLACEHOLDER_AVATAR}
              alt="Default avatar"
              className="w-full h-full object-cover"
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 bg-[#14151B] border-white/10 text-white rounded-xl shadow-xl p-1"
      >
        <div className="p-2 text-xs flex items-center gap-2.5">
          <img
            src={imageUrl}
            alt={user.name || "User"}
            className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_AVATAR;
            }}
          />
          <div className="min-w-0 flex-1">
            <p className="font-bold truncate text-white">{user.name}</p>
            <p className="text-zinc-400 truncate text-[11px]">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
          <Link href="/dashboard" className="flex items-center gap-2 w-full">
            <LayoutDashboard className="w-4 h-4 text-[#7A68FF]" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={onSignOut}
          className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
        >
          <div className="flex items-center gap-2 w-full">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}