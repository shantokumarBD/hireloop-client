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
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  MoreVertical,
  ShieldCheck,
  Briefcase,
  MapPin,
  Mail,
} from "lucide-react";

export interface AdminCompanyItem {
  id: string;
  name: string;
  logo?: string;
  category: string;
  location: string;
  isRemote?: boolean;
  totalJobs: number;
  activeJobs: number;
  recruiters: string[];
  status: "Verified" | "Pending" | "Unverified";
  joinedDate?: string | null;
}

interface AdminCompaniesTableProps {
  companies: AdminCompanyItem[];
  onStatusToggle: (companyId: string, newStatus: "Verified" | "Pending") => void;
}

export function AdminCompaniesTable({
  companies,
  onStatusToggle,
}: AdminCompaniesTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[980px] text-left">
        <TableHeader className="bg-transparent border-b border-[#1E2333]">
          <TableRow className="border-[#1E2333] hover:bg-transparent">
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[280px]">
              Company & Industry
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[200px]">
              Location
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[150px]">
              Open Positions
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[200px]">
              Primary Recruiter
            </TableHead>
            <TableHead className="py-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 w-[140px]">
              Verification
            </TableHead>
            <TableHead className="py-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 text-right w-[140px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-[#1A1F2E]">
          {companies.map((company) => {
            const isVerified = company.status === "Verified";
            const isOpen = openDropdownId === company.id;

            return (
              <TableRow
                key={company.id}
                className="border-[#1E2333] hover:bg-[#121626]/80 transition-colors"
              >
                {/* 1. Company Name & Industry */}
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-10 h-10 rounded-xl object-cover bg-[#1A1F2E] border border-[#232A3E] shrink-0"
                        onError={(e) => {
                          // Fallback to building icon if image fails
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5C53FE]/20 to-[#4E44FE]/10 border border-[#5C53FE]/30 flex items-center justify-center text-[#7E77FE] font-bold text-sm shrink-0">
                        {company.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-zinc-100 truncate">
                        {company.name}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                        <Building2 className="w-3 h-3 text-zinc-500" />
                        {company.category || "Technology"}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* 2. Location & Remote badge */}
                <TableCell className="py-4 px-4 text-xs text-zinc-300">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1.5 text-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {company.location || "Global"}
                      </span>
                    </span>
                    {company.isRemote && (
                      <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Remote Friendly
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* 3. Open Positions */}
                <TableCell className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#5C53FE]/10 text-[#7E77FE] border border-[#5C53FE]/20">
                    <Briefcase className="w-3 h-3" />
                    <span>
                      {company.activeJobs} {company.activeJobs === 1 ? "role" : "roles"}
                    </span>
                  </span>
                </TableCell>

                {/* 4. Primary Recruiter */}
                <TableCell className="py-4 px-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                    <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">
                      {company.recruiters[0] || "admin@hireloop.com"}
                    </span>
                  </div>
                  {company.recruiters.length > 1 && (
                    <span className="text-[10px] text-zinc-500 mt-0.5 block">
                      +{company.recruiters.length - 1} other recruiter(s)
                    </span>
                  )}
                </TableCell>

                {/* 5. Verification Status */}
                <TableCell className="py-4 px-4">
                  {isVerified ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Pending
                    </span>
                  )}
                </TableCell>

                {/* 6. Action Dropdown */}
                <TableCell className="py-4 px-6 text-right relative">
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(company.id)}
                      className="w-8 h-8 rounded-lg bg-[#141826] border border-[#232A3E] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#1E2538] transition-colors cursor-pointer"
                      title="Manage Company"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {isOpen && (
                      <div
                        className="absolute right-0 mt-1.5 w-48 rounded-xl bg-[#141826] border border-[#232A3E] shadow-2xl py-1.5 z-40"
                        onMouseLeave={() => setOpenDropdownId(null)}
                      >
                        <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border-b border-[#1E2538]">
                          Manage Status
                        </div>

                        {/* Toggle Verification */}
                        <button
                          type="button"
                          onClick={() => {
                            onStatusToggle(
                              company.id,
                              isVerified ? "Pending" : "Verified"
                            );
                            setOpenDropdownId(null);
                          }}
                          className="w-full px-3.5 py-2 text-xs text-left hover:bg-[#1E2538] transition-colors cursor-pointer flex items-center gap-2 text-zinc-200"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#5C53FE]" />
                          <span>
                            {isVerified ? "Mark as Pending" : "Verify Company"}
                          </span>
                        </button>

                        {/* View in Public Directory */}
                        <Link
                          href="/companies"
                          target="_blank"
                          className="w-full px-3.5 py-2 text-xs text-left hover:bg-[#1E2538] transition-colors cursor-pointer flex items-center gap-2 text-zinc-200"
                          onClick={() => setOpenDropdownId(null)}
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                          <span>View Public Directory</span>
                        </Link>

                        {/* View Jobs Filter */}
                        <Link
                          href={`/browser-jobs?search=${encodeURIComponent(company.name)}`}
                          target="_blank"
                          className="w-full px-3.5 py-2 text-xs text-left hover:bg-[#1E2538] transition-colors cursor-pointer flex items-center gap-2 text-zinc-200"
                          onClick={() => setOpenDropdownId(null)}
                        >
                          <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                          <span>View Active Jobs</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}

          {companies.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-12 text-center text-zinc-500 text-sm"
              >
                No companies match your search or filter criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
