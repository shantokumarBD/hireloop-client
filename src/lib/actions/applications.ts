"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const updateApplicationStatus = async (id: string, status: string) => {
  try {
    const res = await fetch(`${BASE_URL}/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    revalidatePath("/dashboard/recruiter/jobs");
    return await res.json();
  } catch (error) {
    console.error("Error updating status:", error);
    return null;
  }
};
