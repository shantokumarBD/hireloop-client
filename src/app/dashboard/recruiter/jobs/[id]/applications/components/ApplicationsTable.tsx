"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Application } from "@/Types";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import { Eye, Mail, ChevronDown } from "lucide-react";
import { format } from "date-fns";

interface ApplicationsTableProps {
  applications: Application[];
  onSelectApplication: (application: Application) => void;
  onStatusChange: (applicationId: string, newStatus: string) => void;
}

const STATUS_OPTIONS = [
  "Applied",
  "Review",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected",
];

export function ApplicationsTable({
  applications,
  onSelectApplication,
  onStatusChange,
}: ApplicationsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[800px] text-left">
        <TableHeader className="bg-zinc-50 border-b border-zinc-200">
          <TableRow className="border-zinc-200 hover:bg-transparent">
            <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[280px]">
              Candidate
            </TableHead>
            <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[180px]">
              Applied Date
            </TableHead>
            <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[140px]">
              Status
            </TableHead>
            <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[170px]">
              Change Stage
            </TableHead>
            <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 text-right w-[110px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-zinc-100">
          {applications.map((application) => {
            const initials = application.seekerName
              ? application.seekerName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : "AP";

            const appliedDate = application.appliedAt
              ? (() => {
                  try {
                    return format(new Date(application.appliedAt), "MMM d, yyyy");
                  } catch {
                    return String(application.appliedAt);
                  }
                })()
              : "N/A";

            return (
              <TableRow
                key={application._id}
                className="border-zinc-100 hover:bg-zinc-50/80 transition-colors group"
              >
                {/* 1. Candidate Info */}
                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5C53FE]/10 text-[#5C53FE] border border-[#5C53FE]/20 flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 group-hover:text-[#5C53FE] transition-colors truncate">
                        {application.seekerName}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 truncate mt-0.5">
                        <Mail className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span className="truncate">{application.seekerEmail}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* 2. Applied Date */}
                <TableCell className="py-4 px-4 text-xs font-medium text-zinc-700">
                  <span>{appliedDate}</span>
                </TableCell>

                {/* 3. Status Badge */}
                <TableCell className="py-4 px-4">
                  <ApplicationStatusBadge status={application.status} />
                </TableCell>

                {/* 4. Update Status Dropdown */}
                <TableCell className="py-4 px-4">
                  <div className="relative inline-block w-36">
                    <select
                      value={application.status || "Applied"}
                      onChange={(e) => onStatusChange(application._id, e.target.value)}
                      className="w-full text-xs font-medium bg-white text-zinc-700 border border-zinc-200 rounded-lg py-1.5 pl-2.5 pr-7 appearance-none cursor-pointer hover:border-[#5C53FE]/40 focus:outline-none focus:ring-2 focus:ring-[#5C53FE]/20 focus:border-[#5C53FE] transition-all shadow-xs"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </TableCell>

                {/* 5. Actions */}
                <TableCell className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectApplication(application)}
                      className="h-8 px-2.5 text-xs text-zinc-600 hover:text-[#5C53FE] hover:bg-[#5C53FE]/10 rounded-lg transition-colors cursor-pointer"
                      title="Review Candidate"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1 text-zinc-400 group-hover:text-[#5C53FE]" />
                      <span>Review</span>
                    </Button>

                    <a
                      href={`mailto:${application.seekerEmail}?subject=Regarding your application for ${encodeURIComponent(application.jobTitle || "")}`}
                      title="Email Applicant"
                      className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
