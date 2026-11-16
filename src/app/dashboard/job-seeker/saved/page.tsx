import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function SavedJobsPage() {
  return (
    <DashboardPlaceholder
      title="Saved Jobs"
      subtitle="Bookmark opportunities, set salary alerts, and organize the positions you want to apply for later."
      badge="Coming Soon"
      features={[
        "One-click job bookmarking from job search and company profiles",
        "Deadline reminders and status tracking for saved positions",
        "Salary change alerts and direct application shortcuts",
      ]}
      backHref={ROUTES.DASHBOARD.JOB_SEEKER}
      isDark={true}
    />
  );
}
