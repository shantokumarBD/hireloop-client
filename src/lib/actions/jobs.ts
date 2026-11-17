"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/core/server";
import {
  createJobClientSchema,
  updateJobClientSchema,
  createApplicationClientSchema,
} from "@/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const createJobs = async (formData: FormData) => {
  const jobPayload = {
    title: (formData.get("title") as string)?.trim(),
    recruiterId: (formData.get("recruiterId") as string) || "",
    companyName: (formData.get("companyName") as string)?.trim(),
    category: (formData.get("category") as string) || "",
    jobType: (formData.get("jobType") as string) || "Full-Time",
    isRemote: formData.get("isRemote") === "true",
    location: (formData.get("location") as string)?.trim(),
    deadline: (formData.get("deadline") as string) || "",
    salaryMin: Number(formData.get("salaryMin")) || 0,
    salaryMax: Number(formData.get("salaryMax")) || 0,
    salaryFrequency: (formData.get("salaryFrequency") as string) || "per hour",
    responsibilities: (formData.get("responsibilities") as string)?.trim(),
    requirements: (formData.get("requirements") as string)?.trim(),
    status: "Active",
    createdAt: new Date().toISOString(),
  };

  const validation = createJobClientSchema.safeParse(jobPayload);
  if (!validation.success) {
    const errorMsg = (validation.error.issues || []).map((i) => i.message).join(", ");
    console.warn("[Server Action] Validation failed:", errorMsg);
    return { success: false, error: errorMsg };
  }

  console.log("[Server Action] Parsed & validated jobPayload:", validation.data);

  try {
    console.log("[Server Action] Sending POST to:", `${BASE_URL}/jobs`);

    const res = await authFetch(`${BASE_URL}/jobs`, {
      method: "POST",
      body: JSON.stringify(validation.data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error(
        "[Server Action] Backend response not OK:",
        res.status,
        errorData,
      );
      return {
        success: false,
        error: errorData?.message || `Server error: ${res.status}`,
      };
    }

    const data = await res.json();
    console.log("[Server Action] Successfully inserted to MongoDB:", data);

    revalidatePath("/dashboard/recruiter/jobs");

    return { success: true, data };
  } catch (error) {
    console.error("[Server Action] Network / Runtime Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
};

export const deleteJobs = async (jobId: string) => {
  try {
    const res = await authFetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "DELETE",
    });
    revalidatePath("/dashboard/recruiter/jobs");
    return res.json();
  } catch (error) {
    console.error("[Server Action] Network / Runtime Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to connect to server",
    };
  }
};

export const getSingleJob = async (jobId: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    cache: "no-store",
  });
  return res.json();
};

export const updateJob = async (jobId: string, updateData: any) => {
  const validation = updateJobClientSchema.safeParse(updateData);
  if (!validation.success) {
    const errorMsg = (validation.error.issues || []).map((i) => i.message).join(", ");
    console.warn("[Server Action] Update job validation failed:", errorMsg);
    return { success: false, error: errorMsg };
  }

  try {
    const res = await authFetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      body: JSON.stringify(validation.data),
    });
    revalidatePath("/dashboard/recruiter/jobs");
    return res.json();
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update job" };
  }
};

export const applyToJob = async (data: any) => {
  const validation = createApplicationClientSchema.safeParse(data);
  if (!validation.success) {
    const errorMsg = (validation.error.issues || []).map((i) => i.message).join(", ");
    console.warn("[Server Action] Apply job validation failed:", errorMsg);
    return { success: false, error: errorMsg };
  }

  try {
    const res = await authFetch(`${BASE_URL}/applications`, {
      method: "POST",
      body: JSON.stringify(validation.data),
    });
    return await res.json();
  } catch (error) {
    console.error("Error applying to job:", error);
    return { success: false, error: "Failed to submit application" };
  }
};