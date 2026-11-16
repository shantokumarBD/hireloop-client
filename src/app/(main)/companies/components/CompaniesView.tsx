"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

export interface RealCompany {
  name: string;
  logo: string;
  category: string;
  location: string;
  openRoles: number;
}

interface CompaniesViewProps {
  initialCompanies: RealCompany[];
}

export function CompaniesView({ initialCompanies }: CompaniesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract unique categories from real companies
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialCompanies.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialCompanies]);

  // Filter companies based on search and selected category
  const filteredCompanies = useMemo(() => {
    return initialCompanies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || company.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialCompanies, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#07090e] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C53FE]/10 border border-[#5C53FE]/20 text-[#5C53FE] text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Active Employers Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Explore Leading Companies Hiring on HireLoop
          </h1>

          <p className="text-sm sm:text-base text-zinc-400">
            Discover verified companies actively publishing openings across engineering,
            design, finance, and marketing.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name, category, or location..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-[#0B0C10] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5C53FE] transition-colors shadow-lg"
            />
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                      active
                        ? "bg-[#5C53FE] border-[#5C53FE] text-white font-medium shadow-[0_0_15px_rgba(92,83,254,0.4)]"
                        : "bg-[#0E0F14] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Real Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.name}
                className="rounded-2xl bg-[#0B0C10] border border-white/10 p-6 flex flex-col justify-between hover:border-[#5C53FE]/50 transition-all group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Top: Avatar & Roles Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      {company.logo ? (
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center shrink-0 overflow-hidden relative">
                          <Image
                            src={company.logo}
                            alt={company.name}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5C53FE] to-[#3B32D6] flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                          {company.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#5C53FE] transition-colors truncate max-w-[180px]">
                            {company.name}
                          </h2>
                          <CheckCircle2 className="w-4 h-4 text-[#5C53FE] shrink-0" />
                        </div>
                        <span className="text-xs text-zinc-400 font-medium">
                          {company.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                      {company.openRoles} {company.openRoles === 1 ? "Role" : "Roles"}
                    </span>
                  </div>

                  {/* Meta details: Location */}
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{company.location}</span>
                  </div>
                </div>

                {/* Bottom Action: View Jobs */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href={`${ROUTES.BROWSE_JOBS}?search=${encodeURIComponent(company.name)}`}
                    className="w-full h-10 rounded-xl bg-white/5 hover:bg-[#5C53FE] border border-white/10 hover:border-[#5C53FE] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_0_15px_rgba(92,83,254,0.3)]"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>View Open Positions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <Building2 className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-semibold text-white">
              No companies found
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {searchQuery
                ? `No companies match your search "${searchQuery}".`
                : "No active companies currently have job listings."}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs text-[#5C53FE] hover:underline cursor-pointer pt-2 inline-block"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
