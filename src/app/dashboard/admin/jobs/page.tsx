import React from "react";
import type { Metadata } from "next";
import { getJobs } from "@/lib/api/jobs";
import { AdminJobsView } from "./components/AdminJobsView";
import { AdminJobItem } from "./components/AdminJobsTable";

export const metadata: Metadata = {
  title: "Platform Jobs Directory — HireLoop Admin",
  description: "Global moderation dashboard to monitor, feature, or remove job listings across all organizations.",
};

export default async function AdminJobsPage() {
  let rawJobs: any[] = [];
  try {
    rawJobs = await getJobs();
  } catch (error) {
    console.error("[AdminJobsPage] Failed to fetch jobs:", error);
    rawJobs = [];
  }

  // Format jobs directly from database records, newest first
  const jobs: AdminJobItem[] = (rawJobs || [])
    .map((j: any) => ({
      _id: j._id?.toString() || j.id || "",
      title: j.title || "Untitled Position",
      companyName: j.companyName || "Unknown Organization",
      companyLogo: j.companyLogo || "",
      category: j.category || "General",
      jobType: j.jobType || "Full-Time",
      isRemote: Boolean(j.isRemote),
      location: j.location || (j.isRemote ? "Remote" : "Global"),
      salaryMin: typeof j.salaryMin === "number" ? j.salaryMin : undefined,
      salaryMax: typeof j.salaryMax === "number" ? j.salaryMax : undefined,
      salaryFrequency: j.salaryFrequency || "hr",
      recruiterEmail: j.recruiterEmail || j.recruiterId || "admin@hireloop.com",
      status: (j.status || "Active") as "Active" | "Closed" | "Draft",
      createdAt: j.createdAt || null,
    }))
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  return <AdminJobsView initialJobs={jobs} />;
}
