import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header skeleton */}
      <div className="h-3 w-48 bg-zinc-200 rounded-full animate-pulse" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-zinc-200 rounded-lg animate-pulse" />
          <div className="h-3 w-96 bg-zinc-100 rounded-full animate-pulse" />
        </div>
        <div className="h-9 w-32 bg-zinc-200 rounded-xl animate-pulse" />
      </div>

      {/* Job Card Skeleton */}
      <div className="h-24 w-full bg-zinc-100 rounded-2xl border border-zinc-200 animate-pulse" />

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-20 bg-white rounded-2xl border border-zinc-200 p-4 animate-pulse space-y-2"
          >
            <div className="h-3 w-16 bg-zinc-100 rounded" />
            <div className="h-6 w-10 bg-zinc-200 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="p-16 flex flex-col items-center justify-center gap-3 text-zinc-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#5C53FE]" />
          <span className="text-sm font-medium">Loading applicant pipeline...</span>
        </div>
      </div>
    </div>
  );
}
