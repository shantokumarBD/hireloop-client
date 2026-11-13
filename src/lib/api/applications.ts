import { Application } from "@/Types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getApplications = async (
  userId?: string,
  email?: string
): Promise<Application[]> => {
  try {
    const params = new URLSearchParams();
    if (userId && userId !== "undefined" && userId !== "null") {
      params.append("userId", userId);
    }
    if (email && email !== "undefined" && email !== "null") {
      params.append("email", email);
    }

    const queryString = params.toString();
    const url = queryString
      ? `${BASE_URL}/applications?${queryString}`
      : `${BASE_URL}/applications`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("[Applications API] HTTP Error:", res.status);
      return [];
    }

    return await res.json();
  } catch (error: any) {
    console.error("[Applications API] Fetch Exception:", error);
    return [];
  }
};

export interface ApplicationCountResponse {
  count: number;
  limit: number;
  limitReached: boolean;
  remaining: number;
}

export const getApplicationCount = async (
  userId?: string,
  email?: string
): Promise<ApplicationCountResponse> => {
  try {
    const params = new URLSearchParams();
    if (userId && userId !== "undefined" && userId !== "null") {
      params.append("userId", userId);
    }
    if (email && email !== "undefined" && email !== "null") {
      params.append("email", email);
    }

    const queryString = params.toString();
    const url = queryString
      ? `${BASE_URL}/applications/count?${queryString}`
      : `${BASE_URL}/applications/count`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return { count: 0, limit: 10, limitReached: false, remaining: 10 };
    }

    return await res.json();
  } catch (error) {
    console.error("Error getting application count:", error);
    return { count: 0, limit: 10, limitReached: false, remaining: 10 };
  }
};
