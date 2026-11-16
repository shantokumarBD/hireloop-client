import type { Metadata } from "next";
import { getJobs } from "@/lib/api/jobs";
import { CompaniesView, RealCompany } from "./components/CompaniesView";

export const metadata: Metadata = {
  title: "Top Hiring Companies — HireLoop",
  description: "Explore verified companies actively recruiting top talent on HireLoop.",
};

export default async function CompaniesPage() {
  const jobs = await getJobs();

  // Group real jobs from MongoDB by company name
  const companyMap = new Map<string, RealCompany>();

  (jobs || []).forEach((job: any) => {
    const rawName = job.companyName;
    if (!rawName || typeof rawName !== "string" || !rawName.trim()) return;

    const companyName = rawName.trim();

    if (!companyMap.has(companyName)) {
      companyMap.set(companyName, {
        name: companyName,
        logo: job.companyLogo || "",
        category: job.category || "General",
        location: job.location || (job.isRemote ? "Remote" : "On-site"),
        openRoles: 1,
      });
    } else {
      const existing = companyMap.get(companyName)!;
      existing.openRoles += 1;
      if (!existing.logo && job.companyLogo) {
        existing.logo = job.companyLogo;
      }
    }
  });

  // Sort companies by most open roles first
  const companies: RealCompany[] = Array.from(companyMap.values()).sort(
    (a, b) => b.openRoles - a.openRoles
  );

  return <CompaniesView initialCompanies={companies} />;
}
