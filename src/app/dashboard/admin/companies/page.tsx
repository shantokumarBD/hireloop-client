import React from "react";
import type { Metadata } from "next";
import { getJobs } from "@/lib/api/jobs";
import { AdminCompaniesView } from "./components/AdminCompaniesView";
import { AdminCompanyItem } from "./components/AdminCompaniesTable";

export const metadata: Metadata = {
  title: "Company Management — HireLoop Admin",
  description: "Manage and verify enterprise employer accounts on HireLoop.",
};

export default async function AdminCompaniesPage() {
  let jobs: any[] = [];
  try {
    jobs = await getJobs();
  } catch (error) {
    console.error("[AdminCompaniesPage] Failed to fetch jobs:", error);
    jobs = [];
  }

  // Aggregate real companies from jobs database
  const companyMap = new Map<string, AdminCompanyItem>();

  (jobs || []).forEach((job: any) => {
    const rawName = job.companyName;
    if (!rawName || typeof rawName !== "string" || !rawName.trim()) return;

    const companyName = rawName.trim();
    const companyId = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const recruiter = job.recruiterEmail || job.recruiterId || "admin@hireloop.com";
    const isActive = (job.status || "Active").toLowerCase() === "active";

    if (!companyMap.has(companyName)) {
      companyMap.set(companyName, {
        id: companyId,
        name: companyName,
        logo: job.companyLogo || "",
        category: job.category || "Technology",
        location: job.location || (job.isRemote ? "Remote" : "Global"),
        isRemote: Boolean(job.isRemote),
        totalJobs: 1,
        activeJobs: isActive ? 1 : 0,
        recruiters: recruiter ? [recruiter] : [],
        status: isActive ? "Verified" : "Pending",
        joinedDate: job.createdAt || null,
      });
    } else {
      const existing = companyMap.get(companyName)!;
      existing.totalJobs += 1;
      if (isActive) existing.activeJobs += 1;
      if (!existing.logo && job.companyLogo) existing.logo = job.companyLogo;
      if (recruiter && !existing.recruiters.includes(recruiter)) {
        existing.recruiters.push(recruiter);
      }
      if (job.isRemote) existing.isRemote = true;
    }
  });

  // Sort by most active jobs first
  const companies: AdminCompanyItem[] = Array.from(companyMap.values()).sort(
    (a, b) => b.activeJobs - a.activeJobs
  );

  return <AdminCompaniesView initialCompanies={companies} />;
}
