import React from "react";
import Link from "next/link";
import {
  CreditCard,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import PaymentCanceledAlert from "./PaymentCanceledAlert";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col justify-between p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#0070F3]/30">
      {/* Top Header Navigation */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between pb-4">
        <Link
          href="/dashboard/job-seeker/billing"
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Billing</span>
        </Link>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-zinc-800/90 text-zinc-300 border border-zinc-700/60 uppercase tracking-wider">
          Stripe Checkout
        </span>
      </div>

      {/* Main Checkout Card */}
      <div className="w-full max-w-xl mx-auto my-auto py-6">
        {/* Order Canceled Alert Banner (Client Component wrapped in Suspense) */}
        <PaymentCanceledAlert />

        <div className="rounded-3xl bg-[#0f1118] border border-zinc-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C53FE]/10 border border-[#5C53FE]/20 text-[#818cf8] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pro Membership</span>
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Hireloop Pro Plan
              </h1>
              <p className="text-xs text-zinc-400">
                Unlock unlimited job applications and priority recruiter discovery.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-3xl font-extrabold text-white tracking-tight">
                $20.00
              </div>
              <span className="text-xs text-zinc-400 block mt-0.5">one-time access</span>
            </div>
          </div>

          {/* Plan Highlights */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              What is included
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-200">
              <li className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Unlimited Applications</span>
              </li>

              <li className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Direct Recruiter Messaging</span>
              </li>

              <li className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Priority Candidate Badge</span>
              </li>

              <li className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Instant Interview Alerts</span>
              </li>
            </ul>
          </div>

          {/* Stripe Form Action */}
          <div className="pt-2">
            <form action="/api/checkout_sessions" method="POST">
              <button
                type="submit"
                role="link"
                className="w-full h-12 rounded-2xl bg-[#0070F3] hover:bg-[#0060df] active:bg-[#0051bf] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0070F3]/25 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Proceed to Stripe Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>

          {/* Secure Trust Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>256-bit SSL encrypted • Powered by Stripe</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-xl mx-auto pt-6 text-center text-xs text-zinc-500">
        <div>© 2026 HireLoop Inc. All rights reserved.</div>
      </div>
    </div>
  );
}
