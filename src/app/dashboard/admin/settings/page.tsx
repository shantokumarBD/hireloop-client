import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function AdminSettingsPage() {
  return (
    <DashboardPlaceholder
      title="System Configuration & Security"
      subtitle="Manage global system settings, application rate limits, and authentication parameters."
      badge="System Settings"
      features={[
        "Configure free tier application quotas (default: 3)",
        "Audit security logs, session expirations, and active admins",
        "Platform maintenance mode toggles and API rate-limiting rules",
      ]}
      backHref={ROUTES.DASHBOARD.ADMIN}
      isDark={true}
    />
  );
}
