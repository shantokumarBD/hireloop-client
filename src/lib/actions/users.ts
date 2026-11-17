"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/core/server";
import { updateUserRoleClientSchema } from "@/schemas";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const updateUserRole = async (userId: string, role: string) => {
  const validation = updateUserRoleClientSchema.safeParse({ role });
  if (!validation.success) {
    const errorMsg = (validation.error.issues || []).map((i) => i.message).join(", ");
    console.warn("[Server Action] Update user role validation failed:", errorMsg);
    return { error: errorMsg };
  }

  try {
    const res = await authFetch(`${BASE_URL}/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ role: validation.data.role }),
    });

    revalidatePath("/dashboard/admin/users");
    return await res.json();
  } catch (error) {
    console.error("Error updating user role:", error);
    return null;
  }
};

export interface UserPremiumResponse {
  success?: boolean;
  premium: boolean;
}

export const getUserPremiumById = async (
  userId?: string,
  email?: string
): Promise<UserPremiumResponse> => {
  try {
    const query = email ? `?email=${encodeURIComponent(email)}` : "";
    const res = await authFetch(`${BASE_URL}/users/${userId || "me"}/premium${query}`);
    return res.ok ? await res.json() : { premium: false };
  } catch {
    return { premium: false };
  }
};

export const getUserPrmiumById = getUserPremiumById;
