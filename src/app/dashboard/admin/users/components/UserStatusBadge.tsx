import React from "react";

interface UserStatusBadgeProps {
  status?: string;
  className?: string;
}

export function UserStatusBadge({
  status = "Active",
  className = "",
}: UserStatusBadgeProps) {
  const isSuspended = (status || "").toLowerCase() === "suspended";

  if (isSuspended) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-xs ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
        <span>Suspended</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xs ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
      <span>Active</span>
    </span>
  );
}
