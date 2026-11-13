"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

function CanceledBanner() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");

  if (!canceled) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3 text-amber-200 text-xs sm:text-sm">
      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <p className="font-semibold text-amber-300">Checkout Canceled</p>
        <p className="text-zinc-400">
          Your payment was not completed. You can review your plan and check out whenever you are ready.
        </p>
      </div>
    </div>
  );
}

export default function PaymentCanceledAlert() {
  return (
    <Suspense fallback={null}>
      <CanceledBanner />
    </Suspense>
  );
}

