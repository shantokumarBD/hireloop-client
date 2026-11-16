import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Terms of Service — HireLoop",
  description: "Read the Terms of Service governing your use of the HireLoop job platform.",
};

export default function TermsPage() {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Last updated: November 2026
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the HireLoop platform (&ldquo;HireLoop&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              2. User Accounts & Responsibilities
            </h2>
            <p>
              To access core features of HireLoop, including applying for positions or publishing job listings, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Job seekers must provide truthful and accurate resume and contact information.</li>
              <li>Recruiters must post genuine, lawful, and authorized employment opportunities.</li>
              <li>Users must not create fraudulent or abusive accounts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              3. Applications, Quotas & Subscriptions
            </h2>
            <p>
              Free job seeker accounts include a quota of three (3) complimentary job applications. To submit additional applications, seekers may upgrade to HireLoop Pro. Subscriptions and one-time billing are processed securely through our payment partner, Stripe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              4. Recruiter Job Postings
            </h2>
            <p>
              Recruiters retain ownership of the job listings they submit. However, by publishing on HireLoop, you grant us a worldwide, non-exclusive license to display, promote, and syndicate your postings across our platform and partner networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              5. Intellectual Property
            </h2>
            <p>
              All trademarks, software, logos, designs, and content featured on HireLoop (excluding user-submitted job descriptions and candidate resumes) are the intellectual property of HireLoop and its licensors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              6. Limitation of Liability
            </h2>
            <p>
              HireLoop is a matching and discovery platform. We do not guarantee employment, interview invitations, or candidate qualifications. HireLoop is not liable for hiring decisions or conduct between candidates and prospective employers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              7. Contact Information
            </h2>
            <p>
              For legal inquiries or questions regarding these Terms, please contact our support team at{" "}
              <a href="mailto:support@hireloop.com" className="text-[#5C53FE] hover:underline">
                support@hireloop.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
