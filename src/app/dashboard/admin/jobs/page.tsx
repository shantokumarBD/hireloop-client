import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function AdminJobsPage() {
  return (
    <DashboardPlaceholder
      title="Platform Jobs Directory"
      subtitle="Global moderation dashboard to monitor, feature, or remove job listings across all organizations."
      badge="Admin Moderation"
      features={[
        "Real-time overview of all active, closed, and flagged listings",
        "One-click spam detection and fraudulent posting removal",
        "Pin high-priority postings to trending positions",
      ]}
      backHref={ROUTES.DASHBOARD.ADMIN}
      isDark={true}
    />
  );
}
