import React from "react";
import type { Metadata } from "next";
import { getSession } from "@/lib/core/server";
import { AdminSettingsView } from "./components/AdminSettingsView";

export const metadata: Metadata = {
  title: "System Configuration & Security — HireLoop Admin",
  description: "Manage global system settings, application rate limits, and authentication parameters.",
};

export default async function AdminSettingsPage() {
  const session = await getSession();

  const adminUser = {
    name: session?.user?.name || "Administrator",
    email: session?.user?.email || "admin@hireloop.com",
    role: (session?.user?.role || "admin").toUpperCase(),
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  return <AdminSettingsView adminUser={adminUser} apiUrl={apiUrl} />;
}
