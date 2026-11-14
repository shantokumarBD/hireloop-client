import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12">
      {/* Top Search bar skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="h-10 w-80 bg-[#121624] border border-[#1F2433] rounded-xl animate-pulse" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-[#121624] rounded-xl animate-pulse" />
          <div className="h-9 w-9 bg-[#121624] rounded-xl animate-pulse" />
          <div className="h-9 w-32 bg-[#121624] rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Title skeleton */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="space-y-2">
          <div className="h-8 w-56 bg-[#161B2B] rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-[#121624] rounded-md animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 bg-[#121624] rounded-xl animate-pulse" />
          <div className="h-10 w-28 bg-[#121624] rounded-xl animate-pulse" />
        </div>
      </div>

      {/* 4 Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 bg-[#111522] border border-[#1E2333] rounded-2xl p-5 animate-pulse space-y-2"
          >
            <div className="h-3 w-28 bg-[#181D2D] rounded" />
            <div className="h-7 w-20 bg-[#20273C] rounded" />
            <div className="h-3 w-24 bg-[#181D2D] rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="h-96 rounded-2xl border border-[#1E2333] bg-[#111522] p-16 flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 className="w-6 h-6 animate-spin text-[#5C53FE]" />
        <span className="text-sm font-medium">Loading user management...</span>
      </div>
    </div>
  );
}
