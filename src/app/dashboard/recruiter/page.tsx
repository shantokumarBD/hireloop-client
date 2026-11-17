import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function RecruiterDashboardRootPage() {
  redirect(ROUTES.DASHBOARD.RECRUITER_JOBS);
}
