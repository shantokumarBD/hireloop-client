"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function JobSortDropdown() {
  const [selectedSort, setSelectedSort] = useState("Most Recent");
  const [open, setOpen] = useState(false);

  const options = ["Most Recent", "Highest Salary", "Most Relevant"];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-400">Sort by:</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1118] border border-zinc-800 text-xs text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer"
        >
          <span>{selectedSort}</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl bg-[#0e1118] border border-zinc-800 py-1 shadow-2xl z-20">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSelectedSort(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                  selectedSort === opt
                    ? "bg-[#5C53FE]/20 text-[#5C53FE] font-medium"
                    : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

