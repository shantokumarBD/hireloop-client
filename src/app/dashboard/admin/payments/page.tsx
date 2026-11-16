import { DashboardPlaceholder } from "@/components/shared/DashboardPlaceholder";
import { ROUTES } from "@/constants/routes";

export default function AdminPaymentsPage() {
  return (
    <DashboardPlaceholder
      title="Platform Payment & Subscription Audits"
      subtitle="Monitor Pro plan conversions, Stripe transaction webhooks, and billing revenue metrics."
      badge="Financial Logs"
      features={[
        "Real-time feed of all completed Stripe checkout sessions",
        "User upgrade logs and transaction ID verification lookup",
        "Revenue analytics, refund auditing, and failed webhook retries",
      ]}
      backHref={ROUTES.DASHBOARD.ADMIN}
      isDark={true}
    />
  );
}
