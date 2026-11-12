import React, { Suspense } from "react";
import { getJobs } from "@/lib/api/jobs";
import { CreateJobInput } from "@/Types";
import { JobSearchBar } from "./components/JobSearchBar";
import { JobFiltersSidebar } from "./components/JobFiltersSidebar";
import { JobCard } from "./components/JobCard";
import { JobSortDropdown } from "./components/JobSortDropdown";
import { JobPagination } from "./components/JobPagination";

interface BrowserJobsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowserJobsPage({
  searchParams,
}: BrowserJobsPageProps) {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();

  // Fetch real jobs directly from MongoDB via backend API
  const jobs: CreateJobInput[] = await getJobs(query);
  const searchString = typeof search?.search === "string" ? search.search : "";
  const totalCount = jobs ? jobs.length : 0;

  return (
    <main className="min-h-screen bg-[#07090e] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Search Bar */}
        <Suspense fallback={<div className="h-14 rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 animate-pulse" />}>
          <JobSearchBar defaultValue={searchString} />
        </Suspense>

        {/* Main Content: Sidebar Filters + Job Listings */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left: Filters Sidebar */}
          <Suspense fallback={<div className="w-full lg:w-64 h-96 rounded-2xl bg-[#0e1118]/80 animate-pulse border border-zinc-800/80" />}>
            <JobFiltersSidebar />
          </Suspense>

          {/* Right: Job Listings & Pagination */}
          <section className="flex-1 w-full space-y-5">
            {/* Header: Total Found & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Found {totalCount} Professional {totalCount === 1 ? "Job" : "Jobs"}
              </h1>
              <JobSortDropdown />
            </div>

            {/* Job Cards List */}
            <div className="space-y-4">
              {jobs && jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <div className="text-center py-16 bg-[#0e1118]/60 border border-zinc-800/80 rounded-2xl p-8 space-y-2">
                  <p className="text-zinc-300 font-medium text-lg">
                    {searchString
                      ? `No jobs found matching "${searchString}"`
                      : "No jobs found"}
                  </p>
                  <p className="text-zinc-500 text-sm">
                    {searchString
                      ? "Try searching with different keywords or clearing filters."
                      : "No job postings available at this moment. Check back soon!"}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Pagination */}
            {jobs && jobs.length > 0 && <JobPagination />}
          </section>
        </div>
      </div>
    </main>
  );
}
