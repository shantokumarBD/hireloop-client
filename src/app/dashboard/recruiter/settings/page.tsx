import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function RecruiterSettingsPage() {
  return (
    <DashboardPlaceholder
      title="Company Organization Settings"
      subtitle="Configure your hiring company branding, team permissions, and applicant notification webhooks."
      badge="Company Profile"
      features={[
        "Update verified company logo, website URL, and office locations",
        "Invite co-recruiters and hiring managers with role permissions",
        "Configure Slack or Email notifications for new applicant submissions",
      ]}
      backHref={ROUTES.DASHBOARD.RECRUITER}
      isDark={false}
    />
  );
}
