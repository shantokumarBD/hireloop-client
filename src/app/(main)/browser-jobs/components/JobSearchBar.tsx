"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface JobSearchBarProps {
  placeholder?: string;
  defaultValue?: string;
}

export function JobSearchBar({
  placeholder = "Search by job title, keywords...",
  defaultValue = "",
}: JobSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchField = (formData.get("searchField") as string || "").trim();

    const params = new URLSearchParams(searchParams.toString());
    if (searchField) {
      params.set("search", searchField);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    router.push(queryString ? `/browser-jobs?${queryString}` : "/browser-jobs");
  };
  return (
    <div className="w-full rounded-2xl bg-[#0e1118]/90 border border-zinc-800/80 p-2 sm:p-2.5 shadow-xl backdrop-blur-sm">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3"
      >
        <div className="flex-1 flex items-center gap-3 pl-3">
          <Search className="w-5 h-5 text-zinc-500 shrink-0" />
          <input
            key={defaultValue}
            type="text"
            name="searchField"
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder:text-zinc-500 outline-none border-none focus:ring-0"
          />
        </div>

        <Button
          type="submit"
          className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-6 py-2.5 sm:py-3 rounded-xl text-sm transition-all shadow-sm cursor-pointer shrink-0"
        >
          Search Jobs
        </Button>
      </form>
    </div>
  );
}

