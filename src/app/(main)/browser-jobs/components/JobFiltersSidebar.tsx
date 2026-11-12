"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { JOB_TYPES, CATEGORIES } from "@/constants/jobs";

const JOB_TYPE_FILTERS = JOB_TYPES.map((type) => ({
  label: type,
  value: type,
}));

const WORKPLACE_FILTERS = [
  { label: "Remote", value: "true" },
  { label: "On-site", value: "false" },
];

const CATEGORY_FILTERS = CATEGORIES.map((cat) => ({
  label: cat,
  value: cat,
}));

export function JobFiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current filter values directly from URL searchParams
  const currentType = searchParams.get("jobType");
  const currentIsRemote = searchParams.get("isRemote");
  const currentCategory = searchParams.get("category");

  // Reusable helper to update query param in URL while preserving other filters/search
  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Single-select toggle: if already active, clicking again removes it
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    router.push(queryString ? `/browser-jobs?${queryString}` : "/browser-jobs");
  };

  // Clear all filters while keeping search term (if any)
  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("jobType");
    params.delete("isRemote");
    params.delete("category");

    const queryString = params.toString();
    router.push(queryString ? `/browser-jobs?${queryString}` : "/browser-jobs");
  };

  const hasAnyFilter = Boolean(currentType || currentIsRemote !== null || currentCategory);

  return (
    <aside className="w-full lg:w-64 shrink-0 rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 p-5 space-y-6 shadow-xl backdrop-blur-sm">
      {/* Title & Clear All */}
      <div className="flex items-center justify-between pb-1 border-b border-zinc-800/60">
        <h2 className="text-base font-bold text-white tracking-tight">
          Filters
        </h2>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* 1. Job Type Section (Single selection) */}
      <FilterGroup title="Job Type">
        {JOB_TYPE_FILTERS.map((item) => (
          <FilterCheckboxItem
            key={item.value}
            label={item.label}
            checked={currentType === item.value}
            onChange={() => updateQueryParam("jobType", item.value)}
          />
        ))}
      </FilterGroup>

      {/* 2. Workplace Section */}
      <FilterGroup title="Workplace">
        {WORKPLACE_FILTERS.map((item) => (
          <FilterCheckboxItem
            key={item.value}
            label={item.label}
            checked={currentIsRemote === item.value}
            onChange={() => updateQueryParam("isRemote", item.value)}
          />
        ))}
      </FilterGroup>

      {/* 3. Category Section (Single selection) */}
      <FilterGroup title="Category">
        {CATEGORY_FILTERS.map((item) => (
          <FilterCheckboxItem
            key={item.value}
            label={item.label}
            checked={currentCategory === item.value}
            onChange={() => updateQueryParam("category", item.value)}
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

// Reusable Filter Group Wrapper
function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

// Reusable Checkbox Item
function FilterCheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      className="flex items-center justify-between group cursor-pointer select-none text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors py-0.5"
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-all ${
            checked
              ? "bg-white text-zinc-950 font-bold shadow-xs"
              : "border border-zinc-700 bg-zinc-900/60 group-hover:border-zinc-500"
          }`}
        >
          {checked && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
        <span className={checked ? "text-white font-medium" : "text-zinc-300"}>
          {label}
        </span>
      </div>
    </div>
  );
}

