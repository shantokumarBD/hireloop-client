"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Clock,
  CircleDollarSign,
  Zap,
  Building2,
  Sparkles,
} from "lucide-react";
import { CreateJobInput } from "@/Types";

interface JobCardProps {
  job: Partial<CreateJobInput>;
}

// Salary formatter helper
function formatSalary(min?: number, max?: number, frequency?: string) {
  const freqText = frequency ? ` ${frequency}` : "";

  if (min && max) {
    return `$${min} - $${max}${freqText}`;
  }

  if (min) {
    return `From $${min}${freqText}`;
  }

  if (max) {
    return `Up to $${max}${freqText}`;
  }

  return "Negotiable";
}

export function JobCard({ job }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

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
    status,
  } = job;

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link
      href={`/browser-jobs/${_id}`}
      className="block w-full rounded-2xl bg-[#0e1118]/80 hover:bg-[#111520] border border-zinc-800/80 hover:border-zinc-700/80 p-5 sm:p-6 transition-all group shadow-lg shadow-black/20 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Logo and Job Details */}
        <div className="flex items-start gap-4 min-w-0">
          {/* Company Logo Box */}
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-cyan-400 group-hover:border-zinc-700 transition-colors">
            <Building2 className="w-6 h-6" />
          </div>

          {/* Title and Company Name */}
          <div className="min-w-0 space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#5C53FE] transition-colors truncate">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 truncate">
              {companyName}
              {location && ` • ${location}`}
              {isRemote && " (Remote)"}
            </p>
          </div>
        </div>

        {/* Bookmark Button */}
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBookmarkToggle();
          }}
          className="p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Bookmark"
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-white text-white" : ""}`}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-1 text-xs font-medium">
        {/* Salary */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
          <CircleDollarSign className="w-3.5 h-3.5 text-zinc-400" />
          <span>{formatSalary(salaryMin, salaryMax, salaryFrequency)}</span>
        </span>

        {/* Job Type */}
        {jobType && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{jobType}</span>
          </span>
        )}

        {/* Remote */}
        {isRemote && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Remote</span>
          </span>
        )}

        {/* Easy Apply */}
        {status === "Active" && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
            <Zap className="w-3.5 h-3.5" />
            <span>Easy Apply</span>
          </span>
        )}
      </div>
    </Link>
  );
}
