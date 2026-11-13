"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  ChevronDown,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function PaymentPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("123");
  const [cardHolder, setCardHolder] = useState(session?.user?.name || "");
  const [country, setCountry] = useState("Bangladesh");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const priceBDT = "BDT 2,553.33";
  const priceUSD = "$20.00";
  const currentPrice = currency === "BDT" ? priceBDT : priceUSD;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.add({
        title: "Payment Confirmed! 🎉",
        description: `Successfully upgraded to Hireloop Pro Plan (${currentPrice}). You now have unlimited applications!`,
        type: "success",
      });
      setTimeout(() => {
        router.push("/dashboard/job-seeker/applications");
      }, 1200);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col justify-between p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#0070F3]/30">
      {/* Top Header Navigation */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <Lock className="w-4 h-4" />
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-zinc-800/90 text-zinc-300 border border-zinc-700/60 uppercase tracking-wider">
            Sandbox
          </span>
        </div>
      </div>

      {/* Main Checkout Container */}
      <div className="w-full max-w-5xl mx-auto my-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Currency & Order Summary */}
          <div className="lg:col-span-5 space-y-7">
            {/* Currency Selector */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Choose a currency:
              </span>

              <div className="grid grid-cols-2 gap-3">
                {/* BDT Card */}
                <button
                  type="button"
                  onClick={() => setCurrency("BDT")}
                  className={`p-3.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                    currency === "BDT"
                      ? "border-2 border-white bg-zinc-900/90 text-white shadow-md"
                      : "border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  {/* Bangladesh Flag SVG */}
                  <div className="w-6 h-4 rounded-sm bg-[#006a4e] relative flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f42a41]" />
                  </div>
                  <span className="text-sm font-bold tracking-tight">
                    BDT 2,553.33
                  </span>
                </button>

                {/* USD Card */}
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`p-3.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                    currency === "USD"
                      ? "border-2 border-white bg-zinc-900/90 text-white shadow-md"
                      : "border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  {/* US Flag SVG */}
                  <div className="w-6 h-4 rounded-sm bg-[#b22234] relative flex flex-col justify-between overflow-hidden shrink-0 shadow-xs">
                    <div className="h-0.5 bg-white" />
                    <div className="h-0.5 bg-white" />
                    <div className="h-0.5 bg-white" />
                    <div className="w-2.5 h-2.5 bg-[#3c3b6e] absolute top-0 left-0" />
                  </div>
                  <span className="text-sm font-bold tracking-tight">
                    $20.00
                  </span>
                </button>
              </div>

              <p className="text-xs text-zinc-500 italic pt-1">
                1 USD = 127.6665 BDT
              </p>
            </div>

            <div className="border-t border-zinc-800/80 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Hireloop Pro Plan
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Access to all features & unlimited applications
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white tracking-tight">
                    {currentPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e121b] border border-zinc-800/60 space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Instant Activation Guarantee</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Immediately unlocks the 10-application cap. Apply to as many jobs as you like, get direct recruiter inbox access, and stand out as a verified candidate.
              </p>
            </div>
          </div>

          {/* Right Column: Stripe Checkout Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Green Link Pay Button */}
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full h-12 rounded-xl bg-[#00D924] hover:bg-[#00c520] active:bg-[#00ad1d] text-zinc-950 font-semibold text-sm flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer disabled:opacity-80"
            >
              <div className="flex items-center gap-1.5 font-bold tracking-tight">
                <span className="w-4 h-4 rounded-full bg-zinc-950 text-[#00D924] flex items-center justify-center text-[10px] font-black italic">
                  i
                </span>
                <span className="font-extrabold tracking-tight">link</span>
              </div>
              <span className="text-zinc-800/60 font-light">|</span>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="font-mono bg-zinc-950/15 px-1.5 py-0.5 rounded text-[11px] font-bold">
                  VISA
                </span>
                <span>4242</span>
              </div>
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-zinc-800/80" />
              <span className="text-xs text-zinc-500 font-bold tracking-wider uppercase">
                OR
              </span>
              <div className="flex-1 h-px bg-zinc-800/80" />
            </div>

            <form onSubmit={handlePay} className="space-y-5">
              {/* Contact Information */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 block">
                  Contact information
                </label>
                <div>
                  <span className="text-[11px] text-zinc-400 block mb-1">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-[#121622] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-all"
                  />
                </div>
              </div>

              {/* Payment Method Container */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 block">
                  Payment method
                </label>

                <div className="rounded-xl bg-[#121622] border border-zinc-800 overflow-hidden shadow-sm">
                  {/* Tab header */}
                  <div className="px-4 py-2.5 border-b border-zinc-800 text-xs font-medium text-white flex items-center gap-2 bg-zinc-900/50">
                    <CreditCard className="w-4 h-4 text-zinc-300" />
                    <span>Card</span>
                  </div>

                  {/* Card Information Fields */}
                  <div className="p-3 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                        Card information
                      </span>

                      {/* Card Number */}
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 1234 1234 1234"
                          className="w-full bg-zinc-900/90 border border-zinc-800 rounded-t-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-[#0070F3] transition-colors pr-24"
                        />
                        {/* Card Brand logos */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-80 pointer-events-none">
                          <span className="text-[10px] font-black text-blue-400 bg-white/10 px-1 py-0.5 rounded">
                            VISA
                          </span>
                          <span className="text-[10px] font-black text-amber-500 bg-white/10 px-1 py-0.5 rounded">
                            MC
                          </span>
                          <span className="text-[10px] font-black text-cyan-400 bg-white/10 px-1 py-0.5 rounded">
                            AMEX
                          </span>
                        </div>
                      </div>

                      {/* Expiry & CVC joined */}
                      <div className="grid grid-cols-2 border-x border-b border-zinc-800 rounded-b-lg overflow-hidden">
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="w-full bg-zinc-900/90 border-r border-zinc-800 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-[#0070F3] transition-colors"
                        />
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            placeholder="CVC"
                            className="w-full bg-zinc-900/90 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 font-mono focus:outline-none focus:border-[#0070F3] transition-colors pr-8"
                          />
                          <Lock className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                        Cardholder name
                      </span>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Full name on card"
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#0070F3] transition-colors"
                      />
                    </div>

                    {/* Country or Region */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                        Country or region
                      </span>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 appearance-none focus:outline-none focus:border-[#0070F3] transition-colors cursor-pointer"
                        >
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Germany">Germany</option>
                          <option value="India">India</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Information Checkbox */}
              <div className="p-3.5 rounded-xl bg-[#121622] border border-zinc-800 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="mt-0.5 rounded border-zinc-700 bg-zinc-900 text-[#0070F3] focus:ring-[#0070F3] cursor-pointer"
                />
                <label htmlFor="saveInfo" className="text-xs text-zinc-300 cursor-pointer">
                  <span className="font-semibold text-white block">
                    Save my information for faster checkout
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    Pay securely on this site and everywhere Link is accepted.
                  </span>
                </label>
              </div>

              {/* Primary Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-12 rounded-xl bg-[#0070F3] hover:bg-[#0060df] active:bg-[#0052be] text-white font-semibold text-sm flex items-center justify-center transition-all shadow-lg shadow-[#0070F3]/20 cursor-pointer disabled:opacity-70"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ${currentPrice}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full max-w-5xl mx-auto pt-8 pb-2 text-center text-xs text-zinc-500 space-y-2">
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <span>Powered by</span>
          <span className="font-bold text-zinc-400 tracking-tight">stripe</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-[11px]">
          <Link href="/terms" className="hover:text-zinc-400 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}

