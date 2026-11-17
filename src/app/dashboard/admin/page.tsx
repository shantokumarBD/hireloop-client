import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function AdminDashboardRootPage() {
  redirect(ROUTES.DASHBOARD.ADMIN_USERS);
}
