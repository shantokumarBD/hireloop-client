import { getJobs } from "@/lib/api/jobs";
import React from "react";

const BrowserJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;

  const urlSearch = new URLSearchParams(search as Record<string, string>);

  const query = urlSearch.toString();

  const jobs = await getJobs(query);

  return (
    <div>
    </div>
  );
};

export default BrowserJobsPage;
