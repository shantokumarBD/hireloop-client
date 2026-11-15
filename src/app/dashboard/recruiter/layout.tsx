import { requireRole } from "@/lib/core/server";
import React from "react";

export const instant = false;

export default async function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("recruiter");
  return <>{children}</>;
}
