import React from "react";
import { getUsers } from "@/lib/api/user";
import { AdminUsersView } from "./components/AdminUsersView";
import { AdminUserItem } from "./components/AdminUsersTable";

export default async function AdminUsersPage() {
  // Fetch real users directly from MongoDB database
  let rawUsers: any[] = [];
  try {
    rawUsers = await getUsers();
  } catch (error) {
    console.error("[AdminUsersPage] Error fetching users:", error);
    rawUsers = [];
  }

  // Format real users directly from database records, sorting newest first
  const users: AdminUserItem[] = (rawUsers || [])
    .map((u: any) => ({
      _id: u._id?.toString() || u.id || "",
      name: u.name || "Anonymous User",
      email: u.email || "",
      role: u.role || "seeker",
      image: u.image || null,
      status: u.status || "Active",
      createdAt: u.createdAt || null,
    }))
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  return <AdminUsersView initialUsers={users} />;
}
