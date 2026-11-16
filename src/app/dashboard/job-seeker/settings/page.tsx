import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function SeekerSettingsPage() {
  return (
    <DashboardPlaceholder
      title="Account & Notification Settings"
      subtitle="Manage your personal credentials, email preferences, and job match notification frequency."
      badge="Account Settings"
      features={[
        "Change profile name, avatar, and contact email",
        "Configure daily or weekly job alert digests",
        "Manage active sessions and account security",
      ]}
      backHref={ROUTES.DASHBOARD.JOB_SEEKER}
      isDark={true}
    />
  );
}
