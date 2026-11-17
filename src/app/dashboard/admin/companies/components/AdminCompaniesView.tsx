"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Building2,
  Download,
  ShieldCheck,
  Briefcase,
  ChevronDown,
  X,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AdminCompaniesTable, AdminCompanyItem } from "./AdminCompaniesTable";

interface AdminCompaniesViewProps {
  initialCompanies: AdminCompanyItem[];
}

export function AdminCompaniesView({
  initialCompanies,
}: AdminCompaniesViewProps) {
  const [companies, setCompanies] =
    useState<AdminCompanyItem[]>(initialCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Dynamic KPI Stats calculated from real companies
  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const verified = companies.filter((c) => c.status === "Verified").length;
    const totalOpenJobs = companies.reduce((acc, c) => acc + c.activeJobs, 0);

    // Find most frequent category
    const categoryCounts: Record<string, number> = {};
    companies.forEach((c) => {
      const cat = c.category || "Technology";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    let topCategory = "General";
    let maxCount = 0;
    Object.entries(categoryCounts).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });

    return {
      total: totalCompanies.toLocaleString(),
      verified: verified.toLocaleString(),
      openJobs: totalOpenJobs.toLocaleString(),
      topCategory,
    };
  }, [companies]);

  // Distinct categories for dropdown
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["All Categories", ...Array.from(set)];
  }, [companies]);

  // Toggle status handler
  const handleStatusToggle = (
    companyId: string,
    newStatus: "Verified" | "Pending"
  ) => {
    const target = companies.find((c) => c.id === companyId);
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, status: newStatus } : c))
    );

    toast.add({
      title:
        newStatus === "Verified" ? "Company Verified" : "Company Set to Pending",
      description: `${target?.name || "Company"} is now marked as ${newStatus}.`,
    });
  };

  // Export list handler
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Company Name,Industry,Location,Open Roles,Recruiter,Status"]
        .concat(
          companies.map(
            (c) =>
              `"${c.name}","${c.category}","${c.location}","${c.activeJobs}","${c.recruiters[0] || ""}","${c.status}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `hireloop_companies_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.add({
      title: "Export Complete",
      description: `Exported ${companies.length} companies to CSV.`,
    });
  };

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      // Status filter
      if (statusFilter !== "All Status") {
        if (c.status.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter !== "All Categories") {
        if (c.category.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = c.name.toLowerCase().includes(query);
        const locMatch = c.location.toLowerCase().includes(query);
        const catMatch = c.category.toLowerCase().includes(query);
        const recruiterMatch = c.recruiters.some((r) =>
          r.toLowerCase().includes(query)
        );
        return nameMatch || locMatch || catMatch || recruiterMatch;
      }

      return true;
    });
  }, [companies, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 text-zinc-100 max-w-[1440px] mx-auto pb-12">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Company Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#5C53FE]/15 text-[#7E77FE] border border-[#5C53FE]/30">
              Admin Console
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Monitor, verify, and audit employer organizations hiring across
            HireLoop.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/recruiter/jobs/new">
            <Button
              type="button"
              className="h-10 px-4 rounded-xl bg-[#5C53FE] hover:bg-[#4E44FE] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post For Company</span>
            </Button>
          </Link>

          <Button
            type="button"
            variant="outline"
            onClick={handleExport}
            className="h-10 px-4 rounded-xl border-zinc-700/80 bg-transparent text-zinc-200 hover:bg-zinc-800/60 hover:text-white text-xs sm:text-sm font-medium cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
            <span>Export List</span>
          </Button>
        </div>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Companies */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Total Companies
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.total}
          </p>
          <p className="text-xs font-medium text-emerald-400">
            Active in database
          </p>
        </div>

        {/* Card 2: Verified Employers */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Verified Employers
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.verified}
          </p>
          <p className="text-xs font-medium text-[#7E77FE]">
            Trust badge granted
          </p>
        </div>

        {/* Card 3: Total Open Positions */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Open Job Listings
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.openJobs}
          </p>
          <p className="text-xs font-medium text-zinc-400">
            Across all companies
          </p>
        </div>

        {/* Card 4: Dominant Industry */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Top Industry
          </p>
          <p className="text-2xl font-bold text-white mt-2 mb-2 truncate">
            {stats.topCategory}
          </p>
          <p className="text-xs font-medium text-zinc-400">
            Leading job sector
          </p>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#111522] border border-[#1E2333] rounded-2xl p-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by company name, location, or recruiter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-9 h-10 bg-[#161B2B] border-[#232A3E] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#5C53FE] focus-visible:border-[#5C53FE]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
              className="h-10 px-3.5 rounded-xl bg-[#161B2B] border border-[#232A3E] flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#1E2538] transition-colors cursor-pointer"
            >
              <span>{statusFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isStatusDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-40 rounded-xl bg-[#141826] border border-[#232A3E] shadow-2xl py-1.5 z-30"
                onMouseLeave={() => setIsStatusDropdownOpen(false)}
              >
                {["All Status", "Verified", "Pending"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm text-left hover:bg-[#1E2538] transition-colors cursor-pointer ${
                      statusFilter === status
                        ? "text-[#5C53FE] font-semibold"
                        : "text-zinc-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
              className="h-10 px-3.5 rounded-xl bg-[#161B2B] border border-[#232A3E] flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white hover:bg-[#1E2538] transition-colors cursor-pointer"
            >
              <span className="truncate max-w-[130px]">{categoryFilter}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </button>

            {isCategoryDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-48 rounded-xl bg-[#141826] border border-[#232A3E] shadow-2xl py-1.5 z-30 max-h-60 overflow-y-auto"
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              >
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(cat);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm text-left hover:bg-[#1E2538] transition-colors cursor-pointer ${
                      categoryFilter === cat
                        ? "text-[#5C53FE] font-semibold"
                        : "text-zinc-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Companies Table Container */}
      <div className="bg-[#111522] border border-[#1E2333] rounded-2xl overflow-hidden shadow-xs">
        <AdminCompaniesTable
          companies={filteredCompanies}
          onStatusToggle={handleStatusToggle}
        />
      </div>
    </div>
  );
}
