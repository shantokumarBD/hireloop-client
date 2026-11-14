import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Globe,
  Users,
  Building2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/app/components/shared/DashboardHeader";
import { StatusBadge } from "@/app/components/shared/StatusBadge";
import { JobTypeBadge } from "@/app/components/shared/JobTypeBadge";
import { getSingleJob } from "@/lib/api/jobs";
import { getJobApplications } from "@/lib/api/applications";
import { RecruiterJobApplicationsView } from "./components/RecruiterJobApplicationsView";

interface RecruiterJobApplicationsPageProps {
  params: Promise<{ id: string }>;
}

export default async function RecruiterJobApplicationsPage({
  params,
}: RecruiterJobApplicationsPageProps) {
  const { id } = await params;

  // 1. Fetch Job and Applications concurrently
  const [job, applications] = await Promise.all([
    getSingleJob(id),
    getJobApplications(id),
  ]);

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* 1. Header with Breadcrumbs & Back Navigation */}
      <DashboardHeader
        breadcrumbs={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: job.title },
          { label: "Applications" },
        ]}
        title="Job Applications"
        subtitle={`Review and manage applicant pipeline for ${job.title}.`}
        action={
          <Link href="/dashboard/recruiter/jobs">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Jobs</span>
            </Button>
          </Link>
        }
      />

      {/* 2. Job Overview Card Banner */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#5C53FE]/10 text-[#5C53FE] border border-[#5C53FE]/20 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg font-bold text-zinc-900">{job.title}</h2>
              <JobTypeBadge type={job.jobType} />
              <StatusBadge status={job.status} />
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1 font-medium text-zinc-700">
                <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                {job.companyName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {job.isRemote ? (
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                )}
                {job.location}
              </span>
              <span>•</span>
              <span className="font-semibold text-zinc-700">
                €{job.salaryMin} - €{job.salaryMax} / {job.salaryFrequency}
              </span>
              {job.deadline && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    Deadline: {job.deadline}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-zinc-100">
          <div className="px-3 py-1.5 rounded-xl bg-[#5C53FE]/10 text-[#5C53FE] text-xs font-semibold flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{applications.length} Candidates Applied</span>
          </div>
        </div>
      </div>

      {/* 3. Applications Pipeline & Table View */}
      <RecruiterJobApplicationsView
        job={job}
        initialApplications={applications}
      />
    </div>
  );
}
