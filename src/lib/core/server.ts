import { headers } from "next/headers";
import { auth } from "../auth";

export const getSession = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const getAdminUsers = async (options?: {
  sortBy?: "name" | "createdAt" | "email";
  sortDirection?: "asc" | "desc";
}) => {
  "use server";
  try {
    const users = await auth.api.listUsers({
      query: {
        sortBy: options?.sortBy || "name",
        sortDirection: options?.sortDirection || "desc",
      },
      headers: await headers(),
    });
    return users;
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return null;
  }
};
