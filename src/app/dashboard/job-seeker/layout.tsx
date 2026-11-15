import { requireRole } from "@/lib/core/server";
import React from "react";

export const instant = false;

export default async function JobseekerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["seeker", "job-seeker"]);
  return <>{children}</>;
}
