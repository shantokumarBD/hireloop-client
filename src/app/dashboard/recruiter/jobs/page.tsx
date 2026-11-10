import Link from "next/link";
import {
  Briefcase,
  Globe,
  MapPin,
  Users,
  Pencil,
  Trash2,
  MoreVertical,
  Plus,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getJobs } from "@/lib/api/jobs";


export default async function ManageJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
        <span className="hover:text-zinc-600 transition-colors cursor-pointer">
          Manage Jobs
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-700 font-medium">Job Listings & Postings</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Manage Job Posts
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl leading-relaxed">
            Review live listings, monitor applicants, and update job details across your organization.
          </p>
        </div>

        {/* New Job Post Button */}
        <Link href="/dashboard/recruiter/jobs/new">
          <Button className="w-full sm:w-auto bg-[#5C53FE] hover:bg-[#4E45E8] text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-[#5C53FE]/20 transition-all cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>New Job Post</span>
          </Button>
        </Link>
      </div>

      {/* Responsive Table Card */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[1020px] text-left">
            <TableHeader className="bg-zinc-50 border-b border-zinc-200">
              <TableRow className="border-zinc-200 hover:bg-transparent">
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[240px]">
                  Job Title & Dept
                </TableHead>
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[210px]">
                  Company & Location
                </TableHead>
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[110px]">
                  Type
                </TableHead>
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[150px]">
                  Compensation
                </TableHead>
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[140px]">
                  Applicants
                </TableHead>
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[110px]">
                  Status
                </TableHead>
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 w-[140px]">
                  Deadline
                </TableHead>
                <TableHead className="py-3.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 text-right w-[130px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-zinc-100">
              {jobs.map((job) => (
                <TableRow
                  key={job._id}
                  className="border-zinc-100 hover:bg-zinc-50/80 transition-colors group"
                >
                  {/* 1. Job Title & Dept */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#5C53FE]/10 text-[#5C53FE] border border-[#5C53FE]/20">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 group-hover:text-[#5C53FE] transition-colors truncate">
                          {job.title}
                        </p>
                        <p className="text-xs font-medium mt-0.5 text-[#5C53FE]">
                          {job.category}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* 2. Company & Location */}
                  <TableCell className="py-4 px-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-zinc-800">
                        {job.companyName}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        {job.isRemote ? (
                          <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        )}
                        <span className="truncate">{job.location}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* 3. Job Type Pill */}
                  <TableCell className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {job.jobType}
                    </span>
                  </TableCell>

                  {/* 4. Compensation */}
                  <TableCell className="py-4 px-4 text-sm font-medium text-zinc-700">
                    €{job.salaryMin} - €{job.salaryMax} / {job.salaryFrequency}
                  </TableCell>

                  {/* 5. Applicants */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                      <Users className="w-4 h-4 text-zinc-400" />
                      <span>{job.applicantsCount || 0} Candidates</span>
                    </div>
                  </TableCell>

                  {/* 6. Status Pill */}
                  <TableCell className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        job.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-zinc-100 text-zinc-500 border-zinc-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          job.status === "Active"
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-zinc-400"
                        }`}
                      />
                      {job.status}
                    </span>
                  </TableCell>

                  {/* 7. Deadline */}
                  <TableCell className="py-4 px-4 text-xs font-medium text-zinc-800">
                    {job.deadline}
                  </TableCell>

                  {/* 8. Actions */}
                  <TableCell className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#5C53FE] hover:bg-[#4E45E8] rounded-lg transition-all shadow-sm cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Update</span>
                      </button>

                      <button
                        type="button"
                        title="Delete job"
                        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-zinc-200 hover:border-red-200 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        title="More options"
                        className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
