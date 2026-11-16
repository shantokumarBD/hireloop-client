import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function AdminCompaniesPage() {
  return (
    <DashboardPlaceholder
      title="Platform Company Management"
      subtitle="Verify employer accounts, manage enterprise organizations, and audit corporate hiring profiles."
      badge="Admin Tool"
      features={[
        "Approve or reject pending employer verification badges",
        "Audit company job volume and applicant satisfaction scores",
        "Manage enterprise recruiting partnerships",
      ]}
      backHref={ROUTES.DASHBOARD.ADMIN}
      isDark={true}
    />
  );
}
