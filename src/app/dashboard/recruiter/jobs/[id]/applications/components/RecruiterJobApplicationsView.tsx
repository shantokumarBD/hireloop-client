"use client";

import React, { useState, useMemo } from "react";
import { Application, CreateJobInput } from "@/Types";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApplicantDetailsDialog } from "./ApplicantDetailsDialog";
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  FileQuestion,
  UserCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { updateApplicationStatus } from "@/lib/actions/applications";

interface RecruiterJobApplicationsViewProps {
  job: CreateJobInput;
  initialApplications: Application[];
}

export function RecruiterJobApplicationsView({
  job,
  initialApplications,
}: RecruiterJobApplicationsViewProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Status counts calculated in a single fast loop
  const counts = useMemo(() => {
    const acc = {
      total: applications.length,
      applied: 0,
      review: 0,
      shortlisted: 0,
      interview: 0,
      offered: 0,
      rejected: 0,
    };
    for (const app of applications) {
      const s = (app.status || "applied").toLowerCase();
      if (s === "applied") acc.applied++;
      else if (s === "review" || s === "reviewing") acc.review++;
      else if (s === "shortlisted") acc.shortlisted++;
      else if (s === "interview" || s === "interviewing") acc.interview++;
      else if (s === "offered" || s === "hired") acc.offered++;
      else if (s === "rejected") acc.rejected++;
    }
    return acc;
  }, [applications]);

  // Handle status update: instant UI update + save to MongoDB
  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    const previous = [...applications];
    const applicant = applications.find((a) => a._id === applicationId);

    // 1. Optimistic update
    setApplications((prev) =>
      prev.map((app) =>
        app._id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    setSelectedApplication((prev) =>
      prev && prev._id === applicationId ? { ...prev, status: newStatus } : prev
    );

    // 2. Save to Database
    const res = await updateApplicationStatus(applicationId, newStatus);
    if (res?.acknowledged || res?.modifiedCount) {
      toast.add({
        title: "Status Updated",
        description: `${applicant?.seekerName || "Candidate"} moved to ${newStatus}`,
      });
    } else {
      setApplications(previous);
      toast.add({
        title: "Update Failed",
        description: "Could not save to database.",
      });
    }
  };

  // Filter by search & status
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (
        statusFilter !== "All" &&
        (app.status || "Applied").toLowerCase() !== statusFilter.toLowerCase()
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          app.seekerName?.toLowerCase().includes(q) ||
          app.seekerEmail?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [applications, statusFilter, searchQuery]);

  // Metric cards configuration
  const metricCards = [
    { label: "Total", count: counts.total, icon: Users, color: "text-[#5C53FE]", desc: "All candidates" },
    { label: "Applied", count: counts.applied, icon: Clock, color: "text-blue-600", desc: "New applications" },
    { label: "Review", count: counts.review, icon: Sparkles, color: "text-amber-600", desc: "Screening stage" },
    { label: "Shortlisted", count: counts.shortlisted, icon: CheckCircle2, color: "text-purple-600", desc: "Top qualified" },
    { label: "Interview", count: counts.interview, icon: UserCheck, color: "text-indigo-600", desc: "Under evaluation" },
    { label: "Offered", count: counts.offered, icon: CheckCircle2, color: "text-emerald-600", desc: "Job offers made" },
  ];

  const filterTabs = [
    { label: "All", count: counts.total },
    { label: "Applied", count: counts.applied },
    { label: "Review", count: counts.review },
    { label: "Shortlisted", count: counts.shortlisted },
    { label: "Interview", count: counts.interview },
    { label: "Offered", count: counts.offered },
    { label: "Rejected", count: counts.rejected },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Quick KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {metricCards.map(({ label, count, icon: Icon, color, desc }) => (
          <div key={label} className="bg-white rounded-2xl border border-zinc-200/80 p-4 shadow-xs">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">{desc}</p>
          </div>
        ))}
      </div>

      {/* 2. Search, Status Filter & Table Card */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {/* Filters Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-zinc-50/50">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search candidate or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 h-9 text-xs sm:text-sm bg-white rounded-xl border-zinc-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterTabs.map(({ label, count }) => {
              const active = statusFilter.toLowerCase() === label.toLowerCase();
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStatusFilter(label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-[#5C53FE] text-white shadow-sm shadow-[#5C53FE]/20"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80"
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Table Content or Empty States */}
        {filteredApplications.length > 0 ? (
          <ApplicationsTable
            applications={filteredApplications}
            onSelectApplication={(app) => setSelectedApplication(app)}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="py-16 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
              <FileQuestion className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-800">
                {searchQuery || statusFilter !== "All"
                  ? "No matching applicants"
                  : "No applications yet"}
              </p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                {searchQuery || statusFilter !== "All"
                  ? "Try resetting your search query or status filter to see other applicants."
                  : "Applications submitted for this job will appear here for review and status tracking."}
              </p>
            </div>
            {(searchQuery || statusFilter !== "All") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("All");
                }}
                className="mt-2 text-xs rounded-xl border-zinc-200 text-zinc-700 hover:bg-zinc-50"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* 4. Candidate Details Modal */}
      <ApplicantDetailsDialog
        application={selectedApplication}
        isOpen={Boolean(selectedApplication)}
        onClose={() => setSelectedApplication(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
