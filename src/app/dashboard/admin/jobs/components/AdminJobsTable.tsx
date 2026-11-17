"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  MoreVertical,
  Trash2,
  DollarSign,
  Mail,
  Eye,
} from "lucide-react";

export interface AdminJobItem {
  _id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  category: string;
  jobType: string;
  isRemote?: boolean;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryFrequency?: string;
  recruiterEmail?: string;
  status: "Active" | "Closed" | "Draft";
  createdAt?: string;
}

interface AdminJobsTableProps {
  jobs: AdminJobItem[];
  onStatusToggle: (jobId: string, newStatus: "Active" | "Closed") => void;
  onDeleteJob: (jobId: string) => void;
}

export function AdminJobsTable({
  jobs,
  onStatusToggle,
  onDeleteJob,
}: AdminJobsTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1000px] text-left">
        <TableHeader className="bg-transparent border-b border-[#1E2333]">
          <TableRow className="border-[#1E2333] hover:bg-transparent">
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[300px]">
              Job Title & Company
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[180px]">
              Category & Type
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[170px]">
              Salary / Rate
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[190px]">
              Recruiter
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[120px]">
              Status
            </TableHead>
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 text-right w-[120px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-[#1A1F2E]">
          {jobs.map((job) => {
            const isActive = (job.status || "Active").toLowerCase() === "active";
            const isOpen = openDropdownId === job._id;

            // Format compensation string
            let salaryDisplay = "Not specified";
            if (job.salaryMin && job.salaryMax) {
              salaryDisplay = `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()} / ${job.salaryFrequency || "hr"}`;
            } else if (job.salaryMin) {
              salaryDisplay = `From $${job.salaryMin.toLocaleString()} / ${job.salaryFrequency || "hr"}`;
            }

            return (
              <TableRow
                key={job._id}
                className="border-[#1E2333] hover:bg-[#121626]/80 transition-colors"
              >
                {/* 1. Job Title & Company */}
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-10 h-10 rounded-xl object-cover bg-[#1A1F2E] border border-[#232A3E] shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5C53FE]/20 to-[#4E44FE]/10 border border-[#5C53FE]/30 flex items-center justify-center text-[#7E77FE] font-bold text-sm shrink-0">
                        {(job.companyName || "HL").slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <Link
                        href={`/browser-jobs/${job._id}`}
                        target="_blank"
                        className="font-semibold text-sm text-zinc-100 hover:text-[#7E77FE] transition-colors truncate block"
                      >
                        {job.title}
                      </Link>
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="truncate">{job.companyName}</span>
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* 2. Category & Job Type */}
                <TableCell className="py-4 px-4 text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-zinc-200">
                      {job.category || "General"}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#1F2433] text-zinc-300 border border-[#2B3245]">
                        {job.jobType || "Full-Time"}
                      </span>
                      {job.isRemote && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* 3. Salary / Compensation */}
                <TableCell className="py-4 px-4 text-xs text-zinc-300">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate font-mono">{salaryDisplay}</span>
                  </div>
                </TableCell>

                {/* 4. Recruiter */}
                <TableCell className="py-4 px-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                    <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">
                      {job.recruiterEmail || "recruiter@hireloop.com"}
                    </span>
                  </div>
                </TableCell>

                {/* 5. Status */}
                <TableCell className="py-4 px-4">
                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-700/30 text-zinc-400 border border-zinc-700/40">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      Closed
                    </span>
                  )}
                </TableCell>

                {/* 6. Action Menu */}
                <TableCell className="py-4 px-6 text-right relative">
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(job._id)}
                      className="w-8 h-8 rounded-lg bg-[#141826] border border-[#232A3E] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#1E2538] transition-colors cursor-pointer"
                      title="Manage Job"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {isOpen && (
                      <div
                        className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#141826] border border-[#232A3E] shadow-2xl py-1.5 z-40"
                        onMouseLeave={() => setOpenDropdownId(null)}
                      >
                        <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border-b border-[#1E2538]">
                          Moderation
                        </div>

                        {/* View Job Page */}
                        <Link
                          href={`/browser-jobs/${job._id}`}
                          target="_blank"
                          className="w-full px-3.5 py-2 text-xs text-left hover:bg-[#1E2538] transition-colors cursor-pointer flex items-center gap-2 text-zinc-200"
                          onClick={() => setOpenDropdownId(null)}
                        >
                          <Eye className="w-3.5 h-3.5 text-zinc-400" />
                          <span>View Listing</span>
                        </Link>

                        {/* Toggle Active / Closed */}
                        <button
                          type="button"
                          onClick={() => {
                            onStatusToggle(
                              job._id,
                              isActive ? "Closed" : "Active"
                            );
                            setOpenDropdownId(null);
                          }}
                          className="w-full px-3.5 py-2 text-xs text-left hover:bg-[#1E2538] transition-colors cursor-pointer flex items-center gap-2 text-zinc-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5C53FE]" />
                          <span>
                            {isActive ? "Close Job" : "Re-activate Job"}
                          </span>
                        </button>

                        {/* Delete Job */}
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteJob(job._id);
                            setOpenDropdownId(null);
                          }}
                          className="w-full px-3.5 py-2 text-xs text-left hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer flex items-center gap-2 border-t border-[#1E2538]"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          <span>Delete Listing</span>
                        </button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}

          {jobs.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-12 text-center text-zinc-500 text-sm"
              >
                No job listings match your current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
