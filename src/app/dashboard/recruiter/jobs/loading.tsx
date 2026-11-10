import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header skeleton */}
      <div className="h-3 w-48 bg-zinc-200 rounded-full animate-pulse" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div className="space-y-2">
          <div className="h-8 w-56 bg-zinc-200 rounded-lg animate-pulse" />
          <div className="h-3 w-96 bg-zinc-100 rounded-full animate-pulse" />
        </div>
        <div className="h-9 w-36 bg-zinc-200 rounded-xl animate-pulse" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="p-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#5C53FE]" />
          <span className="text-sm font-medium">Loading job listings...</span>
        </div>
      </div>
    </div>
  );
}

