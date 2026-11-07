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
import { UserSession } from "@/Types";

export default function UserDropdown({
  user,
  onSignOut,
}: {
  user: UserSession;
  onSignOut: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <Avatar className="w-9 h-9 border border-white/10 hover:border-[#5E48FF] transition-colors">
          <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
          <AvatarFallback className="bg-[#5E48FF] text-white text-xs font-bold">
            {user.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-[#14151B] border-white/10 text-white rounded-xl shadow-xl"
      >
        <div className="p-2 text-xs">
          <p className="font-bold truncate text-white">{user.name}</p>
          <p className="text-zinc-400 truncate">{user.email}</p>
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