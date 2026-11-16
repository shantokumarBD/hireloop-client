import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Privacy Policy — HireLoop",
  description: "Learn how HireLoop collects, protects, and handles your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#07090e] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb / Back Link */}
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <header className="border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C53FE]/10 border border-[#5C53FE]/20 text-[#5C53FE] text-xs font-medium mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Last updated: November 2026
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              1. Information We Collect
            </h2>
            <p>
              When you use HireLoop, we collect information necessary to deliver and improve our platform:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Account Information:</strong> Name, email address, password hashes, and profile image.</li>
              <li><strong>Candidate Application Data:</strong> Contact details, resume URLs, portfolio links, and cover letters submitted to job openings.</li>
              <li><strong>Recruiter Data:</strong> Company profile, job listings, and hiring team member details.</li>
              <li><strong>Payment Metadata:</strong> Stripe customer IDs and transaction identifiers. We do not store credit card numbers on our servers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              2. How We Use Your Information
            </h2>
            <p>
              We use your data strictly to facilitate the job application process, authenticate user accounts, enforce subscription quotas, communicate platform updates, and prevent fraudulent activity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              3. Data Sharing & Disclosure
            </h2>
            <p>
              We respect your privacy:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Candidate applications are shared strictly with the recruiter who posted the specific job opening.</li>
              <li>We never sell or rent your personal information to third-party advertisers or data brokers.</li>
              <li>We share data with trusted infrastructure providers (e.g., MongoDB Atlas, Stripe) solely for hosting and payment processing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard encryption (HTTPS/TLS), cryptographic session tokens, role-based access control (RBAC), and database-level unique constraints to safeguard your information against unauthorized access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, rectify, or request the deletion of your account and application history at any time. To exercise these rights, please reach out to our privacy team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please email us at{" "}
              <a href="mailto:privacy@hireloop.com" className="text-[#5C53FE] hover:underline">
                privacy@hireloop.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
