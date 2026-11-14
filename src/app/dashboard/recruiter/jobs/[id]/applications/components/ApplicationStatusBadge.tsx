import React from "react";
import { ApplicationStatus } from "@/Types";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus | string;
  className?: string;
}

export function ApplicationStatusBadge({
  status,
  className = "",
}: ApplicationStatusBadgeProps) {
  const normalized = (status || "Applied").toLowerCase();

  let colorClasses = "bg-zinc-100 text-zinc-600 border-zinc-200";
  let dotColor = "bg-zinc-400";

  if (normalized === "applied") {
    colorClasses = "bg-blue-50 text-blue-700 border-blue-200";
    dotColor = "bg-blue-500";
  } else if (normalized === "review" || normalized === "reviewing") {
    colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
    dotColor = "bg-amber-500";
  } else if (normalized === "shortlisted") {
    colorClasses = "bg-purple-50 text-purple-700 border-purple-200";
    dotColor = "bg-purple-500";
  } else if (normalized === "interview" || normalized === "interviewing") {
    colorClasses = "bg-indigo-50 text-indigo-700 border-indigo-200";
    dotColor = "bg-indigo-500 animate-pulse";
  } else if (normalized === "offered" || normalized === "hired") {
    colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
    dotColor = "bg-emerald-500";
  } else if (normalized === "rejected") {
    colorClasses = "bg-rose-50 text-rose-700 border-rose-200";
    dotColor = "bg-rose-500";
  }

  // Capitalize for display
  const displayLabel = status ? status.charAt(0).toUpperCase() + status.slice(1) : "Applied";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {displayLabel}
    </span>
  );
}
