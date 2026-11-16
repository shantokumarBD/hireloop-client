import React from "react";

interface JobTypeBadgeProps {
  type?: string;
  className?: string;
}

export function JobTypeBadge({
  type = "Full-Time",
  className = "",
}: JobTypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 border border-zinc-200 ${className}`}
    >
      {type}
    </span>
  );
}

