import React from "react";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const isPositive = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        isPositive
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-zinc-100 text-zinc-500 border-zinc-200"
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isPositive ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
        }`}
      />
      {status || "Active"}
    </span>
  );
}

