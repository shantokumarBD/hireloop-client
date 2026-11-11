"use server";

import { success } from "better-auth";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const createJobs = async (formData: FormData) => {
  const jobPayload = {
    title: (formData.get("title") as string)?.trim(),
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

  console.log("[Server Action] Parsed jobPayload:", jobPayload);

  try {
    console.log("[Server Action] Sending POST to:", `${BASE_URL}/jobs`);

    const res = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobPayload),
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
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
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
  try {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    revalidatePath("/dashboard/recruiter/jobs");
    return res.json();
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
