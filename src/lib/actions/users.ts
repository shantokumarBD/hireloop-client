"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const updateUserRole = async (userId: string, role: string) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    revalidatePath("/dashboard/admin/users");
    return await res.json();
  } catch (error) {
    console.error("Error updating user role:", error);
    return null;
  }
};
