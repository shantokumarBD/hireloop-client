import React from "react";
import { User, Briefcase, ShieldCheck } from "lucide-react";

interface UserRoleBadgeProps {
  role: string;
  className?: string;
}

export function UserRoleBadge({ role, className = "" }: UserRoleBadgeProps) {
  const normalized = (role || "seeker").toLowerCase();

  if (normalized === "recruiter") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#2B2353]/60 text-[#A594FD] border border-[#5C53FE]/30 shadow-xs ${className}`}
      >
        <Briefcase className="w-3.5 h-3.5 text-[#A594FD]" />
        <span>Recruiter</span>
      </span>
    );
  }

  if (normalized === "admin") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-950/40 text-rose-300 border border-rose-500/30 shadow-xs ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
        <span>Admin</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#161B2B] text-zinc-300 border border-zinc-700/60 shadow-xs ${className}`}
    >
      <User className="w-3.5 h-3.5 text-zinc-400" />
      <span>Seeker</span>
    </span>
  );
}
