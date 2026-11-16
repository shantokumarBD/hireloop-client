"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/core/server";
import { Application } from "@/Types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getApplications = async (
  userId?: string,
  email?: string,
  jobId?: string
): Promise<Application[]> => {
  try {
    const params = new URLSearchParams();
    if (userId && userId !== "undefined" && userId !== "null") {
      params.append("userId", userId);
    }
    if (email && email !== "undefined" && email !== "null") {
      params.append("email", email);
    }
    if (jobId && jobId !== "undefined" && jobId !== "null") {
      params.append("jobId", jobId);
    }

    const queryString = params.toString();
    const url = queryString
      ? `${BASE_URL}/applications?${queryString}`
      : `${BASE_URL}/applications`;

    const res = await authFetch(url);

    if (!res.ok) {
      console.error("[Applications Action] HTTP Error:", res.status);
      return [];
    }

    return await res.json();
  } catch (error: any) {
    console.error("[Applications Action] Fetch Exception:", error);
    return [];
  }
};

export const getJobApplications = async (jobId: string): Promise<Application[]> => {
  return getApplications(undefined, undefined, jobId);
};

export const updateApplicationStatus = async (id: string, status: string) => {
  try {
    const res = await authFetch(`${BASE_URL}/applications/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    revalidatePath("/dashboard/recruiter/jobs");
    return await res.json();
  } catch (error) {
    console.error("Error updating status:", error);
    return null;
  }
};

export interface ApplicationCountResponse {
  count: number;
  limit: number | string;
  limitReached: boolean;
  remaining: number;
  isPremium?: boolean;
}

export const getApplicationCount = async (
  userId?: string,
  email?: string
): Promise<ApplicationCountResponse> => {
  try {
    const res = await authFetch(`${BASE_URL}/applications/count`);

    if (!res.ok) {
      return { count: 0, limit: 3, limitReached: false, remaining: 3 };
    }

    return await res.json();
  } catch (error) {
    console.error("Error getting application count:", error);
    return { count: 0, limit: 3, limitReached: false, remaining: 3 };
  }
};
