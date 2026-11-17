"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Briefcase,
  Download,
  Plus,
  ChevronDown,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AdminJobsTable, AdminJobItem } from "./AdminJobsTable";
import { updateJob, deleteJobs } from "@/lib/actions/jobs";

interface AdminJobsViewProps {
  initialJobs: AdminJobItem[];
}

export function AdminJobsView({ initialJobs }: AdminJobsViewProps) {
  const [jobs, setJobs] = useState<AdminJobItem[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Dynamic KPI Stats calculated from real database jobs
  const stats = useMemo(() => {
    const totalJobs = jobs.length;
    const active = jobs.filter(
      (j) => (j.status || "Active").toLowerCase() === "active"
    ).length;
    const closed = jobs.filter(
      (j) => (j.status || "").toLowerCase() === "closed"
    ).length;

    // Find most frequent category
    const categoryCounts: Record<string, number> = {};
    jobs.forEach((j) => {
      const cat = j.category || "General";
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
      total: totalJobs.toLocaleString(),
      active: active.toLocaleString(),
      closed: closed.toLocaleString(),
      topCategory,
    };
  }, [jobs]);

  // Distinct categories
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.category) set.add(j.category);
    });
    return ["All Categories", ...Array.from(set)];
  }, [jobs]);

  // Toggle job status (Active <-> Closed)
  const handleStatusToggle = async (
    jobId: string,
    newStatus: "Active" | "Closed"
  ) => {
    const previous = [...jobs];
    const target = jobs.find((j) => j._id === jobId);

    // Optimistic update
    setJobs((prev) =>
      prev.map((j) => (j._id === jobId ? { ...j, status: newStatus } : j))
    );

    const res = await updateJob(jobId, { status: newStatus });
    if (res?.acknowledged || res?.modifiedCount || res?.success !== false) {
      toast.add({
        title:
          newStatus === "Active" ? "Listing Activated" : "Listing Closed",
        description: `"${target?.title || "Job"}" status changed to ${newStatus}.`,
      });
    } else {
      setJobs(previous);
      toast.add({
        title: "Update Failed",
        description: "Could not update status on server.",
      });
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId: string) => {
    const target = jobs.find((j) => j._id === jobId);
    const previous = [...jobs];

    setJobs((prev) => prev.filter((j) => j._id !== jobId));

    const res = await deleteJobs(jobId);
    if (res?.acknowledged || res?.deletedCount || res?.success !== false) {
      toast.add({
        title: "Listing Removed",
        description: `"${target?.title || "Job"}" has been deleted.`,
      });
    } else {
      setJobs(previous);
      toast.add({
        title: "Delete Failed",
        description: "Could not remove job listing.",
      });
    }
  };

  // Export CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Title,Company,Category,Type,Location,Status,Recruiter"]
        .concat(
          jobs.map(
            (j) =>
              `"${j.title}","${j.companyName}","${j.category}","${j.jobType}","${j.location}","${j.status || "Active"}","${j.recruiterEmail || ""}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `hireloop_jobs_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.add({
      title: "Export Complete",
      description: `Exported ${jobs.length} job postings to CSV.`,
    });
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      // Status filter
      if (statusFilter !== "All Status") {
        if ((j.status || "Active").toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter !== "All Categories") {
        if (j.category.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = j.title?.toLowerCase().includes(query);
        const compMatch = j.companyName?.toLowerCase().includes(query);
        const locMatch = j.location?.toLowerCase().includes(query);
        const recMatch = j.recruiterEmail?.toLowerCase().includes(query);
        return Boolean(titleMatch || compMatch || locMatch || recMatch);
      }

      return true;
    });
  }, [jobs, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 text-zinc-100 max-w-[1440px] mx-auto pb-12">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Platform Jobs Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#5C53FE]/15 text-[#7E77FE] border border-[#5C53FE]/30">
              Admin Moderation
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Global moderation dashboard to monitor, feature, or remove job
            listings across all organizations.
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
              <span>Post New Job</span>
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
        {/* Card 1: Total Jobs */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Total Listings
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.total}
          </p>
          <p className="text-xs font-medium text-zinc-400">
            All-time postings
          </p>
        </div>

        {/* Card 2: Active Listings */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Active Listings
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.active}
          </p>
          <p className="text-xs font-medium text-emerald-400">
            Open for applications
          </p>
        </div>

        {/* Card 3: Closed Listings */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Closed Postings
          </p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">
            {stats.closed}
          </p>
          <p className="text-xs font-medium text-amber-400">
            Filled or archived
          </p>
        </div>

        {/* Card 4: Leading Sector */}
        <div className="bg-[#111522] border border-[#1E2333] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-medium text-zinc-400 tracking-wide">
            Top Hiring Sector
          </p>
          <p className="text-2xl font-bold text-white mt-2 mb-2 truncate">
            {stats.topCategory}
          </p>
          <p className="text-xs font-medium text-[#7E77FE]">
            Leading category
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
            placeholder="Search by job title, company, location, or recruiter..."
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
                {["All Status", "Active", "Closed"].map((status) => (
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

      {/* 4. Table Container */}
      <div className="bg-[#111522] border border-[#1E2333] rounded-2xl overflow-hidden shadow-xs">
        <AdminJobsTable
          jobs={filteredJobs}
          onStatusToggle={handleStatusToggle}
          onDeleteJob={handleDeleteJob}
        />
      </div>
    </div>
  );
}
