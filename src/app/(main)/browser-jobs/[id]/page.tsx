import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  CircleDollarSign,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Laptop,
  Plane,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSingleJob } from "@/lib/api/jobs";
import { JobDetailsActions } from "./components/JobDetailsActions";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

function formatSalary(min?: number, max?: number, frequency?: string) {
  const freqText = frequency ? ` ${frequency}` : "";
  if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}${freqText}`;
  if (min) return `From $${min.toLocaleString()}${freqText}`;
  if (max) return `Up to $${max.toLocaleString()}${freqText}`;
  return "Negotiable";
}

function parseBulletPoints(text?: string): string[] {
  if (!text || !text.trim()) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter((line) => line.length > 0);
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const job = await getSingleJob(id);

  if (!job) {
    return (
      <main className="min-h-screen bg-[#07090e] text-zinc-100 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-5 p-8 rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white">Job Not Found</h1>
            <p className="text-sm text-zinc-400">
              The job you are looking for does not exist or may have been removed.
            </p>
          </div>
          <Link href="/browser-jobs" className="inline-block pt-2">
            <Button className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-sm">
              Back to Browse Jobs
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const {
    _id,
    title,
    companyName,
    location,
    isRemote,
    jobType,
    salaryMin,
    salaryMax,
    salaryFrequency,
    category,
    responsibilities,
    requirements,
    deadline,
  } = job;

  const responsibilitiesList = parseBulletPoints(responsibilities);
  const requirementsList = parseBulletPoints(requirements);

  return (
    <main className="min-h-screen bg-[#07090e] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/browser-jobs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Browse Jobs</span>
          </Link>
        </div>

        {/* 1. Header Card (Matching Figma) */}
        <div className="rounded-2xl bg-[#0e1118]/90 border border-zinc-800/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5 min-w-0">
            {/* Company Logo Box */}
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-cyan-400 shadow-inner">
              <Building2 className="w-8 h-8" />
            </div>

            {/* Title & Company Name */}
            <div className="min-w-0 space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-zinc-400">
                <span className="font-medium text-zinc-300">{companyName}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-400" />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Bookmark & Apply Now */}
          <JobDetailsActions job={job} />
        </div>

        {/* 2. Four Summary Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1: Salary Range */}
          <div className="rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 p-5 flex flex-col justify-between shadow-lg backdrop-blur-sm">
            <CircleDollarSign className="w-5 h-5 text-zinc-400 mb-3" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Salary Range
              </span>
              <p className="text-sm sm:text-base font-bold text-white mt-1">
                {formatSalary(salaryMin, salaryMax, salaryFrequency)}
              </p>
            </div>
          </div>

          {/* Card 2: Location */}
          <div className="rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 p-5 flex flex-col justify-between shadow-lg backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-zinc-400 mb-3" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Location
              </span>
              <p className="text-sm sm:text-base font-bold text-white mt-1 truncate">
                {location || (isRemote ? "Remote" : "On-site")}{" "}
                {isRemote && location ? "(Remote)" : ""}
              </p>
            </div>
          </div>

          {/* Card 3: Job Type */}
          <div className="rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 p-5 flex flex-col justify-between shadow-lg backdrop-blur-sm">
            <Clock className="w-5 h-5 text-zinc-400 mb-3" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Job Type
              </span>
              <p className="text-sm sm:text-base font-bold text-white mt-1">
                {jobType || "Full-Time"}
              </p>
            </div>
          </div>

          {/* Card 4: Category */}
          <div className="rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 p-5 flex flex-col justify-between shadow-lg backdrop-blur-sm">
            <BarChart3 className="w-5 h-5 text-zinc-400 mb-3" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Category
              </span>
              <p className="text-sm sm:text-base font-bold text-white mt-1 truncate">
                {category || "Engineering"}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 p-6 sm:p-8 space-y-8 backdrop-blur-sm shadow-xl">
              {/* Section 1: Job Description */}
              <div className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Job Description
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {responsibilitiesList.length > 0
                    ? `At ${companyName}, we are actively seeking a talented and dedicated ${title} to join our team. In this position, you will work closely with cross-functional partners to drive innovation, solve complex challenges, and contribute to high-impact projects across our organization.`
                    : `We are looking for a qualified ${title} to join our growing team at ${companyName}.`}
                </p>
              </div>

              {/* Section 2: Responsibilities */}
              {responsibilitiesList.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {responsibilitiesList.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section 3: Requirements */}
              {requirementsList.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Requirements
                  </h2>

                  {/* Skills/Tags derived from Category and Type */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
                    {category && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {category}
                      </span>
                    )}
                    {jobType && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {jobType}
                      </span>
                    )}
                    {isRemote && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-800/40">
                        <Sparkles className="w-3.5 h-3.5" /> Remote
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {requirementsList.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section 4: Benefits & Perks */}
              <div className="space-y-4 pt-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <ShieldCheck className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span className="text-sm font-medium text-zinc-200">
                      Full Health & Dental
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <CircleDollarSign className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span className="text-sm font-medium text-zinc-200">
                      Competitive 401k
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <Laptop className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span className="text-sm font-medium text-zinc-200">
                      Latest Hardware Stipend
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <Plane className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span className="text-sm font-medium text-zinc-200">
                      Unlimited PTO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Company Overview */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-[#0e1118]/80 border border-zinc-800/80 p-6 space-y-6 backdrop-blur-sm shadow-xl">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Company Overview
              </h2>

              {/* Visual Office Preview Card (matching Figma) */}
              <div className="w-full h-44 rounded-xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800/80 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent opacity-60" />
                <div className="relative flex flex-col items-center gap-2.5 text-center p-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-cyan-400 shadow-lg">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-200">
                    {companyName}
                  </span>
                </div>
              </div>

              {/* Company Details Stats */}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between py-3 border-b border-zinc-800/60 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-zinc-500">
                    Size
                  </span>
                  <span className="font-medium text-zinc-200">
                    250 - 500 Employees
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-zinc-800/60 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-zinc-500">
                    Industry
                  </span>
                  <span className="font-medium text-zinc-200 truncate max-w-[180px]">
                    {category || "Technology"}
                  </span>
                </div>

                {location && (
                  <div className="flex items-center justify-between py-3 border-b border-zinc-800/60 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-zinc-500">
                      Location
                    </span>
                    <span className="font-medium text-zinc-200 truncate max-w-[180px]">
                      {location}
                    </span>
                  </div>
                )}

                {deadline && (
                  <div className="flex items-center justify-between py-3 border-b border-zinc-800/60 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-zinc-500">
                      Deadline
                    </span>
                    <span className="font-medium text-zinc-200">
                      {deadline}
                    </span>
                  </div>
                )}
              </div>

              {/* Visit Website Button */}
              <Button
                variant="outline"
                className="w-full bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-xl py-2.5 text-sm font-medium transition-all cursor-pointer"
              >
                Visit Website
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
