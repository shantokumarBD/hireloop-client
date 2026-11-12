"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface JobPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function JobPagination({
  currentPage: controlledPage,
  totalPages = 1,
  onPageChange,
}: JobPaginationProps) {
  const [internalPage, setInternalPage] = useState(1);
  const activePage = controlledPage ?? internalPage;

  const handlePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setInternalPage(page);
    onPageChange?.(page);
  };

  // Only render pagination when there is more than 1 page
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-6 pb-2">
      {/* Previous Button */}
      <button
        type="button"
        disabled={activePage === 1}
        onClick={() => handlePage(activePage - 1)}
        className="w-8 h-8 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = activePage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePage(page)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
              isActive
                ? "bg-white text-zinc-950 shadow-md"
                : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        disabled={activePage === totalPages}
        onClick={() => handlePage(activePage + 1)}
        className="w-8 h-8 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

