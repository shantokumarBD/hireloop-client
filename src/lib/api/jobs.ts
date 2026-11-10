import { CreateJobInput } from "@/Types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * API call to create a new job posting
 */
export async function createJob(jobData: CreateJobInput) {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || `Server error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API error creating job:", error);
    throw error;
  }
}

/**
 * API call to fetch all recruiter jobs
 */
export async function getJobs() {
  const res = await fetch(`${API_BASE_URL}/jobs`);
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return await res.json();
}
