import React from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C53FE]/10 border border-[#5C53FE]/20 text-[#5C53FE] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing for Job Seekers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Simple, fair plans for every career stage
          </h1>
          <p className="text-sm sm:text-base text-zinc-400">
            Start applying for free up to 10 jobs. Upgrade anytime to unlock unlimited applications, direct recruiter messaging, and AI resume review.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Starter */}
          <div className="rounded-2xl bg-[#0e121b] border border-zinc-800 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Free Starter</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Perfect for exploring new opportunities.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-zinc-400">/ forever</span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Up to 10 job applications</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard search & filters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic profile & resume upload</span>
                </li>
                <li className="flex items-center gap-2.5 text-zinc-500 line-through">
                  <span>Unlimited applications</span>
                </li>
                <li className="flex items-center gap-2.5 text-zinc-500 line-through">
                  <span>Featured applicant badge</span>
                </li>
              </ul>
            </div>

            <Link
              href="/browser-jobs"
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors text-center block"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Seeker */}
          <div className="rounded-2xl bg-[#0e121b] border-2 border-[#5C53FE] p-8 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-[#5C53FE]/15">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#5C53FE] text-white text-xs font-bold tracking-wide uppercase shadow">
              Most Popular
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Pro Seeker</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Accelerate your search and get hired 3x faster.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
                <li className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                  <span>Unlimited job applications</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Featured Applicant Badge</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct recruiter messaging</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant interview alerts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI resume optimizer</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard/job-seeker/billing"
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-[#5C53FE] hover:bg-[#4E45E8] text-white transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Upgrade to Pro ($19/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Career Accelerator */}
          <div className="rounded-2xl bg-[#0e121b] border border-zinc-800 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Career Accelerator</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Full white-glove support for executive roles.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-zinc-300 pt-4 border-t border-zinc-800">
                <li className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                  <span>Everything in Pro Plan</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-on-1 resume review with HR</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Salary negotiation consultation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority search placement</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard/job-seeker/billing"
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors text-center block"
            >
              Get Started ($49/mo)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

