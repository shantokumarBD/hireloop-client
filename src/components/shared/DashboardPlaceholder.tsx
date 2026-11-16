import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Clock, CheckCircle2 } from "lucide-react";

interface DashboardPlaceholderProps {
  title: string;
  subtitle: string;
  badge?: string;
  features?: string[];
  backHref: string;
  backLabel?: string;
  isDark?: boolean;
}

export function DashboardPlaceholder({
  title,
  subtitle,
  badge = "Feature In Development",
  features = [],
  backHref,
  backLabel = "Back to Dashboard",
  isDark = true,
}: DashboardPlaceholderProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <Link
        href={backHref}
        className={`inline-flex items-center gap-2 text-xs font-medium transition-colors ${
          isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-zinc-950"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{backLabel}</span>
      </Link>

      <div
        className={`rounded-2xl border p-8 sm:p-12 text-center space-y-6 shadow-xl ${
          isDark
            ? "bg-[#0B0C10] border-zinc-800/80 text-white"
            : "bg-white border-zinc-200 text-zinc-900"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C53FE]/10 border border-[#5C53FE]/20 text-[#5C53FE] text-xs font-semibold mx-auto">
          <Sparkles className="w-4 h-4" />
          <span>{badge}</span>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {title}
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
            {subtitle}
          </p>
        </div>

        {features.length > 0 && (
          <div
            className={`max-w-md mx-auto text-left rounded-xl p-5 border ${
              isDark
                ? "bg-zinc-900/50 border-zinc-800 text-zinc-300"
                : "bg-zinc-50 border-zinc-200 text-zinc-700"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3 text-zinc-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Upcoming Capabilities</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5C53FE] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2">
          <Link
            href={backHref}
            className="inline-flex items-center justify-center px-6 h-11 rounded-xl bg-[#5C53FE] hover:bg-[#4E44FE] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(92,83,254,0.3)]"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
