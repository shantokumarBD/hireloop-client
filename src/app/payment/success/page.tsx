"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { checkoutVerify } from "@/lib/actions/payment";

function SuccessCardContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (sessionId) {
      console.log("[PaymentSuccess] Verifying session with backend:", sessionId);
      checkoutVerify(sessionId)
        .then((res) => console.log("[PaymentSuccess] Verification response from backend:", res))
        .catch((err) => console.error("[PaymentSuccess] Checkout verify error:", err))
        .finally(() => setIsVerifying(false));
    } else {
      setIsVerifying(false);
    }
  }, [sessionId]);

  const displaySessionId =
    sessionId.length > 23
      ? `${sessionId.slice(0, 20)}...`
      : sessionId || "cs_test_verified...";

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col items-center justify-center p-4 selection:bg-emerald-500/30 relative overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Notch Bar matching Figma */}
      <div className="relative z-0 w-44 h-4 rounded-t-xl bg-gradient-to-r from-zinc-600/30 via-slate-400/40 to-zinc-600/30 border-t border-x border-zinc-500/30 blur-[1px] mb-[-4px]" />

      {/* Main Success Card */}
      <div className="relative z-10 w-full max-w-[440px] rounded-3xl bg-[#0f1118] border border-zinc-800/80 p-8 sm:p-9 shadow-2xl text-center flex flex-col items-center space-y-6">
        {/* Emerald Checkmark Circle */}
        <div className="w-16 h-16 rounded-full bg-[#0a231b] border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/40">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Upgrade Successful Pill Badge */}
        <div>
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#121c2e] border border-blue-500/20 text-[#60a5fa] text-[10px] font-bold tracking-widest uppercase">
            UPGRADE SUCCESSFUL
          </span>
        </div>

        {/* Main Title & Description */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome to Hireloop Pro
          </h1>

          <p className="text-sm text-zinc-400 leading-relaxed">
            Your payment of <span className="font-bold text-white">$20.00</span> was
            received perfectly.
          </p>

          <p className="text-xs text-zinc-400 leading-relaxed px-2">
            All advanced premium recruiting modules are unlocked on your account.{" "}
            <span className="text-[#10b981] font-semibold block sm:inline mt-1 sm:mt-0">
              You may need to re-authenticate to see the effect.
            </span>
          </p>
        </div>

        {/* Session ID Verified Box */}
        <div className="w-full rounded-2xl bg-[#0a0c12] border border-zinc-800/80 px-4 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
            <span className="font-medium text-xs">
              {isVerifying ? "Verifying Session..." : "Session ID Verified"}
            </span>
          </div>

          <div
            className="px-2.5 py-1 rounded-lg bg-[#121622] border border-zinc-800 font-mono text-[11px] text-zinc-400 truncate max-w-[150px] sm:max-w-[170px]"
            title={sessionId}
          >
            {displaySessionId}
          </div>
        </div>

        {/* Action Button: Go to Workspace Dashboard */}
        <Link
          href="/dashboard/job-seeker"
          className="w-full h-12 rounded-2xl bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>Go to Workspace Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090e] text-zinc-400 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#5C53FE]" />
        </div>
      }
    >
      <SuccessCardContent />
    </Suspense>
  );
}
