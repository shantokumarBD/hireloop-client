import { Application } from "@/Types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getApplications = async (userId?: string): Promise<Application[]> => {
  try {
    const url = userId ? `${BASE_URL}/applications?userId=${userId}` : `${BASE_URL}/applications`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

